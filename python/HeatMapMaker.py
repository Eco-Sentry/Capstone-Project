
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
#         df = pd.DataFrame(data)
        
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

#     all_data.sort_values('dateTime', inplace=True)
#     time_intervals = pd.cut(all_data['dateTime'], bins=24)
#     all_data['time_interval'] = time_intervals
#     time_labels = [f"{intv.left.strftime('%Y-%m-%d %H:%M:%S')} to {intv.right.strftime('%Y-%m-%d %H:%M:%S')}" for intv in time_intervals.cat.categories]

#     # Group by time intervals and geographical bins, calculate mean
#     grouped = all_data.groupby(['time_interval', pd.cut(all_data['latitude'], 20), pd.cut(all_data['longitude'], 20)], observed=True)
#     avg_readings = grouped['reading'].mean().reset_index(name='avg_reading')
#     avg_lat = grouped['latitude'].mean().reset_index(name='avg_latitude')
#     avg_long = grouped['longitude'].mean().reset_index(name='avg_longitude')

#     # Merge average readings, latitude, and longitude
#     avg_data = avg_readings.merge(avg_lat).merge(avg_long)

#     # Calculate overall min and max readings for the color scale
#     overall_min = avg_data['avg_reading'].min()
#     overall_max = avg_data['avg_reading'].max()

#     fig = go.Figure()
#     for interval in sorted(avg_data['time_interval'].unique()):
#         interval_data = avg_data[avg_data['time_interval'] == interval]
#         if not interval_data.empty:
#             fig.add_trace(
#                 go.Densitymapbox(
#                     lat=interval_data['avg_latitude'],
#                     lon=interval_data['avg_longitude'],
#                     z=interval_data['avg_reading'],
#                     visible=False,  # Initially invisible; visible when corresponding slider is activated
#                     radius=20,  # Increase the radius for larger heatmap areas
#                     opacity=0.75,  # Set fixed opacity
#                     zmin=overall_min,  # Set min value for the color scale
#                     zmax=overall_max,   # Set max value for the color scale
#                     colorscale=[
#                         [0, "blue"],
#                         [0.2, "cyan"],
#                         [0.4, "green"],
#                         [0.6, "yellow"],
#                         [0.8, "orange"],
#                         [1, "red"]
#                     ]  # Wide range of colors
#                 )
#             )

#     fig.data[0].visible = True  # Set the first trace to visible by default

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
#         mapbox=dict(center=dict(lat=0, lon=0), zoom=1),
#         coloraxis_colorbar=dict(
#             title="Reading",
#             titleside="right",
#             tickmode="array",
#             ticks="outside",
#             ticksuffix=" ",
#             showticksuffix="all",
#             tickvals=np.linspace(overall_min, overall_max, num=10),
#         )
#     )

#     graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
#     return Response(graph_html, mimetype='text/html')


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)





























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
#         df = pd.DataFrame(data)
        
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

#     all_data.sort_values('dateTime', inplace=True)
#     time_intervals = pd.cut(all_data['dateTime'], bins=24)
#     all_data['time_interval'] = time_intervals
#     time_labels = [f"{intv.left.strftime('%Y-%m-%d %H:%M:%S')} to {intv.right.strftime('%Y-%m-%d %H:%M:%S')}" for intv in time_intervals.cat.categories]

#     # Group by time intervals and geographical bins, calculate mean
#     grouped = all_data.groupby(['time_interval', pd.cut(all_data['latitude'], 20), pd.cut(all_data['longitude'], 20)], observed=True)
#     avg_readings = grouped['reading'].mean().reset_index(name='avg_reading')
#     avg_lat = grouped['latitude'].mean().reset_index(name='avg_latitude')
#     avg_long = grouped['longitude'].mean().reset_index(name='avg_longitude')

#     # Merge average readings, latitude, and longitude
#     avg_data = avg_readings.merge(avg_lat).merge(avg_long)

#     # Calculate overall min and max readings for the color scale
#     overall_min = avg_data['avg_reading'].min()
#     overall_max = avg_data['avg_reading'].max()

