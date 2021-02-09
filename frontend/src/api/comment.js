import axios from 'axios';
import { BASE_URL } from '../Config';

export async function createNewComment(comment) {
  axios.post(`${BASE_URL}/comments`, comment, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

export async function getAllComments() {
  let allPosts = await axios.get(`${BASE_URL}/comments`);
  return allPosts.data;
}

export async function getThreadByParentId(commentId) {
  let post = await axios.get(`${BASE_URL}/comments/${commentId}/threads`);
  return post.data;
}
