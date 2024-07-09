import React from 'react';
import PostItem from './PostItem';
import './PostList.css';

function PostList(props) {
  if (props.posts.length === 0) { 
    return (
      <div className="post-list center">
        <h2>No posts.</h2>
      </div>
    )
  }

  return (
    <div className="post-list">
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
  )
}

export default PostList