#     fig = go.Figure()
#     for interval in sorted(avg_data['time_interval'].unique()):
#         interval_data = avg_data[avg_data['time_interval'] == interval]
#         if not interval_data.empty:
#             fig.add_trace(
#                 go.Densitymapbox(
#                     lat=interval_data['avg_latitude'],
#                     lon=interval_data['avg_longitude'],
#                     z=interval_data['avg_reading'],
#                     visible=False,  # Initially invisible; visible when corresponding slider is activated
#                     radius=100,  # Further increase the radius for larger and more spread-out heatmap areas
#                     opacity=0.75,  # Set fixed opacity
#                     zmin=overall_min,  # Set min value for the color scale
#                     zmax=overall_max,   # Set max value for the color scale
#                     colorscale=[
#                         [0, "blue"],
#                         [0.2, "cyan"],
#                         [0.4, "green"],
#                         [0.6, "yellow"],
#                         [0.8, "orange"],
#                         [1, "red"]
#                     ]  # Wide range of colors
#                 )
#             )

#     fig.data[0].visible = True  # Set the first trace to visible by default

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
#         mapbox=dict(center=dict(lat=0, lon=0), zoom=1),
#         coloraxis_colorbar=dict(
#             title="Reading",
#             titleside="right",
#             tickmode="array",
#             ticks="outside",
#             ticksuffix=" ",
#             showticksuffix="all",
#             tickvals=np.linspace(overall_min, overall_max, num=10),
#         )
#     )

#     graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
#     return Response(graph_html, mimetype='text/html')


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)








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
#         df = pd.DataFrame(data)
        
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

#     all_data.sort_values('dateTime', inplace=True)
#     time_intervals = pd.cut(all_data['dateTime'], bins=24)
#     all_data['time_interval'] = time_intervals
#     time_labels = [f"{intv.left.strftime('%Y-%m-%d %H:%M:%S')} to {intv.right.strftime('%Y-%m-%d %H:%M:%S')}" for intv in time_intervals.cat.categories]

#     # Group by time intervals and geographical bins, calculate mean
#     grouped = all_data.groupby(['time_interval', pd.cut(all_data['latitude'], 20), pd.cut(all_data['longitude'], 20)], observed=True)
#     avg_readings = grouped['reading'].mean().reset_index(name='avg_reading')
#     avg_lat = grouped['latitude'].mean().reset_index(name='avg_latitude')
#     avg_long = grouped['longitude'].mean().reset_index(name='avg_longitude')

#     # Merge average readings, latitude, and longitude
#     avg_data = avg_readings.merge(avg_lat).merge(avg_long)

#     # Calculate overall min and max readings for the color scale
#     overall_min = avg_data['avg_reading'].min()
#     overall_max = avg_data['avg_reading'].max()

#     fig = go.Figure()
#     for interval in sorted(avg_data['time_interval'].unique()):
#         interval_data = avg_data[avg_data['time_interval'] == interval]
#         if not interval_data.empty:
#             fig.add_trace(
#                 go.Densitymapbox(
#                     lat=interval_data['avg_latitude'],
#                     lon=interval_data['avg_longitude'],
#                     z=interval_data['avg_reading'],
#                     visible=False,  # Initially invisible; visible when corresponding slider is activated
#                     radius=100,  # Further increase the radius for larger and more spread-out heatmap areas
#                     opacity=0.75,  # Set fixed opacity
#                     zmin=overall_min,  # Set min value for the color scale
#                     zmax=overall_max,   # Set max value for the color scale
#                     colorscale=[
#                         [0, "blue"],
#                         [0.2, "cyan"],
#                         [0.4, "green"],
#                         [0.6, "yellow"],
#                         [0.8, "orange"],
#                         [1, "red"]
#                     ]  # Wide range of colors
#                 )
#             )

#     fig.data[0].visible = True  # Set the first trace to visible by default

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
#         mapbox=dict(center=dict(lat=0, lon=0), zoom=1),
#         coloraxis_colorbar=dict(
#             title="Reading",
#             titleside="right",
#             tickmode="array",
#             ticks="outside",
#             ticksuffix=" ",
#             showticksuffix="all",
#             tickvals=np.linspace(overall_min, overall_max, num=10),
#         )
#     )

#     graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
#     return Response(graph_html, mimetype='text/html')


# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)

















