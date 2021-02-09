import React, { useEffect, useState } from 'react';
import PostsList from '../posts/postsList';
import Loader from '../loader/loader';
import { getAllPostsByUser } from '../../api/user';

export default function Submissions({ history, match }) {
  const [isLoading, setIsLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    getAllPostsByUser(match.params.username).then((allPosts) => {
      setPosts(allPosts);
      setIsLoading(false);
    });
  }, [match.params.username]);

  return isLoading ? (
    <Loader />
  ) : (
    <PostsList history={history} postsList={posts} />
  );
}
