import React, { useEffect, useState } from 'react';
import PostsList from '../posts/postsList';

export default function Home({ history }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let allPosts = JSON.parse(window.localStorage.getItem('allPosts'));
    setPosts(allPosts);
  }, []);

  return <PostsList history={history} postsList={posts} />;
}
