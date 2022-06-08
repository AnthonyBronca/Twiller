import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';

function Navigation({ isLoaded }){
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
        <NavLink style={{color:'white'}} to="/signup">Sign Up</NavLink>
      </>
    );
  }

  return (
    <div id='nav-bar-box-container'>
    <ul>
      <ul id='nav-bar-items'>
        <NavLink style={{color:'white'}} exact to="/">Home</NavLink>
        {isLoaded && sessionLinks}
      </ul>
    </ul>
    </div>
  );
}

export default Navigation;
