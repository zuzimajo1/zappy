//Redux for User
import React, { useEffect } from "react";
import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "user",
  initialState: {
    validator: false,
    currentUser: null,
    isFetching: false,
    error: false,
    accountUserLogout: false,
    messageSent: false,
  },
  reducers: {
    loginStart: (state) => {
      //no need actions
      state.isFetching = true;
      state.error = false;
      state.validator = false;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      state.error = false;
      state.validator = true;
      state.accountUserLogout = false;
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
      state.validator = false;
    },
    logout: (state) => {
      state.currentUser = false;
      state.validator = false;
      state.accountUserLogout = true;
    },
    addUserStart: (state) => {
      state.validator = false;
    },
    addUserSuccess: (state, action) => {
      state.validator = true;
      state.currentUser = action.payload;
      state.accountUserLogout = false;
    },
    addUserFailure: (state) => {
      state.validator = false;
    },
    sendmessageStart: (state) => {
      state.messageSent = false;
    },
    sendmessageSuccess: (state) => {
      state.messageSent = true;
    },
    sendmessageFailed: (state) => {
      state.messageSent = false;
    },
  },
});

//exporting
export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  sendmessageStart,
  sendmessageSuccess,
  sendmessageFailed,
} = UserSlice.actions;
export default UserSlice.reducer;
