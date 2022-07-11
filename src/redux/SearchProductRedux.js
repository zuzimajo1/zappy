import { createSlice }  from "@reduxjs/toolkit";


const SearchProductSlice = createSlice({
  name: "search",
  initialState: {
    searchproduct: [],
    searchError: false,
    searchSuccess: false,
    searchloading : false,
  },
  reducers: {
    ProductsearchStart: (state) => {
      state.searchproduct = [];
      state.searchloading = true;
    },
    ProductsearchSuccess: (state, action) => {
      state.searchproduct = action.payload;
      state.searchloading = false;
    },
    ProductsearchFailed: (state) => {
      state.error = true;
      state.searchloading = false;
    }
  },
});


export const {ProductsearchStart, ProductsearchSuccess,ProductsearchFailed } = SearchProductSlice.actions;
export default SearchProductSlice.reducer;