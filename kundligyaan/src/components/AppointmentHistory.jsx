import React, { useState } from "react";

const appointments = [
  {
    id: 1,
    astrologerName: "Ananya Verma",
    specialization: "Career Guidance",
    date: "2023-12-01",
    time: "45 minutes",
    rating: 4.5,
    status: "Completed",
    notes: "Discussed long-term career strategies.",
    type: "career",
  },
  {
    id: 2,
    astrologerName: "Rahul Mehta",
    specialization: "Relationship Advice",
    date: "2023-12-03",
    time: "30 minutes",
    rating: 5,
    status: "Upcoming",
    notes: "",
    type: "relationship",
  },
  {
    id: 3,
    astrologerName: "Dr. Sneha Kapoor",
    specialization: "Health & Wellness",
    date: "2023-11-30",
    time: "60 minutes",
    rating: 4.8,
    status: "Completed",
    notes: "Shared tips for better health alignment.",
    type: "health",
  },
];

const AppointmentHistory = () => {
  const [sortBy, setSortBy] = useState("date"); // Default sorting by date

  const handleSort = (appointments) => {
    if (sortBy === "rating") {
      return appointments.sort((a, b) => b.rating - a.rating);
    }
    return appointments.sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5efe6",
        padding: "20px",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#b23a48",
          padding: "20px",
          color: "#fff",
          textAlign: "center",
          borderRadius: "5px",
        }}
      >
        <h1>KundliGyaan</h1>
        <p>Your trusted partner for astrological guidance and support</p>
      </header>

      {/* Sorting & Search */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          margin: "20px 0",
        }}
      >
        <input
          type="text"
          placeholder="Search by astrologer or topic..."
          style={{
            width: "70%",
            padding: "10px",
            border: "1px solid #b23a48",
            borderRadius: "5px",
          }}
        />
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          style={{
            padding: "10px",
            border: "1px solid #b23a48",
            borderRadius: "5px",
          }}
        >
          <option value="date">Sort by Date</option>
          <option value="rating">Sort by Rating</option>
        </select>
      </div>

      {/* Appointment Cards */}
      <div>
        {handleSort(appointments).map((appointment) => (
          <div
            key={appointment.id}
            style={{
              background: "linear-gradient(135deg, #fff, #ffe4c4)",
              border: "1px solid #b23a48",
              borderRadius: "10px",
              marginBottom: "20px",
              padding: "15px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.transform = "scale(1.05)";
              e.currentTarget.style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.2)";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
            }}
          >
            {/* Header Info */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <div
                style={{
                  backgroundColor: "#b23a48",
                  color: "#fff",
                  fontWeight: "bold",
                  width: "40px",
                  height: "40px",
                  borderRadius: "50%",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                }}
              >
                {appointment.astrologerName[0]}
              </div>
              <div>
                <h3 style={{ margin: 0, color: "#b23a48" }}>
                  {appointment.astrologerName}
                </h3>
                <p style={{ margin: 0, color: "#555" }}>
                  {appointment.specialization}
                </p>
              </div>
            </div>

            {/* Details */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div>
                <p style={{ margin: 0 }}>
                  📅 <strong>{appointment.date}</strong>
                </p>
                <p style={{ margin: 0 }}>
                  ⏰ <strong>{appointment.time}</strong>
                </p>
                <p style={{ margin: 0 }}>
                  ⭐ <strong>{appointment.rating}</strong>
                </p>
                <p style={{ margin: 0 }}>
                  📌 <strong>{appointment.status}</strong>
                </p>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", flexDirection: "column" }}>
                <button
                  style={{
                    backgroundColor: "#b23a48",
                    color: "#fff",
                    padding: "10px",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                    marginBottom: "10px",
                  }}
                >
                  View Details
                </button>
                {appointment.status === "Completed" && (
                  <>
                    <button
                      style={{
                        backgroundColor: "#ffd700",
                        color: "#333",
                        padding: "10px",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginBottom: "10px",
                      }}
                    >
                      Give Feedback
                    </button>
                    <button
                      style={{
                        backgroundColor: "#f5efe6",
                        color: "#b23a48",
                        padding: "10px",
                        border: "1px solid #b23a48",
                        borderRadius: "5px",
                        cursor: "pointer",
                        marginBottom: "10px",
                      }}
                    >
                      Download Notes
                    </button>
                  </>
                )}
                <button
                  style={{
                    backgroundColor: "#f5efe6",
                    color: "#b23a48",
                    padding: "10px",
                    border: "1px solid #b23a48",
                    borderRadius: "5px",
                    cursor: "pointer",
                  }}
                >
                  Download Receipt
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppointmentHistory;