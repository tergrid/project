import React, { useState } from "react";
import "./AscendantForm.css";
import ResultCard from "./ResultCard";

const AscendantForm = () => {
  const [result, setResult] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    let hour = parseInt(event.target["tob-hour"].value);
    const minute = event.target["tob-minute"].value;
    const ampm = event.target["tob-am-pm"].value;

    // Convert time to 24-hour format
    if (ampm === "PM" && hour !== 12) hour += 12;
    if (ampm === "AM" && hour === 12) hour = 0;

    const formattedTime = `${hour}:${minute}`;
    const params = {
      lang: "en",
      api_key: "366c154f-bc5a-5339-99a8-8993088e6d5c",
      dob: event.target.dob.value,
      tob: formattedTime,
      lat: event.target.lat.value,
      lon: event.target.lon.value,
      tz: event.target.tz.value,
    };

    try {
      const response = await fetch(
        `https://api.vedicastroapi.com/v3-json/extended-horoscope/find-ascendant?${new URLSearchParams(
          params
        )}`
      );
      const data = await response.json();

      if (data.status === 200 && data.response) {
        setResult(data.response);
      } else {
        setResult({ error: "No Ascendant Sign data available." });
      }
    } catch (error) {
      setResult({ error: "Error fetching data. Please try again later." });
    }
  };

  return (
    <div className="container">
      <h1>Find Your Ascendant Sign</h1>
      <form onSubmit={handleSubmit} className="ascendant-form">
        <label htmlFor="dob">Date of Birth (DD/MM/YYYY):</label>
        <input type="text" id="dob" name="dob" placeholder="26/12/2024" required />

        <label htmlFor="tob">Time of Birth (12-hour format):</label>
        <div className="time-container">
          <input type="text" id="tob-hour" name="tob-hour" placeholder="HH" maxLength="2" required />
          <input type="text" id="tob-minute" name="tob-minute" placeholder="MM" maxLength="2" required />
          <select id="tob-am-pm" name="tob-am-pm" required>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
          </select>
        </div>

        <label htmlFor="lat">Latitude:</label>
        <input type="text" id="lat" name="lat" placeholder="29.4072" required />

        <label htmlFor="lon">Longitude:</label>
        <input type="text" id="lon" name="lon" placeholder="77.1025" required />

        <label htmlFor="tz">Time Zone:</label>
        <input type="text" id="tz" name="tz" placeholder="5.5" required />

        <button type="submit">Find Ascendant Sign</button>
      </form>

      <div className="result">
        {result && <ResultCard result={result} />}
      </div>
    </div>
  );
};

export default AscendantForm;
