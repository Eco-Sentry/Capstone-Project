
# from flask import Flask, Response, request
# import requests
# import pandas as pd
# import numpy as np
# import plotly.graph_objs as go
# from plotly.io import to_html
# from flask_cors import CORS
# from datetime import datetime

# app = Flask(__name__)
# CORS(app)

# def fetch_and_process_data(sensor, params):
#     """Fetch sensor data and return as DataFrame."""
#     response = requests.get("http://localhost:9069/api/readings", params={
#         "sensorType": sensor,
#         "startTime": params['startTime'],
#         "endTime": params['endTime'],
#         "longitude": params['longitude'],
#         "latitude": params['latitude'],
#         "range": params['range']
#     })
#     if response.status_code == 200:
#         data = response.json()
#         print(data)
#         df = pd.DataFrame(data)
        
#         # Conditionally apply the datetime format based on the presence of milliseconds
#         def apply_datetime_format(dt_str):
#             if '.' in dt_str:
#                 return pd.to_datetime(dt_str, format='%Y-%m-%dT%H:%M:%S.%fZ', utc=True)
#             else:
#                 return pd.to_datetime(dt_str, format='%Y-%m-%dT%H:%M:%SZ', utc=True)

#         df['dateTime'] = df['dateTime'].apply(apply_datetime_format)
#         return df
#     else:
#         print(f"Error fetching data for sensor {sensor}: {response.status_code}")
#         return pd.DataFrame()

# @app.route('/generate-heatmap', methods=['POST'])
# def generate_heatmap():
#     params = request.json
#     all_data = pd.DataFrame()

#     for sensor in params['sensorTypes']:
#         df = fetch_and_process_data(sensor, params)
#         all_data = pd.concat([all_data, df], ignore_index=True)

#     # Sort data by dateTime to ensure correct interval representation
#     all_data.sort_values('dateTime', inplace=True)
    
#     # Creating time intervals for slider
#     time_intervals = pd.cut(all_data['dateTime'], bins=100)
#     all_data['time_interval'] = time_intervals
#     time_labels = [f"{intv.left.strftime('%Y-%m-%d %H:%M:%S')} to {intv.right.strftime('%Y-%m-%d %H:%M:%S')}" for intv in time_intervals.cat.categories]

#     fig = go.Figure()
#     for interval in sorted(all_data['time_interval'].unique()):
#         interval_data = all_data[all_data['time_interval'] == interval]
#         if not interval_data.empty:
#             fig.add_trace(
#                 go.Densitymapbox(
#                     lat=interval_data['latitude'],
#                     lon=interval_data['longitude'],
#                     z=interval_data['reading'],
#                     visible=False,  # Initially invisible; visible when corresponding slider is activated
#                     opacity=0.75  # Adjusting the opacity to 75%
#                 )
#             )

#     fig.data[0].visible = True  # Set the first trace to visible by default

#     # Configure sliders with formatted datetime labels
#     sliders = [{
#         'active': 0,
#         'currentvalue': {"prefix": "Time Interval: "},
#         'steps': [{
#             'method': "update",
#             'args': [{"visible": [i == idx for i in range(len(fig.data))]},
#                      {"title": f"Time Interval: {time_labels[idx]}"}],
#             'label': time_labels[idx]
#         } for idx in range(len(time_labels))]
#     }]

#     fig.update_layout(
#         sliders=sliders,
#         mapbox_style="open-street-map",
#         mapbox=dict(center=dict(lat=0, lon=0), zoom=1)
#     )

#     return Response(to_html(fig, full_html=False, include_plotlyjs='cdn'), mimetype='text/html')

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)
from flask import Flask, Response, request
import requests
import pandas as pd
import numpy as np
import plotly.graph_objs as go
from plotly.io import to_html
from flask_cors import CORS
from datetime import datetime

app = Flask(__name__)
CORS(app)

def fetch_and_process_data(sensor, params):
    """Fetch sensor data and return as DataFrame."""
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
        df = pd.DataFrame(data)
        
        def apply_datetime_format(dt_str):
            if '.' in dt_str:
                return pd.to_datetime(dt_str, format='%Y-%m-%dT%H:%M:%S.%fZ', utc=True)
            else:
                return pd.to_datetime(dt_str, format='%Y-%m-%dT%H:%M:%SZ', utc=True)

        df['dateTime'] = df['dateTime'].apply(apply_datetime_format)
        return df
    else:
        print(f"Error fetching data for sensor {sensor}: {response.status_code}")
        return pd.DataFrame()

@app.route('/generate-heatmap', methods=['POST'])
def generate_heatmap():
    params = request.json
    all_data = pd.DataFrame()

    for sensor in params['sensorTypes']:
        df = fetch_and_process_data(sensor, params)
        all_data = pd.concat([all_data, df], ignore_index=True)

    all_data.sort_values('dateTime', inplace=True)
    time_intervals = pd.cut(all_data['dateTime'], bins=100)
    all_data['time_interval'] = time_intervals
    time_labels = [f"{intv.left.strftime('%Y-%m-%d %H:%M:%S')} to {intv.right.strftime('%Y-%m-%d %H:%M:%S')}" for intv in time_intervals.cat.categories]

    # Group by time intervals and geographical bins, calculate mean
    grouped = all_data.groupby(['time_interval', pd.cut(all_data['latitude'], 10), pd.cut(all_data['longitude'], 10)], observed=True)
    avg_readings = grouped['reading'].mean().reset_index(name='avg_reading')
    avg_lat = grouped['latitude'].mean().reset_index(name='avg_latitude')
    avg_long = grouped['longitude'].mean().reset_index(name='avg_longitude')

    # Merge average readings, latitude, and longitude
    avg_data = avg_readings.merge(avg_lat).merge(avg_long)

    fig = go.Figure()
    for interval in sorted(avg_data['time_interval'].unique()):
        interval_data = avg_data[avg_data['time_interval'] == interval]
        if not interval_data.empty:
            fig.add_trace(
                go.Densitymapbox(
                    lat=interval_data['avg_latitude'],
                    lon=interval_data['avg_longitude'],
                    z=interval_data['avg_reading'],
                    visible=False,  # Initially invisible; visible when corresponding slider is activated
                    opacity=0.75  # Adjusting the opacity to 75%
                )
            )

    fig.data[0].visible = True  # Set the first trace to visible by default

    sliders = [{
        'active': 0,
        'currentvalue': {"prefix": "Time Interval: "},
        'steps': [{
            'method': "update",
            'args': [{"visible": [i == idx for i in range(len(fig.data))]},
                     {"title": f"Time Interval: {time_labels[idx]}"}],
            'label': time_labels[idx]
        } for idx in range(len(time_labels))]
    }]

    fig.update_layout(
        sliders=sliders,
        mapbox_style="open-street-map",
        mapbox=dict(center=dict(lat=0, lon=0), zoom=1)
    )

    return Response(to_html(fig, full_html=False, include_plotlyjs='cdn'), mimetype='text/html')


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
