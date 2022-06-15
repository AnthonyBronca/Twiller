import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getCommentsThunk } from '../../store/comments';
import { updateCommentThunk } from '../../store/oneTweet';
import './editCommentForm.css'


function EditCommentForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    console.log(id, "is this id?")
    const comments = useSelector((state) => state?.oneTweet?.oneTweet?.Comments)
    const authorizedUser = useSelector((state) => state?.session?.user)
    const tweet = useSelector((state)=> state?.oneTweet?.oneTweet)

    const comment = {...comments.filter(comment => comment.id == id? comment: null)}
    console.log(comment, 'is this comments?')


    const [commentField, setCommentField] = useState('')
    const [isLoaded, setIsLoaded] = useState(false)

    useEffect(()=> {
        dispatch(getCommentsThunk(id))
        .then(()=> setIsLoaded(true))
    }, [isLoaded])

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(commentField)
        const commentId = id
        dispatch(updateCommentThunk(commentId, commentField))
            .then(() => history.push(`/tweets/${tweet.id}`))
    }

    if (!isLoaded){
        return <h1>Loading...</h1>
    }else {
        return (
            <form onSubmit={handleSubmit}>
                <div className='edit-form-container'>
                    <label> Edit Comment Body:
                        <textarea className='edit-tweet-body-input'
                            placeholder={comment[0]?.comment}
                            value={commentField}
                            onChange={e => setCommentField(e.target.value)}></textarea>
                    </label>
                    <div className='submit-edit-button'>
                        <button type='button' onClick={e=> handleSubmit(e)}className='new-tweet-button-one-tweet'>Submit Edit</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default EditCommentForm
