import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { restoreUser } from "../../store/session";
import './newtweetform.css'
import { addTweetThunk } from '../../store/tweets'
import './newtweetform.css'
import Checkmark from '../Checkmark/Checkmark'
function NewTweetForm() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)

    const [tweetField, setTweetField] = useState('')
    const [image, setImgUrl] = useState(null)
    const [errors, setErrors] = useState([])
    const [previewUrl, setPreviewUrl] = useState("");
    const [showModal, setShowModal] = useState(true);
    const [submitted, setSubmitted] = useState(false)

    console.log(image, "this is image")
    console.log(previewUrl, 'this is prev')

    function handleSubmit(e) {
        e.preventDefault();
        const userId = user.id;
        const tweet = tweetField
        const formValues = { userId, tweet, image }
        console.log(formValues, '1')
        return dispatch(addTweetThunk(formValues))
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


    const updateImage = (e) => {
        console.log(e.target.files, 'this is line 47')
        const file = e.target.files[0];
        setImgUrl(file);
        setShowModal(true)
        if (file) {
            setPreviewUrl(URL.createObjectURL(file))

        }
        setSubmitted(true)
    }
    // const updateImage = async (e) => {
    //     const file = e.target.files[0];
    //     const reader = new FileReader();
    //     reader.readAsDataURL(file);
    //     reader.onload = function (e) {
    //       setPreviewUrl(reader.result);
    //     };
    //     setImgUrl(file);
    //     setShowUpload(false);
    //   };

    if (!user) {
        return <h1>Please sign in to post a tweet</h1>
    } else {
        return (
            <form onSubmit={handleSubmit}>
                <div className="new-tweet-container">
                    <div className="new-tweet-header">
                        <h4 className="form-header">Home</h4>
                        <img className="profile-pic" src={`${user.profilePic}`}></img>
                    </div>
                    <div className="input-outer-1">
                        <input
                            id="new-tweet-field"
                            placeholder="What's happening?"
                            value={tweetField}
                            onChange={e => setTweetField(e.target.value)}
                        ></input>
                    </div>
                    {submitted? <img src={previewUrl}></img> : <label htmlFor="file-upload" className='custome-file-upload'>Select From computer
                       <input id="file-upload"
                            type='file'
                            name='image'
                            onChange={updateImage}
                            accept='.jpg, .jpeg, .png, .gif'>
                        </input>
                    </label>}
                    <div className="new-form-footer">
                        <div className="outter-button-container">
                            <button className="new-tweet-button">Tweet</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }
}
export default NewTweetForm
