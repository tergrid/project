import React, { useState } from 'react';
import './DailySun.css'; // Assuming styles are moved to a CSS file.

const DailySun = () => {
    const [selectedZodiac, setSelectedZodiac] = useState('');
    const [date, setDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const zodiacImages = [
        { name: 'Aries', src: 'aries.png' },
        { name: 'Taurus', src: 'taurus.png' },
        { name: 'Gemini', src: 'gemini.png' },
        { name: 'Cancer', src: 'cancer.png' },
        { name: 'Leo', src: 'leo.png' },
        { name: 'Virgo', src: 'virgo.png' },
        { name: 'Libra', src: 'libra.png' },
        { name: 'Scorpio', src: 'scorpio.png' },
        { name: 'Sagittarius', src: 'sagittarius.png' },
        { name: 'Capricorn', src: 'capricorn.png' },
        { name: 'Aquarius', src: 'aquarius.png' },
        { name: 'Pisces', src: 'pisces.png' },
    ];

    const getZodiacNumber = (zodiacSign) => {
        const zodiacMap = {
            Aries: 1,
            Taurus: 2,
            Gemini: 3,
            Cancer: 4,
            Leo: 5,
            Virgo: 6,
            Libra: 7,
            Scorpio: 8,
            Sagittarius: 9,
            Capricorn: 10,
            Aquarius: 11,
            Pisces: 12,
        };
        return zodiacMap[zodiacSign] || null;
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const fetchHoroscope = async (zodiacNumber, formattedDate) => {
        const API_KEY = '366c154f-bc5a-5339-99a8-8993088e6d5c';
        const url = new URL('https://api.vedicastroapi.com/v3-json/prediction/daily-sun');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectedZodiac || !date) {
            setError('Please select both a zodiac sign and a date.');
            return;
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const zodiacNumber = getZodiacNumber(selectedZodiac);
            const formattedDate = formatDate(date);
            const response = await fetchHoroscope(zodiacNumber, formattedDate);

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

    return (
        <div id="horoscopeForm">
            <h1>Daily Horoscope Prediction</h1>
            <div className="form-heading">Enter your zodiac sign and date to get the horoscope prediction</div>

            <div className="zodiac-images">
                {zodiacImages.map((zodiac) => (
                    <img
                        key={zodiac.name}
                        src={zodiac.src}
                        alt={zodiac.name}
                        data-zodiac={zodiac.name}
                        onClick={() => setSelectedZodiac(zodiac.name)}
                        style={{ border: selectedZodiac === zodiac.name ? '2px solid #4a90e2' : '' }}
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
                <div id="result">
                    <p>
                        <strong>Lucky Color:</strong> <span className="lucky-color">{result.lucky_color}</span>
                    </p>
                    <p>
                        <strong>Lucky Numbers:</strong> {result.lucky_number.join(', ')}
                    </p>
                    {Object.entries(result.bot_response).map(([key, value]) => (
                        <div key={key} className="section">
                            <strong>{key.charAt(0).toUpperCase() + key.slice(1)}:</strong> {value.split_response}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default DailySun;
