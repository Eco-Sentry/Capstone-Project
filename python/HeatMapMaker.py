
# import requests
# from flask import Flask, Response, request, jsonify
# from flask_cors import CORS
# import plotly.express as px
# import pandas as pd
# import json
# import geopandas as gpd
# from shapely.geometry import Point
# from concurrent.futures import ThreadPoolExecutor, as_completed

# app = Flask(__name__)
# CORS(app)

# # Load the GeoJSON file with suburb boundaries
# suburb_geojson_path = '/home/byron/Documents/GitHub/Capstone-Project/python/suburb-10-nsw.geojson'
# suburb_gdf = gpd.read_file(suburb_geojson_path)

# # Reproject to a projected CRS
# suburb_gdf = suburb_gdf.to_crs(epsg=3577)  # Example EPSG for Australia, you may need to adjust this

# def get_suburb_from_coordinates(lat, lon):
#     """Get the suburb name from latitude and longitude using GeoPandas."""
#     point = Point(lon, lat)
#     point_gdf = gpd.GeoDataFrame([{'geometry': point}], crs='EPSG:4326')
#     point_gdf = point_gdf.to_crs(epsg=3577)
#     point = point_gdf.iloc[0].geometry

#     for index, row in suburb_gdf.iterrows():
#         if row['geometry'].contains(point):
#             return row['nsw_loca_2']  # Adjusted to match the actual property name in your GeoJSON
#     return None

# def get_data_from_api(sensor_type, start_time, end_time, longitude, latitude, range_km):
#     """Fetch data from API based on sensor type and location."""
#     try:
#         response = requests.get("http://localhost:9069/api/readings", params={
#             "sensorType": sensor_type,
#             "startTime": start_time,
#             "endTime": end_time,
#             "longitude": longitude,
#             "latitude": latitude,
#             "range": range_km
#         })
#         if response.status_code == 200:
#             return response.json()
#         else:
#             print(f"Error fetching data: {response.status_code}, {response.text}")
#             return []
#     except Exception as e:
#         print(f"Exception during data fetch: {str(e)}")
#         return []

# def process_suburb_check(lat, lon, avg_reading):
#     suburb = get_suburb_from_coordinates(lat, lon)
#     print(f"Coordinates ({lat}, {lon}) map to suburb: {suburb}")
#     if suburb:
#         return suburb, avg_reading
#     else:
#         print(f"Suburb not found for coordinates: ({lat}, {lon})")
#         return None, None

# @app.route('/generate-heatmap', methods=['POST'])
# def generate_heatmap():
#     params = request.json
#     sensor_type = params.get('sensorType', 'default_sensor')  # Example sensor type, adjust as needed
#     start_time = params.get('startTime', '2024-01-01T00:00:00Z')
#     end_time = params.get('endTime', '2024-01-02T00:00:00Z')
#     range_km = params.get('range', 10)
#     range_meters = float(range_km) * 1000  # Convert range to meters for distance calculations

#     # Load your GeoJSON file
#     with open('/home/byron/Documents/GitHub/Capstone-Project/python/suburb-10-nsw.geojson') as f:
#         geojson = json.load(f)

#     # Get data from API
#     data = get_data_from_api(sensor_type, start_time, end_time, params['longitude'], params['latitude'], range_km)
#     print("Data fetched from API:", data)

#     if not data:
#         return jsonify({"error": "No data fetched from API"}), 400

#     # Aggregate data points at the same coordinates
#     coord_data = {}
#     for item in data:
#         lat = item.get('latitude')
#         lon = item.get('longitude')
#         reading = item.get('reading')
#         if lat is not None and lon is not None and reading is not None:
#             coord = (lat, lon)
#             if coord in coord_data:
#                 coord_data[coord].append(reading)
#             else:
#                 coord_data[coord] = [reading]

#     # Collapse data at the same coordinates by averaging readings
#     collapsed_data = [(lat, lon, sum(readings) / len(readings)) for (lat, lon), readings in coord_data.items()]
#     print("Collapsed data:", collapsed_data)

