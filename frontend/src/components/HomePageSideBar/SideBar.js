import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
    birdIcon,
    homeFilledIn, homeIcon,
    exploreIcon, exploreIconFilledIn,
    notificationIcon, notificationIconFilledIn,
    messageIcon, messageIconFilledIn,
    profileIcon, profileIconFilledIn
} from './sidebaricons'

function SideBar() {
    const dispatch = useDispatch();

    const [homeStatus, setHomeStatus] = useState(homeIcon)
    const [exploreStatus, setExploreStatus] = useState(exploreIcon)
    const [notificationStatus, setNotificationStatus] = useState(notificationIcon)
    const [messageStatus, setMessageStatus] = useState(messageIcon)
    const [profileStatus, setProfileStatus] = useState(profileIcon)


    const clearIconStatus = (id) => {
        setHomeStatus(homeIcon);
        setExploreStatus(exploreIcon);
        setNotificationStatus(notificationIcon);
        setMessageStatus(messageIcon);
        setProfileStatus(profileIcon);
        return;
    }
    const changeIconStatus = (e, iconId) => {
        e.stopPropagation();
        clearIconStatus(iconId);
        console.log(iconId)
        if (iconId === 'home')setHomeStatus(homeFilledIn)
        if (iconId === 'explore') setExploreStatus(exploreIconFilledIn)
        if (iconId === 'notification') setNotificationStatus(notificationIconFilledIn)
        if (iconId === 'message') setMessageStatus(messageIconFilledIn)
        if (iconId === 'profile') setProfileStatus(profileIconFilledIn)
    }

    return (
        <>
            <div className="side-bar-container">
                <div className="side-bar-icons">
                    <div id='bird' className="bird-icon">
                       {birdIcon}
                       {/* add dispatch to bird */}
                    </div >
                    <div id='home' className="home-icon"
                    onClick={(e)=> changeIconStatus(e, e.target.id)}>
                    {homeStatus}
                    </div>
                    <div id='explore' className="explore-icon"
                    onClick={(e)=> changeIconStatus(e, e.target.id)}>
                    {exploreStatus}
                    </div >
                    <div id='notification' className="notification-icon"
                    onClick={(e)=> changeIconStatus(e, e.target.id)}>
                    {notificationStatus}
                    </div>
                    <div id='message' className="message-icon"
                    onClick={(e)=> changeIconStatus(e, e.target.id)}>
                    {messageStatus}
                    </div>
                    <div id='profile' className="profile-icon"
                    onClick={(e)=> changeIconStatus(e, e.target.id)}>
                    {profileStatus}
                    </div>
                </div>
            </div>

        </>
    )
}

export default SideBar
