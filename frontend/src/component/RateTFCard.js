import React from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

function RateTFCard({ title, Tnum = 0, Fnum = 0 }) {
  return (
    <div className="review-card">
      <div className="corner-decoration top-left" />
      <div className="corner-decoration bottom-right" />
      <div className="card-content">
        <h3 className="review-title">{title}</h3>
        <div className="tf-wrapper">
          <div className="tf-option">
            <CheckCircleIcon className="tf-icon true" />
            <span className="tf-count">{Tnum}</span>
          </div>
          <div className="tf-option">
            <CancelIcon className="tf-icon false" />
            <span className="tf-count">{Fnum}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RateTFCard;