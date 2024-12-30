import React, { useState } from "react";
import "../styles/YoginiDashaMain.css";

const YoginiDashaMain = () => {
    const [dob, setDob] = useState("");
    const [hour, setHour] = useState("");
    const [minute, setMinute] = useState("");
    const [ampm, setAmpm] = useState("AM");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [tz, setTz] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (event) => {
        event.preventDefault();
        fetchYogaDashaDetails();
    };

    const fetchYogaDashaDetails = async () => {
        setLoading(true);
        setResult(null);

        let hour24 = parseInt(hour);
        if (ampm === "PM" && hour24 !== 12) {
            hour24 += 12;
        }
        if (ampm === "AM" && hour24 === 12) {
            hour24 = 0;
        }
        const formattedTime = `${hour24}:${minute}`;

        const url = "https://api.vedicastroapi.com/v3-json/dashas/yogini-dasha-main";
        const params = {
            lang: "en",
            api_key: "366c154f-bc5a-5339-99a8-8993088e6d5c",
            dob,
            tob: formattedTime,
            lat,
            lon,
            tz,
        };

        try {
            const response = await fetch(`${url}?${new URLSearchParams(params)}`);
            const data = await response.json();
            setLoading(false);

            if (data.status === 200 && data.response) {
                setResult(data.response);
            } else {
                setResult({ error: "No Yogini Dasha data available." });
            }
        } catch (error) {
            setLoading(false);
            setResult({ error: "Error fetching data. Please try again later." });
        }
    };

    return (
        <div className="container">
            <h1>Yogini Dasha Main Details</h1>
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
                    <select
                        value={ampm}
                        onChange={(e) => setAmpm(e.target.value)}
                        required
                    >
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
                <button type="submit">Fetch Yogini Dasha Info</button>
            </form>

            {loading && <div className="loader">Loading...</div>}

            {result && (
                <div id="result" className="result">
                    {result.error ? (
                        <p className="error">{result.error}</p>
                    ) : (
                        <>
                            <div className="result-card">
                                <h4>Dasha List</h4>
                                {result.dasha_list.map((dasha, index) => (
                                    <p key={index}>
                                        Dasha {index + 1}: {dasha}
                                    </p>
                                ))}
                            </div>
                            <div className="result-card">
                                <h4>Dasha Lords</h4>
                                {result.dasha_lord_list.map((lord, index) => (
                                    <p key={index}>
                                        Dasha {index + 1}: {lord}
                                    </p>
                                ))}
                            </div>
                            <div className="result-card">
                                <h4>Dasha End Dates</h4>
                                {result.dasha_end_dates.map((endDate, index) => (
                                    <p key={index}>
                                        Dasha {index + 1}: {new Date(endDate).toLocaleString()}
                                    </p>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default YoginiDashaMain;
