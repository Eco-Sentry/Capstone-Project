










# import numpy as np
# import requests
# from flask import Flask, Response, jsonify, request
# from flask_cors import CORS
# import plotly.graph_objs as go
# from plotly.io import to_html
# from datetime import datetime
# from scipy.interpolate import interp1d
# from scipy.ndimage import gaussian_filter1d

# from datetime import datetime, timezone

# app = Flask(__name__)
# CORS(app)
# smoothFactor = 7
# def remove_outliers(times, data):
#     times = np.array(times)
#     quartile_1, quartile_3 = np.percentile(data, [25, 75])
#     iqr = quartile_3 - quartile_1
#     lower_bound = quartile_1 - (iqr * 1.5)
#     upper_bound = quartile_3 + (iqr * 1.5)
#     mask = (data > lower_bound) & (data < upper_bound)
#     return times[mask], data[mask]


# def downsample_data(times, data, max_points=1000):
#     step = len(data) // max_points + 1
#     return times[::step], data[::step]

# def get_sensor_type_title(sensor_type_id):
#     """Fetches sensor type title from the API."""
#     try:
#         response = requests.post("http://localhost:8082/api/get-sensor-type-title", json={"sensorTypeId": sensor_type_id})

#         if response.status_code == 200:
#             return response.text  # If response is a plain text
#         else:
#             print(f"Failed to fetch sensor title for ID {sensor_type_id}: {response.status_code}, Details: {response.text}")
#     except Exception as e:
#         print(f"Error fetching sensor title: {str(e)}")
#     return "Unknown Sensor"


# @app.route('/generate-multi-sensor-graph', methods=['POST'])
# def generate_multi_sensor_graph():
#     params = request.json
#     fig = go.Figure()
#     axis_settings = {}
#     axis_count = 1

#     for sensor in params['sensorTypes']:
#         sensor_title = get_sensor_type_title(sensor)
#         print("Requesting data with params:", params)
#         response = requests.get("http://localhost:9069/api/readings", params={
#             "sensorType": sensor,
#             "startTime": params['startTime'],
#             "endTime": params['endTime'],
#             "longitude": params['longitude'],
#             "latitude": params['latitude'],
#             "range": params['range']
#         })
#         if response.status_code == 200:
#             data = response.json()
#             times = [datetime.fromisoformat(item['dateTime'].replace('Z', '')) for item in data]
#             readings = np.array([item['reading'] for item in data if item['reading'] is not None])

#             if readings.size > 0:
#                 times, readings = remove_outliers(times, readings)
#                 if readings.size > 0:  # Check after removing outliers
#                     times, readings = downsample_data(times, readings)
#                     if readings.size > 0:  # Check after downsampling
#                         time_indices = np.array([t.timestamp() for t in times])
#                         interp_func = interp1d(time_indices, readings, kind='linear', fill_value='extrapolate')
#                         smoothed_readings = interp_func(time_indices)
#                         smoothed_readings = gaussian_filter1d(smoothed_readings, sigma=smoothFactor)

#                         axis_name = 'yaxis' + ('' if axis_count == 1 else str(axis_count))
#                         fig.add_trace(go.Scatter(
#                             x=times,
#                             y=smoothed_readings,
#                             mode='lines+markers',
#                             # name=f'Sensor {sensor}',
#                             name=sensor_title,
#                             yaxis='y' + ('' if axis_count == 1 else str(axis_count))
#                         ))

#                         axis_settings[axis_name] = {
#                             'title': f'Sensor {sensor_title} Readings',
#                             'side': 'left' if axis_count % 2 == 0 else 'right',
#                             'overlaying': 'y' if axis_count > 1 else 'free',
#                             'showgrid': False
#                         }
#                         axis_count += 1
#                     else:
#                         print(f"No valid data available after downsampling for sensor {sensor}")
#                 else:
#                     print(f"No valid data available after removing outliers for sensor {sensor}")
#             else:
#                 print(f"No valid readings available for sensor {sensor}")

