import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context';
import {
  findTimeDifference,
} from '../../utils/utilities';
import { getUserByUsername, updateUser } from '../../api/user'
import { CircularProgress } from '@material-ui/core';

export default function UserProfile({ history, match }) {
  const [username] = useState(match.params.username);
  const [user, setUser] = useState({});
  const loggedInUser = useContext(Context).user;
  const [aboutText, setAboutText] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  const timeDifference = findTimeDifference(user.timeCreated);

  useEffect(() => {
    getUserByUsername(username).then((user) => {
      setUser(user);
      setAboutText(user.about);
    })
  }, [username]);

  const goToFavourites = React.useCallback(() => {
    history.push(`/favourites/${user.username}`);
  }, [user.username, history]);

  const updateAboutText = React.useCallback((event) => {
    setAboutText(event.target.value);
  }, []);

  const changeAboutInfo = React.useCallback(() => {
    let newUser = { ...user };
    newUser.about = aboutText;
    setIsUpdating(true)
    updateUser(newUser.username, newUser).then((newUser) => {
      setIsUpdating(false);
    });
    setUser(newUser);
  }, [user, aboutText]);

  const cancelUpdate = React.useCallback(() => {
    setAboutText(user.about);
  }, [user.about]);

  const goToSubmissions = React.useCallback(() => {
    history.push(`/submissions/${user.username}`);
  }, [user.username, history]);

  return (
    <div className="container">
      {user ? (
        <div className="posts-list">
          <p>user:&ensp;&ensp;&emsp;{user.username}</p>
          <p>created:&nbsp;&nbsp;{timeDifference} ago</p>
          {isUpdating? <CircularProgress /> : loggedInUser.username === user.username ? (
            <p>
              about:&nbsp;&nbsp;&nbsp;&ensp;
              <textarea
                onChange={updateAboutText}
                className="about-me"
                value={aboutText}
              />
              <button onClick={changeAboutInfo} className="button-link">
                <u>submit</u>
              </button>
              <button onClick={cancelUpdate} className="button-link">
                <u>cancel</u>
              </button>
            </p>
          ) : (
            <p>about:&nbsp;&nbsp;&nbsp;&ensp;{user.about}</p>
          )}
          <button onClick={goToSubmissions} className="profile-page-button">
            <u>submissions</u>
          </button>
          <button className="profile-page-button">
            <u>comments</u>
          </button>
          <button onClick={goToFavourites} className="profile-page-button">
            <u>favourites</u>
          </button>
        </div>
      ) : (
        <p>User Not Found</p>
      )}
    </div>
  );
}
