import numpy as np
import requests
from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import plotly.express as px
from plotly.io import to_html
from datetime import datetime
from scipy.interpolate import interp1d
from scipy.ndimage import gaussian_filter1d
import pandas as pd

app = Flask(__name__)
CORS(app)
smoothFactor = 7

def remove_outliers(times, data):
    times = np.array(times)  # Convert times to a NumPy array if not already
    num_segments = 100
    segment_length = len(data) // num_segments
    cleaned_times = np.array([], dtype=times.dtype)
    cleaned_data = np.array([], dtype=data.dtype)
    
    for i in range(num_segments):
        start_index = i * segment_length
        if i == num_segments - 1:  # Handle last segment
            end_index = len(data)
        else:
            end_index = start_index + segment_length

        segment_times = times[start_index:end_index]
        segment_data = data[start_index:end_index]
        
        quartile_1, quartile_3 = np.percentile(segment_data, [25, 75])
        iqr = quartile_3 - quartile_1
        if iqr == 0:  # If IQR is zero, include all data in this segment as it has no outliers
            cleaned_times = np.concatenate((cleaned_times, segment_times))
            cleaned_data = np.concatenate((cleaned_data, segment_data))
            continue

        lower_bound = quartile_1 - (iqr * 1.5)
        upper_bound = quartile_3 + (iqr * 1.5)
        mask = (segment_data > lower_bound) & (segment_data < upper_bound)

        cleaned_times = np.concatenate((cleaned_times, segment_times[mask]))
        cleaned_data = np.concatenate((cleaned_data, segment_data[mask]))

    return cleaned_times, cleaned_data

def downsample_data(times, data, max_points=1000):
    step = len(data) // max_points + 1
    return times[::step], data[::step]

def get_sensor_type_title(sensor_type_id):
    """Fetches sensor type title from the API."""
    try:
        response = requests.post("http://localhost:8082/api/get-sensor-type-title", json={"sensorTypeId": sensor_type_id})

        if response.status_code == 200:
            return response.text  # If response is a plain text
        else:
            print(f"Failed to fetch sensor title for ID {sensor_type_id}: {response.status_code}, Details: {response.text}")
    except Exception as e:
        print(f"Error fetching sensor title: {str(e)}")
    return "Unknown Sensor"

@app.route('/generate-correlation-plot', methods=['POST'])
def generate_correlation_plot():
    params = request.json
    sensor_readings = {}
    all_times = set()

    # Fetch data for each sensor type
    for sensor in params['sensorTypes']:
        sensor_title = get_sensor_type_title(sensor)
        print(f"Fetching data for sensor: {sensor_title}")
        response = requests.get("http://localhost:9069/api/readings", params={
            "sensorType": sensor,
            "startTime": params['startTime'],
            "endTime": params['endTime'],
            "longitude": params['longitude'],
            "latitude": params['latitude'],
            "range": params['range']
        })
        if response.status_code == 200:
            data = response.json()
            times = [item['dateTime'] for item in data]
            readings = np.array([item['reading'] for item in data if item['reading'] is not None])
            print(f"Initial readings for sensor {sensor_title}: {len(readings)}")

            if readings.size > 0:
                times, readings = remove_outliers(times, readings)
                print(f"Readings after removing outliers for sensor {sensor_title}: {len(readings)}")
                if readings.size > 0:  # Check after removing outliers
                    times, readings = downsample_data(times, readings)
                    print(f"Readings after downsampling for sensor {sensor_title}: {len(readings)}")
                    if readings.size > 0:  # Check after downsampling
                        time_indices = np.array([datetime.fromisoformat(t.replace('Z', '')).timestamp() for t in times])
                        interp_func = interp1d(time_indices, readings, kind='linear', fill_value='extrapolate')
                        smoothed_readings = interp_func(time_indices)
                        smoothed_readings = gaussian_filter1d(smoothed_readings, sigma=smoothFactor)
                        sensor_readings[sensor_title] = dict(zip(times, smoothed_readings))
                        all_times.update(times)
                    else:
                        print(f"No valid data available after downsampling for sensor {sensor}")
                else:
                    print(f"No valid data available after removing outliers for sensor {sensor}")
            else:
                print(f"No valid readings available for sensor {sensor}")

    if len(sensor_readings) >= 2:
        # Align readings by common timestamps
        all_times = sorted(all_times)
        aligned_readings = {title: [sensor_readings[title].get(time, None) for time in all_times] for title in sensor_readings}

        # Create DataFrame and fill missing data using forward and backward fill
        df = pd.DataFrame(aligned_readings, index=all_times).fillna(method='ffill').fillna(method='bfill')
        print(f"DataFrame shape after alignment and filling missing data: {df.shape}")

        if not df.empty:
            correlation_matrix = df.corr()

            fig = px.imshow(
                correlation_matrix,
                text_auto=True,
                color_continuous_scale='RdBu_r',
                title="Correlation Heatmap of Sensor Readings"
            )

            graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
            return Response(graph_html, mimetype='text/html')

    return jsonify({'message': 'Insufficient data for correlation plot'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5005, debug=True)
