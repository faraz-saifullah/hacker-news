import React, { useEffect, useState } from 'react';
import LinkButtons from '../button/linkButtons';
import { findTimeDifference } from '../../utils/utilities';

export default function Comment({ user, match, comment }) {
  const [timeDiff, setTimeDiff] = useState('');

  //TODO: Implement reply to comment feature
  const addReplyToThread = React.useCallback(() => {}, []);

  useEffect(() => {
    let timeDiff = findTimeDifference(comment.postedTime);
    setTimeDiff(timeDiff);
  }, [comment.postedTime]);

  return (
    <div className="comment-body">
      <div className="comment-first-line">
        <button className="post-line button-link">&#8679;</button>
        <button className="post-line button-link underlineHover">
          {comment.commentedBy}
        </button>
        <button className="post-line button-link underlineHover">
          {timeDiff} ago
        </button>
        <button className="post-line button-link">[-]</button>
      </div>
      <div className="comment-second-line">
        <p>{comment.text}</p>
      </div>
      <button onClick={addReplyToThread} className="button-link">
        <u>reply</u>
      </button>
      {comment.comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
}
