import React from 'react';
import ReactDOM from 'react-dom';

const ModalWrapper = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  // Handle click outside of the modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prevent click events from bubbling up from the modal to the overlay
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  return ReactDOM.createPortal(
    <div className="overlay" onClick={handleOverlayClick}>
      <div className="modal" onClick={handleModalClick}>
        <button className="modal-close" onClick={onClose}>
          X
        </button>
        <div className="modal-content"> 
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default ModalWrapper;
