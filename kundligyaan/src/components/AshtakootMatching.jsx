import React, { useState } from 'react';
import './AshtakootMatching.css';

function AshtakootMatching() {
    const [formData, setFormData] = useState({
        boy_dob: "26/12/2024",
        boy_tob: "14:06",
        boy_tz: 5.5,
        boy_lat: "28.4075",
        boy_lon: "72.1025",
        girl_dob: "26/12/2024",
        girl_tob: "14:06",
        girl_tz: 5.5,
        girl_lat: "28.4075",
        girl_lon: "72.1025"
    });
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const params = new URLSearchParams({
            lang: "en",
            api_key: "366c154f-bc5a-5339-99a8-8993088e6d5c",
            ...formData
        }).toString();

        const url = `https://api.vedicastroapi.com/v3-json/matching/ashtakoot?${params}`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.status === 200) {
                    const { score, bot_response, ...rest } = data.response;
                    setResult({
                        score,
                        bot_response,
                        details: rest
                    });
                    setError(null);
                } else {
                    setError("There was an error fetching the compatibility result. Please try again.");
                }
            })
            .catch(() => {
                setError("There was an error with the API request.");
            });
    };

    return (
        <div className="container">
            <h1 className="heading">Ashtakoot Compatibility Check</h1>
            <form onSubmit={handleSubmit}>
                {['boy', 'girl'].map((person) => (
                    <>
                        <div className="form-group" key={`dob-${person}`}>
                            <label htmlFor={`${person}_dob`}>{`${person.charAt(0).toUpperCase() + person.slice(1)}'s Date of Birth (DD/MM/YYYY):`}</label>
                            <input
                                type="text"
                                id={`${person}_dob`}
                                name={`${person}_dob`}
                                value={formData[`${person}_dob`]}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group" key={`tob-${person}`}>
                            <label htmlFor={`${person}_tob`}>{`${person.charAt(0).toUpperCase() + person.slice(1)}'s Time of Birth (HH:MM):`}</label>
                            <input
                                type="text"
                                id={`${person}_tob`}
                                name={`${person}_tob`}
                                value={formData[`${person}_tob`]}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group" key={`tz-${person}`}>
                            <label htmlFor={`${person}_tz`}>{`${person.charAt(0).toUpperCase() + person.slice(1)}'s Time Zone (in hours):`}</label>
                            <input
                                type="number"
                                id={`${person}_tz`}
                                name={`${person}_tz`}
                                value={formData[`${person}_tz`]}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group" key={`lat-${person}`}>
                            <label htmlFor={`${person}_lat`}>{`${person.charAt(0).toUpperCase() + person.slice(1)}'s Latitude:`}</label>
                            <input
                                type="text"
                                id={`${person}_lat`}
                                name={`${person}_lat`}
                                value={formData[`${person}_lat`]}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="form-group" key={`lon-${person}`}>
                            <label htmlFor={`${person}_lon`}>{`${person.charAt(0).toUpperCase() + person.slice(1)}'s Longitude:`}</label>
                            <input
                                type="text"
                                id={`${person}_lon`}
                                name={`${person}_lon`}
                                value={formData[`${person}_lon`]}
                                onChange={handleChange}
                            />
                        </div>
                    </>
                ))}
                <button type="submit">Get Compatibility</button>
            </form>

            {error && <p className="error">{error}</p>}

            {result && (
                <div id="result">
                    <h3>Compatibility Results:</h3>
                    <p>{result.bot_response}</p>
                    <div className="result-summary">
                        {Object.keys(result.details).map(key => (
                            <div key={key} className="result-card">
                                <h4>{result.details[key].name}:</h4>
                                <p><strong>Description:</strong> {result.details[key].description}</p>
                                <p><strong>Score:</strong> {result.details[key].full_score}</p>
                            </div>
                        ))}
                    </div>
                    <div className="score"><strong>Compatibility Score:</strong> {result.score}</div>
                </div>
            )}
        </div>
    );
}

export default AshtakootMatching;
