import React, { useEffect, useState } from 'react';
import { getAllPosts } from '../../api/post';
import Loader from '../loader/loader';
import PostsList from '../posts/postsList';

export default function Newest({ history }) {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true)
    getAllPosts().then((allPosts) => {
      allPosts.sort(function (post1, post2) {
        if (post1.postedTime > post2.postedTime) {
          return 1;
        } else if (post1.postedTime < post2.postedTime) {
          return -1;
        }
        return 0;
      });
      setPosts(allPosts);
      setIsLoading(false);
    })
  }, []);

  return isLoading ? <Loader /> : <PostsList history={history} postsList={posts} />;
}
