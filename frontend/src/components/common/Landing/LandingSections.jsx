import React from 'react';
import { BsChatDotsFill, BsFileTextFill, BsFillInboxFill } from "react-icons/bs";
import './LandingSections.css';

function LandingSections(props) {
  return (
    <div className="landing-sections">
      <div className="landing-sections__header">
        <ul className="landing-sections__list">
          <li className="landing-sections__item" onClick={() => props.onSelectSection('inbox')}>
            <BsFillInboxFill className="landing-sections__icon" />
            <p>Inbox ({props.length})</p>
          </li>
          <li className="landing-sections__item" onClick={() => props.onSelectSection('feedback')}>
            <BsChatDotsFill className="landing-sections__icon" />
            <p>Submit Feedback</p>
          </li>
          <li className="landing-sections__item" onClick={() => props.onSelectSection('clearance')}>
            <BsFileTextFill className="landing-sections__icon" />
            <p>Graduation Clearance</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default LandingSections;
