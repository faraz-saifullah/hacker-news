import React, { useEffect, useState } from 'react';
import {
  makeCommentBody,
  findTimeDifference,
} from '../../utils/utilities';
import upvoteSymbol from '../../grayarrow.gif';
import asteriskSymbol from '../../asterisk.png';
import LinkButton from '../button/linkButton';
import { createNewComment, getThreadByParentId } from '../../api/comment';
import Loader from '../loader/loader';

export default function Comment({ user, history, comment, isPartOfThread }) {
  const [timeDiff, setTimeDiff] = useState('');
  const [thread] = useState(comment);
  const [replies, setReplies] = useState();
  const [isThreadLoading, setIsThreadLoading] = useState(true);
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isThreadHidden, setIsThreadHidden] = useState(false);
  const [threadLength, setThreadLength] = useState('');
  const [isUpvoted, setIsUpVoted] = useState(false);

  //TODO: Implement upvoting for comments
  const updateReplyText = React.useCallback((event) => {
    setReplyText(event.target.value);
  }, []);

  const writeReply = React.useCallback(() => {
    setIsReplying(true);
  }, []);

  const toggleThread = React.useCallback(() => {
    setThreadLength(replies.length);
    setIsThreadHidden(!isThreadHidden);
  }, [replies, isThreadHidden]);

  const cancelReply = React.useCallback(() => {
    setIsReplying(false);
    setReplyText('');
  }, []);

  const upvote = React.useCallback(() => {
    let newComment = { ...comment };
    newComment.points += 1;
    setIsUpVoted(true);
  }, [comment]);

  const unVote = React.useCallback(() => {
    let newComment = { ...comment };
    newComment.points -= 1;
    setIsUpVoted(false);
  }, [comment]);

  const addReplyToThread = React.useCallback(() => {
    let newReplies = [...replies];
    let newReply = makeCommentBody(
      user.username,
      replyText,
      thread.postTitle,
      thread.postId,
      thread.id,
    );
    createNewComment(newReply).then((addedReply) => {
      newReplies.unshift(addedReply);
      setReplies(newReplies);
    });
    cancelReply(4);
  }, [
    thread.id,
    thread.postTitle,
    thread.postId,
    replies,
    user.username,
    replyText,
    cancelReply,
  ]);

  useEffect(() => {
    let timeDiff = findTimeDifference(comment.postedTime);
    setIsThreadLoading(true);
    setTimeDiff(timeDiff);
    getThreadByParentId(thread.id).then((comments) => {
      setReplies(comments);
      setIsThreadLoading(false);
    });
  }, [thread.id, comment.postedTime, threadLength]);

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
                replies.map((comment, index) => (
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
