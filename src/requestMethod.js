import axios from "axios";

// const Base_URL = "https://zappyfashion.herokuapp.com/api/";
const Base_URL = "https://zappyclothes.herokuapp.com/api/";


// const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxYWUwYWUxYzJiOTRkNDU0MTMzYjA0NSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTYzOTE0NTg1NiwiZXhwIjoxNjM5NDA1MDU2fQ.5E4vm6Cjqr_aFBykkJYjtjq4XACxcIgDxWSF9VWMpBM";
// const token = localStorage.getItem("persist:root", JSON.parse(user));

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