#     fig.update_layout(
#         **axis_settings,
#         title='Multi-Sensor Readings Over Time',
#         xaxis=dict(title='Time'),
#         margin=dict(l=40, r=40, b=40, t=40)
#     )

#     if not fig.data:
#         return jsonify({'message': 'No data available for any sensor'})

#     graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
#     return Response(graph_html, mimetype='text/html')

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)






















import numpy as np
import requests
from flask import Flask, Response, jsonify, request
from flask_cors import CORS
import plotly.graph_objs as go
from plotly.io import to_html
from datetime import datetime
from scipy.interpolate import interp1d
from scipy.ndimage import gaussian_filter1d

from datetime import datetime, timezone

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


@app.route('/generate-multi-sensor-graph', methods=['POST'])
def generate_multi_sensor_graph():
    params = request.json
    fig = go.Figure()
    axis_settings = {}
    axis_count = 1

    for sensor in params['sensorTypes']:
        sensor_title = get_sensor_type_title(sensor)
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
            times = [datetime.fromisoformat(item['dateTime'].replace('Z', '')) for item in data]
            readings = np.array([item['reading'] for item in data if item['reading'] is not None])

            if readings.size > 0:
                times, readings = remove_outliers(times, readings)
                if readings.size > 0:  # Check after removing outliers
                    times, readings = downsample_data(times, readings)
                    if readings.size > 0:  # Check after downsampling
                        time_indices = np.array([t.timestamp() for t in times])
                        interp_func = interp1d(time_indices, readings, kind='linear', fill_value='extrapolate')
                        smoothed_readings = interp_func(time_indices)
                        smoothed_readings = gaussian_filter1d(smoothed_readings, sigma=smoothFactor)

                        # axis_name = 'yaxis' + ('' if axis_count == 1 else str(axis_count))
                        # fig.add_trace(go.Scatter(
                        #     x=times,
                        #     y=smoothed_readings,
                        #     mode='lines+markers',
                        #     # name=f'Sensor {sensor}',
                        #     name=sensor_title,
                        #     yaxis='y' + ('' if axis_count == 1 else str(axis_count))
                        # ))

                        # axis_settings[axis_name] = {
                        #     'title': f'Sensor {sensor_title} Readings',
                        #     'overlaying': 'y',
                        #     'side': 'left' if axis_count % 2 != 0 else 'right',
                        #     'anchor': 'free',
                        #     'autoshift': True
                        # }
                        # axis_count += 1







                        axis_name = 'yaxis' + ('' if axis_count == 1 else str(axis_count))
                        side = 'left' if axis_count % 2 != 0 else 'right'
                        position = 0 if axis_count % 2 != 0 else 1  # Alternating positions for clarity

                        fig.add_trace(go.Scatter(
                            x=times,
                            y=smoothed_readings,
                            mode='lines+markers',
                            name=sensor_title,
                            yaxis='y' + ('' if axis_count == 1 else str(axis_count))
                        ))

                        if axis_count == 1:
                            axis_settings[axis_name] = {
                                'title': f'Sensor {sensor_title} Readings',
                                'side': side,
                                'position': position,
                                # 'anchor': 'free',
                                # 'autoshift': True
                            }
                        else:
                            axis_settings[axis_name] = {
                                'title': f'Sensor {sensor_title} Readings',
                                'overlaying': 'y',  # Overlay this axis on the first y-axis
                                'side': side,
                                'position': position,
                                'anchor': 'free',
                                'autoshift': True
                            }
                        axis_count += 1

                    else:
                        print(f"No valid data available after downsampling for sensor {sensor}")
                else:
                    print(f"No valid data available after removing outliers for sensor {sensor}")
            else:
                print(f"No valid readings available for sensor {sensor}")

    fig.update_layout(
        **axis_settings,
        title='Multi-Sensor Readings Over Time',
        xaxis=dict(title='Time'),
        margin=dict(l=40, r=40, b=40, t=40)
    )

    if not fig.data:
        return jsonify({'message': 'No data available for any sensor'})

    graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
    return Response(graph_html, mimetype='text/html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)






