import React, { useState } from 'react';
import { MapContainer, GeoJSON, TileLayer } from 'react-leaflet';
import '../leaflet/dist/leaflet.css';
import data from '../assets/GeoJSON/map.json';
import '../index.css';
import ModalWrapper from './ModalWrapper';  // Adjust the path based on your file structure

const DinclMapComponent = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [clickedRegion, setClickedRegion] = useState(null);

    const onEachFeature = (feature, layer) => {
        layer.on({
            click: (e) => {
                setClickedRegion(feature.properties.name);
                setIsModalOpen(true);
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
            <MapContainer center={[51.8965, 19.0000]} zoom={4} style={{ height: "20vh", width: "100%" }}>
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <GeoJSON data={data} onEachFeature={onEachFeature} style={geoJsonStyle} />
            </MapContainer>

            <ModalWrapper isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                {clickedRegion && <p>You clicked on {clickedRegion}!</p>}
            </ModalWrapper>
        </div>
    );
};

export default DinclMapComponent;
