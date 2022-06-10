import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { restoreUser } from "../../store/session";
import './newtweetform.css'
import { addTweetThunk } from '../../store/tweets'
import './newtweetform.css'

function NewTweetForm() {
    const dispatch = useDispatch();
    const user = useSelector((state) => state.session.user)

    const [tweetField, setTweetField] = useState('')
    const [imgUrl, setImgUrl] = useState('')
    // const [previewUrl, setPreviewUrl] = useState("");
    // const [showUpload, setShowUpload] = useState(true);

    function handleSubmit(e) {
        e.preventDefault();
        const userId = user.id;
        const tweet = tweetField
        const formValues = { userId, tweet, imgUrl }
        console.log(formValues, '1')
        dispatch(addTweetThunk(formValues))
        setTweetField('')
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
                {/* <label htmlFor="file-upload" className='custome-file-upload'>Select From computer
                        <input id="file-upload"
                        type='file'
                        name='imgUrl'
                        onChange={updateImage}
                        accept='.jpg, .jpeg, .png, .gif'>
                        </input>
                    </label> */}
                <div className="new-form-footer">
                    <div className="outter-button-container">
                        <div onClick={e => handleSubmit(e)} className="new-tweet-button">Tweet</div>
                    </div>
                </div>
            </div>
        )
    }
}
export default NewTweetForm
