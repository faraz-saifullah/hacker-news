import React, { useEffect, useState } from 'react';
import { findTimeDifference, getUserByUsername } from '../../utils/utilities';

export default function UserProfile({ history, match }) {
  const [username] = useState(match.params.username);
  const [user, setUser] = useState({});
  const timeDifference = findTimeDifference(user.timeCreated);
  //TODO: Link all the buttons to proper routes

  useEffect(() => {
    setUser(getUserByUsername(username));
  }, [username]);

  const goToFavourites = React.useCallback(() => {
    history.push(`/favourites/${user.username}`);
  }, [user.username, history]);

  const goToSubmissions = React.useCallback(() => {
    history.push(`/submissions/${user.username}`);
  }, [user.username, history]);

  return (
    <div className="container">
      {user ? (
        <div className="posts-list">
          <p>user:&ensp;&ensp;&emsp;{user.username}</p>
          <p>created:&nbsp;&nbsp;{timeDifference} ago</p>
          <p>about:&nbsp;&nbsp;&nbsp;&ensp;{user.about}</p>
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
