import React, { useEffect, useState } from 'react';
import { getPostsOfUser } from '../../utils/utilities';
import PostsList from '../posts/postsList';

export default function Submissions({ history, match }) {
  const [username] = useState(match.params.username);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let allPosts = getPostsOfUser(username, 'submissions');
    setPosts(allPosts);
  }, [username]);

  return <PostsList history={history} postsList={posts} />;
}
