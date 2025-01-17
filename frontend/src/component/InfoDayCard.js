import * as React from 'react';
import Card from '@mui/material/Card';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import '../css/cafeInfo.css';

function InfoDayCard({ name, start, end }) {
  return (
    <Card className="day-card">
      <div className="day-card-content">
        <div className="day-card-left">
          <h3 className="day-name">{name}</h3>
        </div>
        <div className="time-container">
          <AccessTimeIcon className="time-icon" />
          <span className="time-text">
            {start} - {end}
          </span>
        </div>
      </div>
    </Card>
  );
}

export default InfoDayCard;