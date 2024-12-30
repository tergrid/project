import React, { useState } from 'react';
import '../styles/NakshatraMatch.css';

const NakshatraMatch = () => {
  const [boyStar, setBoyStar] = useState('1');
  const [girlStar, setGirlStar] = useState('1');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = `https://api.vedicastroapi.com/v3-json/matching/nakshatra-match`;
    const params = {
      lang: 'en',
      api_key: '366c154f-bc5a-5339-99a8-8993088e6d5c',
      boy_star: boyStar,
      girl_star: girlStar,
    };

    try {
      const response = await fetch(`${url}?${new URLSearchParams(params)}`);
      const data = await response.json();
      
      if (data.status === 200) {
        setResult(data.response);
        setError('');
      } else {
        setError('There was an error fetching the match result. Please try again.');
        setResult(null);
      }
    } catch (error) {
      setError('There was an error with the API request.');
      setResult(null);
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h1 className="heading">Nakshatra Compatibility Check</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="boy_star">Boy's Nakshatra:</label>
          <select
            id="boy_star"
            name="boy_star"
            value={boyStar}
            onChange={(e) => setBoyStar(e.target.value)}
          >
            {/* Add all the Nakshatras as options */}
            {Array.from({ length: 27 }, (_, index) => (
              <option key={index} value={index + 1}>
                {['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'][index]}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="girl_star">Girl's Nakshatra:</label>
          <select
            id="girl_star"
            name="girl_star"
            value={girlStar}
            onChange={(e) => setGirlStar(e.target.value)}
          >
            {/* Add all the Nakshatras as options */}
            {Array.from({ length: 27 }, (_, index) => (
              <option key={index} value={index + 1}>
                {['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishta', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'][index]}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Get Match</button>
      </form>

      <div id="result">
        {error && <p className="error">{error}</p>}
        {result && (
          <div>
            <h3>Match Results:</h3>
            <p>{result.bot_response}</p>
            <div className="result-summary">
              {Object.keys(result).map((key) => {
                if (key !== 'score' && key !== 'bot_response') {
                  return (
                    <div key={key} className="result-card">
                      <h4>{result[key].name}:</h4>
                      <p><strong>Description:</strong> {result[key].description}</p>
                      <p><strong>Score:</strong> {result[key].full_score}</p>
                    </div>
                  );
                }
                return null;
              })}
            </div>
            <div className="score">
              <strong>Match Score:</strong> {result.score}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NakshatraMatch;
