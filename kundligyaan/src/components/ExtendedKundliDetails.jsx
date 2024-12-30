import React, { useState } from 'react';
import '../styles/ExtendedKundliDetails.css';
const ExtendedKundliDetails = () => {
    const [dob, setDob] = useState('');
    const [hh, setHh] = useState('');
    const [mm, setMm] = useState('');
    const [amPm, setAmPm] = useState('AM');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [tz, setTz] = useState('');
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState(null);
    const [error, setError] = useState('');

    // Function to handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        fetchKundliDetails();
    };

    // Function to convert time to 24-hour format
    const convertTo24HrFormat = (hh, mm, amPm) => {
        let hours = parseInt(hh);
        if (amPm === 'PM' && hours !== 12) {
            hours += 12;
        } else if (amPm === 'AM' && hours === 12) {
            hours = 0; // Midnight case
        }

        // Ensure minutes are two digits
        let minutes = mm.padStart(2, '0');
        return `${hours}:${minutes}`;
    };

    const fetchKundliDetails = () => {
        setLoading(true);
        setError('');
        setResults(null);

        const timeIn24Hr = convertTo24HrFormat(hh, mm, amPm);
        const apiKey = "366c154f-bc5a-5339-99a8-8993088e6d5c"; // Provided API key

        const url = "https://api.vedicastroapi.com/v3-json/extended-horoscope/extended-kundli-details";
        const params = {
            lang: "en",
            dob,
            tob: timeIn24Hr,
            lat,
            lon,
            tz,
            api_key: apiKey,
        };

        fetch(url + "?" + new URLSearchParams(params))
            .then(response => response.json())
            .then(data => {
                setLoading(false);
                if (data.status === 200 && data.response) {
                    setResults(data.response);
                } else {
                    setError(data.status || 'Unknown error');
                }
            })
            .catch(error => {
                setLoading(false);
                setError(error.message);
            });
    };

    return (
        <div className="container">
            <h1>Extended Kundli Details</h1>

            {/* Form for user inputs */}
            <form onSubmit={handleSubmit}>
                <label htmlFor="dob">Date of Birth (DD/MM/YYYY):</label>
                <input
                    type="text"
                    id="dob"
                    placeholder="26/12/2024"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    required
                />

                <label htmlFor="tob">Time of Birth (HH:MM):</label>
                <div className="time-container">
                    <input
                        type="number"
                        id="hh"
                        placeholder="HH"
                        min="1"
                        max="12"
                        value={hh}
                        onChange={(e) => setHh(e.target.value)}
                        required
                    />
                    <input
                        type="number"
                        id="mm"
                        placeholder="MM"
                        min="0"
                        max="59"
                        value={mm}
                        onChange={(e) => setMm(e.target.value)}
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
                    placeholder="29.4072"
                    value={lat}
                    onChange={(e) => setLat(e.target.value)}
                    required
                />

                <label htmlFor="lon">Longitude:</label>
                <input
                    type="text"
                    id="lon"
                    placeholder="77.1025"
                    value={lon}
                    onChange={(e) => setLon(e.target.value)}
                    required
                />

                <label htmlFor="tz">Time Zone:</label>
                <input
                    type="text"
                    id="tz"
                    placeholder="5.5"
                    value={tz}
                    onChange={(e) => setTz(e.target.value)}
                    required
                />

                <button type="submit">Get Kundli Details</button>
            </form>

            {loading && <div className="loader">Loading...</div>}

            {error && <div className="error">Error: {error}</div>}

            {results && (
                <div id="results">
                    <div className="result-card">
                        <h4>Extended Kundli Details</h4>
                        <p><strong>Gana:</strong> {results.gana}</p>
                        <p><strong>Yoni:</strong> {results.yoni}</p>
                        <p><strong>Vasya:</strong> {results.vasya}</p>
                        <p><strong>Nadi:</strong> {results.nadi}</p>
                        <p><strong>Varna:</strong> {results.varna}</p>
                        <p><strong>Paya:</strong> {results.paya}</p>
                        <p><strong>Tatva:</strong> {results.tatva}</p>
                        <p><strong>Life Stone:</strong> {results.life_stone}</p>
                        <p><strong>Lucky Stone:</strong> {results.lucky_stone}</p>
                        <p><strong>Fortune Stone:</strong> {results.fortune_stone}</p>
                        <p><strong>Name Starts With:</strong> {results.name_start}</p>
                        <p><strong>Ascendant Sign:</strong> {results.ascendant_sign}</p>
                        <p><strong>Ascendant Nakshatra:</strong> {results.ascendant_nakshatra}</p>
                        <p><strong>Rasi:</strong> {results.rasi}</p>
                        <p><strong>Rasi Lord:</strong> {results.rasi_lord}</p>
                        <p><strong>Nakshatra:</strong> {results.nakshatra}</p>
                        <p><strong>Nakshatra Lord:</strong> {results.nakshatra_lord}</p>
                        <p><strong>Nakshatra Pada:</strong> {results.nakshatra_pada}</p>
                        <p><strong>Sun Sign:</strong> {results.sun_sign}</p>
                        <p><strong>Tithi:</strong> {results.tithi}</p>
                        <p><strong>Karana:</strong> {results.karana}</p>
                        <p><strong>Yoga:</strong> {results.yoga}</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ExtendedKundliDetails;
