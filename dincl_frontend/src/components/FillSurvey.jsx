import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

import { FORM_FIELDS } from "../constants/Choices.jsx";

import "../index.css";

const FillSurveyComponent = ( { onSurveySubmit, closeModal } ) => {
    const [formData, setFormData] = useState({
        age: "",
        gender: "",
        voivodship: "",
        city_size: "",
        group: "",
        identification_with_group: "",
        identification_with_minority: "",
        group_diversity: "",
        ease_of_joining: "",
        rule_fairness: "",
        minority_participation_in_life: "",
        minority_participation_in_decisions: "",
        minority_potential_utilization: "",
        personal_security_feeling: "",
        minority_security_feeling: "",
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [invalidFields, setInvalidFields] = useState([]);

    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const getFieldsForStep = (step) => {
        switch (step) {
            case 1:
                return STEP1_FIELDS;
            case 2:
                return STEP2_FIELDS;
            default:
                return [];
        }
    };

    const getInvalidFields = (stepFields) => {
        let invalidFields = [];
        for (let field of stepFields) {
            if (!formData[field.name]) {
                invalidFields.push(field.name); // Push the field name if it's empty
            }
        }
        return invalidFields;
    };

    const handleNext = () => {
        const currentInvalidFields = getInvalidFields(STEP1_FIELDS);
        setInvalidFields(currentInvalidFields);
        if (currentInvalidFields.length === 0) {
            setCurrentStep(2);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
    
        const currentInvalidFields = getInvalidFields(STEP2_FIELDS);
        setInvalidFields(currentInvalidFields);
        
        if (currentInvalidFields.length === 0) {
            const backendUrl = "http://localhost:8000/api/v1/create-survey/";
            console.log(formData);
            
            fetch(backendUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Network response was not ok");
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Success:", data);
                    onSurveySubmit();  // Show the flash message
                    closeModal();      // Close the modal
                })
                .catch(error => {
                    console.error("Error:", error);
                });
        }
    };

    const STEP1_FIELDS = FORM_FIELDS.slice(0, 5);
    const STEP2_FIELDS = FORM_FIELDS.slice(5);

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                {getFieldsForStep(currentStep).map((field) => (
                    <div key={field.name}>
                        <Form.Group
                            className="d-flex justify-content-between mb-3"
                            key={field.name}
                        >
                            <Form.Label
                                style={{ marginRight: "20px" }}
                                className="flex-grow-1"
                            >
                                {field.label}
                            </Form.Label>
                            <div
                                className="flex-grow-2"
                                style={{ width: "200px" }}
                            >
                                <Form.Control
                                    as="select"
                                    name={field.name}
                                    value={formData[field.name]}
                                    onChange={handleChange}
                                    className={
                                        invalidFields.includes(field.name)
                                            ? "is-invalid"
                                            : ""
                                    }
                                >
                                    <option value="">Wybierz z listy</option>
                                    {field.choices.map(({ value, label }) => (
                                        <option key={value} value={value}>
                                            {label}
                                        </option>
                                    ))}
                                </Form.Control>
                                {invalidFields.includes(field.name) && (
                                    <div className="invalid-feedback">
                                        To pole jest wymagane.
                                    </div>
                                )}
                            </div>
                        </Form.Group>
                    </div>
                ))}
                <div className="text-center mt-3">
                    {currentStep === 1 && (
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleNext}
                        >
                            Next
                        </button>
                    )}

                    {currentStep === 2 && (
                        <>
                            <button
                                type="button"
                                className="btn btn-secondary mr-2"
                                onClick={() => setCurrentStep(1)}
                            >
                                Previous
                            </button>
                            <button
                                type="submit"
                                className="btn btn-primary"
                                onClick={handleSubmit}
                            >
                                Submit
                            </button>
                        </>
                    )}
                </div>
            </Form>
        </div>
    );
};

export default FillSurveyComponent;
