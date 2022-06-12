import React, { useState, useEffect } from 'react';
import './elipsis.css'
import { editIcon, trashCanIcon, upwardIcon } from './elipsisicons';
import { deleteTweetThunk } from '../../store/tweets'
import { useDispatch } from 'react-redux';

function Elipsis({ setEditModalStatus, tweetNum }) {
    const dispatch = useDispatch();

    const deleteTweet = (e, tweetId) => {
        console.log(tweetId, "this is tweetId in delete")
        e.preventDefault();
        e.stopPropagation();
        dispatch(deleteTweetThunk(tweetId))
    }

    return (
        <>
            <div className='elispis-modal-container'>
                <div className='elipsis-modal-inner'>
                    <div className='edit-button-container'>
                        <button className='edit-button-elipsis' type='button'>
                            <div>{editIcon}</div>
                            <div className='edit-word'>Edit Tweet</div>
                        </button>
                    </div>
                    <div className='delete-button-container'>
                        <button className='delete-button-elipsis' onClick={e => deleteTweet(e, tweetNum)} type='button'>
                            <div>{trashCanIcon}</div>
                            <div className='delete-word'>Delete Tweet</div>
                        </button>
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
