import React from 'react';
import './CategoryfilterButton.css';

const CategoryfilterButton = ({ category, onClick }) => {
  return (
    <button className="button1" onClick={() => onClick(category)}>
      {category}
    </button>
  );
};

export default CategoryfilterButton;
