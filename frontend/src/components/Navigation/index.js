import React from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import './Navigation.css';
import Checkmark from '../Checkmark/Checkmark';
import { useState } from 'react';
import * as sessionActions from '../../store/session';

function Navigation({ isLoaded }) {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector(state => state.session.user);
  // const tweets = useSelector(state => state.tweets)
  const [loginModal, setLoginModal] = useState(false);

  const modalActions = () => {
    if (loginModal) {
      setLoginModal(false)
    } else {
      setLoginModal(true)
    }
  }

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout())
      .then(() => history.push('/'))
  };

  const sendToProfile = (e) => {
    history.push(`/user/${sessionUser.id}`)
  }

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        {/* <LoginFormModal /> */}
        <NavLink style={{ color: 'white' }} to="/signup">Sign Up</NavLink>
      </>
    );
  }

  if (sessionUser) {
    return (
      <div id='nav-bar-box-container'>
        <div onClick={e => modalActions()} id='nav-bar-items'>
          {loginModal ?
            <>
              <div style={{ 'position': 'relative', 'top': '120px', 'right': '100px' }} className='elispis-modal-container'>
                <div className='elipsis-modal-inner'>
                  <div className='edit-button-container'>
                    {/* <button className='edit-button-elipsis' type='button'
                      onClick={e => sendToProfile(e)}
                    >
                      <div className='edit-word'>Profile</div>
                    </button> */}
                  </div>
                  <div className='delete-button-container'>
                    <button className='delete-button-elipsis' type='button'
                      onClick={logout}>
                      <div className='delete-word'>Log Out</div>
                    </button>
                  </div>
                  <div className='close-button-container'>
                    <button className='close-button-elipsis'
                      type='button'
                    >
                      <div className='close-word'>Close</div>
                    </button>
                  </div>
                </div>
              </div>
            </>
            : null}
          <span><img id='nav-bar-profile-pic' className='profile-pic' src={sessionUser?.profilePic}></img></span>
          <div className='user-identifiers'>
            <span>{sessionUser?.fullname}{sessionUser?.username === 'abronca' ? <Checkmark /> : null}</span>
            <span style={{ color: 'rgb(139,152,165)' }}>{`@${sessionUser?.username}`}</span>
          </div>
          {isLoaded && sessionLinks}
        </div>
      </div>
    );
  }
}

export default Navigation;
