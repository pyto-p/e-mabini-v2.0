import React from 'react';
import { BsBellFill, BsPersonCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './MainHeader.css';

function MainHeader(props) {
  return (
    <header className='main-header'>
      <div className="left-side">
        <Link to="/">
          <img src="/header-icon.png" alt="" />
        </Link>
        <h1 className="main-navigation__title">
          <Link to="/">E-Mabini 2.0</Link>
        </h1>
      </div>
      <div className="right-side">
        <button>
          <BsBellFill className='bell-icon' />
        </button>
        {/* <img src="" alt="" /> */}
        <BsPersonCircle className='user-icon' />
      </div>
    </header>
  )
}

export default MainHeader