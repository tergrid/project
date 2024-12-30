import React, { useState } from 'react';
import '../styles/YogaList.css';

const YogaList = () => {
    const [dob, setDob] = useState('');
    const [hh, setHh] = useState('');
    const [mm, setMm] = useState('');
    const [amPm, setAmPm] = useState('AM');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [tz, setTz] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState('');

    const fetchYogaDetails = async (event) => {
        event.preventDefault();
        setLoading(true);
        setResults('');

        const apiKey = '366c154f-bc5a-5339-99a8-8993088e6d5c'; // Provided API key
        let timeIn24Hr = convertTo24HrFormat(hh, mm, amPm);

        const url = 'https://api.vedicastroapi.com/v3-json/extended-horoscope/yoga-list';
        const params = {
            lang: 'en',
            dob: dob,
            tob: timeIn24Hr,
            lat: lat,
            lon: lon,
            tz: tz,
            api_key: apiKey
        };

        try {
            const response = await fetch(url + '?' + new URLSearchParams(params));
            const data = await response.json();

            setLoading(false);
            if (data.status === 200 && data.response) {
                displayResults(data.response.yogas_list);
            } else {
                setResults(<p className="error">Error: {data.status || 'Unknown error'}</p>);
            }
        } catch (error) {
            setLoading(false);
            setResults(<p className="error">Error: {error.message}</p>);
        }
    };

    const convertTo24HrFormat = (hh, mm, amPm) => {
        let hours = parseInt(hh);
        if (amPm === 'PM' && hours !== 12) {
            hours += 12;
        } else if (amPm === 'AM' && hours === 12) {
            hours = 0; // Midnight case
        }

        let minutes = mm.padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const displayResults = (yogas) => {
        const resultElements = yogas.map((yoga, index) => (
            <div className="result-card" key={index}>
                <h4>{yoga.yoga}</h4>
                <p><strong>Meaning:</strong> {yoga.meaning}</p>
                <p><strong>Strength:</strong> {yoga.strength_in_percentage}%</p>
                <p><strong>Planets Involved:</strong> {yoga.planets_involved.join(', ')}</p>
                <p><strong>Houses Involved:</strong> {yoga.houses_involved.join(', ')}</p>
            </div>
        ));
        setResults(resultElements);
    };

    return (
        <div className="container">
            <h1>Yoga List</h1>

            <form onSubmit={fetchYogaDetails}>
                <label htmlFor="dob">Date of Birth (DD/MM/YYYY):</label>
                <input
                    type="text"
                    id="dob"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="26/12/2024"
                    required
                />

                <label htmlFor="tob">Time of Birth (HH:MM):</label>
                <div className="time-container">
                    <input
                        type="number"
                        id="hh"
                        value={hh}
                        onChange={(e) => setHh(e.target.value)}
                        placeholder="HH"
                        min="1"
                        max="12"
                        required
                    />
                    <input
                        type="number"
                        id="mm"
                        value={mm}
                        onChange={(e) => setMm(e.target.value)}
                        placeholder="MM"
                        min="0"
                        max="59"
                        required
                    />
                    <select
                        id="amPm"
                        value={amPm}
                        onChange={(e) => setAmPm(e.target.value)}
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

                <button type="submit">Get Yoga List</button>
            </form>

            {loading && <div id="loading" className="loader">Loading...</div>}

            <div id="results">{results || ''}</div>
        </div>
    );
};

export default YogaList;
