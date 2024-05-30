"use client"
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import { useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMapEvents } from 'react-leaflet';

const Map = ({ correctLocation, onCitySelected }) => {
    const [selectedPosition, setSelectedPosition] = useState(null);
    
    const customIcon = new Icon({
        iconUrl:'pin.png',
        iconSize:[38,38]
    })
    const correctLocationIcon = new Icon({
        iconUrl:'cor.png',
        iconSize:[38,38]
    })

    const MapClickHandler = () => {
        useMapEvents({
            click(e) {
                setSelectedPosition(e.latlng); //this is the selected city by the user clicking
                onCitySelected(e.latlng);
            },
        });

        return null;
    };
    return (
        <div>
            <MapContainer center={[51.505, 10.09]} zoom={4} style={{ height: "100vh", width: "100%" }}>
                <TileLayer
                    url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                    attribution='&copy; <a href="https://carto.com/attributions">CARTO</a>'
                />
                <MapClickHandler />
                {selectedPosition && (
                    <Marker position={selectedPosition} icon={customIcon}>
                        <Popup>You clicked here: {selectedPosition.lat.toFixed(2)}, {selectedPosition.lng.toFixed(2)}</Popup>
                    </Marker>
                )}
                {correctLocation && (
                    <Marker position={correctLocation} icon={correctLocationIcon}>
                        <Popup>You clicked here: {selectedPosition.lat.toFixed(2)}, {selectedPosition.lng.toFixed(2)}</Popup>
                    </Marker>
                )}
            </MapContainer>
        </div>
    );
};

export default Map;