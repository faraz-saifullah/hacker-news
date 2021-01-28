import React, { useEffect, useState } from 'react';
import {
  makeCommentBody,
  addNewCommentInStorage,
  findCommentById,
  findTimeDifference,
  updateCommentInStorage,
  getThreadLength,
} from '../../utils/utilities';
import upvoteSymbol from '../../grayarrow.gif';
import LinkButton from '../button/linkButton';

export default function Comment({ user, history, comment, isPartOfThread }) {
  const [timeDiff, setTimeDiff] = useState('');
  const [thread, setThread] = useState(comment);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isThreadHidden, setIsThreadHidden] = useState(false);
  const [threadLength, setThreadLength] = useState('');
  const [isUpvoted, setIsUpVoted] = useState(false);

  const updateReplyText = React.useCallback((event) => {
    setReplyText(event.target.value);
  }, []);

  const writeReply = React.useCallback(() => {
    setIsReplying(true);
  }, []);

  const toggleThread = React.useCallback(() => {
    setIsThreadHidden(!isThreadHidden);
  }, [isThreadHidden]);

  const cancelReply = React.useCallback(() => {
    setIsReplying(false);
    setReplyText('');
  }, []);

  const upVote = React.useCallback(() => {
    let newComment = { ...comment };
    newComment.points += 1;
    updateCommentInStorage(newComment.id, newComment);
    setIsUpVoted(true);
  }, [comment]);

  const unVote = React.useCallback(() => {
    let newComment = { ...comment };
    newComment.points -= 1;
    updateCommentInStorage(newComment.id, newComment);
    setIsUpVoted(false);
  }, [comment]);

  const addReplyToThread = React.useCallback(() => {
    let newThread = { ...thread };
    let newReply = makeCommentBody(
      user.username,
      replyText,
      thread.postTitle,
      thread.postId,
    );
    newThread.comments.unshift(newReply.id);
    setThread(newThread);
    updateCommentInStorage(newThread.id, newThread);
    addNewCommentInStorage(newReply);
    cancelReply(getThreadLength(thread.comments));
  }, [thread, user.username, replyText, cancelReply]);

  //TODO: Make thread length update in real time
  useEffect(() => {
    let timeDiff = findTimeDifference(comment.postedTime);
    setTimeDiff(timeDiff);
    setThreadLength(getThreadLength(thread.comments));
  }, [comment.postedTime, thread.comments, threadLength]);

  return (
    <div className="comment-body">
      <div className="comment-first-line">
        {!isUpvoted && (
          <img
            onClick={upVote}
            className="comment-upvote post-line"
            src={upvoteSymbol}
            alt="upvote"
          />
        )}
        <LinkButton
          className={'post-line underlineHover comment-button-link'}
          buttonText={thread.commentedBy}
          history={history}
          route={`users/${thread.commentedBy}`}
        />
        <button className="post-line comment-button-link underlineHover">
          {timeDiff} ago
        </button>
        {isUpvoted && (
          <button
            onClick={unVote}
            className="post-line comment-button-link underlineHover"
          >
            unvote
          </button>
        )}
        {isPartOfThread ? (
          <>
            {isThreadHidden ? (
              <button
                onClick={toggleThread}
                className="post-line comment-button-link"
              >
                [{threadLength + 1} more]
              </button>
            ) : (
              <button
                onClick={toggleThread}
                className="post-line comment-button-link"
              >
                [-]
              </button>
            )}
          </>
        ) : (
          <LinkButton
            className={'post-line underlineHover comment-button-link'}
            buttonText={`on: ${thread.postTitle}`}
            history={history}
            route={`posts/${thread.postId}`}
          />
        )}
      </div>
      {!isThreadHidden && (
        <div className="comment-second-line">
          <p>{thread.text}</p>
          {isPartOfThread && (
            <>
              {isReplying ? (
                <>
                  <textarea
                    value={replyText}
                    onChange={updateReplyText}
                    className="comment-input comment-input-text"
                  />
                  <button onClick={addReplyToThread} className="button-link">
                    <u>post</u>
                  </button>
                  <button onClick={cancelReply} className="button-link">
                    <u>cancel</u>
                  </button>
                </>
              ) : (
                <button onClick={writeReply} className="button-link">
                  <u>reply</u>
                </button>
              )}
              {thread.comments.map((commentId) => (
                <Comment
                  history={history}
                  isPartOfThread={true}
                  user={user}
                  key={commentId}
                  comment={findCommentById(commentId)}
                />
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
