import React, { useEffect, useState } from 'react';
import { getAllFavouritesByUser } from '../../api/favourite';
import Loader from '../loader/loader';
import PostsList from '../posts/postsList';

export default function Favourites({ history, match }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let username = match.params.username;
    setIsLoading(true);
    getAllFavouritesByUser(username).then((allPosts) => {
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
