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

export function findPostById(postId) {
  let allPosts = JSON.parse(window.localStorage.getItem('allPosts'));
  return allPosts.find((post) => post.id === postId);
}

export function findCommentById(commentId) {
  let allComments = JSON.parse(window.localStorage.getItem('allComments'));
  return allComments.find((comment) => comment.id === commentId);
}

export function updatePostInStorage(postId, newPost) {
  let allPosts = JSON.parse(window.localStorage.getItem('allPosts'));
  let oldPost = allPosts.find((post) => post.id === postId);
  let index = allPosts.indexOf(oldPost);
  allPosts[index] = newPost;
  window.localStorage.setItem('allPosts', JSON.stringify(allPosts));
}

export function updateCommentInStorage(commentId, newComment) {
  let allComments = JSON.parse(window.localStorage.getItem('allComments'));
  let oldComment = allComments.find((comment) => comment.id === commentId);
  let index = allComments.indexOf(oldComment);
  allComments[index] = newComment;
  window.localStorage.setItem('allComments', JSON.stringify(allComments));
}

export function addNewCommentInStorage(newComment) {
  let allComments = JSON.parse(window.localStorage.getItem('allComments'));
  allComments.push(newComment);
  window.localStorage.setItem('allComments', JSON.stringify(allComments));
}

export function addNewPostInStorage(newPost) {
  let allPosts = JSON.parse(window.localStorage.getItem('allPosts'));
  allPosts.push(newPost);
  window.localStorage.setItem('allPosts', JSON.stringify(allPosts));
}

export function makeCommentBody(username, commentText) {
  return {
    id: `${Math.floor(Math.random() * 90000) + 10000}`,
    commentedBy: username,
    text: commentText,
    postedTime: Date.now(),
    points: 0,
    comments: [],
  };
}

export function getThreadLength(comments) {
  let total = 0;
  comments.map((commentId) => {
    let comment = findCommentById(commentId);
    total += 1;
    return (total += getThreadLength(comment.comments));
  });
  return total;
}

export function findUser(username, password) {
  let allUsers = JSON.parse(window.localStorage.getItem('allUsers'));
  let user = allUsers.find(
    (user) => user.username === username && user.password === password,
  );
  return user;
}

export function createPost(username, title, url, text) {
  let comments = [];
  let newPost = {};
  newPost.comments = comments;
  if (text) {
    let comment = makeCommentBody(username, text);
    addNewCommentInStorage(comment);
    newPost.comments.push(comment.id);
  }
  newPost = {
    ...newPost,
    id: `${Math.floor(Math.random() * 90000) + 10000}`,
    title: title,
    link: url,
    points: 0,
    postedBy: username,
    postedTime: Date.now(),
    isOpened: false,
  };
  return newPost;
}
