import React from 'react';
import { BsReceipt } from "react-icons/bs";
import { Link, useParams } from 'react-router-dom';
import { dateFormatter } from "../../../dateFormatter";
import './PostItem.css';

function PostItem(props) {
  const { courseid } = useParams();
  const dateFormatted = dateFormatter(props.date);

  return (
    <div>
      <Link className="post-item__link" to={`/course/${courseid}/${props.id}`}>
        <li className='post-item'>
          <BsReceipt className='post-item__image' />
          <div className="post-item__content">
            <p>
              {props.author + ' posted a new ' + props.typePost + ': ' + props.header}
            </p>
            <p>{dateFormatted}</p>
          </div>
        </li>
      </Link>
    </div>
  )
}

export default PostItem;