#     # Process the data to map to suburbs using multithreading
#     suburb_data = {}
#     with ThreadPoolExecutor() as executor:
#         futures = {executor.submit(process_suburb_check, lat, lon, avg_reading): (lat, lon) for lat, lon, avg_reading in collapsed_data}
#         for future in as_completed(futures):
#             suburb, avg_reading = future.result()
#             if suburb:
#                 if suburb in suburb_data:
#                     suburb_data[suburb].append(avg_reading)
#                 else:
#                     suburb_data[suburb] = [avg_reading]

#     # Aggregate data per suburb (e.g., averaging readings)
#     aggregated_data = {suburb: sum(readings) / len(readings) for suburb, readings in suburb_data.items()}
#     print("Aggregated data per suburb:", aggregated_data)

#     # Predict values for suburbs without data
#     def calculate_distance(point1, point2):
#         return point1.distance(point2)

#     suburb_gdf['centroid'] = suburb_gdf.geometry.centroid
#     suburbs_with_data = {suburb: value for suburb, value in aggregated_data.items()}

#     def process_prediction(suburb):
#         suburb_centroid = suburb_gdf[suburb_gdf['nsw_loca_2'] == suburb].iloc[0].centroid
#         distances = []
#         for other_suburb, value in suburbs_with_data.items():
#             other_centroid = suburb_gdf[suburb_gdf['nsw_loca_2'] == other_suburb].iloc[0].centroid
#             distance = calculate_distance(suburb_centroid, other_centroid)
#             if distance <= range_meters:
#                 distances.append((distance, value))
#         distances.sort(key=lambda x: x[0])
#         if len(distances) >= 2:
#             nearest_values = [value for _, value in distances[:2]]
#             predicted_value = sum(nearest_values) / len(nearest_values)
#             return suburb, predicted_value
#         return suburb, None

#     with ThreadPoolExecutor() as executor:
#         futures = {executor.submit(process_prediction, suburb): suburb for suburb in suburb_gdf['nsw_loca_2'] if suburb not in suburbs_with_data}
#         for future in as_completed(futures):
#             suburb, predicted_value = future.result()
#             if predicted_value is not None:
#                 aggregated_data[suburb] = predicted_value

#     print("Aggregated data with predictions:", aggregated_data)

#     # Filter suburbs to keep only those within the range
#     center_point = Point(params['longitude'], params['latitude'])
#     center_point_gdf = gpd.GeoDataFrame([{'geometry': center_point}], crs='EPSG:4326')
#     center_point_gdf = center_point_gdf.to_crs(epsg=3577)
#     center_point = center_point_gdf.iloc[0].geometry

#     filtered_suburbs = {suburb: value for suburb, value in aggregated_data.items()
#                         if suburb_gdf[suburb_gdf['nsw_loca_2'] == suburb].iloc[0].centroid.distance(center_point) <= range_meters}
#     print("Filtered suburbs within range:", filtered_suburbs)

#     # Create DataFrame
#     df = pd.DataFrame(list(filtered_suburbs.items()), columns=['Suburb', 'Reading'])
#     print("DataFrame for plotting:", df)

#     if df.empty:
#         return jsonify({"error": "No data to plot after filtering"}), 400

#     # Plot
#     fig = px.choropleth(
#         df,
#         geojson=geojson,
#         locations='Suburb',
#         featureidkey="properties.nsw_loca_2",  # Adjusted to match the actual property name in your GeoJSON
#         color='Reading',
#         color_continuous_scale="Viridis",
#         projection="mercator"
#     )
#     fig.update_geos(fitbounds="locations", visible=False)

#     # Convert to HTML using the correct method
#     graph_html = fig.to_html(full_html=False, include_plotlyjs='cdn')
#     return Response(graph_html, mimetype='text/html')

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)

















# from flask import Flask, Response, request, jsonify
# from flask_cors import CORS
# import plotly.express as px
# import pandas as pd
# import json
# import geopandas as gpd
# from shapely.geometry import Point
# from concurrent.futures import ThreadPoolExecutor, as_completed
# from celery_config import make_celery
# import requests
# import logging

# app = Flask(__name__)
# CORS(app)

# # Configure logging
# logging.basicConfig(level=logging.INFO)
# logger = logging.getLogger(__name__)

# # Celery configuration
# app.config.update(
#     CELERY_BROKER_URL='redis://localhost:6379/0',
#     CELERY_RESULT_BACKEND='redis://localhost:6379/0'
# )

