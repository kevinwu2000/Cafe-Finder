import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import SearchInput from '../component/SearchInput';
import CafeCard from '../component/CafeCard';
import { useHooks } from './hooks/Hooks';
import { useLazyQuery } from '@apollo/client';
import { SEARCH_RESTAURANT_BY_NAME_QUERY, GET_RESTAURANT_BY_ID_QUERY } from '../graphql/index';
import '../css/search.css';

function Search() {
  const navigate = useNavigate();
  const { name, userid } = useParams();
  const [searchValue, setSearchValue] = useState('');
  const [restaurantList, setRestaurantList] = useState([]);
  const { setRestaurant } = useHooks();

  const [SearchRestaurant, { data: SearchRestaurantData }] = useLazyQuery(SEARCH_RESTAURANT_BY_NAME_QUERY);
  const [GetRestaurant, { data: GetRestaurantData }] = useLazyQuery(GET_RESTAURANT_BY_ID_QUERY);

  useEffect(() => {
    if (SearchRestaurantData) {
      setRestaurantList(SearchRestaurantData.SearchRestaurantByName);
    }
  }, [SearchRestaurantData]);

  useEffect(() => {
    if (GetRestaurantData?.GetRestaurantById) {
      setRestaurant(GetRestaurantData.GetRestaurantById);
      navigate(`/search/${name}/${userid}/cafe/${GetRestaurantData.GetRestaurantById.id}`);
    }
  }, [GetRestaurantData]);

  useEffect(() => {
    // Automatically search when the component is mounted
    handleSearch();
  }, []);  

  const handleSearch = () => {
    const query = searchValue.trim() === '' ? '' : searchValue;
    SearchRestaurant({ variables: { name: query } });
  };  

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSearch();
    }
  };

  const handleCardClick = (id) => {
    GetRestaurant({ variables: { id } });
  };

  return (
    <div className="search-page">
      <div className="logout-container">
        <button className="logout-btn" onClick={() => navigate('/')}>
          Log Out
        </button>
      </div>
      <section className="hero-section">
        <h1 className="hero-title">Find Your Perfect Cafe</h1>
        <p className="hero-subtitle">Search and explore cozy cafes!</p>
        <SearchInput
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onKeyPress={handleKeyPress}
          onClick={handleSearch}
        />
        <div className="add-cafe-section">
          <button className="add-cafe-btn" onClick={() => navigate(`/addcafe/${name}/${userid}`)}>
            <div className="add-cafe-content">
              <p className="add-cafe-title">Add Your Favorite Cafe</p>
              <p className="add-cafe-subtitle">Share a hidden gem with others</p>
            </div>
          </button>
        </div>
      </section>

      <section className="card-container">
        {restaurantList.map((rest) => {
          const avgRating = (
            rest.comments.reduce((sum, c) => sum + c.star, 0) / rest.comments.length || 0
          ).toFixed(1);
          return (
            <CafeCard
              key={rest.id}
              name={rest.name}
              rating={avgRating}
              onClick={() => handleCardClick(rest.id)}
            />
          );
        })}
      </section>
    </div>
  );
}

export default Search;
