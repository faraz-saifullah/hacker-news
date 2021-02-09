import axios from "axios";

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
  let index = allPosts.findIndex((post) => post.id === postId);
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
  axios.post('http://localhost:8080/posts', {
    title: newPost.title,
    link: newPost.link,
    postedBy: newPost.postedBy,
    postedTime: newPost.postedTime
  }, {
    headers: {
      "Content-Type": "application/json"
    }
  })
  let allPosts = JSON.parse(window.localStorage.getItem('allPosts'));
  allPosts.push(newPost);
  window.localStorage.setItem('allPosts', JSON.stringify(allPosts));
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
    parentId
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
    title: title,
    link: url,
    points: 0,
    postedBy: username,
    postedTime: Date.now(),
  };
  return newPost;
}

export function getPostsOfUser(username, type) {
  let user = getUserByUsername(username);
  let posts = [];
  switch (type) {
    case 'favourites':
      user.favourites.map((postId) => {
        let post = findPostById(postId);
        return posts.push(post);
      });
      break;

    default:
      user.submissions.map((postId) => {
        let post = findPostById(postId);
        return posts.push(post);
      });
      break;
  }

  return posts;
}

export function getUserByUsername(username) {
  let allUsers = JSON.parse(window.localStorage.getItem('allUsers'));
  let user = allUsers.find((user) => user.username === username);
  return user;
}

export function getCommentsByUser(username) {
  let allComments = JSON.parse(window.localStorage.getItem('allComments'));
  let commentsByUser = allComments.filter(
    (comment) => comment.commentedBy === username,
  );
  return commentsByUser;
}

export function updateUser(oldUser, newUser) {
  let allUsers = JSON.parse(window.localStorage.getItem('allUsers'));
  let index = allUsers.findIndex((user) => user.username === oldUser.username);
  allUsers[index] = newUser;
  window.localStorage.setItem('allUsers', JSON.stringify(allUsers));
}

export function getThreadsByUser(username) {
  let commentsByUser = getCommentsByUser(username);
  let threadsByUser = commentsByUser.filter((comment) => comment.isThreadStart);
  return threadsByUser;
}

export function addToFavourites(username, postId) {
  let oldUser = getUserByUsername(username);
  let newUser = JSON.parse(JSON.stringify(oldUser));
  newUser.favourites.push(postId);
  window.localStorage.setItem('user', JSON.stringify(newUser));
  updateUser(oldUser, newUser);
}

export function createUser(username, password) {
  return {
    username: username,
    password: password,
    timeCreated: Date.now(),
    about: 'This is my about section',
    submissions: [],
    comments: [],
    favourites: [],
  };
}
