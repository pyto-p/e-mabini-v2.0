// Modal.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className="modal__backdrop">
      <div className="modal">
        <div className="modal__header">
          <h2>{props.title}</h2>
        </div>
        <div className="modal__content">
          <p>{props.message}</p>
        </div>
        <div className="modal__actions">
          <button className="modal__button" onClick={props.onCancel}>Cancel</button>
          <button className="modal__button" onClick={props.onConfirm}>Delete</button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;
