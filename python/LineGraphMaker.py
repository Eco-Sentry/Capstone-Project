

# import requests
# import plotly.graph_objs as go
# from flask import Flask, Response, jsonify
# from datetime import datetime
# from scipy.interpolate import interp1d
# from scipy.ndimage import gaussian_filter1d
# from flask_cors import CORS

# from plotly.io import to_html

# app = Flask(__name__)

# import numpy as np

# def remove_outliers(data, times):
#     # Using IQR to filter out outlier values
#     quartile_1, quartile_3 = np.percentile(data, [25, 75])
#     iqr = quartile_3 - quartile_1
#     lower_bound = quartile_1 - (iqr * 1.5)
#     upper_bound = quartile_3 + (iqr * 1.5)
#     mask = (data > lower_bound) & (data < upper_bound)
#     return times[mask], data[mask]

# def downsample_data(times, data, max_points=1000):
#     # Uniformly downsample the data to max_points
#     step = len(data) // max_points + 1
#     return times[::step], data[::step]


# @app.route('/generate-interactive-graph', methods=['GET'])
# def generate_interactive_graph():
#     # HTTP request to the specified endpoint
#     response = requests.get(
#         "http://localhost:9069/api/readings",
#         params={
#             "sensorType": "04fa84d6-b9ef-425d-9793-befdbb75da9d",
#             "startTime": "2024-05-02T23:34:20.718Z",
#             "endTime": "2024-05-04T00:08:59.923Z",
#             "longitude": "150.89494",
#             "latitude": "-34.39212",
#             "range": "1000000"
#         }
#     )

#     data = response.json()
#     times = [datetime.fromisoformat(item['dateTime'].replace('Z', '')) for item in data]
#     readings = np.array([item['reading'] for item in data])

#     if len(readings) > 0:
#         # Sort data by time (ascending)
#         sorted_indices = np.argsort(times)
#         sorted_times = np.array(times)[sorted_indices]
#         sorted_readings = readings[sorted_indices]

#         # Remove outliers
#         filtered_times, filtered_readings = remove_outliers(sorted_readings, sorted_times)

#         # Downsample data if necessary
#         if len(filtered_readings) > 1000:
#             final_times, final_readings = downsample_data(filtered_times, filtered_readings)
#         else:
#             final_times, final_readings = filtered_times, filtered_readings

#         # Handle missing data by linear interpolation
#         time_seconds = np.array([(t - final_times[0]).total_seconds() for t in final_times])
#         interp_func = interp1d(time_seconds[~np.isnan(final_readings)], 
#                                final_readings[~np.isnan(final_readings)], 
#                                kind='linear', fill_value="extrapolate")
#         smoothed_readings = interp_func(time_seconds)

#         # Apply Gaussian smoothing
#         smoothed_readings = gaussian_filter1d(smoothed_readings, sigma=2)

#         # Create a Plotly graph
#         trace = go.Scatter(
#             x=final_times,
#             y=smoothed_readings,
#             mode='lines+markers',
#             marker=dict(color='blue'),
#             line=dict(shape='spline', smoothing=1.3),
#             hoverinfo='x+y'
#         )

#         layout = go.Layout(
#             title='Smoothed Sensor Readings Over Time',
#             xaxis=dict(title='Time'),
#             yaxis=dict(title='Reading', range=[min(smoothed_readings), max(smoothed_readings)]),
#             margin=dict(l=40, r=40, b=40, t=40)
#         )

#         # fig = go.Figure(data=[trace], layout=layout)
#         # html_string = fig.to_html(full_html=True)
#         # return Response(html_string, mimetype='text/html')
#         # Inside your Flask route
#         fig = go.Figure(data=[trace], layout=layout)
#         # Convert the figure to HTML representation
#         graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
#         return Response(graph_html, mimetype='text/html')
#     else:
#         return jsonify({'message': 'No data available'})

# if __name__ == '__main__':
#     CORS(app)
#     app.run(host='0.0.0.0', port=5000, debug=True)














































# import requests
# from datetime import datetime
# import numpy as np
# from flask import Flask, request, Response, jsonify
# from flask_cors import CORS
# import plotly.graph_objs as go
# from plotly.io import to_html

# app = Flask(__name__)
# CORS(app)

# def remove_outliers(data):
#     if len(data) > 1:  # Ensure there are enough data points to calculate percentiles
#         quartile_1, quartile_3 = np.percentile(data, [25, 75])
#         iqr = quartile_3 - quartile_1
#         lower_bound = quartile_1 - (iqr * 3)  # Adjusted from 1.5 to 3
#         upper_bound = quartile_3 + (iqr * 3)  # Adjusted from 1.5 to 3
#         mask = (data > lower_bound) & (data < upper_bound)
#         filtered_data = data[mask]

#         # Debugging the results of the filtering
#         print(f"Removed {len(data) - len(filtered_data)} outliers out of {len(data)} total readings")

#         if len(filtered_data) == 0:  # If all data are removed, consider adjusting or skipping this step
#             print("All data were removed as outliers, skipping outlier removal")
#             return data
#         return filtered_data
#     else:
#         return data  # Return data as is if too few for outlier analysis


