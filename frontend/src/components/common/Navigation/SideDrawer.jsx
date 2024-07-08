import React from 'react';
import { BsChatSquareDotsFill, BsFillCalendar2Fill, BsHouseFill, BsLayoutTextWindowReverse, BsListTask } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './SideDrawer.css';

function SideDrawer(props) {
  return (
    <div className="side-drawer">
      <nav>
        <Link to="/" onClick={props.onClose}>
          <BsHouseFill className='side-icon' />
          Home
        </Link>
        <Link to="/calendar" onClick={props.onClose}>
          <BsFillCalendar2Fill className='side-icon' />
          Calendar
        </Link>
        <Link to="/courses" onClick={props.onClose}>
          <BsLayoutTextWindowReverse className='side-icon' />
          Course List
        </Link>
        <Link to="/chat" onClick={props.onClose}>
          <BsChatSquareDotsFill className='side-icon' />
          Messages
        </Link>
        <Link to="/assignments" onClick={props.onClose}>
          <BsListTask className='side-icon' />
          Assignments
        </Link>
      </nav>
    </div>
  );
}

export default SideDrawer;
