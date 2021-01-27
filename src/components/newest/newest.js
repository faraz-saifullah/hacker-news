import React, { useEffect, useState } from 'react';
import PostsList from '../posts/postsList';

export default function Newest({ history }) {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let allPosts = JSON.parse(window.localStorage.getItem('allPosts'));
    allPosts.sort(function (post1, post2) {
      if (post1.postedTime > post2.postedTime) {
        return 1;
      } else if (post1.postedTime < post2.postedTime) {
        return -1;
      }
      return 0;
    });
    setPosts(allPosts);
  }, []);

  return <PostsList history={history} postsList={posts} />;
}
