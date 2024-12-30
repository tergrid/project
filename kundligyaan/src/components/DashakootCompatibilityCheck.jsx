import React, { useState } from 'react';
import '../styles/DashakootCompatibilityCheck.css';  

const DashakootCompatibilityCheck = () => {
  const [result, setResult] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    // Get the form data
    const boyDob = document.getElementById("boy_dob").value;
    const boyTob = document.getElementById("boy_tob").value;
    const boyTz = document.getElementById("boy_tz").value;
    const boyLat = document.getElementById("boy_lat").value;
    const boyLon = document.getElementById("boy_lon").value;
    const girlDob = document.getElementById("girl_dob").value;
    const girlTob = document.getElementById("girl_tob").value;
    const girlTz = document.getElementById("girl_tz").value;
    const girlLat = document.getElementById("girl_lat").value;
    const girlLon = document.getElementById("girl_lon").value;

    // Prepare the API URL and parameters
    const url = `https://api.vedicastroapi.com/v3-json/matching/dashakoot`;
    const params = {
      lang: "en",
      api_key: "366c154f-bc5a-5339-99a8-8993088e6d5c",
      boy_dob: boyDob,
      boy_tob: boyTob,
      boy_tz: boyTz,
      boy_lat: boyLat,
      boy_lon: boyLon,
      girl_dob: girlDob,
      girl_tob: girlTob,
      girl_tz: girlTz,
      girl_lat: girlLat,
      girl_lon: girlLon,
    };

    // Perform the API request using fetch
    fetch(`${url}?${new URLSearchParams(params)}`)
      .then((response) => response.json())
      .then((data) => {
        // Handle the response and display it
        if (data.status === 200) {
          const result = data.response;
          const score = result.score;
          const botResponse = result.bot_response;
          let resultHtml = `<h3>Compatibility Results:</h3><p>${botResponse}</p><div class="result-summary">`;

          // Loop through the results and display each one in a card style
          Object.keys(result).forEach((key) => {
            if (key !== 'score' && key !== 'bot_response') {
              resultHtml += `
              <div class="result-card">
                  <h4>${result[key].name}:</h4>
                  <p><strong>Description:</strong> ${result[key].description}</p>
                  <p><strong>Score:</strong> ${result[key].full_score}</p>
              </div>
              `;
            }
          });

          resultHtml += `</div><div class="score"><strong>Compatibility Score:</strong> ${score}</div>`;
          setResult(resultHtml);
        } else {
          setResult("<p class='error'>There was an error fetching the compatibility result. Please try again.</p>");
        }
      })
      .catch((error) => {
        setResult("<p class='error'>There was an error with the API request.</p>");
        console.error(error);
      });
  };

  return (
    <div className="container">
      <h1 className="heading">Dashakoot Compatibility Check</h1>
      <form id="dashakootForm" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="boy_dob">Boy's Date of Birth (DD/MM/YYYY):</label>
          <input type="text" id="boy_dob" name="boy_dob" defaultValue="26/12/2024" />
        </div>

        <div className="form-group">
          <label htmlFor="boy_tob">Boy's Time of Birth (HH:MM):</label>
          <input type="text" id="boy_tob" name="boy_tob" defaultValue="14:06" />
        </div>

        <div className="form-group">
          <label htmlFor="boy_tz">Boy's Time Zone (in hours):</label>
          <input type="number" id="boy_tz" name="boy_tz" defaultValue="5.5" />
        </div>

        <div className="form-group">
          <label htmlFor="boy_lat">Boy's Latitude:</label>
          <input type="text" id="boy_lat" name="boy_lat" defaultValue="28.4075" />
        </div>

        <div className="form-group">
          <label htmlFor="boy_lon">Boy's Longitude:</label>
          <input type="text" id="boy_lon" name="boy_lon" defaultValue="72.1025" />
        </div>

        <div className="form-group">
          <label htmlFor="girl_dob">Girl's Date of Birth (DD/MM/YYYY):</label>
          <input type="text" id="girl_dob" name="girl_dob" defaultValue="26/12/2024" />
        </div>

        <div className="form-group">
          <label htmlFor="girl_tob">Girl's Time of Birth (HH:MM):</label>
          <input type="text" id="girl_tob" name="girl_tob" defaultValue="14:06" />
        </div>

        <div className="form-group">
          <label htmlFor="girl_tz">Girl's Time Zone (in hours):</label>
          <input type="number" id="girl_tz" name="girl_tz" defaultValue="5.5" />
        </div>

        <div className="form-group">
          <label htmlFor="girl_lat">Girl's Latitude:</label>
          <input type="text" id="girl_lat" name="girl_lat" defaultValue="28.4075" />
        </div>

        <div className="form-group">
          <label htmlFor="girl_lon">Girl's Longitude:</label>
          <input type="text" id="girl_lon" name="girl_lon" defaultValue="72.1025" />
        </div>

        <button type="submit">Get Compatibility</button>
      </form>

      <div id="result" dangerouslySetInnerHTML={{ __html: result }}></div>
    </div>
  );
};

export default DashakootCompatibilityCheck;
