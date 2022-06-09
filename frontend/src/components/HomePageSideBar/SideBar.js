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
} from './sidebaricons';
import './sidebar.css'

function SideBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state?.session?.user?.id)
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
        if (iconId === 'home') {
            setHomeStatus(homeFilledIn)
            history.push('/')
        }
        if (iconId === 'explore') setExploreStatus(exploreIconFilledIn)
        if (iconId === 'notification') setNotificationStatus(notificationIconFilledIn)
        if (iconId === 'message') setMessageStatus(messageIconFilledIn)
        if (iconId === 'profile') {
            setProfileStatus(profileIconFilledIn)
            history.push(`/user/${userId}`)
        }
    }

    return (
        <>
            <div className="side-bar-container">
                <div className="side-bar-icons">
                    <div className="interior-side-bar">

                        <div id='bird' className="side-bar-icon">
                            {birdIcon}
                            {/* add dispatch to bird */}
                        </div >
                        <div id='home' className="side-bar-icon"
                            onClick={(e) => changeIconStatus(e, e.target.id)}>
                            {homeStatus}
                            <label className="side-bar-label">Home</label>
                        </div>
                        <div id='explore' className="side-bar-icon"
                            onClick={(e) => changeIconStatus(e, e.target.id)}>
                            {exploreStatus}
                            <label className="side-bar-label">Explore</label>
                        </div >
                        <div id='notification' className="side-bar-icon"
                            onClick={(e) => changeIconStatus(e, e.target.id)}>
                            {notificationStatus}
                            <label className="side-bar-label">Notifications</label>
                        </div>
                        <div id='message' className="side-bar-icon"
                            onClick={(e) => changeIconStatus(e, e.target.id)}>
                            {messageStatus}
                            <label className="side-bar-label">Messages</label>
                        </div>
                        <div id='profile' className="side-bar-icon"
                            onClick={(e) => changeIconStatus(e, e.target.id)}>
                            {profileStatus}
                            <label className="side-bar-label">Profile</label>
                        </div>
                    </div>

                </div>
            </div>

        </>
    )
}

export default SideBar
