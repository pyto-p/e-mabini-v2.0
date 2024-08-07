import React from 'react';
import './Backdrop.css';

function Backdrop(props) {
  return <div className="backdrop" onClick={props.onClick}></div>;
}

export default Backdrop;
