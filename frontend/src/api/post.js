import axios from 'axios';
import { BASE_URL } from '../Config';

export async function createNewPost(post) {
  let newPost = await axios.post(`${BASE_URL}/posts`, post, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return newPost.data;
}

export async function getAllPosts() {
  let allPosts = await axios.get(`${BASE_URL}/posts`);
  return allPosts.data;
}

export async function getThreadsLength(postId) {
  let threads = await axios.get(`${BASE_URL}/posts/${postId}/threads`);
  return threads.data.length || 0;
}

export async function getPostById(postId) {
  let post = await axios.get(`${BASE_URL}/posts/${postId}`);
  return post.data;
}

export async function getAllComments(postId) {
  let comments = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
  return comments.data;
}
