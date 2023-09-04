import React, { useRef } from 'react';
import { MapContainer, GeoJSON, TileLayer, Tooltip } from 'react-leaflet';
import '../leaflet/dist/leaflet.css';
import data from '../assets/GeoJSON/map.json';
import '../index.css';

const DinclMapComponent = () => {
    const tooltipRef = useRef(null); // Use ref to keep a reference to the tooltip

    const onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: (e) => {
                if (tooltipRef.current) {
                    const regionName = feature.properties.name;
                    tooltipRef.current.setContent(regionName);
                    tooltipRef.current.setLatLng(e.latlng).openOn(e.target._map);
                }
            },
            mousemove: (e) => {
                if (tooltipRef.current) {
                    tooltipRef.current.setLatLng(e.latlng);
                }
            },
            mouseout: (e) => {
                if (tooltipRef.current) {
                    tooltipRef.current.removeFrom(e.target._map); // Hide the tooltip
                }
            }
        });
    }

    const geoJsonStyle = {
        fillColor: "blue",
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };

    return (
        <div className="component">
            <h6>Najedź na region</h6>
            <MapContainer center={[51.8965, 19.0000]} zoom={6} style={{ height: "60vh", width: "60vh" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <GeoJSON data={data} onEachFeature={onEachFeature} style={geoJsonStyle} />
                <Tooltip ref={tooltipRef} permanent={true} className='my-custom-tooltip' offset={[0, -10]}></Tooltip>
            </MapContainer>
        </div>
    );
};

export default DinclMapComponent;
