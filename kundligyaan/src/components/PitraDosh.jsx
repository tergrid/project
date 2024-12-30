import React, { useState } from 'react';
import '../styles/PitraDosh.css';

const PitraDosh = () => {
  const [dob, setDob] = useState('');
  const [tobHour, setTobHour] = useState('');
  const [tobMinute, setTobMinute] = useState('');
  const [tobAmPm, setTobAmPm] = useState('AM');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [tz, setTz] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Convert time to 24-hour format
    let hour = parseInt(tobHour);
    const minute = tobMinute;
    const ampm = tobAmPm;

    if (ampm === 'PM' && hour !== 12) {
      hour += 12;
    }
    if (ampm === 'AM' && hour === 12) {
      hour = 0;
    }

    const formattedTime = `${hour}:${minute}`;

    const url = 'https://api.vedicastroapi.com/v3-json/dosha/pitra-dosh';
    const params = {
      lang: 'en',
      api_key: '366c154f-bc5a-5339-99a8-8993088e6d5c',
      dob,
      tob: formattedTime,
      lat,
      lon,
      tz
    };

    fetch(`${url}?${new URLSearchParams(params)}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.status === 200 && data.response) {
          setResult(data.response);
        } else {
          setResult({ error: 'No Pitra Dosh data available.' });
        }
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setResult({ error: 'Error fetching data. Please try again later.' });
      });
  };

  return (
    <div className="container">
      <h1>Pitra Dosh Calculation</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dob">Date of Birth (DD/MM/YYYY):</label>
        <input
          type="text"
          id="dob"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          placeholder="26/12/2024"
          required
        />

        <label htmlFor="tob">Time of Birth (12-hour format):</label>
        <div className="time-container">
          <input
            type="text"
            id="tob-hour"
            value={tobHour}
            onChange={(e) => setTobHour(e.target.value)}
            placeholder="HH"
            maxLength="2"
            required
          />
          <input
            type="text"
            id="tob-minute"
            value={tobMinute}
            onChange={(e) => setTobMinute(e.target.value)}
            placeholder="MM"
            maxLength="2"
            required
          />
          <select
            id="tob-am-pm"
            value={tobAmPm}
            onChange={(e) => setTobAmPm(e.target.value)}
            required
          >
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <label htmlFor="lat">Latitude:</label>
        <input
          type="text"
          id="lat"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
          placeholder="29.4072"
          required
        />

        <label htmlFor="lon">Longitude:</label>
        <input
          type="text"
          id="lon"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
          placeholder="77.1025"
          required
        />

        <label htmlFor="tz">Time Zone:</label>
        <input
          type="text"
          id="tz"
          value={tz}
          onChange={(e) => setTz(e.target.value)}
          placeholder="5.5"
          required
        />

        <button type="submit">Check Pitra Dosh</button>
      </form>

      {result && (
        <div id="result" className="result">
          {result.error ? (
            <p className="error">{result.error}</p>
          ) : (
            <>
              <div className="result-card">
                <h4>Pitra Dosh Present?</h4>
                <p>{result.is_dosha_present ? 'Yes' : 'No'}</p>
              </div>
              <div className="result-card">
                <h4>Bot Response:</h4>
                <p>{result.bot_response}</p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default PitraDosh;
