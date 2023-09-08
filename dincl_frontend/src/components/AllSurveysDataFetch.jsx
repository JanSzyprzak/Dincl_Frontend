import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const AllSurveysDataFetchComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalItems, setTotalItems] = useState(0); // State to store the total number of items

  useEffect(() => {
    const apiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/dl/?format=json`;

    const countApiUrl = `${import.meta.env.VITE_BACKEND_URL}/api/v1/all_count?format=json`; // New API endpoint for fetching count

    const fetchData = async () => {
      try {
        const response = await axios.get(apiUrl);
        setData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    const fetchCount = async () => {
      try {
        const countResponse = await axios.get(countApiUrl);
        setTotalItems(countResponse.data.count); // Set the total number of items from the count API
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    Promise.all([fetchData(), fetchCount()]); // Fetch both data and count concurrently
  }, []);

  if (loading) {
    return <div className="component">Loading...</div>;
  }

  if (error) {
    return <div className="component">Error: {error}</div>;
  }

  return (
    <div className="component">
      <h2>Data from API:</h2>
      <ul>
        {data.map(item => (
          <li key={item.id}>{`ID: ${item.id}, Voivodship: ${item.voivodship}`}</li>
        ))}
      </ul>
      <p>Total items: {totalItems}</p> {/* Display the total number of items */}
    </div>
  );
};

export default AllSurveysDataFetchComponent;
