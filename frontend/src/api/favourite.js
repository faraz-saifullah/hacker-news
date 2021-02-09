import axios from 'axios';
import { BASE_URL } from '../Config';
import { getPostById } from './post';

export async function addToFavourite(username, postId) {
  let newFav = await axios.post(`${BASE_URL}/users/${username}/favs`, postId, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return newFav.data;
}

export async function getFavoriteListOfUser(username) {
  let allFavs = await axios.get(`${BASE_URL}/users/${username}`);
  return allFavs.data;
}

export async function getAllFavouritesByUser(username) {
    let allFavs = await axios.get(`${BASE_URL}/users/${username}/favs`);
    allFavs = allFavs.data;
    console.log(allFavs);
    let posts = [];
    allFavs.forEach(fav => {
        posts.push(getPostById(fav.postId));
    });
    return await Promise.all(posts);
  }
