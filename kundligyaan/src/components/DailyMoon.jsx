import React, { useState } from 'react';
import './DailyMoon.css';

const DailyMoon = () => {
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [date, setDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const zodiacMap = {
    aries: 1,
    taurus: 2,
    gemini: 3,
    cancer: 4,
    leo: 5,
    virgo: 6,
    libra: 7,
    scorpio: 8,
    sagittarius: 9,
    capricorn: 10,
    aquarius: 11,
    pisces: 12,
  };

  const handleZodiacClick = (zodiac) => {
    setSelectedZodiac(zodiac);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedZodiac || !date) {
      setError('Please select both a zodiac sign and a date.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const zodiacNumber = zodiacMap[selectedZodiac];
      const formattedDate = formatDate(date);
      const response = await getHoroscope(zodiacNumber, formattedDate);

      if (response && response.response) {
        setResult(response.response);
      } else {
        setError('No prediction available for this date and zodiac. Please try another date.');
      }
    } catch (err) {
      setError(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date)) return null;
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getHoroscope = async (zodiacNumber, formattedDate) => {
    const API_KEY = '366c154f-bc5a-5339-99a8-8993088e6d5c';
    const url = new URL('https://api.vedicastroapi.com/v3-json/prediction/daily-moon');

    url.searchParams.append('api_key', API_KEY);
    url.searchParams.append('date', formattedDate);
    url.searchParams.append('zodiac', zodiacNumber);
    url.searchParams.append('show_same', 'true');
    url.searchParams.append('split', 'true');
    url.searchParams.append('type', 'big');
    url.searchParams.append('lang', 'en');

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }
    return response.json();
  };

  return (
    <div className="horoscope-container">
      <div className="horoscope-form">
        <h1>Daily Horoscope Prediction</h1>
        <div className="form-heading">Enter your zodiac sign and date to get the horoscope prediction</div>

        <div className="zodiac-images">
          {Object.keys(zodiacMap).map((zodiac) => (
            <img
              key={zodiac}
              src={`${zodiac}.png`}
              alt={zodiac}
              className={selectedZodiac === zodiac ? 'selected' : ''}
              onClick={() => handleZodiacClick(zodiac)}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? 'Getting Prediction...' : 'Get Horoscope'}
          </button>
        </form>

        {error && <p className="error">{error}</p>}

        {loading && <div className="loading">Loading...</div>}

        {result && (
          <div className="result">
            <p>
              <strong>Lucky Color:</strong> <span className="lucky-color">{result.lucky_color}</span>
            </p>
            <p>
              <strong>Lucky Numbers:</strong> {result.lucky_number.join(', ')}
            </p>
            {Object.keys(result.bot_response).map((key) => (
              <div key={key} className="section">
                <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {result.bot_response[key].split_response}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DailyMoon;
