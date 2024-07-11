import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { dateFormatter } from '../../../dateFormatter';
import { POSTS } from '../../../dummyData';
import Modal from '../Modal/Modal';
import './Post.css';

function Post() {
  const { courseid, postid } = useParams();
  const post = POSTS.find(p => p.id === parseInt(postid) && p.code.toLowerCase().replace(/\s/g, "") === courseid.toLowerCase());

  if (!post) {
    return <h2>Post not found</h2>;
  }

  const dateFormatted = dateFormatter(post.date);

  const [showModal, setShowModal] = useState(false);

  const showDeleteWarningHandler = () => {
    setShowModal(true);
  };

  const cancelDeleteHandler = () => {
    setShowModal(false);
  };

  const confirmDeleteHandler = () => {
    setShowModal(false);
    // Add your delete logic here
    console.log('Deleted');
  };

  return (
    <div className='post-page'>
      <div className="post-page__content">
        <h1>{post.header}</h1>
        <p>{post.author + ' • ' + dateFormatted}</p>
        <p>{post.content}</p>
        <div className="post__buttons">
          <Link className="post-item__link" to={`/course/${courseid}/${postid}/edit`}>
            <button className='post-item__button'>
              Edit Post
            </button>
          </Link>
          <button className='post-item__button' onClick={showDeleteWarningHandler}>Delete Post</button>
          {showModal && (
            <Modal
              title="Are you sure?"
              message="Do you want to proceed and delete this post? Please note that it can't be undone thereafter."
              onCancel={cancelDeleteHandler}
              onConfirm={confirmDeleteHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Post;
