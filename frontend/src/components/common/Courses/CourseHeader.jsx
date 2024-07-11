import React from 'react';
import { BsPlus } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './CourseHeader.css';

function CourseHeader(props) {
  return (
    <div className='course-list__header-container'>
      <div className="course-list__header">
        <h1 className='course-list__title'>
            COURSES
        </h1>
      </div>
      <div className="course-list__bar">
        <p>{props.user.code}</p>
        <Link className="course-list__link" to="/courses/new">
          <BsPlus className='course-list__icon' />
          Create Course
        </Link>
      </div>

    </div>
  )
}

export default CourseHeader