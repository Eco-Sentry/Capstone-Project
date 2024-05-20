# from datetime import datetime
# import numpy as np
# import requests
# from flask import Flask, Response, jsonify, request
# from flask_cors import CORS, cross_origin
# import plotly.graph_objs as go
# from plotly.io import to_html

# app = Flask(__name__)
# CORS(app)


# def remove_outliers(data):
#     """Remove outliers from a list of values within a single bin."""
#     if not data:
#         return data  # Return empty list if no data
#     quartile_1, quartile_3 = np.percentile(data, [25, 75])
#     iqr = quartile_3 - quartile_1
#     lower_bound = quartile_1 - (iqr * 1.5)
#     upper_bound = quartile_3 + (iqr * 1.5)
#     return [x for x in data if lower_bound <= x <= upper_bound]

# def average_data_by_time_bins(times, values, start_time, end_time, num_bins):
#     """Average data values into time bins with outlier removal."""
#     total_duration = (end_time - start_time)
#     bin_duration = total_duration / num_bins
#     bins = [start_time + i * bin_duration for i in range(num_bins + 1)]
#     bin_edges = [b.timestamp() for b in bins]  # Convert bins to timestamps for digitize
#     times = [t.timestamp() for t in times]  # Convert times to timestamps

#     digitized = np.digitize(times, bin_edges) - 1  # Find which bin each time belongs to
#     binned_values = []
#     for i in range(num_bins):
#         # Gather all values in the current bin
#         bin_values = [v for idx, v in enumerate(values) if digitized[idx] == i]
#         # Remove outliers within this bin before averaging
#         filtered_values = remove_outliers(bin_values)
#         if filtered_values:  # Only calculate mean if there are non-outlier values
#             average = np.mean(filtered_values)
#         else:
#             average = np.nan  # Use NaN to indicate no valid data due to outlier removal
#         binned_values.append(average)
#     return binned_values

# @app.route('/generate-scatter-plot', methods=['POST'])
# @cross_origin(origin='*', methods=['POST', 'OPTIONS'])
# def generate_scatter_plot():
#     params = request.json
#     sensor_a = params['sensorA']
#     sensor_b = params['sensorB']

#     start_time = datetime.fromisoformat(params['startTime'].replace('Z', '')).replace(tzinfo=None)
#     end_time = datetime.fromisoformat(params['endTime'].replace('Z', '')).replace(tzinfo=None)
#     num_bins = params.get('numBins', 50)

#     readings_a, readings_b = [], []
#     for sensor_id in [sensor_a, sensor_b]:
#         response = requests.get("http://localhost:9069/api/readings", params={
#             "sensorType": sensor_id,
#             "startTime": params['startTime'],
#             "endTime": params['endTime'],
#             "longitude": params['longitude'],
#             "latitude": params['latitude'],
#             "range": params['range']
#         })

#         if response.status_code == 200:
#             data = response.json()
#             if isinstance(data, list) and all(isinstance(item, dict) for item in data):
#                 times = [datetime.fromisoformat(item['dateTime'].replace('Z', '')).replace(tzinfo=None) for item in data if 'dateTime' in item and 'reading' in item]
#                 readings = [item['reading'] for item in data if 'dateTime' in item and 'reading' in item]
#                 binned_values = average_data_by_time_bins(times, readings, start_time, end_time, num_bins)
#                 if sensor_id == sensor_a:
#                     readings_a = binned_values
#                 else:
#                     readings_b = binned_values
#             else:
#                 print("Data format is incorrect or data is empty.")
#         else:
#             print(f"Failed to fetch data for sensor {sensor_id}. Status code: {response.status_code}")

#     if readings_a and readings_b:
#         # Ensure that both sensors have data for all bins
#         min_length = min(len(readings_a), len(readings_b))
#         readings_a = readings_a[:min_length]
#         readings_b = readings_b[:min_length]

#         fig = go.Figure(data=[go.Scatter(x=readings_b, y=readings_a, mode='markers')])
#         fig.update_layout(title='Time Averaged Scatter Plot between Two Sensors',
#                           xaxis_title=f'Average Readings from Sensor {sensor_b}',
#                           yaxis_title=f'Average Readings from Sensor {sensor_a}')

#         graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
#         return Response(graph_html, mimetype='text/html')
#     else:
#         return jsonify({'message': 'No sufficient data available for creating a scatter plot'})

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5002, debug=True)
from datetime import datetime
import numpy as np
import requests
from flask import Flask, Response, jsonify, request
from flask_cors import CORS, cross_origin
import plotly.graph_objs as go
from plotly.io import to_html

