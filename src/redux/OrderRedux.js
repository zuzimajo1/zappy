import { createSlice } from "@reduxjs/toolkit";

const OrderSlice = createSlice({
  name: "order",
  initialState: {
    orderProducts: [],
    orderSuccess: false,
    orderError: false,
    orderID: "",
  },
  reducers: {
    OrderProductStart: (state) => {
      state.orderSuccess = false;
      state.orderError = false;
      state.orderID = "";
    },
    OrderProductSuccess: (state, action) => {
      state.orderProducts.push(action.payload);
      state.orderSuccess = true;
      state.orderError = false;
      state.orderID = action.payload._id;
    },
    OrderProductFailed: (state) => {
      state.orderSuccess = false;
      state.orderError = true;
    },
    getAllUserOrderStart: (state) => {
      state.orderError = false;
      state.orderSuccess = false;
    },
    getAllUserOrderSuccess: (state, action) => {
      state.orderProducts = action.payload;
      state.orderError = false;
      state.orderSuccess = true;
    },
    getAllUserOrderFailed: (state) => {
      state.orderError = true;
      state.orderSuccess = false;
    },
    deleteOrderStart: (state) => {
      state.orderError = false;
      state.orderSuccess = false;
    },
    deleteOrderSuccess: (state, action) => {
      state.orderProducts = state.orderProducts.filter(
        (items) => items._id !== action.payload
      );
      state.orderSuccess = true;
    },
    deleteOrderFailed: (state) => {
      state.orderSuccess = false;
      state.orderError = true;
    },
  },
});

export const {
  OrderProductStart,
  OrderProductSuccess,
  OrderProductFailed,
  getAllUserOrderStart,
  getAllUserOrderSuccess,
  getAllUserOrderFailed,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailed,
} = OrderSlice.actions;
export default OrderSlice.reducer;
