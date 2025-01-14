import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMutation } from "@apollo/client";
import Dialog from '@mui/material/Dialog';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import { CREATE_TF_RATE_MUTATION } from '../graphql/index';
import { message } from "antd";
import '../css/addRate.css';

function AddTFRateCard({ title, Tnum = 0, Fnum = 0 }) {
  const [open, setOpen] = useState(false);
  const [Truechecked, setTrueChecked] = useState(false);
  const [Falsechecked, setFalseChecked] = useState(false);
  const { name, userid, id } = useParams();
  const [createTFrate] = useMutation(CREATE_TF_RATE_MUTATION);

  const handleSubmit = () => {
    if (Truechecked === Falsechecked) {
      message.error('Please select either True or False');
      return;
    }

    createTFrate({
      variables: {
        name,
        userid,
        restaurantid: id,
        ratewhat: title,
        TF: Truechecked,
      },
    });

    setOpen(false);
    message.success('Response submitted successfully');
  };

  return (
    <div className="review-card">
      <div className="corner-decoration top-left" />
      <div className="corner-decoration bottom-right" />
      <div className="card-content">
        <h3 className="review-title">{title}</h3>
        <div className="tf-wrapper">
          <div className="tf-option">
            <CheckCircleOutlineIcon className="tf-icon true" />
            <span className="tf-count">{Tnum}</span>
          </div>
          <div className="tf-option">
            <CancelOutlinedIcon className="tf-icon false" />
            <span className="tf-count">{Fnum}</span>
          </div>
        </div>
        <button className="main-button" onClick={() => setOpen(true)}>
          Add your answer
        </button>
      </div>

      <Dialog open={open} onClose={() => setOpen(false)} className="dialog">
        <div className="dialog-content">
          <h3 className="review-title">Your Answer</h3>
          <div className="dialog-options">
            <label className="dialog-option">
              <input
                type="checkbox"
                checked={Truechecked}
                onChange={() => {
                  setTrueChecked(!Truechecked);
                  setFalseChecked(false);
                }}
              />
              True
            </label>
            <label className="dialog-option">
              <input
                type="checkbox"
                checked={Falsechecked}
                onChange={() => {
                  setFalseChecked(!Falsechecked);
                  setTrueChecked(false);
                }}
              />
              False
            </label>
          </div>
          <div className="dialog-buttons">
            <button className="main-button" onClick={() => setOpen(false)}>
              Cancel
            </button>
            <button className="main-button" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </Dialog>
    </div>
  );
}

export default AddTFRateCard;
