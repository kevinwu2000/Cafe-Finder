import * as React from 'react';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import '../css/cafeInfo.css';

function InfoCard({ name, information }) {
  return (
    <Card className="info-card">
      <CardActionArea>
        <div className="info-card-content">
          <h3 className="info-card-title">{name}</h3>
          <p className="info-card-description">{information}</p>
        </div>
      </CardActionArea>
    </Card>
  );
}

export default InfoCard;