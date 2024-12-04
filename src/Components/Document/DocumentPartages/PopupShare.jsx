import React, { useState } from 'react';
import '../../../Styles/Document/PopupShare.css';

const PopupShare = ({ onClose, documentId }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');
  const [emailError, setEmailError] = useState('');

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validateEmail(email)) {
      setEmailError('Veuillez entrer une adresse e-mail valide');
      return;
    }
    setEmailError('');
    const shareData = {
      email,
      username,
      message,
      documentId,
    };
    console.log('Données de partage du document:', shareData);
    onClose();
  };

  return (
    <div className="document-share-overlay">
      <div className="document-share-container">
        <div className="document-share-header">
          <h2>Partager le document</h2>
          <button 
            className="document-share-close" 
            onClick={onClose}
            aria-label="Fermer"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="document-share-form">
          <div className="document-share-input-group">
            <label htmlFor="document-share-email">Adresse e-mail</label>
            <input
              type="email"
              id="document-share-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="document-share-input"
              placeholder="Entrez l'e-mail du destinataire"
            />
            {emailError && <span className="document-share-error">{emailError}</span>}
          </div>
          <div className="document-share-input-group">
            <label htmlFor="document-share-username">Nom d'utilisateur</label>
            <input
              type="text"
              id="document-share-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="document-share-input"
              placeholder="Entrez le nom d'utilisateur"
            />
          </div>
          <div className="document-share-input-group">
            <label htmlFor="document-share-message">Message (facultatif)</label>
            <textarea
              id="document-share-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="document-share-textarea"
              placeholder="Ajoutez une note personnelle (facultatif)"
            />
          </div>
          <div className="document-share-actions">
            <button 
              type="submit" 
              className="document-share-submit-btn"
            >
              Partager le document
            </button>
            <button 
              type="button" 
              className="document-share-cancel-btn" 
              onClick={onClose}
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupShare;
