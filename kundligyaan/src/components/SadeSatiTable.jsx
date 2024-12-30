import React, { useState } from "react";
import "../styles/SadeSatiTable.css";

const SadeSatiTable = () => {
  const [dob, setDob] = useState("");
  const [hh, setHh] = useState("");
  const [mm, setMm] = useState("");
  const [amPm, setAmPm] = useState("AM");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [tz, setTz] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const fetchHoroscope = (event) => {
    event.preventDefault();
    setLoading(true);
    setResults([]);

    const apiKey = "366c154f-bc5a-5339-99a8-8993088e6d5c"; // Provided API key

    // Convert time to 24-hour format for API
    let timeIn24Hr = convertTo24HrFormat(hh, mm, amPm);

    const url = "https://api.vedicastroapi.com/v3-json/extended-horoscope/sade-sati-table";
    const params = {
      lang: "en",
      dob: dob,
      tob: timeIn24Hr,
      lat: lat,
      lon: lon,
      tz: tz,
      api_key: apiKey,
    };

    fetch(url + "?" + new URLSearchParams(params))
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.status === 200 && data.response) {
          setResults(data.response);
        } else {
          setResults([{ error: "Error fetching data" }]);
        }
      })
      .catch((error) => {
        setLoading(false);
        setResults([{ error: error.message }]);
      });
  };

  const convertTo24HrFormat = (hh, mm, amPm) => {
    let hours = parseInt(hh);
    if (amPm === "PM" && hours !== 12) {
      hours += 12;
    } else if (amPm === "AM" && hours === 12) {
      hours = 0; // Midnight case
    }
    let minutes = mm.padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div className="container">
      <h1>Sade Sati Table - Extended Horoscope</h1>

      {/* Form for user inputs */}
      <form onSubmit={fetchHoroscope}>
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

        <button type="submit">Get Horoscope</button>
      </form>

      {loading && <div className="loader">Loading...</div>}

      <div id="results">
        {results.length > 0 &&
          results.map((item, index) =>
            item.error ? (
              <p key={index} className="error">{item.error}</p>
            ) : (
              <div key={index} className="result-card">
                <h4>Zodiac: {item.zodiac}</h4>
                <p><strong>Type:</strong> {item.type}</p>
                <p><strong>Dhaiya:</strong> {item.dhaiya}</p>
                <p><strong>Direction:</strong> {item.direction}</p>
                <p><strong>Retrograde:</strong> {item.retro ? "Yes" : "No"}</p>
                <p><strong>Start Date:</strong> {item.start_date}</p>
                <p><strong>End Date:</strong> {item.end_date}</p>
              </div>
            )
          )}
      </div>
    </div>
  );
};

export default SadeSatiTable;
