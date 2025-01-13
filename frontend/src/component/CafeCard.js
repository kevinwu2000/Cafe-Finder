import React from 'react';
import { Rating } from '@mui/material';
import { Coffee } from 'lucide-react';

const CafeCard = ({ name, rating, description, address, onClick }) => {
  return (
    <div className="cafe-card" onClick={onClick}>
      <div className="cafe-card-image">
        <Coffee size={40} className="cafe-icon" />
      </div>
      <div className="cafe-card-content">
        <h3 className="cafe-card-title">{name}</h3>
        <div className="cafe-card-divider"></div>
        <div className="cafe-card-details">
          {description && (
            <p className="cafe-card-description">{description}</p>
          )}
          {address && (
            <p className="cafe-card-address">{address}</p>
          )}
        </div>
        <div className="cafe-card-rating">
          <Rating 
            value={parseFloat(rating)} 
            readOnly 
            precision={0.1} 
            className="cafe-card-rating-stars"
          />
          <span className="cafe-card-rating-number">{rating} / 5</span>
        </div>
      </div>
    </div>
  );
};

export default CafeCard;