# def downsample_data(data, max_points=1000):
#     step = len(data) // max_points + 1
#     downsampled_data = data[::step]
#     print(f"Downsampled from {len(data)} to {len(downsampled_data)} points")
#     return downsampled_data

# @app.route('/generate-multi-sensor-graph', methods=['POST'])
# def generate_multi_sensor_graph():
#     params = request.json
#     fig = go.Figure()
#     global_min, global_max = float('inf'), float('-inf')

#     for sensor in params['sensorTypes']:
#         response = requests.get(
#             "http://localhost:9069/api/readings",
#             params={
#                 "sensorType": sensor,
#                 "startTime": params['startTime'],
#                 "endTime": params['endTime'],
#                 "longitude": params['longitude'],
#                 "latitude": params['latitude'],
#                 "range": params['range']
#             }
#         )
        
#         print(f"Fetching data for sensor {sensor}, response status: {response.status_code}")
#         if response.status_code == 200:
#             data = response.json()
#             print(f"Received {len(data)} readings for sensor {sensor}")
#             if data:
#                 times = [datetime.fromisoformat(item['dateTime'].replace('Z', '')) for item in data]
#                 readings = np.array([item['reading'] for item in data])

#                 if readings.size > 0:
#                     sorted_indices = np.argsort(times)
#                     times = np.array(times)[sorted_indices]
#                     readings = readings[sorted_indices]

#                     readings = remove_outliers(readings)

#                     if len(readings) > 1000:
#                         readings = downsample_data(readings)

#                     local_min = readings.min() if readings.size > 0 else float('inf')
#                     local_max = readings.max() if readings.size > 0 else float('-inf')
#                     global_min = min(global_min, local_min)
#                     global_max = max(global_max, local_max)

#                     trace = go.Scatter(
#                         x=times,
#                         y=readings,
#                         mode='lines+markers',
#                         name=f'Sensor {sensor}'
#                     )
#                     fig.add_trace(trace)
#                 else:
#                     print(f"No readings available for sensor {sensor}")
#             else:
#                 print(f"No data returned for sensor {sensor}")
#         else:
#             print(f"Failed to fetch data for sensor {sensor}: Status {response.status_code}")

#     if not fig.data:
#         print("No data available for any sensor")
#         return jsonify({'message': 'No data available for any sensor'})

#     fig.update_layout(
#         title='Multi-Sensor Readings Over Time',
#         xaxis=dict(title='Time'),
#         yaxis=dict(title='Reading', range=[global_min, global_max]),
#         margin=dict(l=40, r=40, b=40, t=40)
#     )

#     graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
#     return Response(graph_html, mimetype='text/html')

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5000, debug=True)
































# import requests
# from datetime import datetime
# import numpy as np
# from flask import Flask, request, Response, jsonify
# from flask_cors import CORS
# import plotly.graph_objs as go
# from plotly.io import to_html

# app = Flask(__name__)
# CORS(app)

# def remove_outliers(data):
#     if len(data) > 1:
#         quartile_1, quartile_3 = np.percentile(data, [25, 75])
#         iqr = quartile_3 - quartile_1
#         lower_bound = quartile_1 - (iqr * 3)
#         upper_bound = quartile_3 + (iqr * 3)
#         mask = (data > lower_bound) & (data < upper_bound)
#         filtered_data = data[mask]
#         if len(filtered_data) == 0:
#             return data
#         return filtered_data
#     return data

# def downsample_data(data, max_points=1000):
#     step = len(data) // max_points + 1
#     return data[::step]
# @app.route('/generate-multi-sensor-graph', methods=['POST'])
# def generate_multi_sensor_graph():
#     params = request.json
#     fig = go.Figure()
#     axis_settings = {}

#     for i, sensor in enumerate(params['sensorTypes'], start=1):
#         response = requests.get(
#             "http://localhost:9069/api/readings",
#             params={
#                 "sensorType": sensor,
#                 "startTime": params['startTime'],
#                 "endTime": params['endTime'],
#                 "longitude": params['longitude'],
#                 "latitude": params['latitude'],
#                 "range": params['range']
#             }
#         )

#         if response.status_code == 200:
#             data = response.json()
#             if data:
#                 times = [datetime.fromisoformat(item['dateTime'].replace('Z', '')) for item in data]
#                 readings = np.array([item['reading'] for item in data])
#                 readings = remove_outliers(readings)
#                 if len(readings) > 1000:
#                     readings = downsample_data(readings)

#                 axis_name = 'yaxis' + ('' if i == 1 else str(i))
#                 fig.add_trace(go.Scatter(
#                     x=times,
#                     y=readings,
#                     mode='lines+markers',
#                     name=f'Sensor {sensor}',
#                     yaxis='y' + ('' if i == 1 else str(i))
#                 ))

#                 # Update axis settings only for additional axes
#                 if i > 1:
#                     axis_settings[axis_name] = {
#                         'title': f'Sensor {sensor} Readings',
#                         'side': 'left' if i % 2 == 0 else 'right',  # Alternating side for clarity
#                         'overlaying': 'y',  # Overlaying with the primary y-axis
#                         'showgrid': False
#                     }
#                 else:
#                     # Settings for the primary y-axis
#                     axis_settings[axis_name] = {
#                         'title': f'Sensor {sensor} Readings',
#                         'showgrid': True
#                     }

    
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












