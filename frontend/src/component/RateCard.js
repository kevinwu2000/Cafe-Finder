import React from 'react';
import Rating from '@mui/material/Rating';

function RateCard({ title, score }) {
  return (
    <div className="review-card">
      <div className="corner-decoration top-left" />
      <div className="corner-decoration bottom-right" />
      <div className="card-content">
        <h3 className="review-title">{title}</h3>
        <div className="rating-wrapper">
          <Rating 
            name="read-only" 
            value={score} 
            precision={0.1} 
            readOnly 
            size="large"
          />
          <span className="score-text">{score.toFixed(1)}</span>
        </div>
      </div>
    </div>
  );
}

export default RateCard;