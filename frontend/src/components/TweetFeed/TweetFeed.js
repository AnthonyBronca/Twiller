import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { getTweetsThunk } from '../../store/tweets';
import SideBar from '../HomePageSideBar/SideBar'
import NewTweetForm from "../NewTweetForm/NewTweetForm";
function TweetFeed() {

    const dispatch = useDispatch();
    const history = useHistory();

    const tweets = useSelector((state) => Object.values(state.tweets).reverse())
    // console.log(tweets)
    const authorizedUser = useSelector((state)=> state.session.user)



    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getTweetsThunk())
            .then(() => setIsLoaded(true))
    }, [isLoaded])


    if (!isLoaded) {
        return <h1>Loading...</h1>
    } else if(!authorizedUser){
        return <h1>Please sign in to view the feed</h1>
    } else {
        return ( authorizedUser &&
            <>
                <SideBar />
                <div className="center-container">
                    <NewTweetForm />
                    <div className="feed-container">
                        {tweets? tweets.map((tweet) => {
                            return (
                                <div key={tweet?.id} className="tweet-header">
                                <span style={{color:'white'}}>{tweet?.User?.fullname}</span>
                                <span style={{color:'rgb(139,152,165)'}}>{`@${tweet?.User?.username}`}</span>
                                <p style={{color:'white'}} >{tweet?.tweet}</p>
                                {authorizedUser.id === tweet.User.id? <button
                                className="delete-tweet-button"
                                >Delete Tweet</button>: null}
                                </div>
                                    )
                        }): <h1>Loading...</h1>}
                    </div>
                </div>
            </>
        )
    }
}


export default TweetFeed
