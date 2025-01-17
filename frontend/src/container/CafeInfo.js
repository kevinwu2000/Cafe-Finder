import { useParams } from 'react-router-dom';
import * as React from 'react';
import { useEffect, useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useQuery } from "@apollo/client";
import MainFeaturedPost from '../component/MainFeaturedPost';
import NavBar from '../component/NavBar';
import InfoCard from '../component/InfoCard';
import InfoDayCard from '../component/InfoDayCard';
import { GET_RESTAURANT_BY_ID_QUERY } from '../graphql/index';
import Coffee_cup_bean from '../picture/coffee_cup_bean.jpg';
import '../css/cafeInfo.css';

const mainFeaturedPost = {
  title: 'Basic Information',
  description: "View the information of this cafe, or add anything you want!",
  image: Coffee_cup_bean,
  imageText: 'main image description',
};

const theme = createTheme();

function CafeInfo() {
  const { id, name, userid } = useParams();
  const [cafeName, setCafeName] = useState('');
  const [informations, setInformations] = useState([]);

  const { data: getRestaurantData } = useQuery(GET_RESTAURANT_BY_ID_QUERY, {
    variables: { id: id },
  });

  useEffect(() => {
    if (getRestaurantData?.GetRestaurantById) {
      setInformations(getRestaurantData.GetRestaurantById.information);
      setCafeName(getRestaurantData.GetRestaurantById.name);
    }
  }, [getRestaurantData]);

  // Group the first 4 information items into pairs
  const infoGroups = [
    informations.slice(0, 2),  // First row: items 0-1
    informations.slice(2, 4)   // Second row: items 2-3
  ];

  const weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday'
  ];

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container className="cafe-info-container">
        <NavBar id={id} cafename={cafeName} name={name} userid={userid} />
        <main>
          <MainFeaturedPost post={mainFeaturedPost} />
          
          {infoGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="info-grid">
              {group.map((info, index) => (
                <InfoCard 
                  key={index}
                  name={info.name} 
                  information={info.body} 
                />
              ))}
            </div>
          ))}

          <section className="day-cards-container">
            {weekDays.map((day, index) => (
              <InfoDayCard
                key={day}
                name={day}
                start={informations[4 + index * 2]?.body}
                end={informations[5 + index * 2]?.body}
              />
            ))}
          </section>
        </main>
      </Container>
    </ThemeProvider>
  );
}

export default CafeInfo;