app = Flask(__name__)
CORS(app)

def get_sensor_type_title(sensor_type_id):
    """Fetches sensor type title from the API."""
    try:
        response = requests.post("http://localhost:8082/api/get-sensor-type-title", json={"sensorTypeId": sensor_type_id})

        if response.status_code == 200:
            return response.text  # If response is a plain text
        else:
            print(f"Failed to fetch sensor title for ID {get_sensor_type_title(sensor_type_id)}: {response.status_code}, Details: {response.text}")
    except Exception as e:
        print(f"Error fetching sensor title: {str(e)}")
    return "Unknown Sensor"

def remove_outliers(data):
    if not data:
        return data
    quartile_1, quartile_3 = np.percentile(data, [25, 75])
    iqr = quartile_3 - quartile_1
    lower_bound = quartile_1 - (iqr * 1.5)
    upper_bound = quartile_3 + (iqr * 1.5)
    return [x for x in data if lower_bound <= x <= upper_bound]

def average_data_by_time_bins(times, values, start_time, end_time, num_bins):
    total_duration = (end_time - start_time)
    bin_duration = total_duration / num_bins
    bins = [start_time + i * bin_duration for i in range(num_bins + 1)]
    bin_edges = [b.timestamp() for b in bins]
    times = [t.timestamp() for t in times]

    digitized = np.digitize(times, bin_edges) - 1
    binned_values = []
    for i in range(num_bins):
        bin_values = [v for idx, v in enumerate(values) if digitized[idx] == i]
        filtered_values = remove_outliers(bin_values)
        average = np.mean(filtered_values) if filtered_values else np.nan
        binned_values.append(average)
    return binned_values

@app.route('/generate-scatter-plot', methods=['POST'])
@cross_origin(origin='*', methods=['POST', 'OPTIONS'])
def generate_scatter_plot():
    params = request.json
    sensor_a = params['sensorA']
    sensor_b = params['sensorB']

    start_time = datetime.fromisoformat(params['startTime'].replace('Z', '')).replace(tzinfo=None)
    end_time = datetime.fromisoformat(params['endTime'].replace('Z', '')).replace(tzinfo=None)
    num_bins = params.get('numBins', 500)

    readings_a, readings_b = [], []
    for sensor_id in [sensor_a, sensor_b]:
        response = requests.get("http://localhost:9069/api/readings", params={
            "sensorType": sensor_id,
            "startTime": params['startTime'],
            "endTime": params['endTime'],
            "longitude": params['longitude'],
            "latitude": params['latitude'],
            "range": params['range']
        })

        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list) and all(isinstance(item, dict) for item in data):
                times = [datetime.fromisoformat(item['dateTime'].replace('Z', '')).replace(tzinfo=None) for item in data if 'dateTime' in item and 'reading' in item]
                readings = [item['reading'] for item in data if 'dateTime' in item and 'reading' in item]
                binned_values = average_data_by_time_bins(times, readings, start_time, end_time, num_bins)
                if sensor_id == sensor_a:
                    readings_a = binned_values
                else:
                    readings_b = binned_values
            else:
                print("Data format is incorrect or data is empty.")
        else:
            print(f"Failed to fetch data for sensor {sensor_id}. Status code: {response.status_code}")

    if readings_a and readings_b:
        # Remove any NaN values for regression calculation
        combined = list(zip(readings_b, readings_a))
        filtered = [pair for pair in combined if not np.isnan(pair[0]) and not np.isnan(pair[1])]
        x_vals, y_vals = zip(*filtered)

        # Fit line
        slope, intercept = np.polyfit(x_vals, y_vals, 1)
        line_x = np.linspace(min(x_vals), max(x_vals), 100)
        line_y = slope * line_x + intercept

        fig = go.Figure(data=[
            go.Scatter(x=readings_b, y=readings_a, mode='markers', name='Data Points'),
            go.Scatter(x=line_x, y=line_y, mode='lines', name='Fit Line')
        ])
        fig.update_layout(title='Time Averaged Scatter Plot between Two Sensors',
                          xaxis_title=f'Average Readings from {get_sensor_type_title(sensor_b)}',
                          yaxis_title=f'Average Readings from {get_sensor_type_title(sensor_a)}')

        graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
        return Response(graph_html, mimetype='text/html')
    else:
        return jsonify({'message': 'No sufficient data available for creating a scatter plot'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
