import { useParams } from 'react-router-dom'
import ScoreIndicator from '../component/ScoreIndicator'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MainFeaturedPost from '../component/MainFeaturedPost';
import NavBar from '../component/NavBar';
import Coffee_cup from '../picture/coffee_cup.jpg'
import RateCard from '../component/RateCard'
import RateTFCard from '../component/RateTFCard';
import RateButtonCard from '../component/RateButtonCard'
import { GET_RESTAURANT_BY_ID_QUERY } from '../graphql/index';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from 'react';

const ScoreStyles = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '40vh',
};

const theme = createTheme();

const mainFeaturedPost = {
    title: 'Review',
    description:
        "View the review score of this cafe, or rate it yourself !",
    image: Coffee_cup,
    imageText: 'main image description',
};

/*const scores = [
    {
        title: 'name',
        score: 4.7
    },
    {
      title: 'name',
      score: 5
    },
    {
      title: 'name',
      score: 1.5
    },
    {
      title: 'name',
      score: 3.5
    },
    
];

const TFscores = [
    {
        title: 'name',
        score: 'T'
    },
    {
      title: 'name',
      score: "F"
    },
    {
      title: 'name',
      score: "F"
    },
    {
      title: 'name',
      score: "T"
    },
    
];*/

function ReviewScore(){
    const { id, name, userid } = useParams();
    const [cafeName, setCafeName] = useState('');
    //const averageScore = 1.2
    const [rates, setRates] = useState([]);
    const [TFrates, setTFRates] = useState([]);

    const { data: getRestaurantData, loading: getRestaurantLoading, error } = useQuery( GET_RESTAURANT_BY_ID_QUERY, {
        variables: {
            id: id
        },
    }); 

    const [
		lazygetRestaurant,
		{ data: lazygetRestaurantData, error: lazyerror, loading: lazygetRestaurantLoading},
	] = useLazyQuery(GET_RESTAURANT_BY_ID_QUERY,{
        onCompleted:()=>{
            //console.log('/');
        }
    });

    useEffect(()=>{
        lazygetRestaurant({
            variables: {id:id},
        })
    },[])

    useEffect((lazygetRestaurantLoading)=>{
        if(lazygetRestaurantData?.GetRestaurantById !== undefined){
            console.log(lazygetRestaurantData?.GetRestaurantById?.spTFrate)
            setRates(lazygetRestaurantData?.GetRestaurantById?.sprate);
            setTFRates(lazygetRestaurantData?.GetRestaurantById?.spTFrate);
            setCafeName(lazygetRestaurantData?.GetRestaurantById?.name);
        }
    },[lazygetRestaurantLoading,lazygetRestaurantData])

    useEffect((RestaurantLoading)=>{
        if(getRestaurantData?.GetRestaurantById !== undefined){
            setRates(getRestaurantData?.GetRestaurantById?.sprate);
            setTFRates(getRestaurantData?.GetRestaurantById?.spTFrate);
            setCafeName(getRestaurantData?.GetRestaurantById?.name);
        }
    },[getRestaurantLoading])

    useEffect((RestaurantLoading)=>{
        if(getRestaurantData?.GetRestaurantById !== undefined){
            setRates(getRestaurantData?.GetRestaurantById?.sprate);
            setTFRates(getRestaurantData?.GetRestaurantById?.spTFrate);
            setCafeName(getRestaurantData?.GetRestaurantById?.name);
        }
    },[getRestaurantLoading])

    return(
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg">
                <NavBar id = {id} cafename = {cafeName} name={name} userid={userid}></NavBar>
                    <main>
                        <MainFeaturedPost post={mainFeaturedPost} />
                    </main>
                    {/* <div style = {ScoreStyles}><ScoreIndicator value={averageScore} maxValue = {5}></ScoreIndicator></div> */}
                    {rates.map((card) => ( 
                        <>
                            <RateCard title={card.name} score = {card.average_star}/>
                            <div style={{height: '3vh'}}/>
                        </>
                    ))}
                    <div style={{height: '15vh'}}/>
                    {TFrates.map((card) => ( 
                        <>
                            <RateTFCard title = {card.name} Tnum = {card.Tnum.length} Fnum = {card.Fnum.length}/>
                            <div style={{height: '3vh'}}/>
                        </>
                    ))} 
                    <div style={{height: '10vh'}}/>
                    <RateButtonCard/>
                    <div style={{height: '10vh'}}/>
                </Container>
            </ThemeProvider>
            
        </>
    )
}

export default ReviewScore