import React from 'react'
import './ClassroomBanner.css'

function ClassroomBanner(props) {
  return (
    <div className='classroom-banner'>
      <div className='classroom-banner__content'>
        <img src="/landing-banner.png" alt="" />
        <h1>{props.banner.name + ' (' + props.banner.code + ')'}</h1>
        <p>{props.banner.section + ' ' + props.banner.schedday + ' ' + props.banner.schedtime}</p>
      </div>
    </div>
  )
}

export default ClassroomBanner