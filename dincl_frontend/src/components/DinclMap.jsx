import React, { useRef, useState, useEffect } from 'react';
import axios from 'axios';
import { MapContainer, GeoJSON, TileLayer, Tooltip } from 'react-leaflet';
import '../leaflet/dist/leaflet.css';
import data from '../assets/GeoJSON/map.json';
import '../index.css';
import { FORM_FIELDS } from '../constants/Choices.jsx';



const DinclMapComponent = () => {
    const tooltipRef = useRef(null); // Use ref to keep a reference to the tooltip
    const [tooltipData, setTooltipData] = useState({});
    const [currentVoivodship, setCurrentVoivodship] = useState("");


    const fetchSurveyData = async (voivodship) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/fetch_survey_data/?format=json`, { voivodship }); // Replace with your actual endpoint URL
            setTooltipData(response.data);

        } catch (error) {
            console.error('Failed to fetch data', error);
        }
    };

    const onEachFeature = (feature, layer) => {
        layer.on({
            mouseover: (e) => {
                if (tooltipRef.current) {
                    const regionName = feature.properties.nazwa;

                    fetchSurveyData(regionName); // Fetch data when mouse is over a voivodship
                    tooltipRef.current.setContent(regionName); // This can be modified based on the data structure you get
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
            },
            mouseover: (e) => {
                if (tooltipRef.current) {
                    const regionName = feature.properties.nazwa;
                    
                    setCurrentVoivodship(regionName); // Store the current voivodship name
    
                    fetchSurveyData(regionName);
                    tooltipRef.current.setLatLng(e.latlng).openOn(e.target._map);
                }
            },
            
        });
    }

    useEffect(() => {
        if (tooltipRef.current) {
            const title = `<strong>Województwo ${currentVoivodship}</strong>`;
            const dataContent = Object.entries(tooltipData)
                .map(([key, value]) => {
                    const matchedField = FORM_FIELDS.find(field => field.name === key);
                    const displayKey = matchedField ? matchedField.label : key; 
                    return `${displayKey}: ${value}`;
                })
                .join('<br />');
                
            const content = `${title}<br />${dataContent}`;
            tooltipRef.current.setContent(content);
        }
    }, [tooltipData, currentVoivodship]);
    
    


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
