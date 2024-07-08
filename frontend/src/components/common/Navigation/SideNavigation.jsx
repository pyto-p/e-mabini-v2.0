import React from 'react'
import './SideNavigation.css'

function SideNavigation(props) {
  return (
    <header className='side-header'>
      {props.children}
    </header>
  )
}

export default SideNavigation