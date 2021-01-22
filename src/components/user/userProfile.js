import React, { useContext } from 'react';
import Context from '../../Context';
import { findTimeDifference } from '../../utils/utilities';

export default function UserProfile(props) {
  const { user } = useContext(Context);
  const timeDifference = findTimeDifference(user.timeCreated);
  //TODO: Link all the buttons to proper routes

  return (
    <div className="container">
      {user ? (
        <div className="posts-list">
          <p>user:&ensp;&ensp;&emsp;{user.username}</p>
          <p>created:&nbsp;&nbsp;{timeDifference} ago</p>
          <p>about:&nbsp;&nbsp;&nbsp;&ensp;{user.about}</p>
          <button className="profile-page-button">
            <u>submissions</u>
          </button>
          <button className="profile-page-button">
            <u>comments</u>
          </button>
          <button className="profile-page-button">
            <u>favourites</u>
          </button>
        </div>
      ) : (
        <p>User Not Found</p>
      )}
    </div>
  );
}
