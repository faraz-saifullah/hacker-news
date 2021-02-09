import React, { useEffect, useState } from 'react';
import { getAllComments } from '../../api/comment';
import CommentsList from './commentsList';

export default function Comments({ match, history }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    getAllComments().then((allComments) => {
      setComments(allComments);
    });
  }, []);

  return <CommentsList history={history} commentsList={comments} />;
}
