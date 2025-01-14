import React from 'react';
import { Rating } from '@mui/material';
import { Coffee } from 'lucide-react';
import '../css/search.css';

const CafeCard = ({ name, rating, description, address, onClick }) => {
  return (
    <div className="cafe-card" onClick={onClick}>
      <div className="cafe-card-image">
        <Coffee size={40} className="cafe-icon" />
      </div>
      <div className="cafe-card-content">
        <h3 className="cafe-card-title">{name}</h3>
        <div className="cafe-card-rating">
          <span className="cafe-card-rating-number">{rating}</span>
          <Rating 
            value={parseFloat(rating)} 
            readOnly 
            precision={0.1} 
            className="cafe-card-rating-stars"
          />
        </div>
        <div className="cafe-card-divider"></div>
        <div className="cafe-card-details">
          {description && (
            <p className="cafe-card-description">{description}</p>
          )}
        </div>
        {address && (
          <p className="cafe-card-address">{address}</p>
        )}
      </div>
    </div>
  );
};

export default CafeCard;