# import numpy as np
# import requests
# from flask import Flask, Response, jsonify, request
# from flask_cors import CORS
# import plotly.graph_objs as go
# from plotly.io import to_html
# from datetime import datetime
# from scipy.interpolate import interp1d
# from scipy.ndimage import gaussian_filter1d

# app = Flask(__name__)
# CORS(app)
# smoothFactor = 10
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

# @app.route('/generate-multi-sensor-graph', methods=['POST'])
# def generate_multi_sensor_graph():
#     params = request.json
#     fig = go.Figure()
#     axis_settings = {}
#     axis_count = 1

#     for sensor in params['sensorTypes']:
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
#                 times, readings = downsample_data(times, readings)

#                 time_indices = np.array([t.timestamp() for t in times])
#                 interp_func = interp1d(time_indices, readings, kind='linear', fill_value='extrapolate')
#                 smoothed_readings = interp_func(time_indices)
#                 smoothed_readings = gaussian_filter1d(smoothed_readings, sigma=smoothFactor)

#                 axis_name = 'yaxis' + ('' if axis_count == 1 else str(axis_count))
#                 fig.add_trace(go.Scatter(
#                     x=times,
#                     y=smoothed_readings,
#                     mode='lines+markers',
#                     name=f'Sensor {sensor}',
#                     yaxis='y' + ('' if axis_count == 1 else str(axis_count))
#                 ))

#                 axis_settings[axis_name] = {
#                     'title': f'Sensor {sensor} Readings',
#                     'side': 'left' if axis_count % 2 == 0 else 'right',
#                     'overlaying': 'y' if axis_count > 1 else 'free',
#                     'showgrid': False
#                 }
#                 axis_count += 1

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






















# import numpy as np
# import requests
# from flask import Flask, Response, jsonify, request
# from flask_cors import CORS
# import plotly.graph_objs as go
# from plotly.io import to_html
# from datetime import datetime
# from scipy.interpolate import interp1d
# from scipy.ndimage import gaussian_filter1d

# app = Flask(__name__)
# CORS(app)
# smoothFactor = 10
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

# @app.route('/generate-multi-sensor-graph', methods=['POST'])
# def generate_multi_sensor_graph():
#     params = request.json
#     fig = go.Figure()
#     axis_settings = {}
#     axis_count = 1

#     for sensor in params['sensorTypes']:
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
#                 times, readings = downsample_data(times, readings)

#                 time_indices = np.array([t.timestamp() for t in times])
#                 interp_func = interp1d(time_indices, readings, kind='linear', fill_value='extrapolate')
#                 smoothed_readings = interp_func(time_indices)
#                 smoothed_readings = gaussian_filter1d(smoothed_readings, sigma=smoothFactor)

#                 axis_name = 'yaxis' + ('' if axis_count == 1 else str(axis_count))
#                 fig.add_trace(go.Scatter(
#                     x=times,
#                     y=smoothed_readings,
#                     mode='lines+markers',
#                     name=f'Sensor {sensor}',
#                     yaxis='y' + ('' if axis_count == 1 else str(axis_count))
#                 ))

#                 axis_settings[axis_name] = {
#                     'title': f'Sensor {sensor} Readings',
#                     'side': 'left' if axis_count % 2 == 0 else 'right',
#                     'overlaying': 'y' if axis_count > 1 else 'free',
#                     'showgrid': False
#                 }
#                 axis_count += 1

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

app = Flask(__name__)
CORS(app)
smoothFactor = 10
def remove_outliers(times, data):
    times = np.array(times)
    quartile_1, quartile_3 = np.percentile(data, [25, 75])
    iqr = quartile_3 - quartile_1
    lower_bound = quartile_1 - (iqr * 1.5)
    upper_bound = quartile_3 + (iqr * 1.5)
    mask = (data > lower_bound) & (data < upper_bound)
    return times[mask], data[mask]


def downsample_data(times, data, max_points=1000):
    step = len(data) // max_points + 1
    return times[::step], data[::step]

@app.route('/generate-multi-sensor-graph', methods=['POST'])
def generate_multi_sensor_graph():
    params = request.json
    fig = go.Figure()
    axis_settings = {}
    axis_count = 1

    for sensor in params['sensorTypes']:
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

                        axis_name = 'yaxis' + ('' if axis_count == 1 else str(axis_count))
                        fig.add_trace(go.Scatter(
                            x=times,
                            y=smoothed_readings,
                            mode='lines+markers',
                            name=f'Sensor {sensor}',
                            yaxis='y' + ('' if axis_count == 1 else str(axis_count))
                        ))

                        axis_settings[axis_name] = {
                            'title': f'Sensor {sensor} Readings',
                            'side': 'left' if axis_count % 2 == 0 else 'right',
                            'overlaying': 'y' if axis_count > 1 else 'free',
                            'showgrid': False
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
