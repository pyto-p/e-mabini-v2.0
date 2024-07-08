import React from 'react';
import './InboxItem.css';

function InboxItem(props) {
  return (
    <li className='inbox-item'>
      <a href='#' className='inbox-item__task'>{props.task}</a>
      <span className='inbox-item__date'>{props.date}</span>
    </li>
  );
}

export default InboxItem;
