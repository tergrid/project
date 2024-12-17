import React, { useState } from "react";
import './PastConsultations.css'; // Add a separate CSS file for styling
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faPhone, faIdBadge } from '@fortawesome/free-solid-svg-icons';

const PastConsultations = () => {
  const [filterType, setFilterType] = useState("all");
  const [filterRating, setFilterRating] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const consultations = [
    {
      name: "JohnDoe",
      type: "Chat",
      date: "2023-10-01",
      feedback: "Very insightful, helped me a lot!",
      rating: 4,
      suggestions: "More detailed analysis on future events."
    },
    {
      name: "JaneSmith",
      type: "Call",
      date: "2023-09-25",
      feedback: "Great advice, but could be more specific.",
      rating: 3,
      suggestions: "Consider offering follow-up sessions."
    },
    {
      name: "AlexBrown",
      type: "Video",
      date: "2023-09-15",
      feedback: "Enjoyed the session, very engaging!",
      rating: 5,
      suggestions: "Keep up the good work!"
    },
    {
      name: "LisaWhite",
      type: "Chat",
      date: "2023-08-30",
      feedback: "Liked the clarity, but wanted more depth.",
      rating: 4,
      suggestions: "Provide more examples in future."
    },
  ];

  const filteredConsultations = consultations.filter(
    (consultation) =>
      (filterType === "all" || consultation.type === filterType) &&
      (filterRating === "all" || consultation.rating === parseInt(filterRating)) &&
      (consultation.feedback.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="past-consultations">
      <div className="sidebar">
        <h2>Astrology Panel</h2>
        <ul>
          <li><a href="#">View Upcoming Consultations</a></li>
          <li><a href="#">Manage Profile</a></li>
          <li><a href="#">Settings</a></li>
          <li><a href="#">Logout</a></li>
        </ul>

        <div className="statistics">
          <h3>Your Consultation Stats</h3>
          <p>Total Consultations: <strong>50</strong></p>
          <p>Average Rating: <strong>4.2/5</strong></p>
          <p>Most Common Consultation: <strong>Chat</strong></p>
        </div>
      </div>

      <div className="floating-buttons">
        <button className="chat-button">
          <FontAwesomeIcon icon={faComment} /> Chat
        </button>
        <button className="call-button">
          <FontAwesomeIcon icon={faPhone} /> Call
        </button>
        <button className="help-button">
          <FontAwesomeIcon icon={faIdBadge} /> Help
        </button>
      </div>

      <div className="main-content">
        <div className="filters">
          <label htmlFor="type">Filter by Type:</label>
          <select id="type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All</option>
            <option value="chat">Chat</option>
            <option value="call">Call</option>
            <option value="video">Video</option>
          </select>

          <label htmlFor="rating">Filter by Rating:</label>
          <select id="rating" value={filterRating} onChange={(e) => setFilterRating(e.target.value)}>
            <option value="all">All Ratings</option>
            <option value="5">★★★★★</option>
            <option value="4">★★★★</option>
            <option value="3">★★★</option>
            <option value="2">★★</option>
            <option value="1">★</option>
          </select>

          <input
            type="text"
            placeholder="Search feedback..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-bar"
          />
        </div>

        <div className="heading">
          <h2>Your Past Consultations (Sorted by Date)</h2>
        </div>

        <div className="consultation-container">
          {filteredConsultations.map((consultation, index) => (
            <div className="card" key={index}>
              <h3>{consultation.name}</h3>
              <p><strong>Type:</strong> {consultation.type}</p>
              <p><strong>Date:</strong> {consultation.date}</p>
              <p><strong>Feedback:</strong> "{consultation.feedback}"</p>
              <p><strong>Rating:</strong> {"★".repeat(consultation.rating)}{"☆".repeat(5 - consultation.rating)}</p>
              <p><strong>Suggestions:</strong> {consultation.suggestions}</p>
              <button className="view-details">View Details</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PastConsultations;


