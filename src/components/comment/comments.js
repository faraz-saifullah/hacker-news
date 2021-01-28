import React, { useEffect, useState } from 'react';
import CommentsList from './commentsList';

export default function Comments({ match, history }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    let allComments = JSON.parse(window.localStorage.getItem('allComments'));
    setComments(allComments);
  }, []);

  return <CommentsList history={history} commentsList={comments} />;
}
