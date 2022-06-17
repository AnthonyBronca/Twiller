import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
    birdIcon,
    homeFilledIn, homeIcon,
    exploreIcon, exploreIconFilledIn,
    notificationIcon, notificationIconFilledIn,
    messageIcon, messageIconFilledIn,
    profileIcon, profileIconFilledIn,
} from './sidebaricons';
import './sidebar.css'
import Navigation from "../Navigation";


function SideBar() {
    const dispatch = useDispatch();
    const history = useHistory();
    const userId = useSelector((state) => state?.session?.user?.id)

    const [homeStatus, setHomeStatus] = useState(homeFilledIn)
    const [exploreStatus, setExploreStatus] = useState(exploreIcon)
    const [notificationStatus, setNotificationStatus] = useState(notificationIcon)
    const [messageStatus, setMessageStatus] = useState(messageIcon)
    const [profileStatus, setProfileStatus] = useState(profileIcon)




    const clearIconStatus = (id) => {
        // setHomeStatus(homeIcon);
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
            history.push('/tweets')
        }
        if (iconId === 'explore') setExploreStatus(exploreIconFilledIn)
        if (iconId === 'notification') setNotificationStatus(notificationIconFilledIn)
        if (iconId === 'message') setMessageStatus(messageIconFilledIn)
        if (iconId === 'profile') {
            setProfileStatus(profileIconFilledIn)
            history.push(`/user/${userId}`)
        }

    }

    if (!userId) {
        return null
    } else {
        return (
            <>
                <div className="side-bar-container">
                    <div className="side-bar-icons">
                        <div className="interior-side-bar">

                            <div onClick={(e) => history.push('/tweets')} id='bird' className="side-bar-icon">
                                {birdIcon}
                                {/* add dispatch to bird */}
                            </div >
                            <div id='home' className="side-bar-icon"
                                onClick={(e) => changeIconStatus(e, e.target.id)}>
                                <span id='home' onClick={(e) => changeIconStatus(e, e.target.id)}>{homeStatus}</span>
                                <label id='home' onClick={(e) => changeIconStatus(e, e.target.id)} className="side-bar-label">Home</label>
                            </div>
                            <div id='js' className="side-bar-icon">
                                <a className="link-to-github" href="https://github.com/AnthonyBronca/Twiller"
                                style={{'textDecoration': 'none', 'color': 'white', 'cursor': 'pointer'}}>Anthony's GitHub</a>
                            </div>
                            <div id='js' className="side-bar-icon">
                                <a className="link-to-Linked" href="https://www.linkedin.com/in/anthonybronca/"
                                style={{'textDecoration': 'none', 'color': 'white', 'cursor': 'pointer'}}>Anthony's Linkedin</a>
                            </div>
                            {/* <div id='explore' className="side-bar-icon"
                                onClick={(e) => changeIconStatus(e, e.target.id)}>
                                <span id="explore" onClick={(e) => changeIconStatus(e, e.target.id)}>{exploreStatus}</span>
                                <label id='explore' onClick={(e) => changeIconStatus(e, e.target.id)} className="side-bar-label">Explore</label>
                            </div > */}
                            {/* <div id='notification' className="side-bar-icon"
                                onClick={(e) => changeIconStatus(e, e.target.id)}>
                                <span id='notification' onClick={(e) => changeIconStatus(e, e.target.id)}>{notificationStatus}</span>
                                <label id='notification' onClick={(e) => changeIconStatus(e, e.target.id)} className="side-bar-label">Notifications</label>
                            </div> */}
                            {/* <div id='message' className="side-bar-icon"
                                onClick={(e) => changeIconStatus(e, e.target.id)}>
                                <span id='message' onClick={(e) => changeIconStatus(e, e.target.id)}>{messageStatus}</span>
                                <label id='message' onClick={(e) => changeIconStatus(e, e.target.id)} className="side-bar-label">Messages</label>
                            </div> */}
                            {/* <div id='profile' className="side-bar-icon"
                                onClick={(e) => changeIconStatus(e, e.target.id)}>
                                <span id='profile' onClick={(e) => changeIconStatus(e, e.target.id)}>{profileStatus}</span>
                                <label id='profile' onClick={(e) => changeIconStatus(e, e.target.id)} className="side-bar-label">Profile</label>
                            </div> */}
                        </div>

                        <div className="user-profile-actions">
                            <Navigation />
                        </div>
                    </div>
                </div>

            </>
        )
    }
}

export default SideBar
