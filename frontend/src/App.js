import React, { useState, useRef, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/auth/Login';
import { CircularProgress } from '@material-ui/core';
import Context from './Context';
import Post from './components/posts/post';
import Home from './components/home/home';
import Navbar from './components/navbar/Navbar';
import UserProfile from './components/user/userProfile';
import Submit from './components/submit/submit';
import Newest from './components/newest/newest';
import Favourites from './components/favourite/favourites';
import Submissions from './components/submissions/submissions';
import Comments from './components/comment/comments';
import Threads from './components/thread/threads';
// import {allPosts, allComments, allUsers, allVotes} from './mockData.json'

const dummyUser = {
  isDummyUser: true,
};

function routeToComponent(component, user) {
  if (!user.isDummyUser) {
    return component;
  }
  return Login;
}

export default function App() {
  const routerRef = useRef();
  const [user, setUser] = useState(dummyUser);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  useEffect(() => {
    let userDetails = JSON.parse(window.localStorage.getItem('user'));
    // console.log(userDetails);
    // window.localStorage.setItem('user', null);
    // window.localStorage.setItem('allVotes', JSON.stringify(allVotes));
    // window.localStorage.setItem('allPosts', JSON.stringify(allPosts));
    // window.localStorage.setItem('allUsers', JSON.stringify(allUsers));
    // window.localStorage.setItem('allComments', JSON.stringify(allComments));
    setIsLoggingIn(false);
    setUser(userDetails || dummyUser);
  }, []);

  return isLoggingIn ? (
    <div className="container">
      <CircularProgress className="loader" />{' '}
    </div>
  ) : (
    <Context.Provider
      value={{
        user: user,
        setUser: setUser,
        setIsLoggingIn: setIsLoggingIn,
      }}
    >
      <Router ref={routerRef}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/comments" component={Comments} />
            <Route
              exact
              path="/threads"
              component={routeToComponent(Threads, user)}
            />
            <Route exact path="/login" component={Login} />
            <Route exact path="/posts/:postId" component={Post} />
            <Route exact path="/users/:username" component={UserProfile} />
            <Route exact path="/favourites/:username" component={Favourites} />
            <Route
              exact
              path="/submissions/:username"
              component={Submissions}
            />
            <Route exact path="/newest" component={Newest} />
            <Route
              exact
              path="/submit"
              component={routeToComponent(Submit, user)}
            />
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
}