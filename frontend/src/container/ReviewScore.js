import { useParams } from 'react-router-dom';
import ScoreIndicator from '../component/ScoreIndicator';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import MainFeaturedPost from '../component/MainFeaturedPost';
import NavBar from '../component/NavBar';
import Coffee_cup from '../picture/coffee_cup.jpg';
import RateCard from '../component/RateCard';
import RateTFCard from '../component/RateTFCard';
import RateButtonCard from '../component/RateButtonCard';
import { GET_RESTAURANT_BY_ID_QUERY } from '../graphql/index';
import { useQuery, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from 'react';

const theme = createTheme();

const mainFeaturedPost = {
  title: 'Review',
  description: 'View the review score of this cafe, or rate it yourself!',
  image: Coffee_cup,
  imageText: 'main image description',
};

const centerStyles = {
  textAlign: 'center',
  fontSize: '2rem',
  fontWeight: 'bold',
  marginTop: '2rem',
  color: '#5D4037',
};

const buttonStyles = {
  display: 'flex',
  justifyContent: 'center',
  marginTop: '2rem',
};

function ReviewScore() {
  const { id, name, userid } = useParams();
  const [cafeName, setCafeName] = useState('');
  const [rates, setRates] = useState([]);
  const [TFrates, setTFRates] = useState([]);

  const { data: getRestaurantData, loading: getRestaurantLoading } = useQuery(GET_RESTAURANT_BY_ID_QUERY, {
    variables: { id },
  });

  useEffect(() => {
    if (getRestaurantData?.GetRestaurantById) {
      setRates(getRestaurantData.GetRestaurantById.sprate);
      setTFRates(getRestaurantData.GetRestaurantById.spTFrate);
      setCafeName(getRestaurantData.GetRestaurantById.name);
    }
  }, [getRestaurantData]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container maxWidth="lg">
        <div style={{ paddingBottom: '5rem' }}>
            <NavBar id={id} cafename={cafeName} name={name} userid={userid} />
            <main>
            <MainFeaturedPost post={mainFeaturedPost} />
            </main>

            {/* Rating Criteria Section */}
            <div style={{ marginTop: '3rem' }}>
            <h2 style={centerStyles}>Rating Criteria</h2>
            {rates.map((card, index) => (
                <div key={index}>
                <RateCard title={card.name} score={card.average_star} />
                <div style={{ height: '3vh' }} />
                </div>
            ))}
            </div>

            {/* Yes/No Questions Section */}
            <div style={{ marginTop: '3rem' }}>
            <h2 style={centerStyles}>Yes/No Questions</h2>
            {TFrates.map((card, index) => (
                <div key={index}>
                <RateTFCard title={card.name} Tnum={card.Tnum.length} Fnum={card.Fnum.length} />
                <div style={{ height: '3vh' }} />
                </div>
            ))}
            </div>

            <div style={buttonStyles}>
                <RateButtonCard />
            </div>
        </div>
      </Container>
    </ThemeProvider>
  );
}

export default ReviewScore;
