
//Redux for AllProducts
import { createSlice } from "@reduxjs/toolkit";

const AllProductsSlice = createSlice({
  name: "allproducts",
  initialState: {
    allproducts: [],
    error: false,
    success: false,
    fetching: false,
  },
  reducers: {
    GetAllProductsStart: (state, action) => {
      state.error = false;
      state.success = false;
      state.fetching = true;
    },
    GetAllProductsSuccess: (state, action) => {
      state.allproducts = action.payload;
      state.error = false;
      state.fetching = false;
      state.success = true;
    },
    GetAllProductsFailure: (state, action) => {
      state.error = true;
      state.fetching = false;
      //   state.allproducts = [];
    },
  },
});

export const {
  GetAllProductsStart,
  GetAllProductsSuccess,
  GetAllProductsFailure,
} = AllProductsSlice.actions;
export default AllProductsSlice.reducer;

