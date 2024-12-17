import React, { useState } from "react";

const customerBoxes = [
  {
    id: 1,
    icon: "📅",
    title: "Booking Consultations",
    description: "Learn how to book consultations easily.",
  },
  {
    id: 2,
    icon: "📄",
    title: "Downloading Kundli",
    description: "Steps to download your Kundli.",
  },
  {
    id: 3,
    icon: "💳",
    title: "Managing Payments",
    description: "Help with payments and subscriptions.",
  },
  {
    id: 4,
    icon: "📅",
    title: "Rescheduling Appointments",
    description: "Steps to reschedule your consultation appointments.",
  },
  {
    id: 5,
    icon: "❌",
    title: "Cancellation Policy",
    description: "Learn about our refund and cancellation policies.",
  },
];

const astrologerBoxes = [
  {
    id: 1,
    icon: "📈",
    title: "Tracking Earnings",
    description: "Track your earnings and consultations.",
  },
  {
    id: 2,
    icon: "🛠️",
    title: "Managing Consultations",
    description: "Guide to managing your consultation sessions.",
  },
  {
    id: 3,
    icon: "👤",
    title: "Profile Setup",
    description: "Set up your astrologer profile.",
  },
  {
    id: 4,
    icon: "⭐",
    title: "Client Reviews",
    description: "How to manage and respond to client reviews.",
  },
  {
    id: 5,
    icon: "💰",
    title: "Payment Methods",
    description: "Set up and update your preferred payment methods.",
  },
  {
    id: 6,
    icon: "📊",
    title: "Earnings Reports",
    description: "View and download detailed reports of your earnings.",
  },
];

const SupportPage = () => {
  const [userRole, setUserRole] = useState("customer"); // Default role is customer

  const renderBoxes = (boxes) => {
    return (
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "20px",
          marginBottom: "40px",
        }}
      >
        {boxes.map((box) => (
          <div
            key={box.id}
            style={{
              background: "linear-gradient(135deg, #fff, #ffe4c4)",
              border: "1px solid #b23a48",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              cursor: "pointer",
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
            <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
              {box.icon}
            </div>
            <h3 style={{ color: "#b23a48", marginBottom: "5px" }}>
              {box.title}
            </h3>
            <p style={{ color: "#555", fontSize: "0.9rem" }}>
              {box.description}
            </p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f5efe6",
        color: "#333",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#b23a48",
          padding: "20px",
          textAlign: "center",
          color: "#fff",
        }}
      >
        <h1>KundliGyaan Support</h1>
        <p>Your guide to resolving all issues, astrologer or customer!</p>
      </header>

      {/* Role Tabs */}
      <div
        style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}
      >
        <button
          onClick={() => setUserRole("customer")}
          style={{
            padding: "10px 20px",
            backgroundColor: userRole === "customer" ? "#ffd700" : "#f5efe6",
            color: userRole === "customer" ? "#333" : "#b23a48",
            border: "1px solid #b23a48",
            borderRadius: "5px",
            cursor: "pointer",
            marginRight: "10px",
            transition: "background-color 0.3s, transform 0.3s",
            transform: userRole === "customer" ? "scale(1.1)" : "scale(1)",
          }}
        >
          Customer Support
        </button>
        <button
          onClick={() => setUserRole("astrologer")}
          style={{
            padding: "10px 20px",
            backgroundColor: userRole === "astrologer" ? "#ffd700" : "#f5efe6",
            color: userRole === "astrologer" ? "#333" : "#b23a48",
            border: "1px solid #b23a48",
            borderRadius: "5px",
            cursor: "pointer",
            transition: "background-color 0.3s, transform 0.3s",
            transform: userRole === "astrologer" ? "scale(1.1)" : "scale(1)",
          }}
        >
          Astrologer Support
        </button>
      </div>

      {/* Dynamic Content */}
      <div style={{ maxWidth: "1200px", margin: "auto", padding: "20px" }}>
        <h2 style={{ color: "#b23a48" }}>
          {userRole === "customer" ? "Customer Support" : "Astrologer Support"}
        </h2>
        <p>
          {userRole === "customer"
            ? "We're here to assist you with any issues or questions you may have."
            : "Support options for our valued astrologers."}
        </p>

        {/* Role-Specific Boxes */}
        {userRole === "customer"
          ? renderBoxes(customerBoxes)
          : renderBoxes(astrologerBoxes)}

        {/* Contact Form */}
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            marginTop: "40px",
          }}
        >
          <h3
            style={{
              color: "#b23a48",
              textAlign: "center",
              marginBottom: "20px",
            }}
          >
            Submit Your Query
          </h3>
          <form style={{ maxWidth: "600px", margin: "auto" }}>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="name"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #b23a48",
                  borderRadius: "5px",
                }}
                placeholder="Enter your name"
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="email"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #b23a48",
                  borderRadius: "5px",
                }}
                placeholder="Enter your email"
              />
            </div>
            <div style={{ marginBottom: "15px" }}>
              <label
                htmlFor="message"
                style={{ display: "block", marginBottom: "5px" }}
              >
                Message
              </label>
              <textarea
                id="message"
                rows="5"
                style={{
                  width: "100%",
                  padding: "10px",
                  border: "1px solid #b23a48",
                  borderRadius: "5px",
                }}
                placeholder="Write your query here..."
              ></textarea>
            </div>
            <button
              type="submit"
              style={{
                backgroundColor: "#ffd700",
                color: "#333",
                padding: "10px 20px",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
                display: "block",
                margin: "auto",
              }}
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          backgroundColor: "#b23a48",
          padding: "20px",
          textAlign: "center",
          color: "#fff",
          marginTop: "40px",
        }}
      >
        <p>© 2024 KundliGyaan. All Rights Reserved.</p>
        <p>Follow us on social media for updates!</p>
      </footer>
    </div>
  );
};

export default SupportPage;