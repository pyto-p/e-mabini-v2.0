import React from 'react';
import { BsReceipt } from "react-icons/bs";
import { Link } from 'react-router-dom';
import './PostItem.css';

function PostItem(props) {
  return (
    <Link className="post-item__link" to="#">
      <li className='post-item'>
        <BsReceipt className='post-item__image' />
        <div className="post-item__content">
          <p>
            {props.author + ' posted a new ' + props.typePost + ': ' + props.header}
          </p>
          <p>{props.date}</p>
        </div>
      </li>
    </Link>
  )
}

export default PostItem