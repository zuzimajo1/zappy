import axios from "axios";

const Base_URL = "https://zappyfashion.onrender.com/api";

const user = JSON.parse(localStorage.getItem("persist:root"))?.user;
const currentUser = user && JSON.parse(user).currentUser;
const TOKEN = currentUser?.accessToken;

export const publicRequest = axios.create({
  baseURL: Base_URL,
});

export const userRequest = axios.create({
  baseURL: Base_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
