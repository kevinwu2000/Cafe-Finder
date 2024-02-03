import { useParams } from 'react-router-dom'
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MainFeaturedPost from '../component/MainFeaturedPost';
import NavBar from '../component/NavBar';
import InfoCard from '../component/InfoCard'
import AddCard from '../component/AddInfoCard';
import Coffee_cup_bean from '../picture/coffee_cup_bean.jpg'
import { GET_RESTAURANT_BY_ID_QUERY } from '../graphql/index';
import { useQuery } from "@apollo/client";
import { useEffect, useState } from 'react';
import InfoDayCard from '../component/InfoDayCard';

const mainFeaturedPost = {
    title: 'Basic Information',
    description:
        "View the information of this cafe, or add anything you want !",
    image: Coffee_cup_bean,
    imageText: 'main image description',
};

const featuredPosts = [
    {
        Name: 'name',
        information:
        'Information1',
    },
    {
        Name: 'name',
        information:
        'Information2',
    },
    {
        Name: 'name',
        information:
        'Information3',
    },
    
];

const theme = createTheme();

function CafeInfo() {
    const { id, name, userid } = useParams();
    const [cafeName, setCafeName] = useState('');
    const [informations, setInformations] = useState([]);

    console.log('/')
    const { data: getRestaurantData, loading: getRestaurantLoading, error } = useQuery( GET_RESTAURANT_BY_ID_QUERY, {
        variables: {
            id: id
        },
    }); 

    useEffect((RestaurantLoading)=>{
        console.log(getRestaurantData?.GetRestaurantById?.information)
        if(getRestaurantData?.GetRestaurantById !== undefined){
            setInformations(getRestaurantData?.GetRestaurantById?.information)
            setCafeName(getRestaurantData?.GetRestaurantById?.name);
        }
    },[getRestaurantLoading])


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Container maxWidth="lg">
                <NavBar id = {id} cafename = {cafeName} name={name} userid={userid}></NavBar>
                <main>
                    <MainFeaturedPost post={mainFeaturedPost} />
                    <Grid container spacing={4}>
                        {informations.slice(0, 4).map((info) => ( 
                            <InfoCard name = {info.name} information = {info.body} />
                        ))} 
                    </Grid>
                    <div style={{height: '10vh'}}/>
                    
                    <InfoDayCard name = 'Monday' start = {informations[4]?.body} end = {informations[5]?.body}/>
                    <div style={{height: '5vh'}}/>

                    <InfoDayCard name = 'Tuesday' start = {informations[6]?.body} end = {informations[7]?.body}/>
                    <div style={{height: '5vh'}}/>

                    <InfoDayCard name = 'Wednesday' start = {informations[8]?.body} end = {informations[9]?.body}/>
                    <div style={{height: '5vh'}}/>

                    <InfoDayCard name = 'Thursday' start = {informations[10]?.body} end = {informations[11]?.body}/>
                    <div style={{height: '5vh'}}/>

                    <InfoDayCard name = 'Friday' start = {informations[12]?.body} end = {informations[13]?.body}/>
                    <div style={{height: '5vh'}}/>

                    <InfoDayCard name = 'Saturday' start = {informations[14]?.body} end = {informations[15]?.body}/>
                    <div style={{height: '5vh'}}/>

                    <InfoDayCard name = 'Sunday' start = {informations[16]?.body} end = {informations[17]?.body}/>
                </main>
                <div style={{height: '10vh'}}/>
            </Container>
        </ThemeProvider>
    );
}


export default CafeInfo;




