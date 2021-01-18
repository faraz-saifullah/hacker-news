import React, { useState, useRef, useEffect } from 'react';
import { Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Login from './components/auth/login';
import { CircularProgress } from '@material-ui/core';
import Context from './Context';
import CreateClassroom from './components/home/home';
import Navbar from './components/navbar/Navbar';

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
    setIsLoggingIn(false);
    setUser(userDetails);
  }, []);

  const login = React.useCallback((userDetails) => {
    setIsLoggingIn(true);
    setTimeout(() => {
      setUser(userDetails);
      setIsLoggingIn(false);
    }, 1000);
    window.localStorage.setItem('user', JSON.stringify(userDetails));
  }, []);

  const logout = React.useCallback(() => {
    setUser(null);
    window.localStorage.setItem('user', null);
  }, []);

  return isLoggingIn ? (
    <div className="container">
      <CircularProgress className="loader" />{' '}
    </div>
  ) : (
    <Context.Provider
      value={{
        user: user,
        login: login,
        logout: logout,
      }}
    >
      <Router ref={routerRef}>
        <div className="App">
          <Navbar />
          <Switch>
            <Route
              exact
              path="/"
              component={routeToComponent(CreateClassroom, user)}
            />
          </Switch>
        </div>
      </Router>
    </Context.Provider>
  );
}
