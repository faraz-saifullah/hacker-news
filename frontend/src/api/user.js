import axios from 'axios';
import { BASE_URL } from '../Config';

export async function createNewUser(user) {
  let newUser = await axios.post(`${BASE_URL}/users`, user, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return newUser.data;
}

export async function getAllUsers() {
  let allUsers = await axios.get(`${BASE_URL}/users`);
  return allUsers.data;
}

export async function getUserByUsername(username) {
  let user = await axios.get(`${BASE_URL}/users/${username}`);
  return user.data;
}


export async function updateUser(username, newUser) {
  let allUsers = await axios.patch(`${BASE_URL}/users/${username}`, newUser, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return allUsers.data;
}

export async function getAllPostsByUser(username) {
  let allPosts = await axios.get(`${BASE_URL}/users/${username}/posts`);
  return allPosts.data;
}

export async function getAllCommentsByUser(username) {
  let allComments = await axios.get(`${BASE_URL}/users/${username}/comments`);
  return allComments.data;
}

export async function addToUpvotes(username, postId) {
  axios.post(`${BASE_URL}/users/${username}/upvotes`, postId, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function deleteFromUpvotes(username, postId) {
  axios.delete(`${BASE_URL}/users/${username}/upvotes/${postId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
