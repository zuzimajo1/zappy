import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";

const WishListSlice = createSlice({
  name: "wishlist",
  initialState: {
    wishlist: [],
    getwish: false,
    error: false,
  },
  reducers: {
    addWishListStart: (state) => {
      state.error = false;
    },

    addWishListSuccess: (state, action) => {
      state.wishlist.push(action.payload);
      state.getwish = true;
      state.error = false;
    },

    addWishListFailed: (state) => {
      state.error = true;
    },

    deleteWishbyTimeCreatedStart: (state) => {
      state.error = false;
    },
    deleteWishbyTimeCreatedSuccess: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.timeCreated !== action.payload
      );
    },
    deleteWishbyTimeCreatedFailed: (state) => {
      state.error = true;
    },

    deteleAllWishlist: (state) => {
      state.wishlist = [];
    },
    getAllUserWishStart: (state) => {
      state.error = false;
    },
    getAllUserWishSuccess: (state, action) => {
      state.wishlist = action.payload;
      state.error = false;
    },
    getAllUserWishFailed: (state) => {
      state.error = true;
    },
    deleteAllWishbyUsernameStart: (state) => {
      state.error = false;
    },
    deleteAllWishbyUsernameSuccess: (state, action) => {
      state.wishlist = [];
    },
    deleteAllWishbyUsernameFailed: (state) => {
      state.error = true;
    },
    deleteWishFromListStart: (state)=>{
      state.error = false;
    },
    deleteWishFromListSuccess: (state,action)=>{
      state.wishlist = state.wishlist.filter((items)=> items.productID !== action.payload);
    },
    deleteWishFromListFailed : (state,action)=>{
      state.error = true;
    },
  },
});

export const {
  addWishListStart,
  addWishListSuccess,
  addWishListFailed,
  deleteWishList,
  deteleAllWishlist,
  deleteWishListID,
  deleteWishbyTimeCreatedStart,
  deleteWishbyTimeCreatedSuccess,
  deleteWishbyTimeCreatedFailed,
  getAllUserWishStart,
  getAllUserWishSuccess,
  getAllUserWishFailed,
  deleteAllWishbyUsernameStart,
  deleteAllWishbyUsernameSuccess,
  deleteAllWishbyUsernameFailed,
  deleteWishFromListStart,
  deleteWishFromListSuccess,
  deleteWishFromListFailed,
} = WishListSlice.actions;
export default WishListSlice.reducer;
