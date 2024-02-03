import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Rate from '../picture/rate.png'
import { useNavigate, useParams } from 'react-router-dom';

const Styles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '8vh',
};

function RateButtonCard() {
    const navigate = useNavigate();
    const { id, name, userid } = useParams()

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a">
            <Card sx={{ display: 'flex', height: '15vh', backgroundColor: '#F4F3F1'}}>
                <CardContent sx={{ flex: 1 }}>
                <div style = { {height: '2vh'} }/>
                <div style = {Styles}>
                    <Button variant="contained" size='large' onClick = {() => navigate(`/search/${name}/${userid}/cafe/${id}/review/addrate`) }>
                        Rate it too !
                    </Button>
                </div>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                    image={Rate}
                    alt = 'Image Text'
                />
            </Card>
            </CardActionArea>
        </Grid>
    );
}


export default RateButtonCard;