# celery = make_celery(app)

# suburb_geojson_path = '/home/byron/Documents/GitHub/Capstone-Project/python/suburb-10-nsw.geojson'
# suburb_gdf = gpd.read_file(suburb_geojson_path)
# suburb_gdf = suburb_gdf.to_crs(epsg=3577)

# def get_suburb_from_coordinates(lat, lon):
#     point = Point(lon, lat)
#     point_gdf = gpd.GeoDataFrame([{'geometry': point}], crs='EPSG:4326')
#     point_gdf = point_gdf.to_crs(epsg=3577)
#     point = point_gdf.iloc[0].geometry

#     for index, row in suburb_gdf.iterrows():
#         if row['geometry'].contains(point):
#             return row['nsw_loca_2']
#     return None

# def get_data_from_api(sensor_type, start_time, end_time, longitude, latitude, range_km):
#     try:
#         response = requests.get("http://localhost:9069/api/readings", params={
#             "sensorType": sensor_type,
#             "startTime": start_time,
#             "endTime": end_time,
#             "longitude": longitude,
#             "latitude": latitude,
#             "range": range_km
#         })
#         if response.status_code == 200:
#             return response.json()
#         else:
#             logger.error(f"Error fetching data: {response.status_code}, {response.text}")
#             return []
#     except Exception as e:
#         logger.error(f"Exception during data fetch: {str(e)}")
#         return []

# def process_suburb_check(lat, lon, avg_reading):
#     suburb = get_suburb_from_coordinates(lat, lon)
#     logger.info(f"Coordinates ({lat}, {lon}) map to suburb: {suburb}")
#     if suburb:
#         return suburb, avg_reading
#     else:
#         logger.warning(f"Suburb not found for coordinates: ({lat}, {lon})")
#         return None, None



# @celery.task(name='HeatMapMake.generate_heatmap_task')
# def generate_heatmap_task(params):
#     logger.info(f"Received task with params: {params}")
#     sensor_type = params.get('sensorType', 'default_sensor')
#     start_time = params.get('startTime', '2024-01-01T00:00:00Z')
#     end_time = params.get('endTime', '2024-01-02T00:00:00Z')
#     range_km = params.get('range', 10)
#     range_meters = float(range_km) * 1000

#     with open('/home/byron/Documents/GitHub/Capstone-Project/python/suburb-10-nsw.geojson') as f:
#         geojson = json.load(f)

#     data = get_data_from_api(sensor_type, start_time, end_time, params['longitude'], params['latitude'], range_km)
#     logger.info(f"Data fetched from API: {data}")

#     if not data:
#         logger.error("No data fetched from API")
#         return {"error": "No data fetched from API"}

#     coord_data = {}
#     for item in data:
#         lat = item.get('latitude')
#         lon = item.get('longitude')
#         reading = item.get('reading')
#         if lat is not None and lon is not None and reading is not None:
#             coord = (lat, lon)
#             if coord in coord_data:
#                 coord_data[coord].append(reading)
#             else:
#                 coord_data[coord] = [reading]

#     collapsed_data = [(lat, lon, sum(readings) / len(readings)) for (lat, lon), readings in coord_data.items()]
#     logger.info(f"Collapsed data: {collapsed_data}")

#     suburb_data = {}
#     with ThreadPoolExecutor() as executor:
#         futures = {executor.submit(process_suburb_check, lat, lon, avg_reading): (lat, lon) for lat, lon, avg_reading in collapsed_data}
#         for future in as_completed(futures):
#             suburb, avg_reading = future.result()
#             if suburb:
#                 if suburb in suburb_data:
#                     suburb_data[suburb].append(avg_reading)
#                 else:
#                     suburb_data[suburb] = [avg_reading]

#     aggregated_data = {suburb: sum(readings) / len(readings) for suburb, readings in suburb_data.items()}
#     logger.info(f"Aggregated data per suburb: {aggregated_data}")

#     def calculate_distance(point1, point2):
#         return point1.distance(point2)

#     suburb_gdf['centroid'] = suburb_gdf.geometry.centroid
#     suburbs_with_data = {suburb: value for suburb, value in aggregated_data.items()}

