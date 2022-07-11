import { configureStore, combineReducers } from "@reduxjs/toolkit"
import cartReducer from "./CartRedux";
import userReducer from "./UserRedux"
import wishReducer from "./WishListRedux";
import allproductsReducer from "./AllProductsRedux";
import orderReducer from "./OrderRedux";
import searchReducer from "./SearchProductRedux";

//using persist to remain the data when loading

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  wish: wishReducer,
  allproducts: allproductsReducer,
  order: orderReducer,
  search: searchReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);


export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);