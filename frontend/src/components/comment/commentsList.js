import React, { useContext, useEffect, useState } from 'react';
import Context from '../../Context';
import Comment from './comment';

export default function CommentsList({
  match,
  history,
  commentsList,
  isThread,
}) {
  const { user } = useContext(Context);
  const [comments, setComments] = useState(commentsList);

  useEffect(() => {
    setComments(commentsList);
  }, [commentsList]);

  return (
    <div className="container">
      {comments?.length !== 0 ? (
        <div className="posts-list">
          {comments.map((comment, index) => (
            <Comment
              history={history}
              key={index}
              user={user}
              match={match}
              comment={comment}
              isPartOfThread={isThread}
            />
          ))}
        </div>
      ) : (
        <p>No comments Available</p>
      )}
    </div>
  );
}
