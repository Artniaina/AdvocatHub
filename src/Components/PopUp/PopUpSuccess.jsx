const SuccessPopup = ({ onClose }) => (
    <div className="success-popup-overlay">
      <div className="success-popup">
        <p>Succès!</p>
        <button onClick={onClose}>Ok</button>
      </div>
    </div>
  );
  