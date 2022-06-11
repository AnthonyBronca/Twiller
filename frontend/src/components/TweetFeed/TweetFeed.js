import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { deleteTweetThunk, getTweetsThunk, updateTweetThunk } from '../../store/tweets';
import Checkmark from "../Checkmark/Checkmark";
import SideBar from '../HomePageSideBar/SideBar'
import Elipsis from "../MoreTweetOptions/Elipsis";
import NewTweetForm from "../NewTweetForm/NewTweetForm";
import { commentIcon, dotDotDotIcon } from "../OneTweet/onetweeticons";
import './tweetfeed.css'
import EditTweetModal from "./EditTweetModal";


function TweetFeed() {

    const dispatch = useDispatch();
    const history = useHistory();

    const tweets = useSelector((state) => Object.values(state.tweets).reverse())
    // console.log(tweets)
    const authorizedUser = useSelector((state) => state.session.user)



    const [isLoaded, setIsLoaded] = useState(false)
    const [modalStatus, setModalStatus] = useState(false)
    const [editModalStatus, setEditModalStatus] = useState(false)
    const [tweetNum, setTweetNum] = useState(null)

    useEffect(() => {
        dispatch(getTweetsThunk())
            .then(() => setIsLoaded(true))
    }, [isLoaded])



    const deleteTweet = (e, tweetId) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteTweetThunk(tweetId))
    }

    // const editTweet = (e, tweetId, tweet, imgUrl) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     const userId = authorizedUser.id
    //     const form = {
    //         userId,
    //         tweet,
    //         imgUrl
    //     }
    //     dispatch(updateTweetThunk(tweetId))
    // }
    const editModalActions = (e, tweetId) => {
        e.preventDefault()
        e.stopPropagation();
        setTweetNum(tweetId)
        if (editModalStatus) {
            setEditModalStatus(false)
        } else {
            setEditModalStatus(true)
        }
        console.log(editModalStatus)
    }

    const modalAction = (e) => {
        e.preventDefault()
        e.stopPropagation();
        if (modalStatus) {
            setModalStatus(false)
        } else {
            setModalStatus(true)
        }
    }

    const sendToTweetPage = (e, tweetId) => {
        e.preventDefault();
        e.stopPropagation();
        history.push(`/tweets/${tweetId}`)
    }

    if (!isLoaded) {
        return <h1>Loading...</h1>
    } else if (!authorizedUser) {
        return <h1>Please sign in to view the feed</h1>
    } else {
        return (authorizedUser &&
            <>
                <div className="center-container">
                    <NewTweetForm />
                    <div className="feed-container">
                        {tweets ? tweets.map((tweet) => {
                            return (
                                <>
                                    <div key={tweet?.id}
                                        // onClick={e => sendToTweetPage(e, tweet.id)}
                                        lassName="tweet-header">
                                        {authorizedUser?.id === tweet?.User?.id ? <div onClick={(e) => editModalActions(e, tweet?.id)}
                                            className="dot-container">{dotDotDotIcon}</div> : null}
                                            {editModalStatus && tweetNum === tweet?.id ? <Elipsis setEditModalStatus={setEditModalStatus} tweetNum={tweetNum} /> : null}
                                        <span><img className="profile-pic" src={tweet?.User?.profilePic}></img></span>
                                        <span style={{ color: 'white' }}>{tweet?.User?.fullname}</span>
                                        <span>{tweet.User.id === 2 ? <Checkmark /> : null}</span>
                                        <span style={{ color: 'rgb(139,152,165)' }}>{`@${tweet?.User?.username}`}</span>
                                        {modalStatus ? <EditTweetModal tweet={tweet?.tweet} /> : <p style={{ color: 'white' }} >{tweet?.tweet}</p>}
                                        {authorizedUser.id === tweet.User.id ? <>
                                            <button onClick={e => deleteTweet(e, tweet.id)}
                                                className="delete-tweet-button">Delete Tweet</button>
                                            <button onClick={e => modalAction(e)}>Edit Tweet</button>
                                        </> : null}
                                        <div className="tweet-action-icon-row">
                                            <div className='comment-icon' onClick={e => sendToTweetPage(e, tweet.id)}>{commentIcon}</div>
                                        </div>
                                    </div>
                                </>
                            )
                        }) : <h1>Loading...</h1>}
                    </div>
                </div>
            </>
        )
    }
}


export default TweetFeed
