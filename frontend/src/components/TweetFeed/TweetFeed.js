import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getTweetsThunk } from '../../store/tweets';
import SideBar from '../HomePageSideBar/SideBar'
function TweetFeed() {

    const dispatch = useDispatch();
    const history = useHistory();

    const tweets = useSelector((state) => state?.tweets)

    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getTweetsThunk())
            .then(() => setIsLoaded(true))
    }, [isLoaded])


    if (!isLoaded) {
        return <h1>Loading...</h1>
    } else {

        return (
            <>
            <SideBar />
                <h1>Testing</h1>
            </>
        )
    }
}


export default TweetFeed