# from flask import Flask, Response, request, send_file
# import requests
# import pandas as pd
# import numpy as np
# import matplotlib
# matplotlib.use('Agg')  # Use Agg backend for non-GUI environments
# import matplotlib.pyplot as plt
# from matplotlib.colors import Normalize
# from scipy.interpolate import griddata
# import folium
# from folium import raster_layers
# from flask_cors import CORS
# from io import BytesIO
# import os
# import logging

# app = Flask(__name__)
# CORS(app)

# # Set up logging
# logging.basicConfig(level=logging.DEBUG)

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
#         df = pd.DataFrame(data)
        
#         def apply_datetime_format(dt_str):
#             if '.' in dt_str:
#                 return pd.to_datetime(dt_str, format='%Y-%m-%dT%H:%M:%S.%fZ', utc=True)
#             else:
#                 return pd.to_datetime(dt_str, format='%Y-%m-%dT%H:%M:%SZ', utc=True)

#         df['dateTime'] = df['dateTime'].apply(apply_datetime_format)
#         return df
#     else:
#         logging.error(f"Error fetching data for sensor {sensor}: {response.status_code}")
#         return pd.DataFrame()

# @app.route('/generate-heatmap', methods=['POST'])
# def generate_heatmap():
#     try:
#         params = request.json
#         logging.info("Received request with params: %s", params)
#         all_data = pd.DataFrame()

#         for sensor in params['sensorTypes']:
#             df = fetch_and_process_data(sensor, params)
#             all_data = pd.concat([all_data, df], ignore_index=True)

#         all_data.sort_values('dateTime', inplace=True)
#         time_intervals = pd.cut(all_data['dateTime'], bins=24)
#         all_data['time_interval'] = time_intervals
#         time_labels = [f"{intv.left.strftime('%Y-%m-%d %H:%M:%S')} to {intv.right.strftime('%Y-%m-%d %H:%M:%S')}" for intv in time_intervals.cat.categories]

#         # Create grid
#         lat_range = np.linspace(all_data['latitude'].min(), all_data['latitude'].max(), 200)
#         lon_range = np.linspace(all_data['longitude'].min(), all_data['longitude'].max(), 200)
#         lon_grid, lat_grid = np.meshgrid(lon_range, lat_range)

#         overall_min = all_data['reading'].min()
#         overall_max = all_data['reading'].max()

#         # Generate interpolated frames
#         frames = []
#         for interval in sorted(all_data['time_interval'].unique()):
#             interval_data = all_data[all_data['time_interval'] == interval]
#             if not interval_data.empty:
#                 grid_z = griddata(
#                     (interval_data['longitude'], interval_data['latitude']),
#                     interval_data['reading'],
#                     (lon_grid, lat_grid),
#                     method='cubic'
#                 )
#                 frames.append((grid_z, interval))

#         # Generate images and save them
#         image_files = []
#         for grid_z, interval in frames:
#             fig, ax = plt.subplots(figsize=(8, 6))
#             norm = Normalize(vmin=overall_min, vmax=overall_max)
#             cax = ax.imshow(grid_z, extent=(lon_range.min(), lon_range.max(), lat_range.min(), lat_range.max()),
#                             origin='lower', cmap='RdYlBu_r', norm=norm, alpha=0.5)  # Adjust alpha for transparency
#             plt.axis('off')  # Hide axes

#             # Save image to a temporary file
#             temp_file_path = f'heatmap_{interval}.png'
#             fig.savefig(temp_file_path, bbox_inches='tight', pad_inches=0, transparent=True)
#             plt.close(fig)
#             logging.info("Saved heatmap image: %s", temp_file_path)
#             image_files.append(temp_file_path)

#         # Create Folium map and add images as overlays
#         center = [all_data['latitude'].mean(), all_data['longitude'].mean()]
#         map_ = folium.Map(location=center, zoom_start=10)

#         for temp_file_path, interval in zip(image_files, time_labels):
#             img_overlay = raster_layers.ImageOverlay(
#                 name=f'Heatmap {interval}',
#                 image=temp_file_path,
#                 bounds=[[lat_range.min(), lon_range.min()], [lat_range.max(), lon_range.max()]],
#                 opacity=0.5,  # Adjust opacity for transparency
#                 interactive=True,
#                 cross_origin=False,
#                 zindex=1
#             )
#             img_overlay.add_to(map_)

