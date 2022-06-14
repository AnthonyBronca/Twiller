import React, { useState, useEffect } from 'react';
import './elipsis.css'
import { editIcon, trashCanIcon, upwardIcon } from './elipsisicons';
import { deleteTweetThunk } from '../../store/tweets'
import { deleteCommentThunk } from '../../store/oneTweet';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
function Elipsis({ setEditModalStatus, tweetNum, commentVerification, commentNum, comment}) {
    const dispatch = useDispatch();
    const history = useHistory();


    const [editMode, setEditMode] = useState(false)

    console.log(tweetNum, "what is thsi tweetnum thing")

    const deleteTweet = (e, tweetId) => {
        console.log(tweetId, "this is tweetId in delete")
        e.preventDefault();
        e.stopPropagation();
        const currentURL = window.location.href;
        if (currentURL === '/tweets'){
            dispatch(deleteTweetThunk(tweetId));
        } else {
            dispatch(deleteTweetThunk(tweetId))
            .then(()=> history.push('/tweets'))
        }
    }

    const editTweet = (e, tweetNum) => {
        e.stopPropagation();
        console.log(tweetNum, 'this is tweetNum')
        history.push(`/tweets/${tweetNum}/edit`)
    }

    const deleteComment = (e, commentId) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('you clicked a comment!', commentId)
        dispatch(deleteCommentThunk(commentId))
    }

    const editComment = (e, commentNum) => {
        e.stopPropagation();
        setEditMode(true);
    }

    return (
        <>
            <div className='elispis-modal-container'>
                <div className='elipsis-modal-inner'>
                    <div className='edit-button-container'>
                        {commentVerification ?
                        <button className='edit-button-elipsis' type='button'
                        onClick={e=> editComment(e, tweetNum)}>
                            <div>{editIcon}</div>
                            <div className='edit-word'>Edit Comment</div>
                        </button>
                        :<button className='edit-button-elipsis' type='button'
                        onClick={e=> editTweet(e, tweetNum)}>
                            <div>{editIcon}</div>
                            <div className='edit-word'>Edit Tweet</div>
                        </button>}
                    </div>
                    <div className='delete-button-container'>
                        {commentVerification? <button className='delete-button-elipsis' onClick={e => deleteComment(e, commentNum)} type='button'>
                            <div>{trashCanIcon}</div>
                            <div className='delete-word'>Delete Comment</div>
                        </button>
                        :<button className='delete-button-elipsis' onClick={e => deleteTweet(e, tweetNum)} type='button'>
                            <div>{trashCanIcon}</div>
                            <div className='delete-word'>Delete Tweet</div>
                        </button>}
                    </div>
                    <div className='close-button-container'>
                        <button className='close-button-elipsis'
                            type='button'
                            onClick={e => setEditModalStatus(false)}>
                            <div>{upwardIcon}</div>
                            <div className='close-word'>Close</div>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}


export default Elipsis
