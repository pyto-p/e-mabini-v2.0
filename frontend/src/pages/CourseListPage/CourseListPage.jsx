import React from 'react'
import CourseList from '../../components/common/CourseList'

function CourseListPage() {

  const COURSES = [{
    id: 1,
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=100&q=80",
    code: "CSC 101",
    name: "Introduction to Computer Science",
    schedule: "TBA",
    instructor: "Dr. John Doe",
  }, 
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1606787366850-de6330128bfc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=100&q=80",
    code: "CSC 102",
    name: "Computer Science",
    schedule: "TBA",
    instructor: "Dr. John Doe",
  }]

  return (
    <CourseList items={COURSES} />
  )
}

export default CourseListPage