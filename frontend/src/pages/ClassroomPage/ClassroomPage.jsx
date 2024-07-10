import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import ClassroomBanner from '../../components/common/Classroom/ClassroomBanner';
import PostList from '../../components/common/Classroom/PostList';
import { POSTS } from '../../dummyData';
import './ClassroomPage.css';

function ClassroomPage() {
  const location = useLocation();
  const { courseid } = useParams();
  const courseData = location.state;

  // Filter posts by course code
  const filteredPosts = POSTS.filter(post => {
    return post.code.toLowerCase().replace(/\s/g, "") === courseid.toLowerCase();
  });

  return (
    <div className='classroom-page'>
      <ClassroomBanner banner={courseData} />
      <PostList posts={filteredPosts} />
    </div>
  );
}

export default ClassroomPage;
