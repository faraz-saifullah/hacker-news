import React, { useContext, useState } from 'react';
import { addNewPostInStorage, createPost } from '../../utils/utilities';
import Context from '../../Context';

export default function Submit({ history }) {
  const [postText, setPostText] = useState('');
  const [postTitle, setPostTitle] = useState('');
  const [postUrl, setPostUrl] = useState('');
  const { user } = useContext(Context);

  const updateInput = React.useCallback((event) => {
    switch (event.target.name) {
      case 'title':
        setPostTitle(event.target.value);
        break;
      case 'url':
        setPostUrl(event.target.value);
        break;
      default:
        setPostText(event.target.value);
        break;
    }
  }, []);

  const addPost = React.useCallback(() => {
    let newPost = createPost(user.username, postTitle, postUrl, postText);
    addNewPostInStorage(newPost);
    history.push('/');
  }, [history, postText, postTitle, postUrl, user.username]);

  return (
    <div className="container">
      <div className="posts-list">
        <div>
          <p className="post-line">title</p>
          <textarea
            name="title"
            value={postTitle}
            onChange={updateInput}
            className=" post-line comment-input post-input-text"
          />
        </div>
        <div>
          <p className="post-line">url&ensp;</p>
          <textarea
            name="url"
            value={postUrl}
            onChange={updateInput}
            className=" post-line comment-input post-input-text"
          />
        </div>
        <p>&emsp;&emsp;&emsp;or</p>
        <div>
          <p className="post-line">text</p>
          <textarea
            name="text"
            value={postText}
            onChange={updateInput}
            className=" post-line comment-input comment-input-text"
          />
        </div>
        <button className="comment-input post-input-button" onClick={addPost}>
          submit
        </button>
      </div>
    </div>
  );
}
