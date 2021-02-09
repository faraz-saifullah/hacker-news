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
            "Content-Type" : "application/json"
        }
    });
    return allUsers.data;
  }