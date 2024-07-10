import React from 'react'
import CourseHeader from '../../components/common/Courses/CourseHeader'
import CourseList from '../../components/common/Courses/CourseList'
import { COURSES, USER } from '../../dummyData'
import './CourseListPage.css'

function CourseListPage() {
  const COURSES_DATA = COURSES
  const USER_DATA = USER

  
  return (
    <div className='course-list__page'>
      <CourseHeader user={USER_DATA} />
      <div className='course-list__container'>
        <CourseList items={COURSES_DATA} />
      </div>
    </div>
  )
}

export default CourseListPage
