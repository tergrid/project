import React, { useState } from 'react';
import './WeeklyHoroscope.css';

const WeeklyHoroMoon = () => {
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [date, setDate] = useState('');
  const [selectedWeek, setSelectedWeek] = useState('thisweek');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

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
    pisces: 12
  };

  const handleZodiacSelect = (zodiac) => {
    setSelectedZodiac(zodiac);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedZodiac || !date) {
      setResult('Please select both a zodiac sign and a date.');
      return;
    }

    setLoading(true);
    setResult('');

    const zodiacNumber = zodiacMap[selectedZodiac];
    const formattedDate = formatDate(date);

    try {
      const response = await getHoroscope(zodiacNumber, selectedWeek, formattedDate);
      if (response && response.response) {
        const horoscope = response.response;

        const botResponse = horoscope.bot_response || {};
        const data = {
          luckyColor: horoscope.lucky_color || 'Not available',
          luckyNumbers: horoscope.lucky_number?.join(', ') || 'Not available',
          physique: botResponse.physique?.split_response || 'Not available',
          status: botResponse.status?.split_response || 'Not available',
          finances: botResponse.finances?.split_response || 'Not available',
          relationship: botResponse.relationship?.split_response || 'Not available',
          career: botResponse.career?.split_response || 'Not available',
          travel: botResponse.travel?.split_response || 'Not available',
          family: botResponse.family?.split_response || 'Not available',
          friends: botResponse.friends?.split_response || 'Not available',
          health: botResponse.health?.split_response || 'Not available',
          totalScore: botResponse.total_score?.split_response || 'Not available'
        };

        setResult(
          <div>
            <p><strong>Lucky Color:</strong> {data.luckyColor}</p>
            <p><strong>Lucky Numbers:</strong> {data.luckyNumbers}</p>
            <p><strong>Physique:</strong> {data.physique}</p>
            <p><strong>Status:</strong> {data.status}</p>
            <p><strong>Finances:</strong> {data.finances}</p>
            <p><strong>Relationship:</strong> {data.relationship}</p>
            <p><strong>Career:</strong> {data.career}</p>
            <p><strong>Travel:</strong> {data.travel}</p>
            <p><strong>Family:</strong> {data.family}</p>
            <p><strong>Friends:</strong> {data.friends}</p>
            <p><strong>Health:</strong> {data.health}</p>
            <p><strong>Total Score:</strong> {data.totalScore}</p>
          </div>
        );
      } else {
        setResult('No prediction available for this date and zodiac. Please try another date.');
      }
    } catch (error) {
      setResult(`Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getHoroscope = async (zodiacNumber, week, date) => {
    const apiUrl = `https://api.vedicastroapi.com/v3-json/prediction/weekly-moon`;
    const params = {
      api_key: '366c154f-bc5a-5339-99a8-8993088e6d5c',
      week,
      zodiac: zodiacNumber,
      show_same: true,
      split: true,
      type: 'big',
      lang: 'en'
    };

    const queryString = new URLSearchParams(params).toString();
    const response = await fetch(`${apiUrl}?${queryString}`);
    if (!response.ok) {
      throw new Error('Failed to fetch horoscope data.');
    }
    return await response.json();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
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
              className={selectedZodiac === zodiac ? 'selected' : ''}
              onClick={() => handleZodiacSelect(zodiac)}
            />
          ))}
        </div>

        <label htmlFor="date">Enter Date:</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
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

      {result && (
        <div id="result">
          {typeof result === 'string' ? <p>{result}</p> : result}
        </div>
      )}
    </div>
  );
};

export default WeeklyHoroMoon;
