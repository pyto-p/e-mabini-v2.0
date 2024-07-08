import React from 'react';
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
          <p>{props.name}</p>
          <p>{props.schedule}</p>
          <p>{props.instructor}</p>
        </div>
      </div>
    </li>
  )
}

export default CourseItem