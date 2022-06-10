import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCommentsThunk } from '../../store/comments';
import { getTweetThunk } from '../../store/oneTweet';
import { deleteTweetThunk } from '../../store/tweets'
import SideBar from '../HomePageSideBar/SideBar';
import { commentIcon } from './onetweeticons'
function OneTweet() {
    const dispatch = useDispatch();
    const history = useHistory();
    const tweet = useSelector((state) => state?.oneTweet?.oneTweet)
    const comments = useSelector((state => Object.values(state?.comments)))
    const comment = useSelector((state) => state?.comments['0'])
    const authorizedUser = useSelector((state) => state?.session?.user)
    const { id } = useParams();
    console.log(comment, "is this a thing?")
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getTweetThunk(id))
            .then(() => dispatch(getCommentsThunk(id)))
            .then(() => setIsLoaded(true))
    }, [isLoaded])



    const deleteTweet = (e, tweetId) => {
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteTweetThunk(tweetId))
        history.push('/')
    }


    if (!isLoaded) {
        return <h1>Woah... loading</h1>
    } else {
        return (
            <>
                <div className='center-container'>

                    <div className='feed-container'>

                        <div className="tweet-header">
                            <span style={{ color: 'white' }}>{tweet?.User?.fullname}</span>
                            <span style={{ color: 'rgb(139,152,165)' }}>{`@${tweet?.User?.username}`}</span>
                            <p style={{ color: 'white' }} >{tweet?.tweet}</p>
                            {authorizedUser.id === tweet?.User?.id ? <>
                                <button onClick={e => deleteTweet(e, tweet?.id)}
                                    className="delete-tweet-button">Delete Tweet</button>
                            </> : null}
                            <div className='icon-container'>
                                {commentIcon}
                            </div>
                            <button onClick={() => history.push('/')}>Go Back</button>
                            <div className='comments-container'>
                                {comment?.tweetId === tweet.id ? comments.map(comment => {
                                    return (
                                        <div>
                                            <span style={{ color: 'white' }}>{comment?.User?.fullname}</span>
                                            <span style={{ color: 'rgb(139,152,165)' }}>{`@${comment?.User?.username}`}</span>
                                            <p style={{ color: 'white' }} >{comment?.comment}</p>
                                        </div>
                                    )
                                }) : null}
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default OneTweet
