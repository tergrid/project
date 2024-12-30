import React from "react";
import "./ResultCard.css";

const ResultCard = ({ result }) => {
  if (result.error) {
    return <p className="error">{result.error}</p>;
  }

  return (
    <div className="result-card">
      <h4>Your Ascendant Sign:</h4>
      <p><strong>Ascendant Sign:</strong> {result.ascendant}</p>
      <p><strong>Prediction:</strong> {result.prediction}</p>
    </div>
  );
};

export default ResultCard;
