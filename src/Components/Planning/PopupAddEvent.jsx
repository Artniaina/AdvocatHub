import React, { useState } from 'react';
import { X } from 'lucide-react';

const addEventStyles = {
  overlay: {
    position: 'fixed',
    inset: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 50,
  },
  backdrop: {
    position: 'absolute',
    inset: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
  },
  container: {
    position: 'relative',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(12px)',
    borderRadius: '16px',
    padding: '32px',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    maxHeight: '90vh',
    overflowY: 'auto',
    width: '450px',
  },
  closeButton: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#666',
    padding: '4px',
    transition: 'color 0.2s',
  },
  title: {
    fontSize: '24px',
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: '24px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  label: {
    fontSize: '14px',
    fontWeight: '500',
    color: '#4a4a4a',
  },
  input: {
    width: '100%',
    padding: '12px 16px',
    borderRadius: '8px',
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    outline: 'none',
    transition: 'all 0.2s',
  },
  timeContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '16px',
  },
  textarea: {
    minHeight: '100px',
    resize: 'vertical',
  },
  colorInput: {
    width: '100%',
    height: '40px',
    padding: '4px',
    cursor: 'pointer',
  },
  submitButton: {
    width: '100%',
    padding: '12px 16px',
    backgroundColor: '#3b82f6',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontWeight: '500',
    cursor: 'pointer',
    transition: 'background-color 0.2s',
  }
};

export const AddEventPopup = ({ event = null, onClose, onSubmit }) => {
  const [eventData, setEventData] = useState(event || {
    title: '',
    start: '',
    end: '',
    location: '',
    description: '',
    backgroundColor: '#1E90FF'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(eventData);
    onClose();
  };

  return (
    <div style={addEventStyles.overlay}>
      <div style={addEventStyles.backdrop} onClick={onClose} />
      <div style={addEventStyles.container}>
        <button style={addEventStyles.closeButton} onClick={onClose}>
          <X size={20} />
        </button>
        
        <h2 style={addEventStyles.title}>
          {event ? 'Edit Event' : 'Add New Event'}
        </h2>
        
        <form onSubmit={handleSubmit} style={addEventStyles.form}>
          <div style={addEventStyles.formGroup}>
            <label style={addEventStyles.label}>Event Title</label>
            <input
              type="text"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              style={addEventStyles.input}
              required
            />
          </div>

          <div style={addEventStyles.timeContainer}>
            <div style={addEventStyles.formGroup}>
              <label style={addEventStyles.label}>Start Time</label>
              <input
                type="datetime-local"
                value={eventData.start}
                onChange={(e) => setEventData({ ...eventData, start: e.target.value })}
                style={addEventStyles.input}
                required
              />
            </div>
            
            <div style={addEventStyles.formGroup}>
              <label style={addEventStyles.label}>End Time</label>
              <input
                type="datetime-local"
                value={eventData.end}
                onChange={(e) => setEventData({ ...eventData, end: e.target.value })}
                style={addEventStyles.input}
                required
              />
            </div>
          </div>

          <div style={addEventStyles.formGroup}>
            <label style={addEventStyles.label}>Location</label>
            <input
              type="text"
              value={eventData.location}
              onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
              style={addEventStyles.input}
            />
          </div>

          <div style={addEventStyles.formGroup}>
            <label style={addEventStyles.label}>Description</label>
            <textarea
              value={eventData.description}
              onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
              style={{...addEventStyles.input, ...addEventStyles.textarea}}
            />
          </div>

          <div style={addEventStyles.formGroup}>
            <label style={addEventStyles.label}>Color</label>
            <input
              type="color"
              value={eventData.backgroundColor}
              onChange={(e) => setEventData({ ...eventData, backgroundColor: e.target.value })}
              style={{...addEventStyles.input, ...addEventStyles.colorInput}}
            />
          </div>

          <button type="submit" style={addEventStyles.submitButton}>
            {event ? 'Update Event' : 'Create Event'}
          </button>
        </form>
      </div>
    </div>
  );
};
