import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getTweetsThunk, updateTweetThunk } from '../../store/tweets';
import './editTweetForm.css'

function EditTweetForm() {
    const dispatch = useDispatch();
    const history = useHistory();
    const { id } = useParams();

    console.log(id, "is this id?")
    const tweets = useSelector((state) => state?.tweets)
    const tweet = tweets[id]
    const authorizedUser = useSelector((state) => state?.session?.user)



    const [tweetField, setTweetField] = useState(tweet?.tweet)
    const [errors, setErrors] = useState([])
    const [maxLength, setMaxLength] = useState([])

    useEffect(() => {
        let validations = [];
        let customMessage = [];
        if (tweetField.length > 280) validations.push('Tweet can not be longer than 280 Characters');
        setErrors(validations)
        if (tweetField.length === 280) customMessage.push('You have reached the 280 character limit');
        setMaxLength(customMessage)
    }, [tweetField])


    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const validations = [];

        if (tweetField.length === 0) {
            validations.push('You can not submit a blank reply.')
            setErrors(validations);
            return;
        }
        console.log(tweetField)
        const tweetId = id
        dispatch(updateTweetThunk(tweetId, tweetField))
            .then(() => history.push(`/tweets/${tweetId}`))
            .then(() => dispatch(getTweetsThunk()))

        //     const userId = authorizedUser.id
        //     const form = {
        //         userId,
        //         tweet,
        //         imgUrl
        //     }
        //     dispatch(updateTweetThunk(tweetId))
        // }
    }

    function sendEmBack(e) {
        history.push(`/tweets/${id}`)
    }

    // if (authorizedUser.id !== tweet?.userId) {
    //     history.push(`/tweets/${id}`)
    // } else {
    return (
        <form onSubmit={handleSubmit}>
            <div className='edit-form-container'>
                <label> Edit Tweet Body:
                    <textarea className='edit-tweet-body-input'
                        placeholder={tweet?.tweet}
                        value={tweetField}
                        maxLength={280}
                        onChange={e => setTweetField(e.target.value)}></textarea>
                </label>
                <div className='submit-edit-button'>
                    <div className='button-holder'>
                        <button className='new-tweet-button-one-tweet'>Submit Edit</button>
                    </div>
                    <div className='go-back-holder'>
                        <button className='new-tweet-button-one-tweet' onClick={e => sendEmBack(e)}>Go Back</button>
                    </div>
                    <div className='message-holder'>
                        {maxLength ? maxLength.map(msg => <li>{msg}</li>) : errors ? errors.map(error => <li>{error}</li>) : null}
                        {errors ? errors.map(error => <li>{error}</li>) : null}
                    </div>
                </div>
            </div>
        </form>
    )
}
// }

export default EditTweetForm
