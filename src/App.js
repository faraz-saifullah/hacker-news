import React, { useState, useRef, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/auth/Login';
import { CircularProgress } from '@material-ui/core';
import Context from './Context';
import Post from './components/posts/post';
import Home from './components/home/home';
import Navbar from './components/navbar/Navbar';
import UserProfile from './components/user/userProfile';
// import { findUser } from './utils/utilities';
// import { allPosts, allUsers, allComments } from './mockData.json';

function routeToComponent(component, user) {
  if (user) {
    return component;
  }
  return Login;
}

export default function App() {
  const routerRef = useRef();
  const [user, setUser] = useState(null);
  const [isLoggingIn, setIsLoggingIn] = useState(true);

  useEffect(() => {
    let userDetails = JSON.parse(window.localStorage.getItem('user'));
    // window.localStorage.setItem('user', null);
    // window.localStorage.setItem('allPosts', JSON.stringify(allPosts));
    // window.localStorage.setItem('allUsers', JSON.stringify(allUsers));
    // window.localStorage.setItem('allComments', JSON.stringify(allComments));
    setIsLoggingIn(false);
    setUser(userDetails);
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
            <Route exact path="/" component={routeToComponent(Home, user)} />
            <Route exact path="/posts/:postId" component={Post} />
            <Route exact path="/users/:username" component={UserProfile} />
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
}