#         folium.LayerControl().add_to(map_)
#         map_file_path = os.path.join(os.getcwd(), 'map_with_heatmap.html')
#         map_.save(map_file_path)
#         logging.info("Saved Folium map: %s", map_file_path)

#         # Clean up the temporary image files
#         for temp_file_path in image_files:
#             os.remove(temp_file_path)
#             logging.info("Removed temporary image file: %s", temp_file_path)

#         return send_file(map_file_path, mimetype='text/html')

#     except Exception as e:
#         logging.error("An error occurred: %s", e)
#         return Response(f"An error occurred: {e}", status=500)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)













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
#         df = pd.DataFrame(data)

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

#     all_data.sort_values('dateTime', inplace=True)
#     time_intervals = pd.cut(all_data['dateTime'], bins=24)
#     all_data['time_interval'] = time_intervals
#     time_labels = [f"{intv.left.strftime('%Y-%m-%d %H:%M:%S')} to {intv.right.strftime('%Y-%m-%d %H:%M:%S')}" for intv in time_intervals.cat.categories]

#     # Group by time intervals and geographical bins, calculate mean
#     grouped = all_data.groupby(['time_interval', pd.cut(all_data['latitude'], 20), pd.cut(all_data['longitude'], 20)], observed=True)
#     avg_readings = grouped['reading'].mean().reset_index(name='avg_reading')
#     avg_lat = grouped['latitude'].mean().reset_index(name='avg_latitude')
#     avg_long = grouped['longitude'].mean().reset_index(name='avg_longitude')

#     # Merge average readings, latitude, and longitude
#     avg_data = avg_readings.merge(avg_lat).merge(avg_long)

#     # Calculate overall min and max readings for the color scale
#     overall_min = avg_data['avg_reading'].min()
#     overall_max = avg_data['avg_reading'].max()

#     # Ensure the radius is treated as a numeric value
#     radius = float(params['range'])
#     latitude = float(params['latitude'])
#     longitude = float(params['longitude'])

#     fig = go.Figure()
#     for interval in sorted(avg_data['time_interval'].unique()):
#         interval_data = avg_data[avg_data['time_interval'] == interval]
#         if not interval_data.empty:
#             fig.add_trace(
#                 go.Scattermapbox(
#                     lat=interval_data['avg_latitude'],
#                     lon=interval_data['avg_longitude'],
#                     mode='markers',
#                     marker=go.scattermapbox.Marker(
#                         size=interval_data['avg_reading'],  # Use reading values to determine marker size
#                         color=interval_data['avg_reading'],
#                         colorscale=[
#                             [0, "blue"],
#                             [0.2, "cyan"],
#                             [0.4, "green"],
#                             [0.6, "yellow"],
#                             [0.8, "orange"],
#                             [1, "red"]
#                         ],  # Wide range of colors
#                         cmin=overall_min,
#                         cmax=overall_max,
#                         sizemin=5,  # Minimum size for visibility
#                         sizemode='area',
#                         opacity=0.75
#                     ),
#                     visible=False  # Initially invisible; visible when corresponding slider is activated
#                 )
#             )

#     fig.data[0].visible = True  # Set the first trace to visible by default

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
#         mapbox=dict(center=dict(lat=latitude, lon=longitude), zoom=10),
#         coloraxis_colorbar=dict(
#             title="Reading",
#             titleside="right",
#             tickmode="array",
#             ticks="outside",
#             ticksuffix=" ",
#             showticksuffix="all",
#             tickvals=np.linspace(overall_min, overall_max, num=10),
#         )
#     )

#     graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
#     return Response(graph_html, mimetype='text/html')

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)



















# from flask import Flask, Response, request
# import requests
# import pandas as pd
# import numpy as np
# import plotly.graph_objs as go
# from plotly.io import to_html
# from flask_cors import CORS
# from datetime import datetime
# from scipy.interpolate import griddata

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
#         df = pd.DataFrame(data)

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

#     all_data.sort_values('dateTime', inplace=True)
#     time_intervals = pd.cut(all_data['dateTime'], bins=24)
#     all_data['time_interval'] = time_intervals
#     time_labels = [f"{intv.left.strftime('%Y-%m-%d %H:%M:%S')} to {intv.right.strftime('%Y-%m-%d %H:%M:%S')}" for intv in time_intervals.cat.categories]

