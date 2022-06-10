import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }) {
  const sessionUser = useSelector(state => state.session.user);
  // const tweets = useSelector(state => state.tweets)

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <NavLink style={{ color: 'white' }} to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div id='nav-bar-box-container'>
      <div id='nav-bar-items'>
        <span><img id='nav-bar-profile-pic' className='profile-pic' src={sessionUser?.profilePic}></img></span>
        <div className='user-identifiers'>
        <span>{sessionUser?.fullname}</span>
        <span style={{ color: 'rgb(139,152,165)' }}>{`@${sessionUser?.username}`}</span>
        </div>
        {isLoaded && sessionLinks}
      </div>
    </div>
  );
}

export default Navigation;
