import React, { useState } from 'react';
import '../styles/MahadashaPrediction.css';

const MahadaDashaPrediction = () => {
  const [dob, setDob] = useState('');
  const [tob, setTob] = useState('');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [tz, setTz] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate date of birth format (DD/MM/YYYY)
    const dobPattern = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dobPattern.test(dob)) {
      alert("Please enter a valid date of birth in DD/MM/YYYY format.");
      return;
    }

    const url = "https://api.vedicastroapi.com/v3-json/dashas/maha-dasha-predictions";
    const params = {
      lang: "en",
      dob: dob,
      tob: tob,
      lat: lat,
      lon: lon,
      tz: tz,
      api_key: "366c154f-bc5a-5339-99a8-8993088e6d5c"
    };

    try {
      const response = await fetch(`${url}?${new URLSearchParams(params)}`);
      const data = await response.json();
      if (data.status === 200) {
        const dashas = data.response.dashas;
        if (dashas && Array.isArray(dashas) && dashas.length > 0) {
          let resultHtml = `<h3>Maha Dasha Details:</h3>`;
          dashas.forEach((dashaObj, index) => {
            resultHtml += `<div class="result-card">
                              <h4>Dasha ${index + 1}: ${dashaObj.dasha}</h4>
                              <p><strong>Prediction:</strong> ${dashaObj.prediction}</p>
                              <p><strong>Start Year:</strong> ${dashaObj.dasha_start_year}</p>
                              <p><strong>End Year:</strong> ${dashaObj.dasha_end_year}</p>
                              <p><strong>Planet in Zodiac:</strong> ${dashaObj.planet_in_zodiac}</p>
                            </div>`;
          });
          setResult(resultHtml);
        } else {
          setResult("<p class='error'>No Maha Dasha details found for the provided data.</p>");
        }
      } else {
        setResult("<p class='error'>There was an error fetching the Maha Dasha result. Please try again.</p>");
      }
    } catch (error) {
      setResult("<p class='error'>There was an error with the API request.</p>");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Maha Dasha Prediction</h1>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="dob">Date of Birth (DD/MM/YYYY): </label>
          <input
            type="text"
            id="dob"
            value={dob}
            onChange={(e) => setDob(e.target.value)}
            required
            placeholder="Enter your DOB"
          />

          <label htmlFor="tob">Time of Birth (HH:MM AM/PM): </label>
          <input
            type="text"
            id="tob"
            value={tob}
            onChange={(e) => setTob(e.target.value)}
            required
            placeholder="Enter your TOB"
          />

          <label htmlFor="lat">Latitude: </label>
          <input
            type="text"
            id="lat"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
            placeholder="Enter your Latitude"
          />

          <label htmlFor="lon">Longitude: </label>
          <input
            type="text"
            id="lon"
            value={lon}
            onChange={(e) => setLon(e.target.value)}
            required
            placeholder="Enter your Longitude"
          />

          <label htmlFor="tz">Timezone (e.g., +5.5): </label>
          <input
            type="text"
            id="tz"
            value={tz}
            onChange={(e) => setTz(e.target.value)}
            required
            placeholder="Enter your Timezone"
          />

          <button type="submit">Get Maha Dasha</button>
        </form>
      </div>

      <div
        id="result"
        dangerouslySetInnerHTML={{ __html: result }}
      />
    </div>
  );
};

export default MahadaDashaPrediction;
