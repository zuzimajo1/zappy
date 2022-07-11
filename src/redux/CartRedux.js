//Redux for Cart

import { createSlice } from "@reduxjs/toolkit";
import Modal from "../Components/Modal";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    error: false,
  },
  reducers: {
    addCartStart: (state) => {
      state.error = false;
      state.total = 0;
    },

    addCartSuccess: (state, action) => {
      state.products.push(action.payload);
      // state.total += action.payload.Cartprice;
      state.products.map((items) => {
        state.total += items.Cartprice;
      });
      state.quantity = state.products.length;
      state.error = false;
    },

    addCartFailed: (state) => {
      state.error = true;
    },

    updateCartStart: (state) => {
      state.error = false;
    },

    updateCartSuccess: (state, action) => {
      state.products[
        state.products.findIndex(
          (items) => items.timeCreated === action.payload.timeCreated
        )
      ] = action.payload;
    },
    updateCartFailed: (state) => {
      state.error = true;
    },

    addQuantityProduct: (state, action) => {
      state.products.map((items) => {
        if (items.timeCreated === action.payload.timeCreated) {
          if (action.payload.condition2 === "plusCondition") {
            state.total += action.payload.price;
          } else if (action.payload.condition2 === "minusConditon") {
            state.total -= action.payload.price;
          } else {
          }
        }
      });
    },

    deleteOneProductCartStart: (state) => {
      state.error = false;
    },

    deleteOneProductCartSuccess: (state, action) => {
      state.products.splice(
        state.products.findIndex(
          (items) => items.timeCreated === action.payload.timeCreated
        ),
        1
      );
      state.total -= action.payload.Cartprice;
      state.quantity = state.products.length;
      state.error = false;
    },

    deleteOneProductCartFailed: (state) => {
      state.error = true;
    },

    getAllCartbyUserNameStart: (state) => {
      state.error = false;
      state.total = 0;
    },

    getAllCartbyUserNameSuccess: (state, action) => {
      state.products = action.payload;
      action.payload.map((items) => {
        state.total += items.Cartprice;
      });

      // state.total += action.payload.Cartprice;
      state.error = false;
      state.quantity = state.products.length;
    },

    getAllCartbyUserNameFailed: (state) => {
      state.error = true;
    },

    deleteUserProductCart: (state) => {
      state.products = [];
      state.quantity = state.products.length;
    },
  
    deleteManyCartbyUsernameStart: (state) => {
      state.error = false;
    },
    deleteManyCartbyUsernameSuccess: (state) => {
      state.products = [];
      state.total = 0;
      state.quantity = state.products.length;
      state.error = false;
    },
    deleteManyCartbyUsernameFailed: (state) => {
      state.error = true;
    },
  },
});

//exporting
export const {
  addQuantityProduct,
  addCartStart,
  addCartSuccess,
  addCartFailed,
  updateCartStart,
  updateCartSuccess,
  updateCartFailed,
  deleteOneProductCartStart,
  deleteOneProductCartSuccess,
  deleteOneProductCartFailed,
  getAllCartbyUserNameStart,
  getAllCartbyUserNameSuccess,
  getAllCartbyUserNameFailed,
  deleteUserProductCart,
  deleteManyCartbyUsernameStart,
  deleteManyCartbyUsernameSuccess,
  deleteManyCartbyUsernameFailed,
} = CartSlice.actions;
export default CartSlice.reducer;
