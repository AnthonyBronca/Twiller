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
import NotSignedIn from "../NotSignedIn/NotSignedIn";

function TweetFeed({ posted }) {

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

    // console.log(editModalStatus, "hellllllloooo")

    const deleteTweet = (e, tweetId) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteTweetThunk(tweetId))
    }


    const editModalActions = (e, tweetId) => {
        e.preventDefault()
        e.stopPropagation();
        setTweetNum(tweetId)
        if (editModalStatus) {
            // console.log('editmodal was closed')
            setEditModalStatus(false)
        } else {
            // console.log('you opened the edit modal')
            setEditModalStatus(true)
        }
        // console.log(editModalStatus)
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
        if (editModalStatus) {
            return;
        }
        history.push(`/tweets/${tweetId}`)
    }



    if (!isLoaded) {
        return <h1>Loading...</h1>
    } else if (!authorizedUser) {
        return <NotSignedIn />
    } else {
        return (authorizedUser &&
            <>
                <div className="feed-page-container">
                    <div className="center-container">
                        <NewTweetForm />
                        <div className="feed-container">
                            {tweets ? tweets.map((tweet) => {
                                return (
                                    <div onClick={e => sendToTweetPage(e, tweet.id)} key={tweet?.id}>
                                        <div
                                            onClick={e => sendToTweetPage(e, tweet.id)}
                                            className="tweet-header">
                                            {authorizedUser?.id === tweet?.User?.id ?
                                                <div className="dots-container">
                                                    <div onClick={(e) => editModalActions(e, tweet?.id)}
                                                        className="dot-container">{dotDotDotIcon}</div>
                                                </div>
                                                : null}

                                            {editModalStatus && tweetNum === tweet?.id ?
                                                <Elipsis setEditModalStatus={setEditModalStatus} tweetNum={tweet?.id} />
                                               : null}
                                            <span><img className="profile-pic" src={tweet?.User?.profilePic}></img></span>
                                            <span className='user-handle-info' style={{ color: 'white' }}>{tweet?.User?.fullname}</span>
                                            <span >{tweet?.User?.id === 2 ? <Checkmark /> : null}</span>
                                            <span style={{ color: 'rgb(139,152,165)' }}>{`@${tweet?.User?.username}`}</span>
                                            {modalStatus ? <EditTweetModal tweet={tweet?.tweet} /> :
                                               <p className='tweet-p-tag' style={{ color: 'white' }} >{tweet?.tweet}</p>}
                                            <div className="posted-image">
                                                {tweet?.imgUrl ? <img className='tweet-feed-image' src={tweet?.imgUrl} alt='tweet content'></img> : null}
                                            </div>
                                            <div className="tweet-action-icon-row">
                                                <div className='comment-icon' onClick={e => sendToTweetPage(e, tweet.id)}>{commentIcon}</div>
                                                {tweet?.Comments ? <div className="tweetCount">{tweet?.Comments?.length > 0 ? tweet?.Comments?.length : null}</div> : <div className="tweetCount"></div>}
                                            </div>
                                        </div>
                                    </div>
                                    )
                            }) : <h1>Loading...</h1>}
                        </div>
                    </div>
                </div>
            </>
        )
    }
}


export default TweetFeed
