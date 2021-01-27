import React, { useEffect, useState } from 'react';
import { getPostsOfUser } from '../../utils/utilities';
import PostsList from '../posts/postsList';

export default function Favourites({ history, match }) {
  const [username] = useState(match.params.username);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let allPosts = getPostsOfUser(username, 'favourites');
    setPosts(allPosts);
  }, [username]);

  return <PostsList history={history} postsList={posts} />;
}
