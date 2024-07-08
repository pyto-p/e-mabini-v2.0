import React from 'react';
import CourseItem from './CourseItem';

function CourseList(props) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        //Create the styling of center in the CourseList.css
        <h2>No classroom/course found.</h2>
      </div>
    )
  }

  return (
    <ul>
      {props.items.map(course => (
        <CourseItem
          key={course.id}
          id={course.id}
          image={course.image}
          code={course.code}
          name={course.name}
          schedule={course.schedule}
          instructor={course.instructor}
        />
      ))}
    </ul>
  );
}

export default CourseList