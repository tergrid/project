import React, { useState } from 'react';
import './AntarDashaForm.css';

const AntarDashaForm = () => {
  const [result, setResult] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const dob = event.target.dob.value;
    const tob = event.target.tob.value;
    const lat = event.target.lat.value;
    const lon = event.target.lon.value;
    const tz = event.target.tz.value;

    // Validate date format
    const dobPattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dobPattern.test(dob)) {
      alert('Please enter a valid date of birth in DD/MM/YYYY format.');
      return;
    }

    const url = 'https://api.vedicastroapi.com/v3-json/dashas/antar-dasha';
    const params = {
      lang: 'en',
      dob,
      tob,
      lat,
      lon,
      tz,
      api_key: '366c154f-bc5a-5339-99a8-8993088e6d5c',
    };

    fetch(`${url}?${new URLSearchParams(params)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200) {
          const { antardashas, antardasha_order } = data.response;
          if (antardashas?.length && antardasha_order?.length) {
            const resultHtml = (
              <div>
                <h3>Antar Dasha Details:</h3>
                {antardashas.map((dashaArr, index) => (
                  <div className="result-card" key={index}>
                    <h4>Antar Dasha {index + 1} - {antardasha_order[index]}</h4>
                    <ul>
                      {dashaArr.map((date, i) => (
                        <li key={i}><strong>Period {i + 1}:</strong> {date}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
            setResult(resultHtml);
          } else {
            setResult(<p className="error">No Antar Dasha details found for the provided data.</p>);
          }
        } else {
          setResult(<p className="error">There was an error fetching the Antar Dasha result. Please try again.</p>);
        }
      })
      .catch((error) => {
        setResult(<p className="error">There was an error with the API request.</p>);
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h1>Antar Dasha Prediction</h1>
      <form id="antarDashaForm" onSubmit={handleSubmit}>
        <label htmlFor="dob">Date of Birth (DD/MM/YYYY):</label>
        <input type="text" id="dob" name="dob" required placeholder="Enter your DOB" />

        <label htmlFor="tob">Time of Birth (HH:MM AM/PM):</label>
        <input type="text" id="tob" name="tob" required placeholder="Enter your TOB" />

        <label htmlFor="lat">Latitude:</label>
        <input type="text" id="lat" name="lat" required placeholder="Enter your Latitude" />

        <label htmlFor="lon">Longitude:</label>
        <input type="text" id="lon" name="lon" required placeholder="Enter your Longitude" />

        <label htmlFor="tz">Timezone (e.g., +5.5):</label>
        <input type="text" id="tz" name="tz" required placeholder="Enter your Timezone" />

        <button type="submit">Get Antar Dasha</button>
      </form>

      <div id="result">{result}</div>
    </div>
  );
};

export default AntarDashaForm;
