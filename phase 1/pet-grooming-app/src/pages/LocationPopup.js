import React from 'react';

function LocationPopup({ onChoice }) {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <p>We want to know your location. Would you like to allow?</p>
        <button onClick={() => onChoice('allow')}>Allow</button>
        <button onClick={() => onChoice('block')}>Block</button>
      </div>
    </div>
  );
}

export default LocationPopup;
