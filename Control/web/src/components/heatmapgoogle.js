import React, { useEffect, useState, useCallback } from 'react';
import GoogleMapReact from 'google-map-react';
const Heatmap = ({ data }) => {
  const [googleLoaded, setGoogleLoaded] = useState(false);

  const loadGoogleScript = useCallback(() => {
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=visualization`;
    script.onload = () => setGoogleLoaded(true);
    script.onerror = () => console.error('Error loading Google Maps API');
    document.body.appendChild(script);
  }, []);

  useEffect(() => {
    if (!window.google) {
      loadGoogleScript();
    } else {
      setGoogleLoaded(true);
    }
  }, [loadGoogleScript]);

  useEffect(() => {
    if (googleLoaded) {
      // Initialize Google Map
      const map = new window.google.maps.Map(document.getElementById('map'), {
        center: { lat: -25.2744, lng: 133.7751 },
        zoom: 5,
      });      

      // Convert data to LatLng objects
      const heatmapData = data.map(point => new window.google.maps.LatLng(point.lat, point.lng));

      // Create heatmap layer
      const heatmap = new window.google.maps.visualization.HeatmapLayer({
        data: heatmapData,
        map: map,
      });

      return () => {
        // Clean up heatmap layer
        heatmap.setMap(null);
      };
    }
  }, [googleLoaded, data]);

  return <div id="map" style={{ width: '100%', height: '600px', border: '1px solid #ccc' }}></div>;
};

export default Heatmap;
