import React, { useState } from 'react';
import '../styles/PlanetaryAspects.css';

function PlanetaryAspects() {
    const [dob, setDob] = useState('');
    const [tob, setTob] = useState('');
    const [lat, setLat] = useState('');
    const [lon, setLon] = useState('');
    const [tz, setTz] = useState('');
    const [chartType, setChartType] = useState('D1');
    const [chartData, setChartData] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchHoroscopeChart = () => {
        if (!dob || !tob || !lat || !lon || !tz) {
            alert("Please fill all the details.");
            return;
        }

        setLoading(true);
        setError('');

        const params = {
            api_key: "366c154f-bc5a-5339-99a8-8993088e6d5c",
            dob,
            tob,
            lat,
            lon,
            tz,
            lang: "en",
            style: "north",
            div: chartType,
            color: "#800000"
        };

        const url = "https://api.vedicastroapi.com/v3-json/horoscope/chart-image";

        fetch(url + "?" + new URLSearchParams(params))
            .then(response => response.text())
            .then(data => {
                setChartData(data);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching horoscope chart:", error);
                setError("There was an error fetching the horoscope chart. Please try again.");
                setLoading(false);
            });
    };

    return (
        <div className="container">
            <h1 className="heading">Horoscope Chart Image</h1>

            {/* Input Form */}
            <div>
                <label htmlFor="dob">Date of Birth (DD/MM/YYYY):</label>
                <input type="text" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} placeholder="e.g. 21/01/2003" />

                <label htmlFor="tob">Time of Birth (HH:MM):</label>
                <input type="text" id="tob" value={tob} onChange={(e) => setTob(e.target.value)} placeholder="e.g. 09:15" />

                <label htmlFor="lat">Latitude:</label>
                <input type="text" id="lat" value={lat} onChange={(e) => setLat(e.target.value)} placeholder="e.g. 28.7041" />

                <label htmlFor="lon">Longitude:</label>
                <input type="text" id="lon" value={lon} onChange={(e) => setLon(e.target.value)} placeholder="e.g. 77.1025" />

                <label htmlFor="tz">Timezone Offset:</label>
                <input type="text" id="tz" value={tz} onChange={(e) => setTz(e.target.value)} placeholder="e.g. 5.5" />

                <label htmlFor="chartType">Chart Type:</label>
                <select id="chartType" value={chartType} onChange={(e) => setChartType(e.target.value)}>
                    <option value="D1">D1 (Lagna)</option>
                    <option value="D3">D3 (Dreshkana)</option>
                    <option value="D3-s">D3-Somanatha</option>
                    <option value="D7">D7 (Saptamsa)</option>
                    <option value="D9">D9 (Navamsa)</option>
                    <option value="D10">D10 (Dasamsa)</option>
                    <option value="D10-R">D10-R (Dasamsa-EvenReverse)</option>
                    <option value="D12">D12 (Dwadasamsa)</option>
                    <option value="D16">D16 (Shodashamsa)</option>
                    <option value="D20">D20 (Vimsamsa)</option>
                    <option value="D24">D24 (ChaturVimshamsha)</option>
                    <option value="D24-R">D24-R (D24-R)</option>
                    <option value="D30">D30 (Trimshamsha)</option>
                    <option value="D40">D40 (KhaVedamsa)</option>
                    <option value="D45">D45 (AkshaVedamsa)</option>
                    <option value="D60">D60 (Shastiamsha)</option>
                    <option value="chalit">chalit (Bhav-chalit)</option>
                    <option value="moon">moon (Moon chart)</option>
                    <option value="sun">sun (Sun chart)</option>
                </select>

                <button onClick={fetchHoroscopeChart}>Get Horoscope Chart</button>
            </div>

            {/* Result & Chart Display */}
            <div id="result">
                {loading ? "Loading..." : error || "Chart Loaded Successfully!"}
            </div>

            <div id="chart-container">
                {chartData && <div id="chart" dangerouslySetInnerHTML={{ __html: chartData }} />}
            </div>
        </div>
    );
}

export default PlanetaryAspects;
