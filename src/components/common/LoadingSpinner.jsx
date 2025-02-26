import React from 'react';
import './LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <img 
        src="/images/betondecken-logo.png" 
        alt="Betondecken Logo" 
        className="loading-logo"
      />
    </div>
  );
};

export default LoadingSpinner;
