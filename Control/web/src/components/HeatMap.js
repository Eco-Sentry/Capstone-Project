
import React, { useRef, useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet.heat/dist/leaflet-heat.js';

const HeatMapComponent = ({ data }) => {
    const mapRef = useRef(null);
    const heatLayerRef = useRef(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        // Initialize map
        mapRef.current = L.map('map').setView([-25.344, 131.036], 4.5);

        // Add OpenStreetMap tile layer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mapRef.current);

        // Create heatmap layer with custom color and opacity
        heatLayerRef.current = L.heatLayer(data, { 
            radius: 50,
            gradient: { 0: 'Red', 0.5: 'Yellow', 1: 'Red' },
            maxOpacity: 0.8 // Maximum opacity
        }).addTo(mapRef.current);
        
        return () => {
            // Clean up leaflet map
            mapRef.current.remove();
        };
    }, [data]);

    const handleSearch = () => {
        // Use a geocoding service to convert the searchQuery into coordinates
        // For example, you can use the OpenStreetMap Nominatim API
        // Replace 'your_geocoding_service_endpoint' with the actual API endpoint
        fetch(`https://nominatim.openstreetmap.org/search?q=${searchQuery}&format=json`)
            .then(response => response.json())
            .then(data => {
                if (data && data.length > 0) {
                    const { lat, lon } = data[0];
                    mapRef.current.setView([lat, lon], 10); // Update map view to display the searched location
                } else {
                    alert('Location not found');
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                alert('Error fetching location data');
            });
    };

    return (
        <div>
            <div id="map" style={{ width: '100%', height: '600px' }} />
            <div>
                <input
                    type="text"
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Enter address or coordinates"
                />
                <button onClick={handleSearch}>Search</button>
            </div>
        </div>
    );
};

export default HeatMapComponent;
