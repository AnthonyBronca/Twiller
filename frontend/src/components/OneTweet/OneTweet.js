import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { addCommentThunk, getCommentsThunk } from '../../store/comments';
import { getTweetThunk } from '../../store/oneTweet';
import { deleteTweetThunk } from '../../store/tweets'
import SideBar from '../HomePageSideBar/SideBar';
import { commentIcon, backArrowIcon } from './onetweeticons'
import './oneTweet.css'
import Checkmark from '../Checkmark/Checkmark';
import { dotDotDotIcon } from './onetweeticons';
import Elipsis from '../MoreTweetOptions/Elipsis';

function OneTweet() {
    const dispatch = useDispatch();
    const history = useHistory();
    const tweet = useSelector((state) => state?.oneTweet?.oneTweet)
    const comments = useSelector((state => Object.values(state?.comments)))
    // const comment = useSelector((state) => Object.values(state?.comments))
    const authorizedUser = useSelector((state) => state?.session?.user)
    const { id } = useParams();
    console.log(comments, "is this a thing?")


    const [isLoaded, setIsLoaded] = useState(false)
    const [tweetField, setTweetField] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    const [editModalStatus, setEditModalStatus] = useState(false)
    const [commentModalStatus, setCommentModalStatus] = useState(false)
    const [tweetNum, setTweetNum] = useState(null)
    const [commentNum, setCommentNum] = useState(null)
    const [commentsLoaded, setCommentsLoaded] = useState(false)
    const [commentVerification, setCommentVerifiaction] = useState(false)
    const [comment, setComment] = useState('')


    useEffect(() => {
        dispatch(getTweetThunk(id))
        dispatch(getCommentsThunk(id))
            .then(() => setIsLoaded(true))
            .then(() => setCommentsLoaded(true))
    }, [isLoaded, commentsLoaded])

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

    const commentModalActions = (e, commentId, comment) => {
        e.preventDefault();
        e.stopPropagation();
        setCommentNum(commentId);
        setCommentVerifiaction(true)
        setComment(comment)
        console.log(comment)
        console.log(commentVerification)
        console.log('lol idk anymore')

        if (commentModalStatus) {
            setCommentModalStatus(false)
        } else {
            setCommentModalStatus(true)
        }

        console.log(commentId, 'yoooo what sup')
    }

    function handleSubmit(e) {
        e.preventDefault();
        setCommentsLoaded(false)
        const userId = authorizedUser.id;
        const reply = tweetField
        const tweetId = tweet.id
        const formValues = { tweetId, userId, reply }
        dispatch(addCommentThunk(tweetId, formValues))
            .then(() => setCommentsLoaded(true))
        // dispatch(addTweetThunk(formValues))
        setTweetField('')
    }

    // const deleteTweet = (e, tweetId) => {
    //     e.preventDefault();
    //     e.stopPropagation();
    //     dispatch(deleteTweetThunk(tweetId))
    //     history.push('/')
    // }


    if (!isLoaded) {
        return <h1>Woah... loading</h1>
    } else {
        return (
            <>
                <div className='one-tweet-page-container'>
                    <div className='center-container-one-post'>
                        <div className='feed-container-one-post'>
                            <div className="tweet-header">
                                <div onClick={e => history.push('/tweets')} className='go-back-header'>{backArrowIcon}<span className='back-to-tweet'>Tweet</span></div>
                                {authorizedUser?.id === tweet?.User?.id ?
                                    <div onClick={(e) => editModalActions(e, tweet?.id)}
                                        className="dot-container">{dotDotDotIcon}</div> : null}
                                {editModalStatus && tweetNum === tweet?.id ?
                                    <Elipsis setEditModalStatus={setEditModalStatus} tweetNum={tweetNum} />
                                    : null}
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
                                <div className='tweet-body-text'>
                                <p style={{ color: 'white' }} >{tweet?.tweet}</p>
                                </div>
                                <div className='posted-image'>
                                <div>
                                    {tweet?.imgUrl ?<img className='tweet-feed-image' src={tweet?.imgUrl} alt='user-posted-item'></img>: null}
                                </div>
                                </div>
                                {/* {authorizedUser.id === tweet?.User?.id ? <>
                                <button onClick={e => deleteTweet(e, tweet?.id)}
                                className="delete-tweet-button">Delete Tweet</button>
                            </> : null} */}
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
                                        <span>{tweetField.length === 0? null: <span style={tweetField.length >= 181? {'color': 'red'}: {'color': 'white'}}>Characters left: {180-tweetField.length}</span>}</span>
                                        <button
                                        style={tweetField.length >= 181? {'backgroundColor': 'red'}: null}
                                        disabled={tweetField.length >= 181}
                                        onClick={e => handleSubmit(e)}
                                        className="reply-button">Reply</button>
                                    </div>
                                </div>
                            </div>
                            <div className='comment-section-one-tweet'>
                                {commentsLoaded && tweet?.Comments ? tweet?.Comments.map((comment, idx) => {
                                    return (
                                        <div className='individual-comment-container' key={idx}>
                                            <span style={{ color: 'white' }}>{comment?.User?.fullname}</span>
                                            {comment?.User?.id === 2 ? <Checkmark /> : null}
                                            <span style={{ color: 'rgb(139,152,165)' }}>{`@${comment?.User?.username}`}</span>
                                            {authorizedUser?.id === comment?.userId ?
                                                <div onClick={(e) => commentModalActions(e, comment?.id, comment?.comment)}
                                                    className="dot-container">{dotDotDotIcon}</div> : null}
                                            {commentModalStatus && commentNum === comment?.id ?
                                                <Elipsis setEditModalStatus={commentModalStatus}
                                                    tweetNum={comment?.id}
                                                    commentVerification={commentVerification}
                                                    commentNum={commentNum}
                                                    comment={comment} />
                                                : null}
                                                <div className='tweet-body-text'>
                                            <p style={{ color: 'white' }} >{comment?.comment}</p>
                                            </div>
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
