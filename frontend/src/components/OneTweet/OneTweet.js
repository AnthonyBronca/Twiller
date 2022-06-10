import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCommentsThunk } from '../../store/comments';
import { getTweetThunk } from '../../store/oneTweet';
import { deleteTweetThunk } from '../../store/tweets'
import SideBar from '../HomePageSideBar/SideBar';
import { commentIcon, backArrowIcon } from './onetweeticons'
import './oneTweet.css'
import Checkmark from '../Checkmark/Checkmark';


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
    const [tweetField, setTweetField] = useState('')
    const [imgUrl, setImgUrl] = useState('')

    useEffect(() => {
        dispatch(getTweetThunk(id))
            .then(() => dispatch(getCommentsThunk(id)))
            .then(() => setIsLoaded(true))
    }, [isLoaded])



    function handleSubmit(e) {
        e.preventDefault();
        const userId = authorizedUser.id;
        const tweet = tweetField
        const formValues = { userId, tweet, imgUrl }
        // dispatch(addTweetThunk(formValues))
        setTweetField('')
    }

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
                <div className='center-container-one-post'>
                    <div className='feed-container-one-post'>
                        <div className="tweet-header">
                            <div onClick={e => history.push('/tweets')} className='go-back-header'>{backArrowIcon}<span className='back-to-tweet'>Tweet</span></div>
                            <div className='user-items-get-one-tweet'>
                                <span className='profile-pic-span-one-post'><img className='profile-pic' src={tweet?.User?.profilePic}></img></span>
                                <div className='user-items-words'>
                                    <div className='fullname-one-tweet'>
                                        <span style={{ color: 'white' }}>{tweet?.User?.fullname}{tweet?.User?.id === 2 ? <Checkmark /> : null}</span>
                                    </div>
                                    <div className='username-one-tweet'>
                                        <span style={{ color: 'rgb(139,152,165)' }}>{`@${tweet?.User?.username}`}</span>
                                    </div>
                                </div>
                            </div>
                            <p style={{ color: 'white' }} >{tweet?.tweet}</p>
                            {authorizedUser.id === tweet?.User?.id ? <>
                                <button onClick={e => deleteTweet(e, tweet?.id)}
                                    className="delete-tweet-button">Delete Tweet</button>
                            </> : null}
                            <div className='icon-container'>
                                {commentIcon}
                            </div>
                            <div className='comments-container'>
                            </div>
                        </div>
                        <div className="tweet-header">
                            <div className='tweet-reply-container'>
                                <img className='profile-pic' src={authorizedUser?.profilePic}></img>
                                <div className='new-reply-input-field'>
                                    <input
                                        id="new-tweet-field"
                                        placeholder="Tweet your reply"
                                        value={tweetField}
                                        onChange={e => setTweetField(e.target.value)}
                                        style={{ position: 'relative', 'left': '4px', 'top': '10px', paddingLeft: '8px', fontSize: '24px' }}
                                    ></input>
                                </div>
                                    <div className="outter-button-container-reply" >
                                        <div onClick={e => handleSubmit(e)} className="new-tweet-button">Tweet</div>
                                    </div>
                            </div>
                        </div>
                        {comment?.tweetId === tweet.id ? comments.map(comment => {
                            return (
                                <div>
                                    <span style={{ color: 'white' }}>{comment?.User?.fullname}</span>
                                    {comment?.User?.id === 2 ? <Checkmark /> : null}
                                    <span style={{ color: 'rgb(139,152,165)' }}>{`@${comment?.User?.username}`}</span>
                                    <p style={{ color: 'white' }} >{comment?.comment}</p>
                                </div>
                            )
                        }) : null}
                    </div>
                </div>
            </>
        )
    }
}

export default OneTweet
