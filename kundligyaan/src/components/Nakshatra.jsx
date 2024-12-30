import React, { useState } from "react";
import "./Nakshatra.css"; // Add your CSS here or adapt inline styles

const Nakshatra = () => {
    const [selectedNakshatra, setSelectedNakshatra] = useState("");
    const [date, setDate] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const nakshatraList = [
        "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashira", "Ardra",
        "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni",
        "Uttara Phalguni", "Hasta", "Chitra", "Swati",
    ];

    const handleNakshatraClick = (nakshatra) => {
        setSelectedNakshatra(nakshatra);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedNakshatra || !date) {
            setError("Please select both a nakshatra and a date.");
            return;
        }

        setError("");
        setLoading(true);
        setResult(null);

        try {
            const formattedDate = formatDate(date);
            const response = await fetchNakshatraPrediction(selectedNakshatra, formattedDate);
            setResult(response);
        } catch (err) {
            setError("Failed to fetch horoscope prediction.");
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const fetchNakshatraPrediction = async (nakshatra, formattedDate) => {
        const API_KEY = "366c154f-bc5a-5339-99a8-8993088e6d5c";
        const url = new URL("https://api.vedicastroapi.com/v3-json/prediction/daily-nakshatra");

        url.searchParams.append("nakshatra", nakshatra);
        url.searchParams.append("date", formattedDate);
        url.searchParams.append("api_key", API_KEY);

        const response = await fetch(url);
        const data = await response.json();
        return data.response;
    };

    return (
        <div className="nakshatra-container">
            <h1>Daily Horoscope Prediction</h1>
            <p>Select your nakshatra and enter a date to get your prediction.</p>

            <div className="nakshatra-wheel">
                {nakshatraList.map((nakshatra, index) => (
                    <button
                        key={index}
                        className={
                            selectedNakshatra === nakshatra ? "active" : ""
                        }
                        onClick={() => handleNakshatraClick(nakshatra)}
                    >
                        {nakshatra}
                    </button>
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
                    {loading ? "Getting Prediction..." : "Get Horoscope"}
                </button>
            </form>

            {error && <p className="error">{error}</p>}

            {loading && <p className="loading">Loading...</p>}

            {result && (
                <div className="result">
                    <p><strong>Lucky Color:</strong> <span className="lucky-color">{result.lucky_color || "N/A"}</span></p>
                    <p><strong>Lucky Numbers:</strong> {result.lucky_number ? result.lucky_number.join(", ") : "N/A"}</p>
                    <div><strong>Physique:</strong> {result.physique || "N/A"}</div>
                    <div><strong>Status:</strong> {result.status || "N/A"}</div>
                    <div><strong>Finances:</strong> {result.finances || "N/A"}</div>
                    <div><strong>Relationship:</strong> {result.relationship || "N/A"}</div>
                    <div><strong>Career:</strong> {result.career || "N/A"}</div>
                    <div><strong>Travel:</strong> {result.travel || "N/A"}</div>
                    <div><strong>Family:</strong> {result.family || "N/A"}</div>
                    <div><strong>Friends:</strong> {result.friends || "N/A"}</div>
                    <div><strong>Health:</strong> {result.health || "N/A"}</div>
                    <div><strong>Total Score:</strong> {result.total_score || "N/A"}</div>
                    <div><strong>Verdict:</strong> {result.bot_response || "N/A"}</div>
                </div>
            )}
        </div>
    );
};

export default Nakshatra;
