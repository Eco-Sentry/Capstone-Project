import React, { Component } from 'react';
import { MapContainer, TileLayer, HeatLayer } from 'react-leaflet';

class heatmap extends Component {
  render() {
    // Example heatmap data
    const heatmapData = [
      [51.5, -0.09], // lat, lng
      [51.51, -0.1],
      [51.51, -0.12],
      // Add more data points as needed
    ];

    return (
      <MapContainer
        center={[51.505, -0.09]}
        zoom={13}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <HeatLayer
          points={heatmapData}
          longitudeExtractor={m => m[1]} // Extracting lng from each data point
          latitudeExtractor={m => m[0]}  // Extracting lat from each data point
          intensityExtractor={m => 1}    // Intensity of each point, you can modify this
        />
      </MapContainer>
    );
  }
}

export default heatmap;
