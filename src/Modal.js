import React from 'react';
import './App.css';

const Modal = ({ closeModal, children, isModalOpen }) => {

  return (
    
    <div>
      {isModalOpen}
      <div className="modal-overlay">
        <div className="modal">
          <button className="close-modal-button" onClick={closeModal}>
            X
          </button>
          <div className="modal-content">
          
            {children}
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;