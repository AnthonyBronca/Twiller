import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { updateTweetThunk } from '../../store/tweets';
import './editTweetForm.css'

function EditTweetForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    console.log(id, "is this id?")
    const tweets = useSelector((state) => state?.tweets)
    const tweet = tweets[id]
    const authorizedUser = useSelector((state) => state?.session?.user)



    const [tweetField, setTweetField] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log(tweetField)
        const tweetId = id
        dispatch(updateTweetThunk(tweetId, tweetField))
            .then(() => history.push(`/tweets/${tweetId}`))


        //     const userId = authorizedUser.id
        //     const form = {
        //         userId,
        //         tweet,
        //         imgUrl
        //     }
        //     dispatch(updateTweetThunk(tweetId))
        // }
    }

    if (authorizedUser.id !== tweet?.userId) {
        history.push(`/tweets/${id}`)
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <div className='edit-form-container'>
                    <label> Edit Tweet Body:
                        <textarea className='edit-tweet-body-input'
                            placeholder={tweet?.tweet}
                            value={tweetField}
                            onChange={e => setTweetField(e.target.value)}></textarea>
                    </label>
                    <div className='submit-edit-button'>
                        <button className='new-tweet-button-one-tweet'>Submit Edit</button>
                    </div>
                </div>
            </form>
        )
    }
}

export default EditTweetForm
