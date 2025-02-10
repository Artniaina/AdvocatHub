import React from 'react';
import { AlertTriangle } from "lucide-react";
import { GrTextAlignCenter } from 'react-icons/gr';

const GestionErreurPopUp = ({ messageErreur, closePopup }) => {
  const styles = {
    overlay: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
    },
    content: {
      background: '#fff',
      width: '90%',
      maxWidth: '500px',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 15px rgba(0, 0, 0, 0.15)',
      animation: 'slideIn 0.3s ease-out'
    },
    header: {
      position: 'relative',
      padding: '20px',
      borderTop: '25px solid #5E1675'
    },
    headerContent: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      justifyContent:'center'
    },
    title: {
      margin: 0,
      fontSize: '1.25rem',
      fontWeight: 600,
      color: '#2D3748',
    },
    body: {
      padding: '20px',
      borderTop: '1px solid #E2E8F0',
      borderBottom: '1px solid #E2E8F0'
    },
    message: {
      margin: 0,
      color: '#4A5568',
      fontSize: '1rem',
      lineHeight: 1.5, 
      textAlign:'center'
    },
    footer: {
      padding: '15px 20px',
      display: 'flex',
      justifyContent: 'flex-end'
    },
    button: {
      padding: '8px 16px',
      border: 'none',
      borderRadius: '6px',
      backgroundColor: '#5E1675',
      color: 'white',
      fontSize: '0.875rem',
      fontWeight: 500,
      cursor: 'pointer',
      transition: 'background-color 0.2s ease'
    },
    icon: {
      color: '#5E1675'
    }
  };

  const buttonHoverStyle = {
    ...styles.button,
    backgroundColor: '#4c1260'
  };

  const [isHovered, setIsHovered] = React.useState(false);

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closePopup();
    }
  };

  return (
    <div style={styles.overlay} onClick={handleBackdropClick}>
      <div style={styles.content}>
        <div style={styles.header}>
          <div style={styles.headerContent}>
            <AlertTriangle style={styles.icon} size={24} />
            <h2 style={styles.title}>Notification</h2>
          </div>
        </div>
        <div style={styles.body}>
          <p style={styles.message}>{messageErreur}</p>
        </div>
        <div style={styles.footer}>
          <button
            style={isHovered ? buttonHoverStyle : styles.button}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={closePopup}
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default GestionErreurPopUp;