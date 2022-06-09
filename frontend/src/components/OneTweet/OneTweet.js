import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getTweetThunk } from '../../store/oneTweet';
import { deleteTweetThunk } from '../../store/tweets'

function OneTweet() {
    const dispatch = useDispatch();
    const history = useHistory();
    const tweet = useSelector((state) => state?.oneTweet?.oneTweet)
    const authorizedUser = useSelector((state) => state?.session?.user)
    const { id } = useParams();
    console.log(tweet, "is this a thing?")
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(() => {
        dispatch(getTweetThunk(id))
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
            <div className="tweet-header">
                <span style={{ color: 'white' }}>{tweet?.User?.fullname}</span>
                <span style={{ color: 'rgb(139,152,165)' }}>{`@${tweet?.User?.username}`}</span>
                <p style={{ color: 'white' }} >{tweet?.tweet}</p>
                {authorizedUser.id === tweet.User.id ? <>
                    <button onClick={e => deleteTweet(e, tweet.id)}
                        className="delete-tweet-button">Delete Tweet</button>
                    <button onClick={() => history.push('/')}>Go Back</button>
                </> : null}
                <div className='comments-container'>
                    {tweet?.Comments.map(com => {
                        return (
                            <div>
                                {/* <span style={{ color: 'white' }}>{com?.?.fullname}</span>
                                <span style={{ color: 'rgb(139,152,165)' }}>{`@${tweet?.User?.username}`}</span>
                                <p style={{ color: 'white' }} >{tweet?.tweet}</p> */}
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default OneTweet
