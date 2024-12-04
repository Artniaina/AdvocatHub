import React, { useState } from 'react';
import '../../../Styles/Document/PopupShare.css';

const PopupShare = ({ onClose }) => {
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
      setEmailError('Please enter a valid email address');
      return;
    }
    setEmailError('');
    const shareData = {
      email,
      username,
      message,
    };
    console.log('Share Document Data:', shareData);
    onClose();
  };

  return (
    <div className="document-share-overlay">
      <div className="document-share-container">
        <div className="document-share-header">
          <h2>Share Document</h2>
          <button 
            className="document-share-close" 
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <form onSubmit={handleSubmit} className="document-share-form">
          <div className="document-share-input-group">
            <label htmlFor="document-share-email">Email Address</label>
            <input
              type="email"
              id="document-share-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="document-share-input"
              placeholder="Enter recipient's email"
            />
            {emailError && <span className="document-share-error">{emailError}</span>}
          </div>
          <div className="document-share-input-group">
            <label htmlFor="document-share-username">Username</label>
            <input
              type="text"
              id="document-share-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="document-share-input"
              placeholder="Enter username"
            />
          </div>
          <div className="document-share-input-group">
            <label htmlFor="document-share-message">Message (optional)</label>
            <textarea
              id="document-share-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="document-share-textarea"
              placeholder="Add a personal note (optional)"
            />
          </div>
          <div className="document-share-actions">
            <button 
              type="submit" 
              className="document-share-submit-btn"
            >
              Share Document
            </button>
            <button 
              type="button" 
              className="document-share-cancel-btn" 
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PopupShare;