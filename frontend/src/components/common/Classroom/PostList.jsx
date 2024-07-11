import React from 'react';
import { BsPlus } from "react-icons/bs";
import { Link, useParams } from 'react-router-dom';
import PostItem from './PostItem';
import './PostList.css';

function PostList(props) {
  const { courseid } = useParams();
  console.log("hey" + courseid);

  if (props.posts.length === 0) {
    return (
      <div className="post-list center">
        <h2>No posts.</h2>
      </div>
    );
  }

  return (
    <div className="post-list">
      <Link className="classroom-page__link" to={`/course/${courseid}/new`}>
        <BsPlus className='classroom-page__icon' />
        Create Post
      </Link>
      {props.posts.map(post => (
        <PostItem
          key={post.id}
          id={post.id}
          code={post.code}
          date={post.date}
          header={post.header}
          author={post.author} //OP = original poster
          content={post.content}
          typePost={post.typePost}
        />
      ))}
    </div>
  );
}

export default PostList;
