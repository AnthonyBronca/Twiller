import { bindActionCreators } from "redux";
import { csrfFetch } from "./csrf";

const GET_COMMENTS = '/comments/getComments'

const getComments = (comments)=> {
    return {
        type: GET_COMMENTS,
        payload: comments
    }
}


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
            let newState = {...state, ...action.payload}
            return newState;
        default:
            return state;
    }
}

export default commentReducer