#     def process_prediction(suburb):
#         suburb_centroid = suburb_gdf[suburb_gdf['nsw_loca_2'] == suburb].iloc[0].centroid
#         distances = []
#         for other_suburb, value in suburbs_with_data.items():
#             other_centroid = suburb_gdf[suburb_gdf['nsw_loca_2'] == other_suburb].iloc[0].centroid
#             distance = calculate_distance(suburb_centroid, other_centroid)
#             if distance <= range_meters:
#                 distances.append((distance, value))
#         distances.sort(key=lambda x: x[0])
#         if len(distances) >= 2:
#             nearest_values = [value for _, value in distances[:2]]
#             predicted_value = sum(nearest_values) / len(nearest_values)
#             return suburb, predicted_value
#         return suburb, None

#     with ThreadPoolExecutor() as executor:
#         futures = {executor.submit(process_prediction, suburb): suburb for suburb in suburb_gdf['nsw_loca_2'] if suburb not in suburbs_with_data}
#         for future in as_completed(futures):
#             suburb, predicted_value = future.result()
#             if predicted_value is not None:
#                 aggregated_data[suburb] = predicted_value

#     logger.info(f"Aggregated data with predictions: {aggregated_data}")

#     center_point = Point(params['longitude'], params['latitude'])
#     center_point_gdf = gpd.GeoDataFrame([{'geometry': center_point}], crs='EPSG:4326')
#     center_point_gdf = center_point_gdf.to_crs(epsg=3577)
#     center_point = center_point_gdf.iloc[0].geometry

#     filtered_suburbs = {suburb: value for suburb, value in aggregated_data.items()
#                         if suburb_gdf[suburb_gdf['nsw_loca_2'] == suburb].iloc[0].centroid.distance(center_point) <= range_meters}
#     logger.info(f"Filtered suburbs within range: {filtered_suburbs}")

#     df = pd.DataFrame(list(filtered_suburbs.items()), columns=['Suburb', 'Reading'])
#     logger.info(f"DataFrame for plotting: {df}")

#     if df.empty:
#         logger.error("No data to plot after filtering")
#         return {"error": "No data to plot after filtering"}

#     fig = px.choropleth(
#         df,
#         geojson=geojson,
#         locations='Suburb',
#         featureidkey="properties.nsw_loca_2",
#         color='Reading',
#         color_continuous_scale="Viridis",
#         projection="mercator"
#     )
#     fig.update_geos(fitbounds="locations", visible=False)

#     graph_html = fig.to_html(full_html=False, include_plotlyjs='cdn')
#     logger.info("Generated heatmap HTML")
#     return graph_html

# @app.route('/generate-heatmap', methods=['POST'])
# def generate_heatmap():
#     params = request.json
#     logger.info(f"Received request with params: {params}")
#     task = generate_heatmap_task.apply_async(args=[params])
#     return jsonify({"task_id": task.id}), 202

# @app.route('/task-status/<task_id>', methods=['GET'])
# def task_status(task_id):
#     task = generate_heatmap_task.AsyncResult(task_id)
#     if task.state == 'PENDING':
#         response = {
#             'state': task.state,
#             'status': 'Pending...'
#         }
#     elif task.state == 'SUCCESS':
#         response = {
#             'state': task.state,
#             'status': 'Task completed!',
#             'result': task.result
#         }
#     elif task.state != 'FAILURE':
#         response = {
#             'state': task.state,
#             'status': task.info.get('status', ''),
#             'result': task.info.get('result', '')
#         }
#         if 'result' in task.info:
#             response['result'] = task.info['result']
#     else:
#         response = {
#             'state': task.state,
#             'status': str(task.info),
#         }
#     return jsonify(response)

# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=5001, debug=True)





from flask import Flask, request, jsonify
from flask_cors import CORS
import plotly.express as px
import pandas as pd
import json
import geopandas as gpd
from shapely.geometry import Point
from concurrent.futures import ProcessPoolExecutor, as_completed
from celery_config import make_celery
import requests
import logging
import time
import math

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Celery configuration
app.config.update(
    CELERY_BROKER_URL='redis://localhost:6379/0',
    CELERY_RESULT_BACKEND='redis://localhost:6379/0'
)

celery = make_celery(app)

