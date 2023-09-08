
import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { FORM_FIELDS } from '../constants/Choices.jsx';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import { Chart, BarElement, BarController, CategoryScale, LinearScale } from 'chart.js';

Chart.register(BarElement, BarController, CategoryScale, LinearScale);

const SELECTED_FIELDS = ["age", "gender", "voivodship", "city_size", "group"];

const DataFetcherForm = () => {
    const [formData, setFormData] = useState({});
    const [fetchedData, setFetchedData] = useState(null);
    const [showHistogram, setShowHistogram] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        
        // If the value is empty, remove the key from formData
        if (value === "") {
            const updatedFormData = { ...formData };
            delete updatedFormData[name];
            setFormData(updatedFormData);
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };
    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
    
        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/fetch_survey_data/?format=json`, formData);
            setFetchedData(response.data);
            console.log(response)
            setShowHistogram(true); 
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const histogramData = {
        labels: Object.keys(fetchedData || {}).map(key => {
            const matchedField = FORM_FIELDS.find(field => field.name === key);
            return matchedField ? matchedField.label : key;
        }),
        
        datasets: [
            {
                label: 'Survey Data',
                data: Object.values(fetchedData || {}),
                backgroundColor: 'rgba(75, 192, 192, 0.6)', 
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const displaySelectedParameters = () => {
        // Check if formData is empty (no field selected)
        if (Object.keys(formData).length === 0) {
            return <div>Wszystkie ankiety</div>;
        }
    
        return Object.entries(formData).map(([key, value]) => {
            const fieldInfo = FORM_FIELDS.find(field => field.name === key);
    
            // If fieldInfo doesn't exist or value doesn't match any choice, skip rendering
            if (!fieldInfo || !fieldInfo.choices.some(choice => choice.value === value)) {
                return null;
            }
    
            const matchedChoice = fieldInfo.choices.find(choice => choice.value === value);
            return (
                <div key={key}>
                    <strong>{fieldInfo.label}:</strong> {matchedChoice.label}
                </div>
            );
        });
    };
    
    

    return (
        <div>
            {!showHistogram ? (
                <div>
                    <Form onSubmit={handleFormSubmit}>
                        {FORM_FIELDS.filter(field => SELECTED_FIELDS.includes(field.name)).map((field) => (
                            <div key={field.name}>
                                <Form.Group className="d-flex justify-content-between mb-3">
                                    <Form.Label style={{ marginRight: "20px" }} className="flex-grow-1">
                                        {field.label}
                                    </Form.Label>
                                    <div className="flex-grow-2" style={{ width: "200px" }}>
                                        <Form.Control
                                            as="select"
                                            name={field.name}
                                            value={formData[field.name] || ""}
                                            onChange={handleChange}
                                        >
                                            <option value="">Wybierz z listy</option>
                                            {field.choices.map(({ value, label }) => (
                                                <option key={value} value={value}>
                                                    {label}
                                                </option>
                                            ))}
                                        </Form.Control>
                                    </div>
                                </Form.Group>
                            </div>
                        ))}
                        <button type="submit">Go!</button>
                    </Form>
                </div>
            ) : (
                <div>
                    <h3>Średnie arytmetyczne dla poszczególnych kategorii</h3>
                    {displaySelectedParameters()}
                    <Bar data={histogramData} />
                    <button onClick={() => setShowHistogram(false)}>Wróć</button> {/* Button to navigate back to the form */}
                </div>
            )}
        </div>
    );
    
};

export default DataFetcherForm;
