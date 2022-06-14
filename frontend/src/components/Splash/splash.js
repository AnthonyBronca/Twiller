import React, { useState, useEffect } from 'react';
import logo from './twitter-splash.jpg'
import './splash.css'
import { birdLogoIcon } from './splashIcons'
import { useHistory } from 'react-router-dom';

function Splash() {
    const history = useHistory();
    const sendToLogin = () => {
        history.push('/login')
    }



    return (
        <>
            <div className='page-container'>
                <div className='splash-main-container'>
                    <img className='splash-logo-img' src={logo} alt='twitter-login-logo'></img>
                    <div className='home-login-forms'>
                        <div className='bird-logo-icon'>{birdLogoIcon}</div>
                        <h1 className='happening-now-title'>Happening Now</h1>
                        <div className='new-user-form'>
                            <span>New to Twiller?</span>
                            <button className='new-account-button'>Make an account</button>
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

export default Splash
