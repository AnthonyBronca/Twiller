import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import TweetFeed from "./components/TweetFeed/TweetFeed";
// import ProtectedRoute from "./components/Auth/ProtectedRoute";
import OneTweet from "./components/OneTweet/OneTweet";
import SideBar from "./components/HomePageSideBar/SideBar";
import Splash from "./components/Splash/splash";
import EditTweetForm from "./components/EditTweetForm/EditTweetForm";
import EditCommentForm from "./components/EditCommentForm/EditCommentForm";
import LoginForm from "./components/LoginFormModal/LoginForm";

function App() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user)
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);


  // if (!user) {
  //   return (
  //     // setTimeout(
  //     <Route path='/' exact={true}>
  //       <Splash />
  //     </Route>
  //     // ,500)
  //   )
  // } else {
    return (
      <>
        {/* <Navigation isLoaded={isLoaded} /> */}
        <SideBar />
        {isLoaded && (
          <Switch>
            <Route path='/' exact={true}>
              <Splash />
            </Route>
            <Route path='/login' exact={true}>
              <LoginForm />
            </Route>
            <Route path="/signup">
              <SignupFormPage />
            </Route>
            <Route path='/tweets' exact={true}>
              <TweetFeed />
            </Route>
            <Route path={'/tweets/:id'} exact={true}>
              <OneTweet />
            </Route>
            <Route path='/tweets/:id/edit' exact={true}>
              <EditTweetForm />
            </Route>
            <Route path='/comments/:id/edit' exact={true}>
              <EditCommentForm />
            </Route>
            <h1>Page Not Found</h1>
          </Switch>
        )}
      </>
    );
  }
// }

export default App;
