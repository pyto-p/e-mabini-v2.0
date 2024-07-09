import React from 'react'
import CourseList from '../../components/common/Courses/CourseList'
import { COURSES } from '../../dummyData'
import './CourseListPage.css'

function CourseListPage() {
  const COURSES_DATA = COURSES
  
  return (
    <div className='course-list__container'>
      <CourseList items={COURSES_DATA} />
    </div>
  )
}

export default CourseListPage