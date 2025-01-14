import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import Rating from '@mui/material/Rating';
import { CREATE_RATE_MUTATION } from '../graphql/index';

function AddRateCard({ title }) {
  const { name, userid, id } = useParams();
  const [rate, setRate] = useState(null);
  const [createrate] = useMutation(CREATE_RATE_MUTATION);

  useEffect(() => {
    if (rate > 0) {
      createrate({
        variables: {
          name,
          userid,
          restaurantid: id,
          ratewhat: title,
          star: Number(rate),
        },
      });
    }
  }, [rate]);

  return (
    <div className="review-card">
      <div className="corner-decoration top-left" />
      <div className="corner-decoration bottom-right" />
      <div className="card-content">
        <h3 className="review-title">{title}</h3>
        <div className="rating-wrapper">
          <Rating
            value={rate}
            onChange={(e, value) => setRate(value)}
            size="large"
          />
        </div>
      </div>
    </div>
  );
}

export default AddRateCard;