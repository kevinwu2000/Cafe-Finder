import { useParams } from 'react-router-dom'
import ScoreIndicator from '../component/ScoreIndicator'
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MainFeaturedPost from '../component/MainFeaturedPost';
import Coffee_cup from '../picture/coffee_cup.jpg'
import AddRateCard from '../component/AddRateCard'
import AddTFRateCard from '../component/AddTFRateCard';
import AddRateHeader from '../component/AddRateHeader';
import AddNewRateButtonCard from '../component/AddNewRateButtonCard'
import AddNewTFRateButtonCard from '../component/AddNewTFRateButtonCard'
import { useEffect , useState} from 'react';
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";
import { GET_RESTAURANT_BY_ID_QUERY } from '../graphql/index';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const finishStyles = {
    position: 'relative',
    left: '90%'
};

const theme = createTheme();

const mainFeaturedPost = {
    title: 'Review',
    description:
        "View the review score of this cafe, or rate it yourself!",
    image: Coffee_cup,
    imageText: 'main image description',
};

const scores = [
    {
        title: 'name',
        
    },
    {
      title: 'name',
      
    },
    {
      title: 'name',
      
    },
    {
      title: 'name',
      
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
    
];

function AddRate(){
    const { id, name, userid } = useParams();
    const cafename = 'cafe name'
    const [cafeName, setCafeName] = useState('cafe name');
    const averageScore = 1.2 //!need to change
    const [rates, setRates] = useState([]);
    const [TFrates, setTFRates] = useState([]);
    //console.log(rates)
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const { data: getRestaurantData, loading: getRestaurantLoading, error } = useQuery( GET_RESTAURANT_BY_ID_QUERY, {
        variables: {
            id: id
        },
    }); 

    const handleonClick = () => {
        navigate('/search/'+name+'/'+userid+'/cafe/'+id+'/review');
    }

    useEffect((RestaurantLoading)=>{
        if(getRestaurantData?.GetRestaurantById !== undefined){
            setRates(getRestaurantData?.GetRestaurantById?.sprate);
            setTFRates(getRestaurantData?.GetRestaurantById?.spTFrate);
            setCafeName(getRestaurantData?.GetRestaurantById?.name);
            //console.log(getRestaurantData?.GetRestaurantById?.sprate)
            //console.log(getRestaurantData?.GetRestaurantById?.spTFrate)
        }
    },[getRestaurantLoading])

    return(
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Container maxWidth="lg" style = {{backgroundColor: '#FCF3E3'}}>
                    <AddRateHeader/>
                    { <main>
                        <MainFeaturedPost post={mainFeaturedPost} />
                    </main> }
                    <div style={{height: '10vh'}}/>
                    {rates.map((card) => (
                        <>
                            <AddRateCard title={card.name}/>
                            <div style={{height: '3vh'}}/>
                        </>
                    ))}
                    <AddNewRateButtonCard setRates={setRates} rates={rates}/>
                    <div style={{height: '15vh'}}/>
                    {TFrates.map((card) => (
                        <>
                            <AddTFRateCard title = {card.name} Tnum = {card.Tnum.length} Fnum = {card.Fnum.length} TFrates={TFrates} setTFRates={setTFRates}/>
                            <div style={{height: '3vh'}}/>
                        </>
                    ))}
                    <AddNewTFRateButtonCard TFrates={TFrates} setTFRates={setTFRates}/>
                    <div style={{height: '10vh'}}/>
                    <div style={finishStyles}>
                        <Button size='large' variant='contained' onClick={handleonClick}>Finish</Button>
                    </div>
                    <div style={{height: '5vh'}}/>
                </Container>
            </ThemeProvider>
            
        </>
    )
}

export default AddRate

/*(
                        <>
                            <AddTFRateCard title = {card.name} Tnum = {card.Tnum} Fnum = {card.Fnum}/>
                            <div style={{height: '3vh'}}/>
                        </>
                    )*/
/*(
                        <>
                            <AddRateCard title={card.name}/>
                            <div style={{height: '3vh'}}/>
                        </>
                    )*/