suburb_geojson_path = '/home/byron/Documents/GitHub/Capstone-Project/python/suburb-10-nsw.geojson'
suburb_gdf = gpd.read_file(suburb_geojson_path)
suburb_gdf = suburb_gdf.to_crs(epsg=3577)

# Ensure the GeoDataFrame has a spatial index
suburb_gdf.sindex

# Cache for distances between suburbs
distance_cache = {}

def get_suburb_from_coordinates(lat, lon):
    point = Point(lon, lat)
    point_gdf = gpd.GeoDataFrame([{'geometry': point}], crs='EPSG:4326')
    point_gdf = point_gdf.to_crs(epsg=3577)
    point = point_gdf.iloc[0].geometry

    possible_matches_index = list(suburb_gdf.sindex.intersection(point.bounds))
    possible_matches = suburb_gdf.iloc[possible_matches_index]
    precise_matches = possible_matches[possible_matches.intersects(point)]

    for index, row in precise_matches.iterrows():
        if row['geometry'].contains(point):
            return row['nsw_loca_2']
    return None

def get_data_from_api(sensor_type, start_time, end_time, longitude, latitude, range_km):
    try:
        response = requests.get("http://localhost:9069/api/readings", params={
            "sensorType": sensor_type,
            "startTime": start_time,
            "endTime": end_time,
            "longitude": longitude,
            "latitude": latitude,
            "range": range_km
        })
        if response.status_code == 200:
            return response.json()
        else:
            logger.error(f"Error fetching data: {response.status_code}, {response.text}")
            return []
    except Exception as e:
        logger.error(f"Exception during data fetch: {str(e)}")
        return []

def process_suburb_check_batch(batch):
    results = []
    for lat, lon, avg_reading in batch:
        suburb = get_suburb_from_coordinates(lat, lon)
        if suburb:
            results.append((suburb, avg_reading))
    return results

