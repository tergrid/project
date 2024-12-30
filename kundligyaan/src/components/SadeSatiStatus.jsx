import React, { useState } from 'react';
import '../styles/SadeSatiStatus.css';

function SadeSatiStatus() {
    const [dob, setDob] = useState('');
    const [tobHour, setTobHour] = useState('');
    const [tobMinute, setTobMinute] = useState('');
    const [tobAmPm, setTobAmPm] = useState('AM');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [tz, setTz] = useState('');
    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Convert to 24-hour format if necessary
        let hour = parseInt(tobHour);
        if (tobAmPm === 'PM' && hour !== 12) {
            hour += 12;
        } else if (tobAmPm === 'AM' && hour === 12) {
            hour = 0;
        }

        const tob = `${hour}:${tobMinute}`;

        const url = "https://api.vedicastroapi.com/v3-json/extended-horoscope/current-sade-sati";
        const params = {
            lang: "en",
            dob: dob,
            tob: tob,
            lat: lat,
            lon: lon,
            tz: tz,
            api_key: "366c154f-bc5a-5339-99a8-8993088e6d5c"
        };

        setLoading(true);
        setError('');
        setResult('');

        fetch(`${url}?${new URLSearchParams(params)}`)
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                if (data.status === 200 && data.response) {
                    const { response } = data;
                    const resultCard = (
                        <div className="result-card">
                            <h4>Current Sade Sati Status:</h4>
                            <p><strong>Date Considered:</strong> {response.date_considered}</p>
                            <p><strong>Shani Period Type:</strong> {response.shani_period_type ? "Yes" : "No"}</p>
                            <p><strong>Bot Response:</strong> {response.bot_response}</p>
                            <p><strong>Description:</strong> {response.description}</p>
                            <p><strong>Saturn Retrograde:</strong> {response.saturn_retrograde ? "Yes" : "No"}</p>
                            <p><strong>Age:</strong> {response.age}</p>
                            <h4>Remedies:</h4>
                            <ul>
                                {response.remedies.map((remedy, index) => (
                                    <li key={index}>{remedy}</li>
                                ))}
                            </ul>
                        </div>
                    );
                    setResult(resultCard);
                } else {
                    setResult(<p className="error">No Sade Sati data available.</p>);
                }
            })
            .catch(() => {
                setLoading(false);
                setError('Error fetching data. Please try again later.');
            });
    };

    return (
        <div className="container">
            <h1>Find Your Current Sade Sati Status</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="dob">Date of Birth (DD/MM/YYYY):</label>
                <input
                    type="text"
                    id="dob"
                    name="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="26/12/2024"
                    required
                />

                <label htmlFor="tob">Time of Birth (12-hour format):</label>
                <div className="time-container">
                    <input
                        type="number"
                        id="tob-hour"
                        name="tob-hour"
                        value={tobHour}
                        onChange={(e) => setTobHour(e.target.value)}
                        placeholder="HH"
                        min="1"
                        max="12"
                        required
                    />
                    <input
                        type="number"
                        id="tob-minute"
                        name="tob-minute"
                        value={tobMinute}
                        onChange={(e) => setTobMinute(e.target.value)}
                        placeholder="MM"
                        min="0"
                        max="59"
                        required
                    />
                    <select
                        id="tob-am-pm"
                        name="tob-am-pm"
                        value={tobAmPm}
                        onChange={(e) => setTobAmPm(e.target.value)}
                        required
                    >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>

                <label htmlFor="lat">Latitude:</label>
                <input
                    type="text"
                    id="lat"
                    name="lat"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="29.4072"
                    required
                />

                <label htmlFor="lon">Longitude:</label>
                <input
                    type="text"
                    id="lon"
                    name="lon"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                    placeholder="77.1025"
                    required
                />

                <label htmlFor="tz">Time Zone:</label>
                <input
                    type="text"
                    id="tz"
                    name="tz"
                    value={tz}
                    onChange={(e) => setTz(e.target.value)}
                    placeholder="5.5"
                    required
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Loading..." : "Find Sade Sati Status"}
                </button>
            </form>

            {error && <p className="error">{error}</p>}
            <div id="result">
                {result}
            </div>
        </div>
    );
}

export default SadeSatiStatus;
