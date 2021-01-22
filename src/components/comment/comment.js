import React, { useEffect, useState } from 'react';
import {
  makeCommentBody,
  addNewCommentInStorage,
  findCommentById,
  findTimeDifference,
  updateCommentInStorage,
  getThreadLength,
} from '../../utils/utilities';

export default function Comment({ user, match, comment }) {
  const [timeDiff, setTimeDiff] = useState('');
  const [thread, setThread] = useState(comment);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isThreadHidden, setIsThreadHidden] = useState(false);
  const [threadLength, setThreadLength] = useState('');

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

  const addReplyToThread = React.useCallback(() => {
    let newThread = { ...thread };
    let newReply = makeCommentBody(user.username, replyText);
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
        <button className="post-line button-link">&#8679;</button>
        <button className="post-line button-link underlineHover">
          {thread.commentedBy}
        </button>
        <button className="post-line button-link underlineHover">
          {timeDiff} ago
        </button>
        {isThreadHidden ? (
          <button onClick={toggleThread} className="post-line button-link">
            [{threadLength + 1} more]
          </button>
        ) : (
          <button onClick={toggleThread} className="post-line button-link">
            [-]
          </button>
        )}
      </div>
      {!isThreadHidden && (
        <div className="comment-second-line">
          <p>{thread.text}</p>
          {!isReplying && (
            <button onClick={writeReply} className="button-link">
              <u>reply</u>
            </button>
          )}
          {isReplying && (
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
          )}
          {thread.comments.map((commentId) => (
            <Comment
              user={user}
              key={commentId}
              comment={findCommentById(commentId)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
