import React, { useState } from "react";
import "../styles/YearlyHoroscope.css"; // External CSS file for styling

const YearlyHoroscope = () => {
  const [zodiac, setZodiac] = useState("1");
  const [year, setYear] = useState("current");
  const [result, setResult] = useState("Select your zodiac and year, then click the button to get your predictions.");

  const getHoroscope = async (zodiacNumber, year) => {
    const apiUrl = `https://api.vedicastroapi.com/v3-json/prediction/yearly`;
    const params = {
      api_key: "366c154f-bc5a-5339-99a8-8993088e6d5c",
      zodiac: zodiacNumber,
      lang: "en",
      year: year,
    };

    try {
      const queryString = new URLSearchParams(params).toString();
      const response = await fetch(`${apiUrl}?${queryString}`);

      if (response.ok) {
        const data = await response.json();
        displayHoroscope(data.response, year);
      } else {
        const errorData = await response.json();
        setResult(
          `<div class="error">Error fetching horoscope: ${errorData.message || "Unknown error"}</div>`
        );
      }
    } catch (error) {
      console.error("Error fetching horoscope:", error);
      setResult(`<div class="error">Error fetching horoscope.</div>`);
    }
  };

  const displayHoroscope = (response, year) => {
    let output = `<h2>Horoscope Predictions for ${year === "current" ? "This Year" : "Next Year"}</h2>`;

    Object.keys(response).forEach((phaseKey) => {
      const phase = response[phaseKey];
      output += `<div class="phase"><h3>${phaseKey}</h3>`;
      output += `<p><strong>Period:</strong> ${phase.period}</p>`;
      output += `<p><strong>Prediction:</strong> ${phase.prediction}</p>`;
      output += `<div class="prediction"><strong>Health:</strong> ${phase.health.prediction} (Score: ${phase.health.score})</div>`;
      output += `<div class="prediction"><strong>Career:</strong> ${phase.career.prediction} (Score: ${phase.career.score})</div>`;
      output += `<div class="prediction"><strong>Relationship:</strong> ${phase.relationship.prediction} (Score: ${phase.relationship.score})</div>`;
      output += `<div class="prediction"><strong>Travel:</strong> ${phase.travel.prediction} (Score: ${phase.travel.score})</div>`;
      output += `<div class="prediction"><strong>Family:</strong> ${phase.family.prediction} (Score: ${phase.family.score})</div>`;
      output += `<div class="prediction"><strong>Friends:</strong> ${phase.friends.prediction} (Score: ${phase.friends.score})</div>`;
      output += `<div class="prediction"><strong>Finances:</strong> ${phase.finances.prediction} (Score: ${phase.finances.score})</div>`;
      output += `<div class="prediction"><strong>Status:</strong> ${phase.status.prediction} (Score: ${phase.status.score})</div>`;
      output += `<div class="prediction"><strong>Education:</strong> ${phase.education.prediction} (Score: ${phase.education.score})</div>`;
      output += `</div><hr>`;
    });

    setResult(output);
  };

  const fetchHoroscope = () => {
    const currentYear = new Date().getFullYear();
    const selectedYear = year === "current" ? currentYear : currentYear + 1;
    getHoroscope(zodiac, selectedYear);
  };

  return (
    <div className="container">
      <h1 className="heading">Yearly Horoscope Prediction</h1>

      <label htmlFor="zodiac">Select Your Zodiac Sign:</label>
      <select id="zodiac" value={zodiac} onChange={(e) => setZodiac(e.target.value)}>
        <option value="1">Aries</option>
        <option value="2">Taurus</option>
        <option value="3">Gemini</option>
        <option value="4">Cancer</option>
        <option value="5">Leo</option>
        <option value="6">Virgo</option>
        <option value="7">Libra</option>
        <option value="8">Scorpio</option>
        <option value="9">Sagittarius</option>
        <option value="10">Capricorn</option>
        <option value="11">Aquarius</option>
        <option value="12">Pisces</option>
      </select>

      <label htmlFor="year">Select the Year:</label>
      <select id="year" value={year} onChange={(e) => setYear(e.target.value)}>
        <option value="current">This Year</option>
        <option value="next">Next Year</option>
      </select>

      <button onClick={fetchHoroscope}>Get Predictions</button>

      <div id="result" dangerouslySetInnerHTML={{ __html: result }} />
    </div>
  );
};

export default YearlyHoroscope;
