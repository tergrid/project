import React, { useState } from "react";
import "../styles/SubDashaDetails.css";

const SubDashaDetails = () => {
  const [dob, setDob] = useState("");
  const [tobHour, setTobHour] = useState("");
  const [tobMinute, setTobMinute] = useState("");
  const [tobAmPm, setTobAmPm] = useState("AM");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [tz, setTz] = useState("");
  const [md, setMd] = useState("Sun");
  const [ad, setAd] = useState("Sun");
  const [pd, setPd] = useState("Sun");
  const [sd, setSd] = useState("Sun");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchSubDashaInfo = (event) => {
    event.preventDefault();

    let hour = parseInt(tobHour);
    const minute = tobMinute;
    const ampm = tobAmPm;

    if (ampm === "PM" && hour !== 12) {
      hour += 12;
    }
    if (ampm === "AM" && hour === 12) {
      hour = 0;
    }

    const formattedTime = `${hour}:${minute}`;

    const url = "https://api.vedicastroapi.com/v3-json/dashas/specific-sub-dasha";
    const params = {
      lang: "en",
      api_key: "366c154f-bc5a-5339-99a8-8993088e6d5c",
      dob: dob,
      tob: formattedTime,
      lat: lat,
      lon: lon,
      tz: tz,
      md: md,
      ad: ad,
      pd: pd,
      sd: sd,
    };

    setLoading(true);
    setResult(null);

    fetch(url + "?" + new URLSearchParams(params))
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.status === 200 && data.response) {
          setResult(data.response);
        } else {
          setResult({ error: "No Sub-Dasha data available." });
        }
      })
      .catch((error) => {
        setLoading(false);
        setResult({ error: "Error fetching data. Please try again later." });
      });
  };

  return (
    <div className="container">
      <h1>Specific Sub-Dasha Details</h1>
      <form onSubmit={fetchSubDashaInfo}>
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
          placeholder="78.1025"
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

        <label htmlFor="md">Mahadasha:</label>
        <select
          id="md"
          value={md}
          onChange={(e) => setMd(e.target.value)}
          required
        >
          <option>Sun</option>
          <option>Moon</option>
          <option>Mercury</option>
          <option>Venus</option>
          <option>Mars</option>
          <option>Jupiter</option>
          <option>Saturn</option>
          <option>Rahu</option>
          <option>Ketu</option>
        </select>

        <label htmlFor="ad">Antardasha:</label>
        <select
          id="ad"
          value={ad}
          onChange={(e) => setAd(e.target.value)}
          required
        >
          <option>Sun</option>
          <option>Moon</option>
          <option>Mercury</option>
          <option>Venus</option>
          <option>Mars</option>
          <option>Jupiter</option>
          <option>Saturn</option>
          <option>Rahu</option>
          <option>Ketu</option>
        </select>

        <label htmlFor="pd">Paryantardasha:</label>
        <select
          id="pd"
          value={pd}
          onChange={(e) => setPd(e.target.value)}
          required
        >
          <option>Sun</option>
          <option>Moon</option>
          <option>Mercury</option>
          <option>Venus</option>
          <option>Mars</option>
          <option>Jupiter</option>
          <option>Saturn</option>
          <option>Rahu</option>
          <option>Ketu</option>
        </select>

        <label htmlFor="sd">Sub Dasha:</label>
        <select
          id="sd"
          value={sd}
          onChange={(e) => setSd(e.target.value)}
          required
        >
          <option>Sun</option>
          <option>Moon</option>
          <option>Mercury</option>
          <option>Venus</option>
          <option>Mars</option>
          <option>Jupiter</option>
          <option>Saturn</option>
          <option>Rahu</option>
          <option>Ketu</option>
        </select>

        <button type="submit">Fetch Sub-Dasha Info</button>
      </form>

      {loading && <div className="loader">Loading...</div>}

      {result && (
        <div id="result" className="result">
          {result.error ? (
            <p className="error">{result.error}</p>
          ) : (
            <>
              <div className="result-card">
                <h4>Main Dasha Details</h4>
                <p><strong>Mahadasha:</strong> {result.mahadasha || "N/A"}</p>
                <p><strong>Antardasha:</strong> {result.antardasha || "N/A"}</p>
                <p><strong>Paryantardasha:</strong> {result.paryantardasha || "N/A"}</p>
                <p><strong>Shookshamadasha:</strong> {result.Shookshamadasha || "N/A"}</p>
              </div>

              {result.pranadasha && result.pranadasha.length > 0 && (
                <div className="result-card">
                  <h4>Pranadasha Details</h4>
                  {result.pranadasha.map((dasha, index) => (
                    <p key={index}>
                      <strong>{dasha.name}:</strong> 
                      {new Date(dasha.start).toLocaleString()} to 
                      {new Date(dasha.end).toLocaleString()}
                    </p>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SubDashaDetails;
