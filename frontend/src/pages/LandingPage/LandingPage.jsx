import React, { useState } from 'react';
import InboxList from '../../components/common/Landing/InboxList';
import LandingSections from '../../components/common/Landing/LandingSections';
import './LandingPage.css';

function LandingPage(props) {
  const USER = {
    name: "Temporal, Sebastian Audrey I.",
    code: "2021-10903-MN-0"
  }

  const INBOX = [
    {
      id: 1,
      date: "2022-01-01",
      task: "Task 1"
    },
    {
      id: 2,
      date: "2022-02-01",
      task: "Task 2"
    },
    {
      id: 3,
      date: "2022-03-01",
      task: "Task 3"
    },
  ];

  const [selectedSection, setSelectedSection] = useState('inbox');

  const renderSection = () => {
    switch (selectedSection) {
      case 'inbox':
        return <InboxList items={INBOX} />;
      case 'feedback':
        return <div className='center'>Submit Feedback</div>;
      case 'clearance':
        return <div className='center'>Graduation Clearance</div>;
      default:
        return null;
    }
  };

  return (
    <div className='landing-page'>
      <div className="landing-page__container">
        <img className='landing-page__image' src="/landing-banner.png" alt="" />
        <div className='landing-page__content'>
          <div className="content-header">
            <h2>{USER.name + " " + "(" + USER.code + ")"}</h2>
          </div>
          <hr className='content-header__divider' />
          <div className='landing-page__divider'>
            <div className='landing-page__divider-left'>
              <LandingSections length={INBOX.length} onSelectSection={setSelectedSection} />
            </div>
            <hr className='content-header__divider' />
            <div className='landing-page__divider-right'>
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage;
