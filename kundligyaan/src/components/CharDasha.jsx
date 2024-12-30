import React, { useState } from "react";
import '../styles/CharDasha.css';

const CharDasha = () => {
    const [dob, setDob] = useState("");
    const [tob, setTob] = useState("");
    const [lat, setLat] = useState("");
    const [lon, setLon] = useState("");
    const [tz, setTz] = useState("");
    const [result, setResult] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dobPattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!dobPattern.test(dob)) {
            alert("Please enter a valid date of birth in DD/MM/YYYY format.");
            return;
        }

        const url = "https://api.vedicastroapi.com/v3-json/dashas/char-dasha-current";
        const params = {
            lang: "en",
            dob: dob,
            tob: tob,
            lat: lat,
            lon: lon,
            tz: tz,
            api_key: "366c154f-bc5a-5339-99a8-8993088e6d5c"
        };

        try {
            const response = await fetch(`${url}?${new URLSearchParams(params)}`);
            const data = await response.json();

            if (data.status === 200) {
                const subDashaList = data.response.sub_dasha_list;
                const subDashaEndDates = data.response.sub_dasha_end_dates;
                const mainDasha = data.response.main_dasha;
                const mainDashaLord = data.response.main_dasha_lord;
                const subDashaStartDate = new Date(data.response.sub_dasha_start_date).toLocaleDateString();

                let resultHtml = `<h3>Antar Dasha Details:</h3>`;
                resultHtml += `<div class="result-card">
                    <h4>Main Dasha: ${mainDasha}</h4>
                    <p><strong>Main Dasha Lord:</strong> ${mainDashaLord}</p>
                    <p><strong>Sub Dasha Start Date:</strong> ${subDashaStartDate}</p>
                </div>`;

                if (subDashaList && subDashaList.length > 0 && subDashaEndDates && subDashaEndDates.length > 0 && subDashaList.length === subDashaEndDates.length) {
                    subDashaList.forEach((dasha, index) => {
                        const endDate = new Date(subDashaEndDates[index]).toLocaleDateString();
                        resultHtml += `<div class="result-card">
                            <h4>Sub Dasha: ${dasha}</h4>
                            <p><strong>End Date:</strong> ${endDate}</p>
                        </div>`;
                    });
                    setResult(resultHtml);
                } else {
                    setResult("<p class='error'>No Antar Dasha details found for the provided data.</p>");
                }
            } else {
                setResult("<p class='error'>There was an error fetching the Antar Dasha result. Please try again.</p>");
            }
        } catch (error) {
            setResult("<p class='error'>There was an error with the API request.</p>");
            console.error(error);
        }
    };

    return (
        <div>
            <h1>Antar Dasha Prediction</h1>
            <div className="container">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="dob">Date of Birth (DD/MM/YYYY): </label>
                    <input type="text" id="dob" value={dob} onChange={(e) => setDob(e.target.value)} required placeholder="Enter your DOB" /><br /><br />

                    <label htmlFor="tob">Time of Birth (HH:MM AM/PM): </label>
                    <input type="text" id="tob" value={tob} onChange={(e) => setTob(e.target.value)} required placeholder="Enter your TOB" /><br /><br />

                    <label htmlFor="lat">Latitude: </label>
                    <input type="text" id="lat" value={lat} onChange={(e) => setLat(e.target.value)} required placeholder="Enter your Latitude" /><br /><br />

                    <label htmlFor="lon">Longitude: </label>
                    <input type="text" id="lon" value={lon} onChange={(e) => setLon(e.target.value)} required placeholder="Enter your Longitude" /><br /><br />

                    <label htmlFor="tz">Timezone (e.g., +5.5): </label>
                    <input type="text" id="tz" value={tz} onChange={(e) => setTz(e.target.value)} required placeholder="Enter your Timezone" /><br /><br />

                    <button type="submit">Get Antar Dasha</button>
                </form>
            </div>

            <div id="result" dangerouslySetInnerHTML={{ __html: result }}></div>
        </div>
    );
};

export default CharDasha;
