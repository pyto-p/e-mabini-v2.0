import React from 'react';
import { Link } from 'react-router-dom';
import './CourseItem.css';

function CourseItem(props) {
  return (
    <li className='course-item'>
      <div className='course-item__content'>
        <div className="course-item__image">
          <img src={props.image} alt={props.code} />
        </div>
        <div className='course-item__info'>
          <h3>{props.code}</h3>
          <Link
            className="course-item__link"
            to={{
              pathname: `/course/${props.code.toLowerCase().replace(/\s/g, "")}`,
              state: { ...props }
            }}
          >
            <p className='course-item__name'>{props.name}</p>
          </Link>
          <p className='course-item__details'>{props.schedday + ' ' + props.schedtime}</p>
          <p className='course-item__details'>{props.instructor}</p>
        </div>
      </div>
    </li>
  )
}

export default CourseItem