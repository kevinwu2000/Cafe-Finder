import React from 'react';
import '../css/search.css';

function SearchInput({ value, onChange, onClick, onKeyPress }) {
  return (
    <div className="search-box">
      <input
        className="search-input"
        type="text"
        placeholder="Search for cafe"
        value={value}
        onChange={onChange}
        onKeyPress={onKeyPress}
      />
      <button className="search-button" onClick={onClick}>
        Search
      </button>
    </div>
  );
}

export default SearchInput;
