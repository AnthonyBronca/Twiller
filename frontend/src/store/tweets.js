import { csrfFetch } from "./csrf";


const GET_TWEETS = 'tweets/getTweets';
const ADD_TWEET = 'tweets/addTweet'
const UPDATE_TWEET = 'tweets/updateTweet'
const DELETE_TWEET = 'tweets/deleteTweet'


const deleteTweet = (tweet) => {
    return {
        type: DELETE_TWEET,
        payload: tweet
    }
}

const updateTweet = (tweet) => {
    return {
        type: UPDATE_TWEET,
        payload: tweet
    }
}

const getTweets = (tweets) => {
    return {
        type: GET_TWEETS,
        payload: tweets
    }
}

const addTweet = (tweet) => {
    return {
        type: ADD_TWEET,
        payload: tweet
    }
}


export const updateTweetThunk = (userId, tweet, imgUrl) => async (dispatch) => {
    const id = tweet.id
    const response = await csrfFetch(`/api/tweets/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userId, tweet, imgUrl)
    })
    const tweet = await response.json()
    dispatch(updateTweet(tweet))
    return response
}

export const deleteTweetThunk = (tweetId) => async(dispatch) => {
    const response = await csrfFetch(`/api/tweets/${tweetId}`, {
        method: 'DELETE',
    })
    const tweet = await response.json()
    dispatch(deleteTweet(tweet))
    return response
}

export const addTweetThunk = (formValues) => async (dispatch) => {
    console.log('we are now in the thunk: 2')
    const options = {
        method: 'POST',
        // headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(formValues)
    }
    console.log(options, "2")

    const response = await csrfFetch('/api/tweets/new', options)
    console.log(response, 'this is response, 2')
    const newTweet = await response.json()
    console.log(newTweet, "this is newTweet 2")
    dispatch(addTweet(newTweet))
    return response
}

export const getTweetsThunk = () => async (dispatch) => {
    const response = await csrfFetch('/api/tweets/')
    const tweets = await response.json();
    dispatch(getTweets(tweets));
    return response
}

const initialState = {};

const tweetReducer = (state = initialState, action) => {
    let newState;
    switch(action.type){
        case GET_TWEETS:
            newState = {...state};
            action.payload.forEach(tweet => {
                newState[tweet.id] = tweet
            })
        return newState
        case ADD_TWEET:
            newState = {...state};
            const newTweetId = action.payload.id;
            newState[`${newTweetId}`] = action.payload
            return newState
        case UPDATE_TWEET:
            newState = {...state};
            const updatedTweetId = action.payload.id;
            newState[`${updatedTweetId}`] = action.payload
            return newState
        case DELETE_TWEET:
            newState = {...state};
            const deletedTweetId = action.payload.id;
            delete newState[`${deletedTweetId}`]
            return newState;
    default:
        return state;
    }
}

export default tweetReducer
