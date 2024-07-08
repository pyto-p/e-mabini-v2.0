import React, { useState } from 'react';
import { BsBellFill, BsList, BsPersonCircle } from "react-icons/bs";
import { Link } from 'react-router-dom';
import Backdrop from './Backdrop';
import './MainHeader.css';
import SideDrawer from './SideDrawer';

function MainHeader(props) {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);

  const openDrawerHandler = () => {
    setDrawerIsOpen(true);
  };

  const closeDrawerHandler = () => {
    setDrawerIsOpen(false);
  };

  return (
    <>
      {drawerIsOpen && <Backdrop onClick={closeDrawerHandler} />}
      {drawerIsOpen && <SideDrawer onClose={closeDrawerHandler} />}
      <header className='main-header'>
        <button className="menu-btn" onClick={openDrawerHandler}>
          <BsList />
        </button>
        <div className="left-side">
          <Link to="/">
            <img src="/header-icon.png" alt="Header Icon" className="header-icon" />
          </Link>
          <h1 className="main-navigation__title">
            <Link to="/">E-Mabini 2.0</Link>
          </h1>
        </div>
        <div className="right-side">
          <button>
            <BsBellFill className='bell-icon' />
          </button>
          <BsPersonCircle className='user-icon' />
        </div>
      </header>
    </>
  );
}

export default MainHeader;
