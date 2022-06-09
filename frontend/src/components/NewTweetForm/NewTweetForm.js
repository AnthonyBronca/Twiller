import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { restoreUser } from "../../store/session";
import './newtweetform.css'
import {addTweetThunk} from '../../store/tweets'

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
        console.log(userId, "1")
        const tweet = tweetField
        console.log(tweet, '1')
        const formValues = {userId, tweet, imgUrl}
        console.log(formValues, '1')
        dispatch(addTweetThunk(formValues))
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
                <img style={{ height: '5.5%', width: '5.5%', borderRadius: '50%' }} src={`${user.profilePic}`}></img>
                <form onSubmit={e=> handleSubmit(e)} id='new-tweet-form'>
                    <input
                    id="new-tweet-field"
                    placeholder="What's happening?"
                    value={tweetField}
                    onChange={e => setTweetField(e.target.value)}
                    ></input>
                    {/* <label htmlFor="file-upload" className='custome-file-upload'>Select From computer
                        <input id="file-upload"
                        type='file'
                        name='imgUrl'
                        onChange={updateImage}
                        accept='.jpg, .jpeg, .png, .gif'>
                        </input>
                    </label> */}
                    <button className="new-tweet-button">Tweet</button>
                </form>
            </div>
        )
    }
}
export default NewTweetForm
