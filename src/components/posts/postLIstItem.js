import React, { useEffect, useState } from 'react';
import { findTimeDifference, getDomainName } from '../../utils/utilities';

export default function PostListItem({
  hidePost,
  updatePosts,
  serialNumber,
  post,
}) {
  const [timeDiff, setTimeDiff] = useState('');
  const [postTitleClassName, setPostTitleClassName] = useState(
    'post-title-unclicked',
  );
  const [isUpvoted, setIsUpvoted] = useState(false);

  const goToLink = React.useCallback(() => {
    let link = post.link.replace('https://', '');
    window.open(`https://${link}`, '_blank');
    setPostTitleClassName('post-title-clicked');
  }, [post.link]);

  const upvote = React.useCallback(() => {
    post.points += 1;
    updatePosts(serialNumber - 1, post);
    setIsUpvoted(true);
  }, [post, updatePosts, serialNumber]);

  const unvote = React.useCallback(() => {
    post.points -= 1;
    updatePosts(serialNumber - 1, post);
    setIsUpvoted(false);
  }, [post, updatePosts, serialNumber]);

  const hide = React.useCallback(() => {
    hidePost(serialNumber - 1);
  }, [hidePost, serialNumber]);

  useEffect(() => {
    let timeDiff = findTimeDifference(post.postedTIme);
    setTimeDiff(timeDiff);
  }, [post.postedTIme]);

  return (
    <>
      <div>
        <p className="post-line post-serial-number">{serialNumber}. </p>
        {!isUpvoted && (
          <p onClick={upvote} className="post-line">
            &#8679;
          </p>
        )}
        <p className={`post-line  ${postTitleClassName}`} onClick={goToLink}>
          {post.title}
        </p>
        <p className="post-line post-domain-name underlineHover">
          ({getDomainName(post.link)})
        </p>
      </div>
      <div className="post-second-line">
        <p className="post-line">{post.points} points by</p>
        <p className="post-line underlineHover">&nbsp;{post.postedBy}</p>
        <p className="post-line underlineHover">&nbsp;{timeDiff} ago</p>
        {isUpvoted && (
          <p onClick={unvote} className="post-line underlineHover">
            &#124;&nbsp;unvote
          </p>
        )}
        <p onClick={hide} className="post-line underlineHover">
          &#124;&nbsp;hide
        </p>
        <p className="post-line underlineHover">
          &#124;&nbsp;{post.comments.length} comments
        </p>
      </div>
    </>
  );
}
