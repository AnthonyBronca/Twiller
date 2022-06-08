import { csrfFetch } from './csrf';

const SET_USER = 'session/setUser';
const REMOVE_USER = 'session/removeUser';



//AWS EXAMPLE FETCG
// user_actions.js
// const SET_USER = "session/setUser";

// const setUser = (user) => ({
//   type: SET_USER,
//   payload: user,
// });

// export const createUser = (user) => async (dispatch) => {
//   const { images, image, username, email, password } = user;
//   const formData = new FormData();
//   formData.append("username", username);
//   formData.append("email", email);
//   formData.append("password", password);

//   // for multiple files
//   if (images && images.length !== 0) {
//     for (var i = 0; i < images.length; i++) {
//       formData.append("images", images[i]);
//     }
//   }

//   // for single file
//   if (image) formData.append("image", image);

//   const res = await csrfFetch(`/api/users/`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//     body: formData,
//   });

//   const data = await res.json();
//   dispatch(setUser(data.user));
// };






const setUser = (user) => { //action
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => { //action
  return {
    type: REMOVE_USER,
  };
};

// imagining what store.dispatch looks like under the hood
// store = {
//   dispatch(actionOrThunk) {
//     if (if actionOrThunk is action) {
//       invoke reducers, passing in currState and action
//   }
//   if (actionOrThunk is function aka thunk) {
//     invoke thunk, passing in this.dispatch
//   }
// }
// store.dispatch(signup({name: "Alex"}))

export const signup = (user) => async (dispatch) => {
  const { email, username, fullname, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      email, username, fullname, password
    }),
  });
  const data = await response.json();
  // this is literally store.dispatch
  dispatch(setUser(data.user));
  return response;
};


export const login = (user) => async (dispatch) => { //thunks for database
  const { credential, password } = user;
  const response = await csrfFetch('/api/session', {
    method: 'POST',
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user)); //updates state
  return response;
};

export const restoreUser = () => async dispatch => {
  const response = await csrfFetch('/api/session');
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

export const logout = () => async (dispatch) => {
  const response = await csrfFetch('/api/session', {
    method: 'DELETE',
  });
  dispatch(removeUser());
  return response;
};

//logout may not be working with given: window.store.dispatch(window.sessionActions.logout());



const initialState = { user: null };

const sessionReducer = (state = initialState, action) => { //reducer updates the state
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
