import axios from 'axios';

export function findTimeDifference(time) {
  let postedOn = new Date(time);
  let current = new Date(Date.now());
  let yearDiff = Math.abs(current.getFullYear() - postedOn.getFullYear());
  if (yearDiff !== 0) {
    return `${yearDiff} years`;
  }
  let monthDiff = Math.abs(current.getMonth() - postedOn.getMonth());
  if (monthDiff !== 0) {
    return `${monthDiff} months`;
  }
  let dayDiff = Math.abs(current.getDay() - postedOn.getDay());
  if (dayDiff !== 0) {
    return `${dayDiff} days`;
  }
  let hoursDiff = Math.abs(current.getHours() - postedOn.getHours());
  if (hoursDiff !== 0) {
    return `${hoursDiff} hours`;
  }
  let minutesDiff = Math.abs(current.getMinutes() - postedOn.getMinutes());
  if (minutesDiff !== 0) {
    return `${minutesDiff} minutes`;
  }
  let secsDiff = Math.abs(current.getSeconds() - postedOn.getSeconds());
  if (secsDiff !== 0) {
    return `${secsDiff} seconds`;
  }
  return 'no time';
}

export function getDomainName(postLink) {
  let link = postLink.replace('https://', '');
  link = link.replace('www.', '');
  link = link.split('/')[0];
  return link;
}

export function makeCommentBody(
  username,
  commentText,
  postTitle,
  postId,
  parentId,
) {
  return {
    commentedBy: username,
    text: commentText,
    postTitle,
    postId,
    postedTime: Date.now(),
    points: 0,
    parentId,
  };
}

export function createPostBody(username, title, url, text) {
  let comments = [];
  let newPost = {};
  newPost.comments = comments;
  if (text) {
    let comment = makeCommentBody(username, text);
    newPost.comments.push(comment.id);
  }
  newPost = {
    ...newPost,
    title: title,
    link: url,
    points: 0,
    postedBy: username,
    postedTime: Date.now(),
  };
  return newPost;
}