#     latitude = float(params['latitude'])
#     longitude = float(params['longitude'])
#     range_km = float(params['range'])  # Assume range is given in kilometers

#     # Convert range in kilometers to degrees (approximation, 1 degree ~ 111 km)
#     range_deg = range_km / 111.0

#     lat_min = latitude - range_deg
#     lat_max = latitude + range_deg
#     lon_min = longitude - range_deg
#     lon_max = longitude + range_deg

#     # Generate a grid of points within the specified range
#     num_points = 30  # Increase number of points in the grid for higher resolution
#     grid_lat, grid_lon = np.mgrid[lat_min:lat_max:num_points*1j, lon_min:lon_max:num_points*1j]

#     fig = go.Figure()

#     for interval in sorted(all_data['time_interval'].unique()):
#         interval_data = all_data[all_data['time_interval'] == interval]

#         if not interval_data.empty:
#             points = interval_data[['latitude', 'longitude']].values
#             values = interval_data['reading'].values

#             # Check if points and values are correct
#             print(f"Interval: {interval}")
#             print(f"Points: {points}")
#             print(f"Values: {values}")

#             # Interpolate the readings to the grid points
#             grid_z = griddata(points, values, (grid_lat, grid_lon), method='nearest')  # Use nearest interpolation

#             # Check if grid_z has been populated correctly
#             print(f"Grid Z: {grid_z}")

#             fig.add_trace(
#                 go.Densitymapbox(
#                     lat=grid_lat.flatten(),
#                     lon=grid_lon.flatten(),
#                     z=grid_z.flatten(),
#                     radius=20,  # Adjust radius for appropriate smoothing
#                     colorscale=[
#                         [0, "blue"],
#                         [0.2, "cyan"],
#                         [0.4, "green"],
#                         [0.6, "yellow"],
#                         [0.8, "orange"],
#                         [1, "red"]
#                     ],
#                     zmin=all_data['reading'].min(),
#                     zmax=all_data['reading'].max(),
#                     visible=False  # Initially invisible; visible when corresponding slider is activated
#                 )
#             )

#     fig.data[0].visible = True  # Set the first trace to visible by default

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
#         mapbox=dict(center=dict(lat=latitude, lon=longitude), zoom=10),
#         margin={"r":0,"t":0,"l":0,"b":0}
#     )

#     graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
#     return Response(graph_html, mimetype='text/html')

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)












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
#         df = pd.DataFrame(data)

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

#     all_data.sort_values('dateTime', inplace=True)
#     time_intervals = pd.cut(all_data['dateTime'], bins=24)
#     all_data['time_interval'] = time_intervals
#     time_labels = [f"{intv.left.strftime('%Y-%m-%d %H:%M:%S')} to {intv.right.strftime('%Y-%m-%d %H:%M:%S')}" for intv in time_intervals.cat.categories]

#     # Group by time intervals and geographical bins, calculate mean
#     grouped = all_data.groupby(['time_interval', pd.cut(all_data['latitude'], 20), pd.cut(all_data['longitude'], 20)], observed=True)
#     avg_readings = grouped['reading'].mean().reset_index(name='avg_reading')
#     avg_lat = grouped['latitude'].mean().reset_index(name='avg_latitude')
#     avg_long = grouped['longitude'].mean().reset_index(name='avg_longitude')

#     # Merge average readings, latitude, and longitude
#     avg_data = avg_readings.merge(avg_lat).merge(avg_long)

#     # Calculate overall min and max readings for the color scale
#     overall_min = avg_data['avg_reading'].min()
#     overall_max = avg_data['avg_reading'].max()

#     # Ensure the radius is treated as a numeric value
#     radius = float(params['range'])
#     latitude = float(params['latitude'])
#     longitude = float(params['longitude'])

