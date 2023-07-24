import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../index.css';

const AllSurveysDataFetchComponent = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [totalItems, setTotalItems] = useState(0); // State to store the total number of items

  useEffect(() => {
    const apiUrl = 'http://127.0.0.1:8000/api/v1/dl/?format=json';
    const countApiUrl = 'http://127.0.0.1:8000/api/v1/all_count?format=json'; // New API endpoint for fetching count

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

  const handleShowPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  if (loading) {
    return <div className="component">Loading...</div>;
  }

  if (error) {
    return <div className="component">Error: {error}</div>;
  }

  return (
    <div className="component">
      {!showPopup ? (
        <div>
          <button onClick={handleShowPopup}>Przeglądaj bazę</button>
          <p>Total items: {totalItems}</p> {/* Display the total number of items */}
        </div>
      ) : (
        <div className="popup">
          <button onClick={handleClosePopup}>Close</button>
          <h2>Data from API:</h2>
          <ul>
            {data.map(item => (
              <li key={item.id}>{`ID: ${item.id}, Voivodship: ${item.voivodship}`}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AllSurveysDataFetchComponent;
