import React, { useEffect, useState } from 'react';
import {
  findTimeDifference,
  getDomainName,
  updatePostInStorage,
} from '../../utils/utilities';
import PostButtons from '../button/postButtons';
import LinkButton from '../button/linkButton';
import upvoteSymbol from '../../grayarrow.gif';

export default function PostItem({
  isListItem,
  history,
  hidePost,
  serialNumber,
  post,
}) {
  const [timeDiff, setTimeDiff] = useState('');
  const [postTitleClassName, setPostTitleClassName] = useState(
    'post-title-unclicked',
  );
  const [isHidden, setIsHidden] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);

  const goToLink = React.useCallback(() => {
    let link = post.link.replace('https://', '');
    window.open(`https://${link}`, '_blank');
    setPostTitleClassName('post-title-clicked');
  }, [post.link]);

  const goToPost = React.useCallback(() => {
    history.push(`/posts/${post.id}`);
  }, [history, post.id]);

  const upvote = React.useCallback(() => {
    post.points += 1;
    updatePostInStorage(post.id, post);
    setIsUpvoted(true);
  }, [post]);

  const unvote = React.useCallback(() => {
    post.points -= 1;
    updatePostInStorage(post.id, post);
    setIsUpvoted(false);
  }, [post]);

  const hide = React.useCallback(() => {
    setIsHidden(true);
    if (isListItem) {
      hidePost(serialNumber - 1);
    }
  }, [isListItem, hidePost, serialNumber]);

  const unhide = React.useCallback(() => {
    setIsHidden(false);
  }, []);

  useEffect(() => {
    let timeDiff = findTimeDifference(post.postedTime);
    setTimeDiff(timeDiff);
  }, [post.postedTime]);

  return (
    <>
      <div>
        {isListItem && (
          <p className="post-line post-serial-number">{serialNumber}. </p>
        )}
        {!isUpvoted && (
          <img
            onClick={upvote}
            className="post-upvote post-line"
            src={upvoteSymbol}
            alt="loading..."
          />
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
        <LinkButton
          className={'post-line underlineHover button-link'}
          buttonText={post.postedBy}
          history={history}
          route={`users/${post.postedBy}`}
        />
        <button className="post-line underlineHover button-link">
          &#124; {timeDiff} ago
        </button>
        <PostButtons
          buttons={[
            {
              condition: isUpvoted,
              func: unvote,
              className: 'post-line underlineHover button-link',
              text: 'unvote',
            },
            {
              condition: !isHidden,
              func: hide,
              className: 'post-line underlineHover button-link',
              text: 'hide',
            },
            {
              condition: isHidden,
              func: unhide,
              className: 'post-line underlineHover button-link',
              text: 'un-hide',
            },
            {
              condition: true,
              func: unhide,
              className: 'post-line underlineHover button-link',
              text: 'favourite',
            },
            //TODO: Implement total thread length instead of just comments length
            {
              condition: true,
              func: goToPost,
              className: 'post-line underlineHover button-link',
              text: `${post.comments.length} comments`,
            },
          ]}
        />
      </div>
    </>
  );
}