#     fig = go.Figure()
#     for interval in sorted(avg_data['time_interval'].unique()):
#         interval_data = avg_data[avg_data['time_interval'] == interval]
#         if not interval_data.empty:
#             fig.add_trace(
#                 go.Scattermapbox(
#                     lat=interval_data['avg_latitude'],
#                     lon=interval_data['avg_longitude'],
#                     mode='markers',
#                     marker=go.scattermapbox.Marker(
#                         size=interval_data['avg_reading'],  # Use reading values to determine marker size
#                         color=interval_data['avg_reading'],
#                         colorscale=[
#                             [0, "blue"],
#                             [0.2, "cyan"],
#                             [0.4, "green"],
#                             [0.6, "yellow"],
#                             [0.8, "orange"],
#                             [1, "red"]
#                         ],  # Wide range of colors
#                         cmin=overall_min,
#                         cmax=overall_max,
#                         sizemin=5,  # Minimum size for visibility
#                         sizemode='area',
#                         opacity=0.75
#                     ),
#                     visible=False  # Initially invisible; visible when corresponding slider is activated
#                 )
#             )

#     fig.data[0].visible = True  # Set the first trace to visible by default

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
#         mapbox=dict(center=dict(lat=latitude, lon=longitude), zoom=10),
#         coloraxis_colorbar=dict(
#             title="Reading",
#             titleside="right",
#             tickmode="array",
#             ticks="outside",
#             ticksuffix=" ",
#             showticksuffix="all",
#             tickvals=np.linspace(overall_min, overall_max, num=10),
#         )
#     )

#     graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
#     return Response(graph_html, mimetype='text/html')

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)



























# from flask import Flask, Response, request
# import requests
# import pandas as pd
# import numpy as np
# import plotly.graph_objs as go
# from plotly.io import to_html
# from flask_cors import CORS
# from datetime import datetime
# from scipy.interpolate import griddata

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
#         df = pd.DataFrame(data)

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

#     all_data.sort_values('dateTime', inplace=True)
#     time_intervals = pd.cut(all_data['dateTime'], bins=24)
#     all_data['time_interval'] = time_intervals
#     time_labels = [f"{intv.left.strftime('%Y-%m-%d %H:%M:%S')} to {intv.right.strftime('%Y-%m-%d %H:%M:%S')}" for intv in time_intervals.cat.categories]

#     # Define the grid for interpolation
#     lat_min, lat_max = all_data['latitude'].min(), all_data['latitude'].max()
#     lon_min, lon_max = all_data['longitude'].min(), all_data['longitude'].max()
#     lat_grid, lon_grid = np.mgrid[lat_min:lat_max:100j, lon_min:lon_max:100j]

#     fig = go.Figure()
#     for interval in sorted(all_data['time_interval'].unique()):
#         interval_data = all_data[all_data['time_interval'] == interval]
#         if not interval_data.empty:
#             # Perform linear interpolation
#             grid_z = griddata(
#                 (interval_data['latitude'], interval_data['longitude']),
#                 interval_data['reading'],
#                 (lat_grid, lon_grid),
#                 method='linear'
#             )

#             # Remove points where interpolation is not possible
#             mask = ~np.isnan(grid_z)
#             lat_flat = lat_grid[mask]
#             lon_flat = lon_grid[mask]
#             reading_flat = grid_z[mask]

#             fig.add_trace(
#                 go.Scattermapbox(
#                     lat=lat_flat,
#                     lon=lon_flat,
#                     mode='markers',
#                     marker=go.scattermapbox.Marker(
#                         size=10,
#                         color=reading_flat,
#                         colorscale=[
#                             [0, "blue"],
#                             [0.2, "cyan"],
#                             [0.4, "green"],
#                             [0.6, "yellow"],
#                             [0.8, "orange"],
#                             [1, "red"]
#                         ],
#                         cmin=reading_flat.min(),
#                         cmax=reading_flat.max(),
#                         opacity=0.75
#                     ),
#                     visible=False  # Initially invisible; visible when corresponding slider is activated
#                 )
#             )

#     fig.data[0].visible = True  # Set the first trace to visible by default

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

#     # Convert latitude and longitude to float
#     latitude = float(params['latitude'])
#     longitude = float(params['longitude'])

#     fig.update_layout(
#         sliders=sliders,
#         mapbox_style="open-street-map",
#         mapbox=dict(center=dict(lat=latitude, lon=longitude), zoom=10),
#         coloraxis_colorbar=dict(
#             title="Reading",
#             titleside="right",
#             tickmode="array",
#             ticks="outside",
#             ticksuffix=" ",
#             showticksuffix="all",
#             tickvals=np.linspace(reading_flat.min(), reading_flat.max(), num=10),
#         )
#     )

