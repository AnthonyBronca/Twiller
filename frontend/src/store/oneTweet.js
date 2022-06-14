import { csrfFetch } from "./csrf";

const GET_TWEET = 'tweets/getTweet'
const DELETE_COMMENT = 'tweets/deleteComment'
const UPDATE_COMMENT = 'tweets/updateComment'

const getTweet = (tweet) => {
    return {
        type: GET_TWEET,
        payload: tweet
    }
}

const deleteComment = (comment) => {
    return {
        type: DELETE_COMMENT,
        payload: comment
    }
}

const updateComment = (comment) => {
    return {
        type: UPDATE_COMMENT,
        payload: comment
    }
}


export const getTweetThunk = (tweetId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tweets/${tweetId}`)
    const tweet = await response.json();
    dispatch(getTweet(tweet));
    return response
}

export const deleteCommentThunk = (commentId) => async (dispatch) => {
    const options = {
        method: 'DELETE',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({commentId})
    }
console.log(options, "helllo!!!!")
    const response = await csrfFetch(`/api/comments/${commentId}/delete`, options)
    const comment = await response.json();
    dispatch(deleteComment(comment));
    return response;
}

export const updateCommentThunk = (commentId, newComment) => async (dispatch) => {
    const options = {
        methood: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({commentId, newComment})
    }

    const response = await csrfFetch(`/api/comments/${commentId}/edit`, options)
    const comment = await response.json();
    dispatch(updateComment(comment));
    return response;
}


const initialState = {};

const oneTweetReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_TWEET:
            newState = {...state};
            newState['oneTweet'] = action.payload
        return newState
        case DELETE_COMMENT:
            newState = {...state};
            console.log(action.payload, "this is the loaddd")
            const tweetId = action.payload.tweetId;
            const id = action.payload.id;
            const oldComments = newState.oneTweet.Comments;
            const comments = oldComments.filter(comment=> comment.id !== id)
            newState.oneTweet.Comments = comments
            return newState;
        case UPDATE_COMMENT:
            newState = {...state};
            const updatedCommentId = action.payload.id
            return newState
    default:
        return state;
    }
}

export default oneTweetReducer
