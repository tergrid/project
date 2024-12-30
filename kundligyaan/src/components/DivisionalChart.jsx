import React, { useState } from 'react';
import '../styles/DivisionalChart.css';  // Assuming your styles are in this file

const DivisionalChart = () => {
  const [result, setResult] = useState('Loading...');
  const [planetData, setPlanetData] = useState([]);

  const fetchDivisionalChart = () => {
    // Get values from input fields
    const dob = document.getElementById('dob').value;
    const tob = document.getElementById('tob').value;
    const lat = document.getElementById('lat').value;
    const lon = document.getElementById('lon').value;
    const tz = document.getElementById('tz').value;
    const chartType = document.getElementById('chartType').value;

    // Validate inputs
    if (!dob || !tob || !lat || !lon || !tz) {
      alert('Please fill all the details.');
      return;
    }

    // API URL and parameters
    const url = 'https://api.vedicastroapi.com/v3-json/horoscope/divisional-charts';
    const params = {
      api_key: '366c154f-bc5a-5339-99a8-8993088e6d5c',
      dob: dob, // Date format: DD/MM/YYYY
      tob: tob, // Time format: HH:mm
      lat: lat, // Latitude
      lon: lon, // Longitude
      tz: tz, // Timezone offset
      lang: 'en', // Language
      div: chartType, // User-selected chart type (e.g., D1, D3, etc.)
      response_type: 'planet_object', // Response type for planets
    };

    // Fetch data from the API
    fetch(url + '?' + new URLSearchParams(params))
      .then((response) => response.json()) // Ensure response is parsed as JSON
      .then((data) => {
        console.log('API Response:', data); // Log the response for debugging

        // Check if data has 'response' property and it's an object
        if (data && data.response && typeof data.response === 'object') {
          const planets = Object.values(data.response); // Convert object to array
          console.log('Planet data found:', planets); // Check if planet data exists

          if (planets.length > 0) {
            setPlanetData(planets); // Set planet data
            setResult('Chart Data Loaded Successfully!');
          } else {
            setResult('No valid planet data found.');
          }
        } else {
          console.error("API Response Error: The 'response' key is missing or not an object.", data);
          setResult('No valid planet data found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching divisional chart:', error);
        setResult('There was an error fetching the divisional chart. Please try again.');
      });
  };

  return (
    <div className="container">
      <h1 className="heading">Divisional Chart</h1>

      {/* Input form for details */}
      <div>
        <label htmlFor="dob">Date of Birth (DD/MM/YYYY):</label>
        <input type="text" id="dob" placeholder="e.g. 26/12/2024" />

        <label htmlFor="tob">Time of Birth (HH:MM):</label>
        <input type="text" id="tob" placeholder="e.g. 15:01" />

        <label htmlFor="lat">Latitude:</label>
        <input type="text" id="lat" placeholder="e.g. 28.7041" />

        <label htmlFor="lon">Longitude:</label>
        <input type="text" id="lon" placeholder="e.g. 77.1025" />

        <label htmlFor="tz">Timezone Offset:</label>
        <input type="text" id="tz" placeholder="e.g. 5.5" />

        <label htmlFor="chartType">Divisional Chart Type:</label>
        <select id="chartType">
          <option value="D1">D1 (Lagna)</option>
          <option value="D3">D3 (Dreshkana)</option>
          <option value="D3-s">D3-Somanatha</option>
          <option value="D7">D7 (Saptamsa)</option>
          <option value="D9">D9 (Navamsa)</option>
          <option value="D10">D10 (Dasamsa)</option>
          <option value="D10-R">D10-R (Dasamsa-EvenReverse)</option>
          <option value="D12">D12 (Dwadasamsa)</option>
          <option value="D16">D16 (Shodashamsa)</option>
          <option value="D20">D20 (Vimsamsa)</option>
          <option value="D24">D24 (ChaturVimshamsha)</option>
          <option value="D24-R">D24-R (D24-R)</option>
          <option value="D30">D30 (Trimshamsha)</option>
          <option value="D40">D40 (KhaVedamsa)</option>
          <option value="D45">D45 (AkshaVedamsa)</option>
          <option value="D60">D60 (Shastiamsha)</option>
          <option value="chalit">chalit (Bhav-chalit)</option>
          <option value="moon">moon (Moon chart)</option>
          <option value="sun">sun (Sun chart)</option>
        </select>

        <button onClick={fetchDivisionalChart}>Get Divisional Chart</button>
      </div>

      <div id="result">{result}</div>

      <div id="chart-container">
        {/* Divisional chart data will be displayed here */}
        <div id="chart">
          {planetData.length > 0 && (
            <div className="planet-list">
              <h2>Planetary Positions in {planetData[0].chart_name} Chart</h2>
              {planetData.map((planet, index) => (
                <div key={index} className="planet-item">
                  <strong>{planet.full_name}</strong>
                  <div className="planet-detail">
                    <span>Zodiac:</span> {planet.zodiac}
                    <br />
                    <span>House:</span> {planet.house}
                    <br />
                    <span>Retrograde:</span> {planet.retro ? 'Yes' : 'No'}
                    <br />
                    <span>Local Degree:</span> {planet.local_degree ? planet.local_degree.toFixed(2) : 'N/A'}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DivisionalChart;
