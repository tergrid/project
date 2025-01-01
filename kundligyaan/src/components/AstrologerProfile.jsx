import React from "react";
import "../styles/AstrologerProfile.css";

const AstrologerProfile = () => {
  return (
    <div className="container">
      {/* Sidebar */}
      <aside className="sidebar">

      





      <h2 style={{ textAlign: "center" }}>Dashboard</h2>
<div className="notifications">
    <h3>
        <i className="fas fa-bell">Notifications</i>
    </h3>
          <ul>
            <li>1. New user approaching for consultation!</li>
            <li>2. Appointment request from Jane Doe on Dec 2, 2024, 11:00 AM</li>
          </ul>
        </div>

        <div className="schedule">
          <h3>
            <i className="fas fa-calendar-alt"></i> Upcoming Consultations
          </h3>
          <ul>
            <li>Dec 1, 2024 - 10:00 AM (USER1)</li>
            <li>Dec 3, 2024 - 02:00 PM (USER2)</li>
          </ul>
        </div>

        <div className="tools">
          <h3>
            <i className="fas fa-tools"></i> Tools
          </h3>
          <button id="kundali-btn">
            <i className="fas fa-chart-pie"></i> Kundali Generator
          </button>
          <button id="numeric-btn">
            <i className="fas fa-calculator"></i> Numeric Calculator
          </button>
        </div>

        <div className="floating-buttons">
          <button className="chat-button">
            <i className="fas fa-comment"></i> Chat
          </button>
          <button className="call-button">
            <i className="fas fa-phone"></i> Call
          </button>
          <button className="help-button">
            <i className="fa-solid fa-id-badge"></i> Help
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Hero Section */}
        <section className="hero">
          <div className="hero-profile">
            <div className="profile-image"></div>
            <div className="profile-info">
              <h1>Astrologer Name</h1>
              <p>
                Astrology expert with over 10 years of experience in Vedic
                Astrology and Tarot Card Reading.
              </p>
              <p>Badges: ⭐ Top-Rated Astrologer | 🏆 Most Engaged</p>
            </div>
          </div>
        </section>

        {/* Cards Row 1 */}
        <section className="cards-row1">
          <div className="card">
            <h3>Followers and Engagement</h3>
            <p>Followers: 5,234</p>
            <button>Follow</button>
          </div>

          <div className="card">
            <h3>Achievements and Badges</h3>
            <p>Badges: "Top Rated Astrologer," "Most Consultations"</p>
            <p>Star Rating: ⭐⭐⭐⭐⭐</p>
          </div>

          <div className="card">
            <h3>Earnings Dashboard</h3>
            <p>
              <strong>Total Earnings:</strong> ₹50,000 this month
            </p>
            <p>
              <strong>Earnings Breakdown:</strong> 70% Consultations, 30%
              Reports
            </p>
          </div>
        </section>

        {/* Cards Row 2 */}
        <section className="cards-row2">
          <div className="card">
            <h3>Schedule Management</h3>
            <p>
              <strong>Upcoming Appointments:</strong> View your schedule for the
              next week.
            </p>
            <p>
              <strong>Previous Sessions:</strong> Review past appointments.
            </p>
          </div>

          <div className="card">
            <h3>Availability Calendar</h3>
            <p>Visualize available time slots for consultations.</p>
          </div>

          <div className="card">
            <h3>Content Sharing</h3>
            <p>
              Latest Articles: "Understanding Retrogrades" and "Moon Cycles
              Explained"
            </p>
            <p>
              Social Media Links: <a href="#">Instagram</a>,{" "}
              <a href="#">Facebook</a>
            </p>
          </div>

          <div className="card">
            <h3>Promotional Offers</h3>
            <p>20% off on all consultations this month!</p>
          </div>
        </section>

        {/* Feedback Section */}
        <div className="services-section">
          <h2>FEEDBACK AND REVIEWS</h2>
          <div className="services-carousel-container">
            <button className="carousel-btn left-btn">‹</button>
            <div className="services-carousel">
              <div className="service-card">
                <img src="sun-icon.png" alt="User Photo" />
                <h3>Rating: ⭐⭐⭐⭐⭐</h3>
                <p>
                  "Astrologer Maya was amazing! Her insights into my birth chart
                  were spot on, and her guidance has already helped me in my
                  career. Highly recommend!"
                </p>
              </div>

              <div className="service-card">
                <img src="kundli-icon.png" alt="User Photo" />
                <h3>Rating: ⭐⭐⭐</h3>
                <p>
                  "Astrologer Raj was knowledgeable and professional. He
                  explained my chart well, but I wish there was more personalized
                  advice."
                </p>
              </div>

              <div className="service-card">
                <img src="compatibility-icon.png" alt="User Photo" />
                <h3>Rating: ⭐⭐⭐⭐</h3>
                <p>
                  "My reading with Astrologer Priya was decent. Some predictions
                  were accurate, but others felt generic."
                </p>
              </div>
            </div>
            <button className="carousel-btn right-btn">›</button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AstrologerProfile;
