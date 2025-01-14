import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useQuery } from "@apollo/client";
import { GET_RESTAURANT_BY_ID_QUERY } from '../graphql/index';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import AddRateHeader from '../component/AddRateHeader';
import AddRateCard from '../component/AddRateCard';
import AddTFRateCard from '../component/AddTFRateCard';
import AddNewRateButtonCard from '../component/AddNewRateButtonCard';
import AddNewTFRateButtonCard from '../component/AddNewTFRateButtonCard';

function AddRate() {
  const { id, name, userid } = useParams();
  const [rates, setRates] = useState([]);
  const [TFrates, setTFRates] = useState([]);
  const navigate = useNavigate();

  const { data: getRestaurantData, loading } = useQuery(GET_RESTAURANT_BY_ID_QUERY, {
    variables: { id },
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (getRestaurantData?.GetRestaurantById) {
      setRates(getRestaurantData.GetRestaurantById.sprate);
      setTFRates(getRestaurantData.GetRestaurantById.spTFrate);
    }
  }, [getRestaurantData]);

  if (loading) {
    return (
      <div className="rate-page">
        <div className="loading-container">
          <CircularProgress />
        </div>
      </div>
    );
  }

  return (
    <div className="rate-page">
      <AddRateHeader />
      
      <main className="rate-content">
        <h1 className="page-title">Rate Your Experience</h1>

        <section className="rate-section">
          <h2 className="section-title">Rating Criteria</h2>
          <div className="cards-grid">
            {rates.map((card, index) => (
              <AddRateCard key={index} title={card.name} />
            ))}
            <AddNewRateButtonCard setRates={setRates} rates={rates} />
          </div>
        </section>

        <section className="rate-section">
          <h2 className="section-title">Yes/No Questions</h2>
          <div className="cards-grid">
            {TFrates.map((card, index) => (
              <AddTFRateCard
                key={index}
                title={card.name}
                Tnum={card.Tnum?.length || 0}
                Fnum={card.Fnum?.length || 0}
                TFrates={TFrates}
                setTFRates={setTFRates}
              />
            ))}
            <AddNewTFRateButtonCard TFrates={TFrates} setTFRates={setTFRates} />
          </div>
        </section>

        <div className="finish-button-container">
          <button 
            className="finish-button"
            onClick={() => navigate(`/search/${name}/${userid}/cafe/${id}/review`)}
          >
            Finish Rating
          </button>
        </div>
      </main>
    </div>
  );
}

export default AddRate;