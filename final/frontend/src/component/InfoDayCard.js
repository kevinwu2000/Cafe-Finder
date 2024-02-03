import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import Sky from '../picture/sky.jpg'

const timeIconStyle = {
    position: 'absolute',
    top: '9.4vh'
}

const timeStyle = {
    position: 'absolute',
    top: '9vh',
    left: '4.5%'
}

function InfoDayCard({name, start, end}) {

    return (
            <Grid item xs={12} md={6}>
            <CardActionArea component="a" href="#">
                <Card sx={{ display: 'flex', height: '18vh' }}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                        {name}
                    </Typography>
                    <div style={{height: '2vh'}}/>
                    <div style={timeIconStyle}><AccessTimeIcon/></div>
                    <div style={timeStyle}>
                        <Typography variant="h6" paragraph>
                            opening hours: {start} - {end}
                        </Typography>
                    </div>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                    image={Sky}
                    alt='Image Text'
                />
                </Card>
            </CardActionArea>
            </Grid>
    );
}


export default InfoDayCard;