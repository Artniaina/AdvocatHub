import React from 'react'
import { Building, Info, AlertTriangle } from "lucide-react";

const GestionErreurPopUp = ({messageErreur, closePopup}) => {
  return (
      <div
    style={{
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
    }}
  >
    <div
      style={{
        background: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        width: '80%',
        maxWidth: '500px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: '10px',
        }}
      >
        <AlertTriangle color="red" size={24} />
        <h2 style={{ marginLeft: '10px' }}>Erreurs de Formulaire</h2>
      </div>
      <div>
       
          <p  style={{ color: 'red', margin: '5px 0' }}>
          {messageErreur}          </p>
       
      </div>
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <button
          onClick={closePopup}
          style={{
            padding: '8px 16px',
            border: 'none',
            borderRadius: '4px',
            backgroundColor: '#f0f0f0',
            cursor: 'pointer',
          }}
        >
          Fermer
        </button>
      </div>
    </div>
  </div>
  )
}

export default GestionErreurPopUp