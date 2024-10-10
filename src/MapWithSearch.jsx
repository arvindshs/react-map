// src/MapWithSearch.js
import React, { useState, useRef, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';
import 'leaflet-geosearch/dist/geosearch.css';

const MapWithSearch = () => {
    const [position, setPosition] = useState([51.505, -0.09]); // Default position: London
    const [searchValue, setSearchValue] = useState(''); // Input value

    // Create an instance of OpenStreetMapProvider for geocoding
    const provider = new OpenStreetMapProvider();

    // Function to handle searching and setting the new position
    const handleSearch = async (e) => {
        e.preventDefault();
        // Use the provider to search for the location
        const results = await provider.search({ query: searchValue });
        if (results && results.length > 0) {
            const { x, y } = results[0]; // Get the longitude (x) and latitude (y)
            setPosition([y, x]); // Set the new position to center the map
        } else {
            alert('Location not found');
        }
    };

    return (
        <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>
            {/* Search Bar */}
            <form
                onSubmit={handleSearch}
                style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}
            >
                <input
                    type="text"
                    placeholder="Search location"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    style={{
                        width: '300px',
                        padding: '10px',
                        fontSize: '16px',
                        border: '1px solid #ccc',
                        borderRadius: '5px',
                    }}
                />
                <button
                    type="submit"
                    style={{
                        marginLeft: '10px',
                        padding: '10px',
                        backgroundColor: '#007bff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Search
                </button>
            </form>

            {/* Map Component */}
            <MapContainer center={position} zoom={13} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                    <Popup>Selected location: {position.join(', ')}</Popup>
                </Marker>
                <MapUpdater position={position} />
            </MapContainer>
        </div>
    );
};

// Custom hook to update map view when the position changes
const MapUpdater = ({ position }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(position, map.getZoom());
    }, [position, map]);

    return null;
};

export default MapWithSearch;
