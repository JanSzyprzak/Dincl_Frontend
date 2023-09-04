import React, { useState } from 'react';
import { AGE_CHOICES, GENDER_CHOICES, VOIVODSHIP_CHOICES, CITY_SIZE_CHOICES, GROUP_CHOICES, RATING_CHOICES } from '../constants/Choices.jsx';
import '../index.css';

const FillSurveyComponent = () => {

  const [formData, setFormData] = useState({
    age: '',
    gender: '',
    voivodship: '',
    city_size: '',
    group: '',
    identification_with_group: '',
    identification_with_minority: '',
    group_diversity: '',
    ease_of_joining: '',
    rule_fairness: '',
    minority_participation_in_life: '',
    minority_participation_in_decisions: '',
    minority_potential_utilization: '',
    personal_security_feeling: '',
    minority_security_feeling: '',
  });

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Here, you can submit the form data to the server or handle it as needed
    console.log(formData);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Wiek</label>
          <select
            name="age"
            value={formData.age}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            {AGE_CHOICES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Płeć</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            {GENDER_CHOICES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        <div>
          <label>Województwo</label>
          <select
            name="voivodship"
            value={formData.voivodship}
            onChange={handleChange}
          >
            <option value="">Select an option</option>
            {VOIVODSHIP_CHOICES.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </div>
        {/* Add other form fields using the same pattern */}
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  );
};

export default FillSurveyComponent;