#     graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
#     return Response(graph_html, mimetype='text/html')

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
from scipy.interpolate import griddata

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
    time_intervals = pd.cut(all_data['dateTime'], bins=24)
    all_data['time_interval'] = time_intervals
    time_labels = [f"{intv.left.strftime('%Y-%m-%d %H:%M:%S')} to {intv.right.strftime('%Y-%m-%d %H:%M:%S')}" for intv in time_intervals.cat.categories]

    # Define the grid for interpolation
    lat_min, lat_max = all_data['latitude'].min(), all_data['latitude'].max()
    lon_min, lon_max = all_data['longitude'].min(), all_data['longitude'].max()
    lat_grid, lon_grid = np.mgrid[lat_min:lat_max:100j, lon_min:lon_max:100j]

    # Calculate overall min and max readings for the color scale
    overall_min = all_data['reading'].min()
    overall_max = all_data['reading'].max()

    frames = []
    for interval in sorted(all_data['time_interval'].unique()):
        interval_data = all_data[all_data['time_interval'] == interval]
        if not interval_data.empty:
            # Perform nearest neighbor interpolation
            grid_z = griddata(
                (interval_data['latitude'], interval_data['longitude']),
                interval_data['reading'],
                (lat_grid, lon_grid),
                method='nearest'
            )

            frame = go.Frame(
                data=[
                    go.Heatmap(
                        z=grid_z,
                        x=np.linspace(lon_min, lon_max, 100),
                        y=np.linspace(lat_min, lat_max, 100),
                        colorscale=[
                            [0, "blue"],
                            [0.2, "cyan"],
                            [0.4, "green"],
                            [0.6, "yellow"],
                            [0.8, "orange"],
                            [1, "red"]
                        ],
                        zmin=overall_min,
                        zmax=overall_max,
                        opacity=0.75,
                        showscale=False
                    ),
                    go.Scattermapbox(
                        lat=interval_data['latitude'],
                        lon=interval_data['longitude'],
                        mode='markers',
                        marker=go.scattermapbox.Marker(
                            size=1,
                            color='rgba(255, 255, 255, 0)',
                        ),
                        hoverinfo='none'
                    )
                ],
                name=f"frame{interval}"
            )
            frames.append(frame)

    # Create the initial figure with the first interval's data
    initial_data = frames[0]['data']

    fig = go.Figure(
        data=initial_data,
        layout=go.Layout(
            sliders=[{
                'active': 0,
                'currentvalue': {"prefix": "Time Interval: "},
                'steps': [{
                    'method': "animate",
                    'args': [[f'frame{idx}'], {"mode": "immediate", "frame": {"duration": 500, "redraw": True}, "transition": {"duration": 0}}],
                    'label': time_labels[idx]
                } for idx in range(len(time_labels))]
            }],
            mapbox=dict(
                style="open-street-map",
                center=dict(lat=float(params['latitude']), lon=float(params['longitude'])),
                zoom=10,
            ),
            updatemenus=[{
                'buttons': [
                    {'label': 'Play', 'method': 'animate', 'args': [None, {"frame": {"duration": 500, "redraw": True}, "fromcurrent": True, "transition": {"duration": 0}}]},
                    {'label': 'Pause', 'method': 'animate', 'args': [[None], {"frame": {"duration": 0, "redraw": False}, "mode": "immediate", "transition": {"duration": 0}}]}
                ],
                'direction': 'left',
                'pad': {'r': 10, 't': 87},
                'showactive': False,
                'type': 'buttons',
                'x': 0.1,
                'xanchor': 'right',
                'y': 0,
                'yanchor': 'top'
            }],
            coloraxis=dict(
                colorscale='Viridis',
                cmin=overall_min,
                cmax=overall_max,
                colorbar=dict(
                    title="Reading",
                    titleside="right",
                    tickmode="array",
                    ticks="outside",
                    ticksuffix=" ",
                    showticksuffix="all",
                    tickvals=np.linspace(overall_min, overall_max, num=10),
                )
            ),
        ),
        frames=frames
    )

    # Add initial data
    fig.add_traces(initial_data)

    fig.update_layout(
        mapbox_layers=[{
            'source': {
                'type': 'raster',
                'tiles': ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
                'tileSize': 256
            },
            'below': 'traces'
        }]
    )

    graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
    return Response(graph_html, mimetype='text/html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)

