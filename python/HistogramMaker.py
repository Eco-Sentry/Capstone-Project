from datetime import datetime, timedelta
import numpy as np
import requests
from flask import Flask, Response, jsonify, request
from flask_cors import CORS, cross_origin
import plotly.graph_objs as go
from plotly.io import to_html

app = Flask(__name__)
CORS(app)

def get_sensor_type_title(sensor_type_id):
    try:
        response = requests.post("http://localhost:8082/api/get-sensor-type-title", json={"sensorTypeId": sensor_type_id})
        if response.status_code == 200:
            return response.text
        else:
            print(f"Failed to fetch sensor title for ID {sensor_type_id}: {response.status_code}, Details: {response.text}")
    except Exception as e:
        print(f"Error fetching sensor title: {str(e)}")
    return "Unknown Sensor"

@app.route('/generate-scatter-plot', methods=['POST'])
@cross_origin(origin='*', methods=['POST', 'OPTIONS'])  # Allow POST and OPTIONS for all origins
def generate_scatter_plot():
    params = request.json
    num_bins = params.get('numBins', 10)  # Default number of bins is 10 if not provided
    fig = go.Figure()

    # Fetch data for each sensor
    for sensor_id in ['sensorA', 'sensorB']:
        sensor_title = get_sensor_type_title(params[sensor_id])
        response = requests.get(f"http://localhost:9069/api/readings", params={
            "sensorType": params[sensor_id],
            "startTime": params['startTime'],
            "endTime": params['endTime'],
            "longitude": params['longitude'],
            "latitude": params['latitude'],
            "range": params['range']
        })

        if response.status_code == 200:
            data = response.json()
            if data:
                times, readings = zip(*[(datetime.fromisoformat(item['dateTime'].replace('Z', '')).replace(tzinfo=None), item['reading'])
                                        for item in data if item['reading'] is not None])

                if sensor_id == 'sensorA':
                    readings_a = readings
                else:
                    readings_b = readings

    # Assuming readings_a and readings_b are defined and have data
    if 'readings_a' in locals() and 'readings_b' in locals():
        fig.add_trace(go.Scatter(x=readings_a, y=readings_b, mode='markers',
                                 marker=dict(size=10, color='blue'),
                                 name='Sensor Correlation'))

        fig.update_layout(title='Scatter Plot Comparing Two Sensors',
                          xaxis_title='Sensor A Readings',
                          yaxis_title='Sensor B Readings')

        graph_html = to_html(fig, full_html=False, include_plotlyjs='cdn')
        return Response(graph_html, mimetype='text/html')
    else:
        return jsonify({'message': 'No data available for the sensors'})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5002, debug=True)
