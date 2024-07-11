import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { dateFormatter } from '../../../dateFormatter';
import { POSTS } from '../../../dummyData';
import './Post.css';

function Post() {
  const { courseid, postid } = useParams();
  const post = POSTS.find(p => p.id === parseInt(postid) && p.code.toLowerCase().replace(/\s/g, "") === courseid.toLowerCase());

  if (!post) {
    return <h2>Post not found</h2>;
  }

  const dateFormatted = dateFormatter(post.date);

  return (
    <div className='post-page'>
      <div className="post-page__content">
        <h1>{post.header}</h1>
        <p>{post.author + ' • ' + dateFormatted}</p>
        <p>{post.content}</p>
        <Link className="post-item__link" to={`/course/${courseid}/${postid}/edit`}>
          <button className='post-item__button'>
            Edit Post
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Post;
