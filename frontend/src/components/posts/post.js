import React, { useContext, useEffect, useState } from 'react';
import PostItem from './postItem';
import {
  makeCommentBody,
} from '../../utils/utilities';
import Comment from '../comment/comment';
import Context from '../../Context';
import Loader from '../loader/loader';
import { getAllComments, getPostById, getThreadsLength } from '../../api/post';
import { createNewComment } from '../../api/comment';

export default function Post({ history, match }) {
  const [post, setPost] = useState();
  const [comments, setComments] = useState();
  const [commentText, setCommentText] = useState('');
  const { user } = useContext(Context);
  const [isPostLoading, setIsPostLoading] = useState(true);
  const [isCommentsLoading, setIsCommentsLoading] = useState(true);

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
      0,
    );
    setComments([...comments, newComment])
    createNewComment(newComment);
    setPost(newPost);
    setCommentText('');
  }, [commentText, post, user.username, comments]);

  useEffect(() => {
    setIsPostLoading(true);
    setIsCommentsLoading(true);
    let postId = match?.params?.postId;
    getPostById(postId).then(async (post) => {
      post.threadLength = await getThreadsLength(post.id);
      setPost(post);
      setIsPostLoading(false);
    })
    getAllComments(postId).then((comments) => {
      setComments(comments);
      setIsCommentsLoading(false);
    })
  },[match.params.postId])

  return (
    isPostLoading? <Loader/> : <div className="container">
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
          {isCommentsLoading ? <Loader /> : comments.map((comment) => (
            <Comment
              isPartOfThread={true}
              history={history}
              user={user}
              key={comment.id}
              comment={comment}
            />
          ))}
        </div>
      ) : (
        <p>Post Not Found</p>
      )}
    </div>
  );
}
