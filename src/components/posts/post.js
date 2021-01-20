import React, { useContext, useEffect, useState } from 'react';
import PostItem from './postItem';
import {
  findPostById,
  updatePostInStorage,
  makeCommentBody,
} from '../../utils/utilities';
import Comment from '../comment/comment';
import Context from '../../Context';

export default function Post(props) {
  const [post, setPost] = useState(findPostById(props?.match?.params?.postId));
  const [commentText, setCommentText] = useState('');
  const { user } = useContext(Context);

  const updateCommentText = React.useCallback((event) => {
    setCommentText(event.target.value);
  }, []);

  const addComment = React.useCallback(() => {
    let newPost = { ...post };
    newPost.comments.push(makeCommentBody(user.username, commentText));
    updatePostInStorage(newPost.id, newPost);
    setPost(newPost);
    setCommentText('');
  }, [commentText, post, user.username]);

  return (
    <div className="container">
      {post ? (
        <div className="posts-list">
          <PostItem history={props.history} isListItem={false} post={post} />
          <textarea
            value={commentText}
            onChange={updateCommentText}
            className="comment-input comment-input-text"
          />
          <button
            className="comment-input comment-input-button"
            onClick={addComment}
          >
            add comment
          </button>
          {post.comments.map((comment) => (
            <Comment user={user} key={comment.id} comment={comment} />
          ))}
        </div>
      ) : (
        <p>Post Not Found</p>
      )}
    </div>
  );
}
