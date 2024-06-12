import React, { useRef, useEffect } from 'react';

const PopUpLangueParlees = ({ onClose }) => {
  const overlayRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="overlay" ref={overlayRef}>
      <div className="popup">
        <button className="close-button" onClick={onClose}>
          X
        </button>
        <div className="popup-content">
          <p>Adresse privée</p>
          <input type="text" />
          <button>Valider</button>
        </div>
      </div>
    </div>
  );
};

export default PopUpLangueParlees;
