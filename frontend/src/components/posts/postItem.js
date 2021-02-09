import React, { useContext, useEffect, useState } from 'react';
import { findTimeDifference, getDomainName } from '../../utils/utilities';
import PostButtons from '../button/postButtons';
import LinkButton from '../button/linkButton';
import upvoteSymbol from '../../grayarrow.gif';
import asteriskSymbol from '../../asterisk.png';
import Context from '../../Context';
import { getThreadsLength, updatePost } from '../../api/post';
import { addToFavourite } from '../../api/favourite';
import { addToUpvotes, deleteFromUpvotes } from '../../api/user';

export default function PostItem({
  isListItem,
  history,
  hidePost,
  serialNumber,
  post,
}) {
  const { user } = useContext(Context);
  const [timeDiff, setTimeDiff] = useState('');
  const [postTitleClassName, setPostTitleClassName] = useState(
    'post-title-unclicked',
  );
  const [isHidden, setIsHidden] = useState(false);
  const [isUpvoted, setIsUpvoted] = useState(false);
  const [isFavourite, setIsFavourite] = useState(false);
  const [threadLength, setThreadsLength] = useState(0);

  const goToLink = React.useCallback(() => {
    let link = post.link.replace('https://', '');
    window.open(`https://${link}`, '_blank');
    setPostTitleClassName('post-title-clicked');
  }, [post.link]);

  function isAlreadyFavourite(allFavs, postId) {
    return allFavs?.indexOf(postId) > -1;
  }

  const goToPost = React.useCallback(() => {
    history.push(`/posts/${post.id}`);
  }, [history, post.id]);

  const upvote = React.useCallback(() => {
    post.points += 1;
    addToUpvotes(user.username, post.id).then(() => {
      setIsUpvoted(true);
    });
    updatePost(post);
  }, [user.username, post]);

  const unvote = React.useCallback(() => {
    post.points -= 1;
    deleteFromUpvotes(user.username, post.id).then(() => {
      setIsUpvoted(false);
    });
    updatePost(post);
  }, [user.username, post]);

  const hide = React.useCallback(() => {
    setIsHidden(true);
    if (isListItem) {
      hidePost(serialNumber - 1);
    }
  }, [isListItem, hidePost, serialNumber]);

  const unhide = React.useCallback(() => {
    setIsHidden(false);
  }, []);

  const markFavourite = React.useCallback(() => {
    addToFavourite(user.username, post.id);
    setIsFavourite(true);
  }, [user.username, post.id]);

  useEffect(() => {
    let timeDiff = findTimeDifference(post.postedTime);
    setIsFavourite(isAlreadyFavourite(user.favourites, post.id));
    getThreadsLength(post.id).then((length) => {
      setThreadsLength(length);
    });
    setTimeDiff(timeDiff);
  }, [user.favourites, post.postId, post.postedTime, post.id]);

  return (
    <>
      <div>
        {isListItem && (
          <p className="post-line post-serial-number">{serialNumber}. </p>
        )}
        {user.username === post.postedBy ? (
          <img
            className="post-upvote post-line"
            src={asteriskSymbol}
            alt="upvote"
          />
        ) : (
          <>
            {!isUpvoted && (
              <img
                onClick={upvote}
                className="post-upvote post-line"
                src={upvoteSymbol}
                alt="upvote"
              />
            )}
          </>
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
              condition: !isFavourite,
              func: markFavourite,
              className: 'post-line underlineHover button-link',
              text: 'favourite',
            },
            //TODO: Implement total thread length instead of just comments length
            {
              condition: true,
              func: goToPost,
              className: 'post-line underlineHover button-link',
              text: `${threadLength} comments`,
            },
          ]}
        />
      </div>
    </>
  );
}
