import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { message } from "antd";

function AddNewRateButtonCard({ rates, setRates }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (rates.some(rate => rate.name === title)) {
      message.error('This rating already exists');
      return;
    }

    if (!title.trim()) {
      message.error('Please enter a title');
      return;
    }

    setRates([...rates, { name: title, body: 0 }]);
    setOpen(false);
    setTitle('');
    message.success('Rating added successfully');
  };

  return (
    <div className="review-card add-card">
      <div className="corner-decoration top-left" />
      <div className="corner-decoration bottom-right" />
      <div className="card-content">
        <button className="review-button add" onClick={() => setOpen(true)}>
          What else do you want to rate?
        </button>

        <Dialog open={open} onClose={() => setOpen(false)} className="review-dialog">
          <div className="dialog-content">
            <h3 className="dialog-title">Add New Rating</h3>
            <p className="dialog-subtitle">What would you like to rate?</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter rating title"
              className="dialog-input"
            />
            <div className="dialog-buttons">
              <button className="dialog-button secondary" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <button className="dialog-button primary" onClick={handleAdd}>
                Add
              </button>
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}

export default AddNewRateButtonCard;