import React from 'react';
import { BsChatSquareDotsFill, BsFillCalendar2Fill, BsHouseFill, BsLayoutTextWindowReverse, BsListTask } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './MainHeader.css';
import './MainNavigation.css';
import SideNavigation from './SideNavigation';

function MainNavigation() {
  return (
    <SideNavigation>

      <nav>
        <Link to="/home">
          <BsHouseFill className='side-icon' />
          Home
        </Link>
        <Link to="/calendar">
          <BsFillCalendar2Fill className='side-icon' />
          Calendar
        </Link>
        <Link to="/courses">
          <BsLayoutTextWindowReverse className='side-icon fill' />
          Course List
        </Link>
        <Link to="/chat">
          <BsChatSquareDotsFill className='side-icon' />
          Messages
        </Link>
        <Link to="/assignments">
          <BsListTask className='side-icon fill' />
          Assignments
        </Link>
      </nav>
    </SideNavigation>
  );
}

export default MainNavigation;
