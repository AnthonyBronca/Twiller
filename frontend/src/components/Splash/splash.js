import React, { useState, useEffect } from 'react';
import logo from './twitter-splash.jpg'
import './splash.css'
import { birdLogoIcon } from './splashIcons'
import { useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Splash() {
    const history = useHistory();
    const user = useSelector(state => state?.session?.user)
    const sendToLogin = () => {
        history.push('/login')
    }

    const sendToNewAccountForm = () => {
        history.push('/signup')
    }
    if (user) {
        history.push('/tweets')
    } else {
        return (
            <>
                <div className='splash-page-container'>
                    <div className='splash-main-container'>
                        <img className='splash-logo-img' src={logo} alt='twitter-login-logo'></img>
                        <div className='home-login-forms'>
                            <div className='bird-logo-icon'>{birdLogoIcon}</div>
                            <h1 className='happening-now-title'>Happening Now</h1>
                            <div className='new-user-form'>
                                <span>New to Twiller?</span>
                                <button onClick={sendToNewAccountForm} className='new-account-button'>Make an account</button>
                            </div>
                            <div className='existing-user-form'>
                                <span>Existing User?</span>
                                <button type='button'
                                    className='new-account-button'
                                    onClick={sendToLogin}>Login</button>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default Splash
