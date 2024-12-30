import React, { useState } from "react";
import '../styles/AshtakvargaAnalysis.css';

const AshtakvargaAnalysis = () => {
  const [dob, setDob] = useState("");
  const [tob, setTob] = useState("");
  const [lat, setLat] = useState("");
  const [lon, setLon] = useState("");
  const [tz, setTz] = useState("");
  const [result, setResult] = useState("");

  const fetchAshtakvarga = async (e) => {
    e.preventDefault();

    // Validate inputs
    if (!dob || !tob || !lat || !lon || !tz) {
      alert("Please fill all the details.");
      return;
    }

    // API URL and parameters for Ashtakvarga
    const url = "https://api.vedicastroapi.com/v3-json/horoscope/ashtakvarga";
    const params = {
      api_key: "366c154f-bc5a-5339-99a8-8993088e6d5c",
      dob: dob,
      tob: tob,
      lat: lat,
      lon: lon,
      tz: tz,
      lang: "en"
    };

    try {
      const response = await fetch(url + "?" + new URLSearchParams(params));
      const data = await response.json();

      if (data.status === 200) {
        const result = data.response;
        const order = result.ashtakvarga_order;
        const points = result.ashtakvarga_points;
        const total = result.ashtakvarga_total;

        let output = `<h2>Ashtakvarga Analysis</h2>`;
        output += `<h3>Points for Each Planet:</h3><table border="1" style="width:100%; margin: 20px 0; border-collapse: collapse;">
                    <tr><th>Planet</th><th>Points</th></tr>`;

        order.forEach((planet, index) => {
          output += `<tr><td>${planet}</td><td>${total[index]}</td></tr>`;
        });

        output += `</table>`;

        output += `<h3>Detailed Points Table:</h3>
                    <table border="1" style="width:100%; margin: 20px 0; border-collapse: collapse;">
                    <tr><th>Planet</th>${Array.from({ length: points[0].length }, (_, i) => `<th>Point ${i + 1}</th>`).join('')}</tr>`;

        order.forEach((planet, index) => {
          output += `<tr><td>${planet}</td>`;
          points[index].forEach(point => {
            output += `<td>${point}</td>`;
          });
          output += `</tr>`;
        });

        output += `</table>`;

        setResult(output);
      } else {
        setResult("There was an error fetching the Ashtakvarga data. Please try again.");
      }
    } catch (error) {
      console.error("Error fetching Ashtakvarga data:", error);
      setResult("There was an error fetching the Ashtakvarga data. Please try again.");
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Ashtakvarga Analysis</h1>
      <form onSubmit={fetchAshtakvarga}>
        <label htmlFor="dob">Date of Birth:</label>
        <input
          type="text"
          id="dob"
          placeholder="DD/MM/YYYY"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
        />

        <label htmlFor="tob">Time of Birth:</label>
        <input
          type="text"
          id="tob"
          placeholder="HH:MM"
          value={tob}
          onChange={(e) => setTob(e.target.value)}
        />

        <label htmlFor="lat">Latitude:</label>
        <input
          type="text"
          id="lat"
          placeholder="e.g. 28.7041"
          value={lat}
          onChange={(e) => setLat(e.target.value)}
        />

        <label htmlFor="lon">Longitude:</label>
        <input
          type="text"
          id="lon"
          placeholder="e.g. 77.1025"
          value={lon}
          onChange={(e) => setLon(e.target.value)}
        />

        <label htmlFor="tz">Timezone (in hours, e.g. 5.5 for India):</label>
        <input
          type="number"
          step="0.1"
          id="tz"
          placeholder="e.g. 5.5"
          min="-12"
          max="14"
          value={tz}
          onChange={(e) => setTz(e.target.value)}
        />

        <button type="submit">Get Ashtakvarga</button>
      </form>

      <div id="result" dangerouslySetInnerHTML={{ __html: result }} />
    </div>
  );
};

export default AshtakvargaAnalysis;
