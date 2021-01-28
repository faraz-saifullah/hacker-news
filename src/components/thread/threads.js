import React, { useEffect, useState, useContext } from 'react';
import Context from '../../Context';
import { getThreadsByUser } from '../../utils/utilities';
import CommentsList from '../comment/commentsList';

export default function Comments({ match, history }) {
  const [comments, setComments] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    let allComments = getThreadsByUser(user.username || '');
    setComments(allComments);
  }, [user.username]);

  return (
    <CommentsList history={history} commentsList={comments} isThread={false} />
  );
}
