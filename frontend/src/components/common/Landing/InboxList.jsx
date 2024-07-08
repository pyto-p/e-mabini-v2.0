import React from 'react';
import InboxItem from './InboxItem';
import './InboxItem.css';

function InboxList(props) {
  if (props.items.length === 0) {
    return (
      <div className="center">
        <h2>No notifications.</h2>
      </div>
    );
  }

  return (
    <div className="inbox">
      <div className="inbox-header">
        Inbox <span>({props.items.length})</span>
      </div>
      <ul>
        {props.items.map(notification => (
          <InboxItem
            key={notification.id}
            id={notification.id}
            date={notification.date}
            task={notification.task}
          />
        ))}
      </ul>
    </div>
  );
}

export default InboxList;
