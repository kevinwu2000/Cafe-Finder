import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Rate from '../picture/rate.png';
import { useNavigate, useParams } from 'react-router-dom';

const Styles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '8vh',
};

function RateButtonCard() {
  const navigate = useNavigate();
  const { id, name, userid } = useParams();

  return (
    <Grid 
      container 
      justifyContent="center" 
      alignItems="center" 
      sx={{ marginY: 2 }} // Adds vertical spacing
    >
      <Grid item xs={12} sm={8} md={6}>
        <Card 
          sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' }, 
            height: { xs: 'auto', sm: '15vh' }, 
            backgroundColor: '#F4F3F1',
          }}
        >
          <CardContent 
            sx={{ 
              flex: 1, 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'center', 
              alignItems: 'center', 
              padding: { xs: 2, sm: 3 }, 
            }}
          >
            <Button 
              variant="contained" 
              size="large" 
              sx={{
                fontSize: { xs: '0.9rem', sm: '1rem' }, // Adjust font size
                paddingX: { xs: 2, sm: 3 }, // Adjust padding
                width: '100%', // Ensure it stretches on smaller screens
                maxWidth: { sm: '300px' }, // Add a max width
              }}
              onClick={() => navigate(`/search/${name}/${userid}/cafe/${id}/review/addrate`)}
            >
              Rate it too!
            </Button>
          </CardContent>
          <CardMedia
            component="img"
            sx={{ 
              width: { xs: '100%', sm: 160 }, 
              height: { xs: 'auto', sm: '15vh' }, 
              objectFit: 'cover',
            }}
            image={Rate}
            alt="Rate Button Image"
          />
        </Card>
      </Grid>
    </Grid>
  );
}

export default RateButtonCard;
