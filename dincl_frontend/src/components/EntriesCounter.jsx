import React, { useState, useEffect } from 'react';
import '../index.css';

const EntriesCounterComponent = () => {
  const [entries, setEntries] = useState(0);

  useEffect(() => {
    // Notify the backend of a new visit and get the updated count.
    fetch('http://127.0.0.1:8000/api/v1/register-visit/?format=json', {
      headers: {
          'Accept': 'application/json'
      }
    })
    .then(response => {
        if (!response.ok) {
            console.error(`HTTP error! Status: ${response.status}`);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        setEntries(data.count);
    })
    .catch(error => {
        console.error('There was a problem with the fetch operation:', error.message);
    });
  
  }, []);

  return (
    <div className="component">
      Total Entries: {entries}
    </div>
  );
};

export default EntriesCounterComponent;

