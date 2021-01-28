import React, { useContext, useState } from 'react';
import PostItem from './postItem';
import {
  findPostById,
  updatePostInStorage,
  makeCommentBody,
  findCommentById,
  addNewCommentInStorage,
} from '../../utils/utilities';
import Comment from '../comment/comment';
import Context from '../../Context';

export default function Post({ history, match }) {
  const [post, setPost] = useState(findPostById(match?.params?.postId));
  const [commentText, setCommentText] = useState('');
  const { user } = useContext(Context);

  const updateCommentText = React.useCallback((event) => {
    setCommentText(event.target.value);
  }, []);

  const addComment = React.useCallback(() => {
    let newPost = { ...post };
    let newComment = makeCommentBody(
      user.username,
      commentText,
      post.title,
      post.id,
      true,
    );
    newPost.comments.push(newComment.id);
    updatePostInStorage(newPost.id, newPost);
    addNewCommentInStorage(newComment);
    setPost(newPost);
    setCommentText('');
  }, [commentText, post, user.username]);

  return (
    <div className="container">
      {post ? (
        <div className="posts-list">
          <PostItem history={history} isListItem={false} post={post} />
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
          {post.comments.map((commentId) => (
            <Comment
              isPartOfThread={true}
              history={history}
              user={user}
              key={commentId}
              comment={findCommentById(commentId)}
            />
          ))}
        </div>
      ) : (
        <p>Post Not Found</p>
      )}
    </div>
  );
}
