import React, { useEffect, useState } from 'react';
import {
  makeCommentBody,
  findTimeDifference,
  updateCommentInStorage,
} from '../../utils/utilities';
import upvoteSymbol from '../../grayarrow.gif';
import asteriskSymbol from '../../asterisk.png';
import LinkButton from '../button/linkButton';
import { createNewComment, getThreadByParentId } from '../../api/comment';
import Loader from '../loader/loader';

export default function Comment({ user, history, comment, isPartOfThread }) {
  const [timeDiff, setTimeDiff] = useState('');
  const [thread, setThread] = useState(comment);
  const [isThreadLoading, setIsThreadLoading] = useState(true);
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

  const upvote = React.useCallback(() => {
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
      thread.id,
    );
    newThread.comments.unshift(newReply);
    setThread(newThread);
    createNewComment(newReply);
    cancelReply(4);
  }, [thread, user.username, replyText, cancelReply]);

  //TODO: Make thread length update in real time
  useEffect(() => {
    let timeDiff = findTimeDifference(comment.postedTime);
    let newThread = { ...thread };
    setTimeDiff(timeDiff);
    getThreadByParentId(newThread.id).then((comments) => {
      newThread.comments = comments;
      setThread(newThread);
      setIsThreadLoading(false);
    });
    setThreadLength(4);
  }, [comment.postedTime, thread, threadLength]);

  return (
    <div className="comment-body">
      <div className="comment-first-line">
        {user.username === thread.commentedBy ? (
          <img
            className="post-upvote post-line"
            src={asteriskSymbol}
            alt="upvote"
          />
        ) : (
          <>
            {!isUpvoted && (
              <img
                onClick={upvote}
                className="post-upvote post-line"
                src={upvoteSymbol}
                alt="upvote"
              />
            )}
          </>
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
        <LinkButton
          className={'post-line underlineHover comment-button-link'}
          buttonText={`on: ${thread.postTitle}`}
          history={history}
          route={`posts/${thread.postId}`}
        />
        {isPartOfThread && (
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
              {isThreadLoading ? (
                <Loader />
              ) : (
                thread.comments.map((comment) => (
                  <Comment
                    history={history}
                    isPartOfThread={true}
                    user={user}
                    key={comment.id}
                    comment={comment}
                  />
                ))
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
