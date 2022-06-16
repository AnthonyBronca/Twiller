import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom';


function NotSignedIn() {
    const history = useHistory();
    const authorizedUser = useSelector((state) => state?.session?.user)

    if (authorizedUser) {
        history.push('/tweets')
    } else {
        return (
            <div className='main-not-signed-in-container'>
                <h1 className='not-signed-in-title'>It appears you are not signed in!</h1>
                <span className='redirect-not-signed-in'>Please click <NavLink to='/'>HERE</NavLink>to go back</span>
                <span></span>
            </div>
        )
    }
}

export default NotSignedIn
