import React, { useState } from 'react';
import './ManglikDosh.css';

const ManglikDosh = () => {
  const [dob, setDob] = useState('');
  const [hour, setHour] = useState('');
  const [minute, setMinute] = useState('');
  const [ampm, setAmpm] = useState('AM');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [tz, setTz] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);

    // Format time to 24-hour if PM is selected
    let formattedHour = parseInt(hour);
    if (ampm === 'PM' && formattedHour !== 12) {
      formattedHour += 12;
    }
    if (ampm === 'AM' && formattedHour === 12) {
      formattedHour = 0;
    }

    const formattedTime = `${formattedHour}:${minute}`;

    const url = 'https://api.vedicastroapi.com/v3-json/dosha/manglik-dosh';
    const params = {
      lang: 'en',
      api_key: '366c154f-bc5a-5339-99a8-8993088e6d5c',
      dob,
      tob: formattedTime,
      lat,
      lon,
      tz,
    };

    fetch(`${url}?${new URLSearchParams(params)}`)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.status === 200 && data.response) {
          setResult(data.response);
        } else {
          setResult({ error: 'No Manglik Dosh data available.' });
        }
      })
      .catch((error) => {
        setLoading(false);
        setResult({ error: 'Error fetching data. Please try again later.' });
      });
  };

  return (
    <div className="container">
      <h1>Manglik Dosh Calculation</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dob">Date of Birth (DD/MM/YYYY):</label>
        <input
          type="text"
          id="dob"
          name="dob"
          placeholder="26/12/2024"
          required
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <label htmlFor="tob">Time of Birth (12-hour format):</label>
        <div className="time-container">
          <input
            type="text"
            id="tob-hour"
            name="tob-hour"
            placeholder="HH"
            maxLength="2"
            required
            value={hour}
            onChange={(e) => setHour(e.target.value)}
          />
          <input
            type="text"
            id="tob-minute"
            name="tob-minute"
            placeholder="MM"
            maxLength="2"
            required
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
          />
          <select
            id="tob-am-pm"
            name="tob-am-pm"
            required
            value={ampm}
            onChange={(e) => setAmpm(e.target.value)}
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <label htmlFor="lat">Latitude:</label>
        <input
          type="text"
          id="lat"
          name="lat"
          placeholder="29.4072"
          required
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />

        <label htmlFor="lon">Longitude:</label>
        <input
          type="text"
          id="lon"
          name="lon"
          placeholder="77.1025"
          required
          value={lon}
          onChange={(e) => setLon(e.target.value)}
        />

        <label htmlFor="tz">Time Zone:</label>
        <input
          type="text"
          id="tz"
          name="tz"
          placeholder="5.5"
          required
          value={tz}
          onChange={(e) => setTz(e.target.value)}
        />

        <button type="submit">Check Manglik Dosh</button>
      </form>

      {loading && <div className="loader">Loading...</div>}

      {result && !loading && (
        <div id="result" className="result">
          {result.error && <p className="error">{result.error}</p>}

          {result.manglik_by_mars !== undefined && (
            <div className="result-card">
              <h4>Manglik Dosh Present?</h4>
              <p>{result.manglik_by_mars ? 'Yes' : 'No'}</p>
            </div>
          )}

          {result.bot_response && (
            <div className="result-card">
              <h4>Result:</h4>
              <p>{result.bot_response}</p>
            </div>
          )}

          {result.factors && result.factors.length > 0 && (
            <div className="result-card">
              <h4>Factors:</h4>
              <ul className="factors-list">
                {result.factors.map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </div>
          )}

          {result.aspects && result.aspects.length > 0 && (
            <div className="result-card">
              <h4>Aspects:</h4>
              <ul className="aspects-list">
                {result.aspects.map((aspect, index) => (
                  <li key={index}>{aspect}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ManglikDosh;
