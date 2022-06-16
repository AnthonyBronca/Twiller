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
    const [isLoaded, setIsLoaded] = useState(false);
    const [errors, setErrors] = useState([]);
    const [maxLength, setMaxLength] = useState([])

    useEffect(()=> {
        dispatch(getCommentsThunk(id))
        .then(()=> setIsLoaded(true))
    }, [isLoaded])


    useEffect(()=> {
        let validations = [];
        let customMessage = [];
        if (commentField.length === 0) validations.push('A Reply can not be blank.')
        if (commentField.length > 180) validations.push('Reply can not be longer than 180 Characters');
        setErrors(validations)
        if (commentField.length === 180) customMessage.push('You have reached the 180 character limit');
        setMaxLength(customMessage)
    }, [commentField])

    function sendEmBack(e){
        history.push(`/tweets/${tweet.id}`)
    }

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
                            maxLength={180}
                            onChange={e => setCommentField(e.target.value)}></textarea>
                    </label>
                    <div className='submit-edit-button'>
                    <div className='button-holder'>
                        <button className='new-tweet-button-one-tweet'>Submit Edit</button>
                        </div>
                        <div className='go-back-holder'>
                            <button className='new-tweet-button-one-tweet' onClick={e=> sendEmBack(e)}>Go Back</button>
                        </div>
                        <div className='message-holder'>
                        {maxLength? maxLength.map(msg => <li>{msg}</li>): errors? errors.map(error => <li>{error}</li>): null}
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}

export default EditCommentForm
