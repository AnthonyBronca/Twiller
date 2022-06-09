import { csrfFetch } from "./csrf";

const GET_TWEET = 'tweets/getTweet'

const getTweet = (tweet) => {
    return {
        type: GET_TWEET,
        payload: tweet
    }
}


export const getTweetThunk = (tweetId) => async (dispatch) => {
    const response = await csrfFetch(`/api/tweets/${tweetId}`)
    const tweet = await response.json();
    dispatch(getTweet(tweet));
    return response
}



const initialState = {};

const oneTweetReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_TWEET:
            newState = {...state};
            newState['oneTweet'] = action.payload
        return newState
        // case UPDATE_TWEET:
        //     newState = {...state};
        //     const updatedTweetId = action.payload.id;
        //     newState[`${updatedTweetId}`] = action.payload
        //     return newState
    default:
        return state;
    }
}

export default oneTweetReducer
