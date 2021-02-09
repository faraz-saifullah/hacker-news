import React, { useEffect, useState, useContext } from 'react';
import { getThreadByParentId } from '../../api/comment';
import Context from '../../Context';
import CommentsList from '../comment/commentsList';

export default function Comments({ match, history }) {
  const [comments, setComments] = useState([]);
  const { user } = useContext(Context);

  useEffect(() => {
    getThreadByParentId(4).then((allComments) => {
      setComments(allComments);
    });
  }, []);

  return (
    <CommentsList history={history} commentsList={comments} isThread={false} />
  );
}
