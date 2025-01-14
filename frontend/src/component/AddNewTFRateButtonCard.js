import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { message } from "antd";

function AddNewTFRateButtonCard({ TFrates, setTFRates }) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const handleAdd = () => {
    if (TFrates.some(rate => rate.name === title)) {
      message.error('This question already exists');
      return;
    }

    if (!title.trim()) {
      message.error('Please enter a question');
      return;
    }

    setTFRates([...TFrates, { name: title, Tnum: 0, Fnum: 0 }]);
    setOpen(false);
    setTitle('');
    message.success('Question added successfully');
  };

  return (
    <div className="review-card add-card">
      <div className="corner-decoration top-left" />
      <div className="corner-decoration bottom-right" />
      <div className="card-content">
        <button className="review-button add" onClick={() => setOpen(true)}>
          Add a True/False Question
        </button>

        <Dialog open={open} onClose={() => setOpen(false)} className="review-dialog">
          <div className="dialog-content">
            <h3 className="dialog-title">Add New Question</h3>
            <p className="dialog-subtitle">What would you like to ask?</p>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your question"
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

export default AddNewTFRateButtonCard;