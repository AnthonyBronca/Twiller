// import React, { useState, useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { useHistory, useParams } from 'react-router-dom';
// import { updateCommentThunk } from '../../store/oneTweet';
// import './editCommentForm.css'


// function EditCommentForm() {
//     const dispatch = useDispatch();
//     const history = useHistory();
//     const { id } = useParams();

//     console.log(id, "is this id?")
//     const Comments = useSelector((state) => state?.oneTweet?.oneTweet?.Comments)
//     const authorizedUser = useSelector((state) => state?.session?.user)
//     const tweet = useSelector((state)=> state?.oneTweet?)


//     const [commentField, setCommentField] = useState('')

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         e.stopPropagation();
//         console.log(commentField)
//         const commentId = id
//         dispatch(updateCommentThunk(commentId, commentField))
//             .then(() => history.push(`/tweets/${tweet.id}`))
//     }

//     if (authorizedUser.id !== tweet?.userId) {
//         history.push(`/tweets/${id}`)
//     } else {
//         return (
//             <form onSubmit={handleSubmit}>
//                 <div className='edit-form-container'>
//                     <label> Edit Tweet Body:
//                         <textarea className='edit-tweet-body-input'
//                             placeholder={tweet?.tweet}
//                             value={tweetField}
//                             onChange={e => setTweetField(e.target.value)}></textarea>
//                     </label>
//                     <div className='submit-edit-button'>
//                         <button className='new-tweet-button-one-tweet'>Submit Edit</button>
//                     </div>
//                 </div>
//             </form>
//         )
//     }
// }

// export default EditCommentForm
