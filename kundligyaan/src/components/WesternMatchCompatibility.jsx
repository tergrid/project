import React, { useState } from 'react';
import '../styles/WesternMatchCompatibility.css';

const WesternMatchCompatibility = () => {
    const [boySign, setBoySign] = useState('');
    const [girlSign, setGirlSign] = useState('');
    const [result, setResult] = useState('');

    const fetchCompatibility = async () => {
        const apiUrl = 'https://api.vedicastroapi.com/v3-json/matching/western-match';
        const params = {
            api_key: '366c154f-bc5a-5339-99a8-8993088e6d5c',
            boy_sign: boySign,
            girl_sign: girlSign,
            lang: 'en'
        };

        try {
            const queryString = new URLSearchParams(params).toString();
            const response = await fetch(`${apiUrl}?${queryString}`);
            const data = await response.json();

            if (data.response) {
                displayMatchResult(data.response);
            } else {
                setResult(
                    <div className="error">
                        No compatibility data available. Please check your input or try again later.
                    </div>
                );
            }
        } catch (error) {
            setResult(
                <div className="error">Error fetching data. Please try again later.</div>
            );
        }
    };

    const displayMatchResult = (response) => {
        const score = response.score || 'Not available';
        const botResponse = response.bot_response || 'Not available';

        setResult(
            <div>
                <h2>Compatibility Result</h2>
                <p><strong>Overall Score:</strong> {score}%</p>
                <p><strong>Compatibility:</strong> {botResponse}</p>
            </div>
        );
    };

    return (
        <div className="container">
            <h1 className="heading">Western Zodiac Match</h1>
            <label htmlFor="boySign">Boy's Zodiac Sign:</label>
            <select
                id="boySign"
                value={boySign}
                onChange={(e) => setBoySign(e.target.value)}
                required
            >
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

            <label htmlFor="girlSign">Girl's Zodiac Sign:</label>
            <select
                id="girlSign"
                value={girlSign}
                onChange={(e) => setGirlSign(e.target.value)}
                required
            >
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

            <button onClick={fetchCompatibility}>Check Compatibility</button>

            <div id="result">{result || 'Select zodiac signs and click the button to see the compatibility result.'}</div>
        </div>
    );
};

export default WesternMatchCompatibility;
