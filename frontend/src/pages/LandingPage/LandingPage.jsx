import React, { useState } from 'react';
import InboxList from '../../components/common/Landing/InboxList';
import LandingSections from '../../components/common/Landing/LandingSections';
import { INBOX, USER } from '../../dummyData';
import './LandingPage.css';

function LandingPage(props) {
  const USER_DATA = USER;

  const INBOX_DATA = INBOX;

  const [selectedSection, setSelectedSection] = useState('inbox');

  const renderSection = () => {
    switch (selectedSection) {
      case 'inbox':
        return <InboxList items={INBOX_DATA} />;
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
            <h2>{USER_DATA.name + " " + "(" + USER_DATA.code + ")"}</h2>
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
