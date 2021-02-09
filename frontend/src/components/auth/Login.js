import React, { useContext, useState, Fragment } from 'react';
import { createNewUser, getUserByUsername } from '../../api/user';
import Context from '../../Context';
import { validateLoginInput } from './validation';

export default function LoginForm() {
  const { setUser } = useContext(Context);
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoggingIn, toggleLogin] = useState(false);

  const handleChange = React.useCallback((event) => {
    switch (event.target.name) {
      case 'username':
        setusername(event.target.value);
        break;
      default:
        setPassword(event.target.value);
        break;
    }
  }, []);

  const login = React.useCallback(
    (username, password) => {
      getUserByUsername(username).then((userDetails) => {
        if (!userDetails) {
          return;
        }
        setUser(userDetails);
        window.localStorage.setItem('user', JSON.stringify(userDetails));
      });
    },
    [setUser],
  );

  const signup = React.useCallback(() => {
    createNewUser({username, password}).then((userDetails) => {
      setUser(userDetails);
      window.localStorage.setItem('user', JSON.stringify(userDetails));
    });
  }, [username, password, setUser]);

  const handleSubmit = React.useCallback(
    (event) => {
      event.preventDefault();
      let validationResult = validateLoginInput({
        username,
        password,
      });
      if (validationResult !== '') {
        setError(validationResult);
        return;
      }
      toggleLogin(true);
      login(username, password);
    },
    [username, password, login],
  );

  return (
    <Fragment>
      <div className="container">
        <h2 className="title">Login</h2>
      </div>{' '}
      <br />
      <div className="columns is-mobile is-centered">
        <div className="column is-one-third">
          <div className="field">
            <label className="label">Username: </label>
            <input
              value={username}
              className="input"
              type="text"
              name="username"
              onChange={handleChange}
            />
          </div>
          <div className="field">
            <label className="label">Password: </label>
            <input
              value={password}
              className="input"
              type="password"
              name="password"
              onChange={handleChange}
            />
          </div>
          {error && <div className="has-text-danger">{error}</div>}
          <div className="field is-clearfix">
            <button
              className="button sis-outlined is-pulled-left"
              onClick={handleSubmit}
              disabled={isLoggingIn}
            >
              Login
            </button>
            <button
              className="button sis-outlined is-pulled-right"
              onClick={signup}
              disabled={isLoggingIn}
            >
              Signup
            </button>
            <button
              className="button sis-outlined is-pulled-right"
              onClick={handleSubmit}
              disabled={isLoggingIn}
            >
              Forgot Password
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
