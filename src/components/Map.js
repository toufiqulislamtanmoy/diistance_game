"use client"
import 'leaflet/dist/leaflet.css'
import { useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

const Map = ({ cities, onCitySelected }) => {
    const [selectedPosition, setSelectedPosition] = useState(null);

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setSelectedPosition(e.latlng);
                onCitySelected(e.latlng);
            },
        });

        return null;
    };
    return (
        <div>
            <MapContainer center={[51.505, 10.09]} zoom={4} style={{ height: "100vh", width: "100vw" }}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <MapClickHandler />
                {selectedPosition && (
                    <Marker position={selectedPosition}>
                        <Popup>You clicked here: {selectedPosition.lat.toFixed(2)}, {selectedPosition.lng.toFixed(2)}</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default Map;