// src/WasteScrapShopMap.js
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-defaulticon-compatibility';
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css';

const WasteScrapShopMap = () => {
    // Latitude and longitude for the waste scrap shop (example coordinates)
    const scrapShopPosition = [13.0827, 80.2707]; // Example: Chennai coordinates

    return (
        <div style={{ height: '100vh', width: '100%' }}>
            {/* Map Container */}
            <MapContainer center={scrapShopPosition} zoom={13} style={{ height: '100%', width: '100%' }}>
                {/* Tile Layer */}
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />

                {/* Marker for the Waste Scrap Shop */}
                <Marker position={scrapShopPosition}>
                    <Popup>
                        Waste Scrap Shop <br /> Chennai.
                    </Popup>
                </Marker>
            </MapContainer>
        </div>
    );
};

export default WasteScrapShopMap;
