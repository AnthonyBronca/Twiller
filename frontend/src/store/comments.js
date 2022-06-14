import { bindActionCreators } from "redux";
import { csrfFetch } from "./csrf";

const GET_COMMENTS = '/comments/getComments'
const ADD_COMMENT = '/comments/addComment'

const getComments = (comments)=> {
    return {
        type: GET_COMMENTS,
        payload: comments
    }
}

const addComment = (comment) => {
    return {
        type: ADD_COMMENT,
        payload: comment
    }
}

export const addCommentThunk = (tweetId, formValues) => async (dispatch)=> {
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formValues)
    }
    console.log('am i here?')
    console.log(options)
    const response = await csrfFetch(`/api/tweets/${tweetId}/comment/new`, options)
    console.log(response, 'response ********************************3838383883838')
    const comment = await response.json();
    console.log(comment, "^^^^^^^^^^^^^^^^^^^^^^^^^*******")
    //check state between user and usertable and comments userId.
    dispatch(addComment(comment))
    return response;
}

//router.post('/:id/comment/new', (async(req,res)=>{
    // const id = req.params.id;
    //const {tweetId, userId, comment} = req.body

export const getCommentsThunk = (tweetId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tweets/${tweetId}/comments`)
    const comments = await response.json();

    dispatch(getComments(comments))
    return response;
}


const initialState = {};

const commentReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_COMMENTS:
            newState = {...state, ...action.payload}
            return newState;
        case ADD_COMMENT:
            newState = {...state};
            console.log(action.payload, 'yoo')
            console.log(newState, "this is newState")
            const newCommentId = action.payload.id;
            newState[newCommentId] = action.payload
            return newState
        default:
            return state;
    }
}

export default commentReducer
