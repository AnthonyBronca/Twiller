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


    return (
        <>
            <div className="side-bar-container">
                <div className="side-bar-icons">
                    {profileIcon}
                </div>
            </div>

        </>
    )
}

export default SideBar
