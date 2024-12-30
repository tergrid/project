import React, { useState } from 'react';
import '../styles/YoginiDashaSub.css';

const YoginiDashaSub = () => {
    const [dob, setDob] = useState('');
    const [hour, setHour] = useState('');
    const [minute, setMinute] = useState('');
    const [ampm, setAmpm] = useState('AM');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [tz, setTz] = useState('');
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchYogaDashaSubDetails();
    };

    const fetchYogaDashaSubDetails = async () => {
        setLoading(true);
        setResult(null);

        let hour24 = parseInt(hour);
        if (ampm === 'PM' && hour24 !== 12) {
            hour24 += 12;
        }
        if (ampm === 'AM' && hour24 === 12) {
            hour24 = 0;
        }
        const formattedTime = `${hour24}:${minute}`;

        const url = 'https://api.vedicastroapi.com/v3-json/dashas/yogini-dasha-sub';
        const params = {
            lang: 'en',
            api_key: '366c154f-bc5a-5339-99a8-8993088e6d5c',
            dob,
            tob: formattedTime,
            lat,
            lon,
            tz
        };

        try {
            const response = await fetch(`${url}?${new URLSearchParams(params)}`);
            const data = await response.json();
            setLoading(false);

            if (data.status === 200 && data.response) {
                setResult(data.response);
            } else {
                setResult({ error: 'No Yogini Dasha Sub data available.' });
            }
        } catch (error) {
            setLoading(false);
            setResult({ error: 'Error fetching data. Please try again later.' });
        }
    };

    return (
        <div className="container">
            <h1>Yogini Dasha Sub Details</h1>
            <form onSubmit={handleSubmit}>
                <label>Date of Birth (DD/MM/YYYY):</label>
                <input
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="26/12/2024"
                    required
                />

                <label>Time of Birth (12-hour format):</label>
                <div className="time-container">
                    <input
                        type="text"
                        value={hour}
                        onChange={(e) => setHour(e.target.value)}
                        placeholder="HH"
                        maxLength="2"
                        required
                    />
                    <input
                        type="text"
                        value={minute}
                        onChange={(e) => setMinute(e.target.value)}
                        placeholder="MM"
                        maxLength="2"
                        required
                    />
                    <select value={ampm} onChange={(e) => setAmpm(e.target.value)} required>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>

                <label>Latitude:</label>
                <input
                    type="text"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    placeholder="29.4072"
                    required
                />
                <label>Longitude:</label>
                <input
                    type="text"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                    placeholder="78.1025"
                    required
                />
                <label>Time Zone:</label>
                <input
                    type="text"
                    value={tz}
                    onChange={(e) => setTz(e.target.value)}
                    placeholder="5.5"
                    required
                />
                <button type="submit">Fetch Yogini Dasha Sub Info</button>
            </form>

            {loading && <div className="loader">Loading...</div>}

            {result && (
                <div id="result" className="result">
                    {result.error ? (
                        <p className="error">{result.error}</p>
                    ) : (
                        result.map((item, index) => (
                            <div key={index}>
                                <div className="result-card">
                                    <h4>Main Dasha: {item.main_dasha} ({item.main_dasha_lord})</h4>
                                    <p>Start Date: {new Date(item.sub_dasha_start_dates).toLocaleString()}</p>
                                </div>

                                <div className="result-card">
                                    <h4>Sub Dashas</h4>
                                    {item.sub_dasha_list.map((subDasha, idx) => (
                                        <p key={idx}>Sub Dasha {idx + 1}: {subDasha}</p>
                                    ))}
                                </div>

                                <div className="result-card">
                                    <h4>Sub Dasha End Dates</h4>
                                    {item.sub_dasha_end_dates.map((endDate, idx) => (
                                        <p key={idx}>Sub Dasha {idx + 1}: {new Date(endDate).toLocaleString()}</p>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default YoginiDashaSub;
