import React, { useEffect, useState } from 'react';
import withContext from '../../withContext';

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    let allPosts = JSON.parse(window.localStorage.getItem('allPosts'));
    setPosts(allPosts);
  }, []);

  return (
    <div className="container">
      {posts ? (
        posts.map((post) => <p>{post.title}</p>)
      ) : (
        <p>No Posts Available</p>
      )}
    </div>
  );
}
