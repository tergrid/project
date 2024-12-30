import React, { useState } from 'react';
import '../styles/FriendshipTable.css';

const FriendshipTable = () => {
  const [dob, setDob] = useState('');
  const [hh, setHh] = useState('');
  const [mm, setMm] = useState('');
  const [amPm, setAmPm] = useState('AM');
  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [tz, setTz] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchFriendshipDetails();
  };

  const fetchFriendshipDetails = () => {
    setLoading(true);
    setResults('');

    const apiKey = '366c154f-bc5a-5339-99a8-8993088e6d5c';  // Provided API key
    const timeIn24Hr = convertTo24HrFormat(hh, mm, amPm);

    const url = 'https://api.vedicastroapi.com/v3-json/extended-horoscope/friendship';
    const params = {
      lang: 'en',
      dob,
      tob: timeIn24Hr,
      lat,
      lon,
      tz,
      api_key: apiKey,
    };

    fetch(url + '?' + new URLSearchParams(params))
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.status === 200 && data.response) {
          displayResults(data.response.permanent_table);
        } else {
          setResults(<p className="error">Error: {data.status || 'Unknown error'}</p>);
        }
      })
      .catch((error) => {
        setLoading(false);
        setResults(<p className="error">Error: {error.message}</p>);
      });
  };

  const convertTo24HrFormat = (hh, mm, amPm) => {
    let hours = parseInt(hh);
    if (amPm === 'PM' && hours !== 12) {
      hours += 12;
    } else if (amPm === 'AM' && hours === 12) {
      hours = 0; // Midnight case
    }

    // Ensure the minutes are two digits
    let minutes = mm.padStart(2, '0');
    return `${hours}:${minutes}`;
  };

  const displayResults = (friendshipData) => {
    let table = (
      <table className="result-table">
        <thead>
          <tr>
            <th>Planet</th>
            <th>Friends</th>
            <th>Neutral</th>
            <th>Enemies</th>
          </tr>
        </thead>
        <tbody>
          {Object.keys(friendshipData).map((planet) => {
            const data = friendshipData[planet];
            return (
              <tr key={planet}>
                <td>{planet}</td>
                <td>{data.Friends.join(', ')}</td>
                <td>{data.Neutral.join(', ')}</td>
                <td>{data.Enemies.join(', ')}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );

    setResults(table);
  };

  return (
    <div className="container">
      <h1>Planet Friendship Table</h1>

      {/* Form for user inputs */}
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

        <label htmlFor="tob">Time of Birth (HH:MM):</label>
        <div className="time-container">
          <input
            type="number"
            id="hh"
            value={hh}
            onChange={(e) => setHh(e.target.value)}
            placeholder="HH"
            min="1"
            max="12"
            required
          />
          <input
            type="number"
            id="mm"
            value={mm}
            onChange={(e) => setMm(e.target.value)}
            placeholder="MM"
            min="0"
            max="59"
            required
          />
          <select id="amPm" value={amPm} onChange={(e) => setAmPm(e.target.value)} required>
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

        <button type="submit">Get Friendship Table</button>
      </form>

      {loading && <div className="loader">Loading...</div>}

      <div id="results">{results}</div>
    </div>
  );
};

export default FriendshipTable;