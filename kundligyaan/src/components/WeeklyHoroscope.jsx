import React, { useState } from 'react';
import './WeeklyHoroscope.css';

const WeeklyHoroscope = () => {
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('thisweek');
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
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedZodiac || !selectedDate) {
      setError('Please select both a zodiac sign and a date.');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const formattedDate = formatDate(selectedDate);
      const zodiacNumber = zodiacMap[selectedZodiac.toLowerCase()];
      const response = await fetchHoroscope(zodiacNumber, selectedWeek, formattedDate);

      if (response && response.response) {
        setResult(response.response);
      } else {
        setError('No prediction available for this date and zodiac. Please try another date.');
      }
    } catch (err) {
      setError('Error fetching horoscope: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const fetchHoroscope = async (zodiacNumber, week, date) => {
    const apiUrl = `https://api.vedicastroapi.com/v3-json/prediction/weekly-sun`;
    const params = {
      api_key: '366c154f-bc5a-5339-99a8-8993088e6d5c',
      week,
      zodiac: zodiacNumber,
      show_same: true,
      split: true,
      type: 'big',
      lang: 'en',
    };

    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${apiUrl}?${queryString}`);
    if (!response.ok) {
      throw new Error('Failed to fetch horoscope data.');
    }
    return await response.json();
  };

  return (
    <div className="container">
      <h1>Horoscope Prediction</h1>
      <form onSubmit={handleSubmit}>
        <label>Select Zodiac Sign:</label>
        <div className="zodiac-images">
          {Object.keys(zodiacMap).map((zodiac) => (
            <img
              key={zodiac}
              src={`${zodiac}.png`}
              alt={zodiac}
              data-zodiac={zodiac}
              onClick={() => handleZodiacClick(zodiac)}
              style={{
                border: selectedZodiac === zodiac ? '2px solid #4a90e2' : 'none',
              }}
            />
          ))}
        </div>

        <label htmlFor="date">Enter Date:</label>
        <input
          type="date"
          id="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          required
        />

        <label htmlFor="week">Select Week:</label>
        <select
          id="week"
          value={selectedWeek}
          onChange={(e) => setSelectedWeek(e.target.value)}
        >
          <option value="thisweek">This Week</option>
          <option value="nextweek">Next Week</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? 'Getting Prediction...' : 'Get Horoscope'}
        </button>
      </form>

      {error && <p className="error">{error}</p>}

      {loading && <div className="loading">Loading...</div>}

      {result && (
        <div id="result">
          <p><strong>Lucky Color:</strong> {result.lucky_color || 'Not available'}</p>
          <p><strong>Lucky Numbers:</strong> {result.lucky_number?.join(', ') || 'Not available'}</p>
          {Object.entries(result.bot_response || {}).map(([key, value]) => (
            <div key={key} className="section">
              <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value.split_response || 'Not available'}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WeeklyHoroscope;
