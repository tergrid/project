import React, { useState } from 'react';
import '../styles/FindSunSign.css';

const FindSunSign = () => {
    const [dob, setDob] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [ampm, setAmpm] = useState('AM');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [tz, setTz] = useState('');
    const [result, setResult] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Convert time to 24-hour format
        let hour24 = parseInt(hour);
        if (ampm === "PM" && hour24 !== 12) {
            hour24 += 12;
        }
        if (ampm === "AM" && hour24 === 12) {
            hour24 = 0;
        }
        const formattedTime = `${hour24}:${minute}`;

        const apiKey = "366c154f-bc5a-5339-99a8-8993088e6d5c";
        const url = "https://api.vedicastroapi.com/v3-json/extended-horoscope/find-sun-sign";
        const params = {
            lang: "en",
            api_key: apiKey,
            dob,
            tob: formattedTime,
            lat,
            lon,
            tz,
        };

        fetch(`${url}?${new URLSearchParams(params)}`)
            .then(response => response.json())
            .then(data => {
                if (data.status === 200 && data.response) {
                    setResult(data.response);
                } else {
                    setResult({ error: "No Sun Sign data available." });
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setResult({ error: "Error fetching data. Please try again later." });
            });
    };

    return (
        <div className="container">
            <h1>Find Your Sun Sign</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="dob">Date of Birth (DD/MM/YYYY):</label>
                <input
                    type="text"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="26/12/2024"
                    required
                />

                <label htmlFor="tob">Time of Birth (12-hour format):</label>
                <div className="time-container">
                    <input
                        type="text"
                        id="tob-hour"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        placeholder="HH"
                        maxLength="2"
                        required
                    />
                    <input
                        type="text"
                        id="tob-minute"
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                        placeholder="MM"
                        maxLength="2"
                        required
                    />
                    <select
                        id="tob-am-pm"
                        value={ampm}
                        onChange={(e) => setAmpm(e.target.value)}
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
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="29.4072"
                    required
                />

                <label htmlFor="lon">Longitude:</label>
                <input
                    type="text"
                    id="lon"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                    placeholder="77.1025"
                    required
                />

                <label htmlFor="tz">Time Zone:</label>
                <input
                    type="text"
                    id="tz"
                    value={tz}
                    onChange={(e) => setTz(e.target.value)}
                    placeholder="5.5"
                    required
                />

                <button type="submit">Find Sun Sign</button>
            </form>

            <div id="result" className="result">
                {result && result.error ? (
                    <p className="error">{result.error}</p>
                ) : (
                    result && (
                        <div className="result-card">
                            <h4>Your Sun Sign:</h4>
                            <p><strong>Sun Sign:</strong> {result.sun_sign}</p>
                            <p><strong>Prediction:</strong> {result.prediction}</p>
                        </div>
                    )
                )}
            </div>
        </div>
    );
};

export default FindSunSign;
