import React from 'react';
import ReactDOM from 'react-dom';

const ModalWrapper = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="overlay">
      <div className="modal">
        <button className="modal-close" onClick={onClose}>
          Close
        </button>
        {children}
      </div>
    </div>,
    document.getElementById('modal-root') // Ensure this is the correct target container
  );
};

export default ModalWrapper;
