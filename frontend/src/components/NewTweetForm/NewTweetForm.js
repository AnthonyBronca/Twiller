import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { restoreUser } from "../../store/session";
import './newtweetform.css'
import { addTweetThunk } from '../../store/tweets'
import './newtweetform.css'
import Checkmark from '../Checkmark/Checkmark'
import { mediaIcon } from "./newtweeticons";
function NewTweetForm() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)

    const [tweetField, setTweetField] = useState('')
    const [image, setImgUrl] = useState(null)
    const [errors, setErrors] = useState([])
    const [previewUrl, setPreviewUrl] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [submitted, setSubmitted] = useState(false)
    //           1  && 0 false   ||  0 && 1 false
    // if prev is NOT blank (something there) AND tweet is empty OR prev is blank AND tweet is NOT empty

    // useEffect(() => {
    //     const validations = [];
    //     setErrors([])
    //     if (tweetField.split('')[0] == ' ') validations.push('Tweet can not start with a space')
    //     if (tweetField.length > 280) validations.push('Tweet length must not exceed 280 characters')
    //     if ((previewUrl === '' && tweetField === '')) validations.push('You must add either a tweet or an image')
    //     setErrors(validations)
    //     // console.log(errors)
    // }, [tweetField, previewUrl, image,])

    function handleSubmit(e) {
        const validations = [];
        // if (!tweetField.replace(/\s/g, '').length && image === null) {
        //     validations.push('Tweet can not be empty')
        // }
        if (tweetField.split('')[0] == ' ') validations.push('Tweet can not start with a space')
        if (tweetField.length <= 0 && image === null) validations.push('No Tweet or Image has been entered')
        if (tweetField.length > 280) validations.push('Your tweet must be less than 280 characters.')
        if (tweetField === '' && image === null) validations.push("You must enter either a text or an image.")
        setErrors(validations);
        if (!errors.length) {
            e.preventDefault();
            const userId = user.id;
            const tweet = tweetField
            const formValues = { userId, tweet, image }
            // console.log(formValues, "this is form values")
            dispatch(addTweetThunk(formValues))
                .then(() => {
                    setTweetField('');
                    setImgUrl('');
                    setPreviewUrl('');
                    setSubmitted(false)
                })

            // .catch(async(res)=> {
            //     const data = await res.json();
            //     if(data && data.errors){
            //         newErrors = data.errors;
            //         setErrors(newErrors);
            //     }
            // });
        };
    }


    const tweetButtonStyle = () => {
        if (tweetField.length > 0 && tweetField.length <= 280 || image !== null) {
            return {
                'backgroundColor': 'rgb(29, 155, 240)',
                'color': 'white',
                'fontWeight': 700,
                'fontSize': '15px',
                'textAlign': 'center',
                'position': 'sticky',
                'marginBottom': '20%',
                'borderRadius': '12%',
                'fontFamily': "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }
        } else if (tweetField.length > 280) {
            return {
                'backgroundColor': 'red',
                'color': 'white',
                'fontWeight': 700,
                'fontSize': '15px',
                'textAlign': 'center',
                'position': 'sticky',
                'marginBottom': '20%',
                'borderradius': '12%',
                'fontFamily': "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }
        } else {
            return {
                'backgroundColor': 'rgb(26, 93, 141)',
                'color': 'light-grey',
                'fontWeight': 700,
                'fontSize': '15px',
                'textAlign': 'center',
                'position': 'sticky',
                'marginBottom': '20%',
                'borderradius': '12%',
                'fontFamily': "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }
        }
    }


    const updateImage = (e) => {
        let file = e.target.files[0];
        setImgUrl(file);
        setShowModal(true)
        if (file) {
            setPreviewUrl(URL.createObjectURL(file))

        }
        e.target.value = null
        setSubmitted(true)
    }

    const clearFields = e => {
        e.preventDefault();
        e.stopPropagation();
        // console.log(e.target.files)
        setImgUrl(null);
        setTweetField('');
        setPreviewUrl('');
        setSubmitted(false)
    }

    if (!user) {
        return <h1>Please sign in to post a tweet</h1>
    } else {
        return (
            <div className="new-tweet-container">
                <div className="new-tweet-header">
                    <div className="header">
                        <h4 className="form-header">Home</h4>
                    </div>
                    <div className="errors-container-and-counter">
                        <span className='char-counter-reply'>{tweetField.length === 0 ? null
                            : <span style={tweetField.length >= 280 ? { 'color': 'red' } : { 'color': 'white' }}
                            >Characters left: {280 - tweetField.length}</span>}</span>
                        {errors.length > 0 ? errors.map((error, idx) => <li style={{'color': 'red'}}key={idx}>{error}</li>) : null}
                    </div>
                </div>
                <div className="new-tweet-body">
                    <img className="profile-pic" src={`${user?.profilePic}`}></img>
                    <div className="input-outer-1">
                        <input id="new-tweet-field"
                            placeholder="What's happening?"
                            value={tweetField}
                            onChange={e => setTweetField(e.target.value)}>
                        </input>
                    </div>
                </div>
                <div className="icon-holder">
                    <div className="new-tweet-preview-image-container">
                        <div className="preview-image-container">
                            <label htmlFor="file-upload" className="custom-file-upload">
                                <div className="media-icon">{mediaIcon}</div>
                            </label>
                            <input
                                id="file-upload"
                                type='file'
                                name="image"
                                onChange={updateImage}
                                accept='.jpg, .jpeg, .png, .gif'></input>
                        </div>
                        <div className="outter-button-container">
                            <button style={tweetButtonStyle()}
                                type='button'
                                // disabled={errors.length > 0? true:false}
                                onClick={e => handleSubmit(e)}
                                className='new-tweet-button'>Tweet</button>
                            <div className="clear-input-container">
                                {(tweetField.length > 0) && (submitted === false) || (previewUrl) ?
                                    <button className='clear-button' onClick={e => clearFields(e)}>Clear</button> : null}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="new-form-footer">
                    <div className="preview-img-main-container">
                        {previewUrl ? <img className="preview-img" src={previewUrl}></img> : null}
                    </div>
                </div>
            </div>
        )
    }
}
export default NewTweetForm