@celery.task(name='HeatMapMake.generate_heatmap_task')
def generate_heatmap_task(params):
    start_total_time = time.time()

    sensor_type = params.get('sensorType', 'default_sensor')
    start_time = params.get('startTime', '2024-01-01T00:00:00Z')
    end_time = params.get('endTime', '2024-01-02T00:00:00Z')
    range_km = params.get('range', 10)
    range_meters = float(range_km) * 1000

    with open('/home/byron/Documents/GitHub/Capstone-Project/python/suburb-10-nsw.geojson') as f:
        geojson = json.load(f)

    start_api_time = time.time()
    data = get_data_from_api(sensor_type, start_time, end_time, params['longitude'], params['latitude'], range_km)
    logger.info(f"API call took {time.time() - start_api_time:.2f} seconds")

    if not data:
        return {"error": "No data fetched from API"}

    start_processing_time = time.time()
    coord_data = {}
    for item in data:
        lat = item.get('latitude')
        lon = item.get('longitude')
        reading = item.get('reading')
        if lat is not None and lon is not None and reading is not None:
            coord = (lat, lon)
            if coord in coord_data:
                coord_data[coord].append(reading)
            else:
                coord_data[coord] = [reading]

    collapsed_data = [(lat, lon, sum(readings) / len(readings)) for (lat, lon), readings in coord_data.items()]
    logger.info(f"Data processing took {time.time() - start_processing_time:.2f} seconds")

    start_batching_time = time.time()
    # Batch the collapsed data
    batch_size = 20
    num_batches = math.ceil(len(collapsed_data) / batch_size)
    batches = [collapsed_data[i*batch_size:(i+1)*batch_size] for i in range(num_batches)]
    logger.info(f"Batching data took {time.time() - start_batching_time:.2f} seconds")

    start_suburb_check_time = time.time()
    suburb_data = {}
    with ProcessPoolExecutor() as executor:
        futures = {executor.submit(process_suburb_check_batch, batch): batch for batch in batches}
        for future in as_completed(futures):
            results = future.result()
            for suburb, avg_reading in results:
                if suburb in suburb_data:
                    suburb_data[suburb].append(avg_reading)
                else:
                    suburb_data[suburb] = [avg_reading]
    logger.info(f"Suburb check took {time.time() - start_suburb_check_time:.2f} seconds")

    start_aggregation_time = time.time()
    aggregated_data = {suburb: sum(readings) / len(readings) for suburb, readings in suburb_data.items()}
    logger.info(f"Aggregation took {time.time() - start_aggregation_time:.2f} seconds")

    start_prediction_time = time.time()
    suburb_gdf['centroid'] = suburb_gdf.geometry.centroid
    suburbs_with_data = {suburb: value for suburb, value in aggregated_data.items()}

    def calculate_distance(point1, point2):
        return point1.distance(point2)

    def process_prediction(suburb):
        suburb_centroid = suburb_gdf[suburb_gdf['nsw_loca_2'] == suburb].iloc[0].centroid
        distances = []
        for other_suburb, value in suburbs_with_data.items():
            other_centroid = suburb_gdf[suburb_gdf['nsw_loca_2'] == other_suburb].iloc[0].centroid
            
            # Check if distance is already cached
            if (suburb, other_suburb) in distance_cache:
                distance = distance_cache[(suburb, other_suburb)]
            elif (other_suburb, suburb) in distance_cache:
                distance = distance_cache[(other_suburb, suburb)]
            else:
                distance = calculate_distance(suburb_centroid, other_centroid)
                distance_cache[(suburb, other_suburb)] = distance

            if distance <= range_meters:
                distances.append((distance, value))
        distances.sort(key=lambda x: x[0])
        if len(distances) >= 2:
            nearest_values = [value for _, value in distances[:2]]
            predicted_value = sum(nearest_values) / len(nearest_values)
            return suburb, predicted_value
        return suburb, None

    with ProcessPoolExecutor() as executor:
        futures = {executor.submit(process_prediction, suburb): suburb for suburb in suburb_gdf['nsw_loca_2'] if suburb not in suburbs_with_data}
        for future in as_completed(futures):
            suburb, predicted_value = future.result()
            if predicted_value is not None:
                aggregated_data[suburb] = predicted_value
    logger.info(f"Prediction processing took {time.time() - start_prediction_time:.2f} seconds")

    start_filtering_time = time.time()
    center_point = Point(params['longitude'], params['latitude'])
    center_point_gdf = gpd.GeoDataFrame([{'geometry': center_point}], crs='EPSG:4326')
    center_point_gdf = center_point_gdf.to_crs(epsg=3577)
    center_point = center_point_gdf.iloc[0].geometry

    filtered_suburbs = {suburb: value for suburb, value in aggregated_data.items()
                        if suburb_gdf[suburb_gdf['nsw_loca_2'] == suburb].iloc[0].centroid.distance(center_point) <= range_meters}
    logger.info(f"Filtering data took {time.time() - start_filtering_time:.2f} seconds")

    start_plotting_time = time.time()
    df = pd.DataFrame(list(filtered_suburbs.items()), columns=['Suburb', 'Reading'])

    if df.empty:
        return {"error": "No data to plot after filtering"}

    fig = px.choropleth(
        df,
        geojson=geojson,
        locations='Suburb',
        featureidkey="properties.nsw_loca_2",
        color='Reading',
        color_continuous_scale="Viridis",
        projection="mercator"
    )
    fig.update_geos(fitbounds="locations", visible=False)
    logger.info(f"Plotting took {time.time() - start_plotting_time:.2f} seconds")

    logger.info(f"Total task time: {time.time() - start_total_time:.2f} seconds")

    return fig.to_html(full_html=False, include_plotlyjs='cdn')

@app.route('/generate-heatmap', methods=['POST'])
def generate_heatmap():
    params = request.json
    task = generate_heatmap_task.apply_async(args=[params])
    return jsonify({"task_id": task.id}), 202

@app.route('/task-status/<task_id>', methods=['GET'])
def task_status(task_id):
    task = generate_heatmap_task.AsyncResult(task_id)
    if task.state == 'PENDING':
        response = {
            'state': task.state,
            'status': 'Pending...'
        }
    elif task.state == 'SUCCESS':
        response = {
            'state': task.state,
            'status': 'Task completed!',
            'result': task.result
        }
    elif task.state != 'FAILURE':
        response = {
            'state': task.state,
            'status': task.info.get('status', ''),
            'result': task.info.get('result', '')
        }
        if 'result' in task.info:
            response['result'] = task.info['result']
    else:
        response = {
            'state': task.state,
            'status': str(task.info),
        }
    return jsonify(response)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
