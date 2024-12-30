import React, { useState } from 'react';
import '../styles/MangalDosh.css';

const MangalDosh = () => {
  const [dob, setDob] = useState('');
  const [tobHour, setTobHour] = useState('');
  const [tobMinute, setTobMinute] = useState('');
  const [tobAmPm, setTobAmPm] = useState('AM');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [tz, setTz] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert time to 24-hour format
    let hour = parseInt(tobHour);
    if (tobAmPm === "PM" && hour !== 12) hour += 12;
    if (tobAmPm === "AM" && hour === 12) hour = 0;

    const formattedTime = `${hour}:${tobMinute}`;

    const url = "https://api.vedicastroapi.com/v3-json/dosha/mangal-dosh";
    const params = {
      lang: "en",
      api_key: "366c154f-bc5a-5339-99a8-8993088e6d5c",
      dob: dob,
      tob: formattedTime,
      lat: lat,
      lon: lon,
      tz: tz,
    };

    try {
      const response = await fetch(`${url}?${new URLSearchParams(params)}`);
      const data = await response.json();

      if (data.status === 200 && data.response) {
        setResult(data.response);
        setError('');
      } else {
        setError('No Mangal Dosh data available.');
        setResult(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError('Error fetching data. Please try again later.');
      setResult(null);
    }
  };

  return (
    <div className="container">
      <h1>Mangal Dosh Calculation</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="dob">Date of Birth (DD/MM/YYYY):</label>
        <input type="text" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="26/12/2024" required />

        <label htmlFor="tob">Time of Birth (12-hour format):</label>
        <div className="time-container">
          <input type="text" id="tob-hour" value={tobHour} onChange={(e) => setTobHour(e.target.value)} placeholder="HH" maxLength="2" required />
          <input type="text" id="tob-minute" value={tobMinute} onChange={(e) => setTobMinute(e.target.value)} placeholder="MM" maxLength="2" required />
          <select id="tob-am-pm" value={tobAmPm} onChange={(e) => setTobAmPm(e.target.value)} required>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <label htmlFor="lat">Latitude:</label>
        <input type="text" id="lat" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="29.4072" required />

        <label htmlFor="lon">Longitude:</label>
        <input type="text" id="lon" value={lon} onChange={(e) => setLon(e.target.value)} placeholder="77.1025" required />

        <label htmlFor="tz">Time Zone:</label>
        <input type="text" id="tz" value={tz} onChange={(e) => setTz(e.target.value)} placeholder="5.5" required />

        <button type="submit">Check Mangal Dosh</button>
      </form>

      <div id="result" className="result">
        {error && <p className="error">{error}</p>}
        {result && (
          <>
            <div className="result-card">
              <h4>Factors Causing Mangal Dosh:</h4>
              <p>{result.factors?.venus}</p>
            </div>

            <div className="result-card">
              <h4>Is Mangal Dosh Present from Lagna?</h4>
              <p>{result.is_dosha_present_mars_from_lagna ? "Yes" : "No"}</p>
            </div>

            <div className="result-card">
              <h4>Is Mangal Dosh Present from Moon?</h4>
              <p>{result.is_dosha_present_mars_from_moon ? "Yes" : "No"}</p>
            </div>

            <div className="result-card">
              <h4>Is It Anshik Mangal Dosh?</h4>
              <p>{result.is_anshik ? "Yes" : "No"}</p>
            </div>

            <div className="result-card">
              <h4>Is Mangal Dosh Present?</h4>
              <p>{result.is_dosha_present ? "Yes" : "No"}</p>
            </div>

            <div className="result-card">
              <h4>Bot Response:</h4>
              <p>{result.bot_response}</p>
              <h4>Score:</h4>
              <p>{result.score}%</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MangalDosh;
