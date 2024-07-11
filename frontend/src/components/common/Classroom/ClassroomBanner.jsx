import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Modal from '../Modal/Modal';
import './ClassroomBanner.css';

function ClassroomBanner(props) {
  const { courseid } = useParams();
  
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
    console.log('Course Deleted');
  };

  return (
    <div className='classroom-banner'>
      <div className='classroom-banner__content'>
        <img src="/landing-banner.png" alt="" />
        <div className="classroom-banner__header">
          <h1>{props.banner.name + ' (' + props.banner.code + ')'}</h1>
          <div className="classroom-banner__buttons">
            <Link className="classroom-page__link" to={`/courses/${courseid}`}>
              <button className='course-item__edit'>
                Edit Course
              </button>
            </Link>
            <button className='course-item__delete' onClick={showDeleteWarningHandler}>
              Delete Course
            </button>
          </div>
        </div>
        <p>{props.banner.section + ' ' + props.banner.schedday + ' ' + props.banner.schedtime}</p>
      </div>
      {showModal && (
        <Modal
          title="Are you sure?"
          message="Do you want to proceed and delete this course? Please note that it can't be undone thereafter."
          onCancel={cancelDeleteHandler}
          onConfirm={confirmDeleteHandler}
        />
      )}
    </div>
  )
}

export default ClassroomBanner;
