import React, { useEffect, useState } from 'react';
import { getAllFavouritesByUser } from '../../api/favourite';
import PostsList from '../posts/postsList';

export default function Favourites({ history, match }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let username = match.params.username
    getAllFavouritesByUser(username).then((allPosts) => {
      setPosts(allPosts);
    })
  }, [match.params.username]);

  return <PostsList history={history} postsList={posts} />;
}
