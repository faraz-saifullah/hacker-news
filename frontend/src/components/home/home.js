import React, { useEffect, useState } from 'react';
import { getAllPosts, getThreadsLength } from '../../api/post';
import Loader from '../loader/loader';
import PostsList from '../posts/postsList';

export default function Home({ history }) {
  const [posts, setPosts] = useState([]);
  const [isAllLoaded, setIsAllLoaded] = useState(false);

  useEffect(() => {
    getAllPosts().then((allPosts) => {
      setIsAllLoaded(true);
      allPosts.forEach(async (post) => {
        post.threadLength = await getThreadsLength(post.id);
        post.isOpened = false;
      });
      setPosts(allPosts);
    });
  }, []);

  return isAllLoaded ? <PostsList history={history} postsList={posts} /> : <Loader />;
}
