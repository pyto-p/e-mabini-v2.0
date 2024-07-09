import React from 'react';
import { useParams } from 'react-router-dom';
import { dateFormatter } from '../../dateFormatter';
import { POSTS } from '../../dummyData';
import './PostPage.css';

function PostPage() {
  const { courseid, postid } = useParams();
  const post = POSTS.find(p => p.id === parseInt(postid) && p.code.toLowerCase().replace(/\s/g, "") === courseid.toLowerCase());

  const dateFormatted = dateFormatter(post.date);

  if (!post) {
    return <h2>Post not found</h2>;
  }

  return (
    <div className='post-page'>
      <div className="post-page__content">
        <h1>{post.header}</h1>
        <p>{post.author + ' • ' + dateFormatted}</p>
        <p>{post.content}</p>
      </div>
    </div>
  )
}

export default PostPage;
