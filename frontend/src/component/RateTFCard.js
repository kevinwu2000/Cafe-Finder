import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import true_false from '../picture/true_false.jpg'
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Person from '@mui/icons-material/Person'

const TFStyles = {
    position: 'relative',
    left: '1%',
};

const TStyle = {
    position: 'absolute',
    top: '50%',
    left: '0%'
}

const TpersonStyle = {
    position: 'absolute',
    top: '4vh',
    left: '7vh'
}

const TnumStyle = {
    position: 'absolute',
    top: '4vh',
    left: '10vh'
}

const FStyle = {
    position: 'absolute',
    top: '50%',
    left: '20vh'
}

const FpersonStyle = {
    position: 'absolute',
    top: '4vh',
    left: '27vh'
}

const FnumStyle = {
    position: 'absolute',
    top: '4vh',
    left: '30vh'
}

function RateTFCard({ title, TF, Tnum, Fnum }) {

    if(Tnum === undefined) Tnum = 0;
    if(Fnum === undefined) Fnum = 0;

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a">
                <Card sx={{ display: 'flex', height: '15vh', backgroundColor: '#F9F0E1'}}>
                <CardContent sx={{ flex: 1 }}>
                    <Typography component="h2" variant="h5">
                    {title}
                    </Typography>
                    <div style = { {height: '0.5vh'} }/>
                    <div style = {TFStyles}>
                        <div style = {TStyle}>
                            <CheckCircleOutlineIcon 
                                style = {{
                                    color: 'rgb(0, 128, 55)',
                                    fontSize: 60,
                                }}
                            /> 
                        </div>
                        <div style = {TpersonStyle}><Person/></div>
                        <div style = {TnumStyle}>
                            <Typography>{Tnum}</Typography>
                        </div>
                        <div style = {FStyle}>
                            <CancelOutlinedIcon
                                style = {{
                                    color: 'rgb(255, 0, 0)',
                                    fontSize: 60,
                                }}
                            /> 
                        </div>
                        <div style = {FpersonStyle}><Person/></div>
                        <div style = {FnumStyle}>
                            <Typography>{Fnum}</Typography>
                        </div>
                    </div>
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                    image={true_false}
                    alt = 'Image Text'
                />
                </Card>
            </CardActionArea>
        </Grid>
    );
}


export default RateTFCard;