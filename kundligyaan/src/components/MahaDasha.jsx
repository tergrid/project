import React, { useState } from 'react';
import '../styles/MahaDasha.css';
import './index.css';

const MahaDasha = () => {
    const [result, setResult] = useState("");

    const handleSubmit = (event) => {
        event.preventDefault();

        const dob = event.target.dob.value;
        const tob = event.target.tob.value;
        const lat = event.target.lat.value;
        const lon = event.target.lon.value;
        const tz = event.target.tz.value;

        const url = "https://api.vedicastroapi.com/v3-json/dashas/maha-dasha";
        const params = {
            lang: "en",
            api_key: "366c154f-bc5a-5339-99a8-8993088e6d5c",
            dob,
            tob,
            lat,
            lon,
            tz,
        };

        fetch(`${url}?${new URLSearchParams(params)}`)
            .then((response) => response.json())
            .then((data) => {
                if (data.status === 200) {
                    const resultData = data.response;
                    const { mahadasha, mahadasha_order, dasha_start_date, dasha_remaining_at_birth } = resultData;

                    let resultHtml = `<h3>Maha Dasha Details:</h3>`;

                    if (mahadasha && mahadasha_order) {
                        for (let i = 0; i < mahadasha.length; i++) {
                            resultHtml += `<div class="result-card">
                                <h4>Dasha ${i + 1}: ${mahadasha[i]}</h4>
                                <p><strong>Start Date:</strong> ${mahadasha_order[i]}</p>
                            </div>`;
                        }
                    } else {
                        resultHtml += `<p class="error">No Maha Dasha details found for the provided data.</p>`;
                    }

                    resultHtml += `<div class="result-card">
                        <h4>Current Dasha Start Date:</h4>
                        <p>${dasha_start_date}</p>
                        <h4>Remaining Dasha Time at Birth:</h4>
                        <p>${dasha_remaining_at_birth}</p>
                    </div>`;

                    setResult(resultHtml);
                } else {
                    setResult("<p class='error'>There was an error fetching the Maha Dasha result. Please try again.</p>");
                }
            })
            .catch(() => {
                setResult("<p class='error'>There was an error with the API request.</p>");
            });
    };

    return (
        <div className="container">
            <h1 className="heading">Maha Dasha Prediction</h1>
            <form id="mahaDashaForm" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="dob">Date of Birth (DD/MM/YYYY):</label>
                    <input type="text" id="dob" name="dob" defaultValue="26/12/2024" />
                </div>

                <div className="form-group">
                    <label htmlFor="tob">Time of Birth (HH:MM):</label>
                    <input type="text" id="tob" name="tob" defaultValue="15:01" />
                </div>

                <div className="form-group">
                    <label htmlFor="lat">Latitude:</label>
                    <input type="text" id="lat" name="lat" defaultValue="28.7041" />
                </div>

                <div className="form-group">
                    <label htmlFor="lon">Longitude:</label>
                    <input type="text" id="lon" name="lon" defaultValue="77.1025" />
                </div>

                <div className="form-group">
                    <label htmlFor="tz">Time Zone (in hours):</label>
                    <input type="number" id="tz" name="tz" defaultValue="5.5" />
                </div>

                <button type="submit">Get Maha Dasha</button>
            </form>
            <div id="result" dangerouslySetInnerHTML={{ __html: result }}></div>
        </div>
    );
};

export default MahaDasha;
