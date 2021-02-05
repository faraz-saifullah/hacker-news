import React, { useEffect, useState } from 'react';
import PostItem from '../posts/postItem';

export default function PostsList({ history, postsList }) {
  const [posts, setPosts] = useState(postsList);

  const hidePost = React.useCallback(
    (index) => {
      let newPosts = [...posts];
      newPosts.splice(index, 1);
      setPosts(newPosts);
    },
    [posts],
  );

  useEffect(() => {
    setPosts(postsList);
  }, [postsList]);

  return (
    <div className="container">
      {posts?.length !== 0 ? (
        <div className="posts-list">
          {posts.map((post, index) => (
            <PostItem
              history={history}
              isListItem={true}
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
