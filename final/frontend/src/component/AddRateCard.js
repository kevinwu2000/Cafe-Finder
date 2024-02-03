import * as React from 'react';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Star from '../picture/star2.jpg'
import { useEffect, useState } from 'react';
import {CREATE_RATE_MUTATION} from '../graphql/index';
import { useQuery, useLazyQuery, gql, useMutation } from "@apollo/client";
import { useParams } from 'react-router-dom'


function RateCard({ title }) {
    const {name, userid, id } = useParams()
    const [rate, setRate] = useState(null);
    const [createrate] = useMutation(CREATE_RATE_MUTATION);

    useEffect(()=>{
        if(rate > 0){
            /*console.log({
                name:name,
                userid:userid,
                restaurantid:id,
                ratewhat: title,
                star: Number(rate),
            })*/
            createrate({
                variables:{
                    name:name,
                    userid:userid,
                    restaurantid:id,
                    ratewhat: title,
                    star: Number(rate),
                }
            })
        }
    },[rate])

    return (
        <Grid item xs={12} md={6}>
            <CardActionArea component="a">
            <Card sx={{ display: 'flex', height: '15vh', backgroundColor: '#F3F2F1'}}>
                <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                    {title}
                </Typography>
                <div style = { {height: '2vh'} }/>
                <Rating
                    name = "simple-controlled"
                    value = {rate}
                    onChange = {(e) => { setRate(e.target.value);}}
                />
                </CardContent>
                <CardMedia
                    component="img"
                    sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
                    image={Star}
                    alt = 'Image Text'
                />
            </Card>
            </CardActionArea>
        </Grid>
    );
}


export default RateCard;