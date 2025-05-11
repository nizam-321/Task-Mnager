import React from 'react'
import './Modal.css'

function Modal({ isOpen, onClose, onConfirm, message }) {
  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Confirm</h2>
        <p>{message}</p>
        <div className="modal-buttons">
          <button 
            className="btn btn-secondary" 
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="btn btn-primary" 
            onClick={onConfirm}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal