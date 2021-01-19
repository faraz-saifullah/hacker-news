import React, { useEffect, useState } from 'react';
import PostListItem from '../posts/postLIstItem';

export default function Home() {
  const [posts, setPosts] = useState([]);

  const updatePosts = React.useCallback(
    (index, post) => {
      let newPosts = [...posts];
      newPosts[index] = post;
      console.log(newPosts);
      setPosts(newPosts);
      window.localStorage.setItem('allPosts', JSON.stringify(newPosts));
    },
    [posts],
  );

  useEffect(() => {
    let allPosts = JSON.parse(window.localStorage.getItem('allPosts'));
    setPosts(allPosts);
  }, []);

  return (
    <div className="container">
      {posts ? (
        <div className="posts-list">
          {posts.map((post, index) => (
            <PostListItem
              updatePosts={updatePosts}
              key={post.id}
              serialNumber={index + 1}
              post={post}
            />
          ))}
        </div>
      ) : (
        <p>No Posts Available</p>
      )}
    </div>
  );
}
