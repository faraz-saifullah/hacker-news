import React, { useEffect, useState } from 'react';
import PostItem from '../posts/postItem';

export default function Home(props) {
  const [posts, setPosts] = useState([]);

  const hidePost = React.useCallback(
    (index) => {
      let newPosts = [...posts];
      newPosts.splice(index, 1);
      setPosts(newPosts);
    },
    [posts],
  );

  useEffect(() => {
    let allPosts = JSON.parse(window.localStorage.getItem('allPosts'));
    setPosts(allPosts);
  }, []);

  return (
    <div className="container">
      {posts?.length !== 0 ? (
        <div className="posts-list">
          {posts.map((post, index) => (
            <PostItem
              isListItem={true}
              history={props.history}
              hidePost={hidePost}
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
