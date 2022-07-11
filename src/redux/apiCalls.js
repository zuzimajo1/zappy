import {
  loginStart,
  loginFailure,
  loginSuccess,
  logout,
  addUserStart,
  addUserSuccess,
  addUserFailure,
  sendmessageStart,
  sendmessageSuccess,
  sendmessageFailed,
} from "./UserRedux";

import {
  addWishListStart,
  addWishListSuccess,
  addWishListFailed,
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
} from "./WishListRedux";

import {
  GetAllProductsStart,
  GetAllProductsSuccess,
  GetAllProductsFailure,
} from "./AllProductsRedux";

import {
  addCartStart,
  addCartSuccess,
  addCartFailed,
  updateCartStart,
  updateCartSuccess,
  updateCartFailed,
  addQuantityProduct,
  deleteOneProductCartStart,
  deleteOneProductCartSuccess,
  deleteOneProductCartFailed,
  getAllCartbyUserNameStart,
  getAllCartbyUserNameSuccess,
  getAllCartbyUserNameFailed,
  deleteManyCartbyUsernameStart,
  deleteManyCartbyUsernameSuccess,
  deleteManyCartbyUsernameFailed,
} from "./CartRedux";

import {
  OrderProductStart,
  OrderProductSuccess,
  OrderProductFailed,
  getAllUserOrderStart,
  getAllUserOrderSuccess,
  getAllUserOrderFailed,
  deleteOrderStart,
  deleteOrderSuccess,
  deleteOrderFailed,
} from "./OrderRedux";

import { publicRequest, userRequest } from "../requestMethod";

export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await publicRequest.post("/auth/login", user);
    dispatch(loginSuccess(res.data));
  } catch (error) {
    dispatch(loginFailure());
  }
};

export const LogoutFunction = async (dispatch) => {
  dispatch(logout());
};

export const addUser = async (dispatch, registerUser) => {
  dispatch(addUserStart());
  try {
    const register = await publicRequest.post("auth/register", registerUser);
    dispatch(addUserSuccess(register.data));
  } catch (error) {
    dispatch(addUserFailure());
  }
};

export const getallProducts = async (dispatch) => {
  dispatch(GetAllProductsStart());
  try {
    const res = await publicRequest.get("product");
    dispatch(GetAllProductsSuccess(res.data));
  } catch (error) {
    dispatch(GetAllProductsFailure());
  }
};

export const createOrder = async (dispatch, orderinfo) => {
  dispatch(OrderProductStart());
  try {
    const res = await publicRequest.post("order", orderinfo);
    dispatch(OrderProductSuccess(res.data));
    
  } catch (error) {
    dispatch(OrderProductFailed());
  }
};

export const addUserCart = async (dispatch, addcart) => {
  dispatch(addCartStart());
  try {
    const resCart = await publicRequest.post("cart", addcart);
    dispatch(addCartSuccess(resCart.data));
  } catch (error) {
    dispatch(addCartFailed());
  }
};

export const updateProductCart = async (
  dispatch,
  id,
  condition,
  condition2,
  SetLoadingGif
) => {
  dispatch(updateCartStart());
  try {
    const res = await publicRequest.patch(`cart/update/${id}`, condition);
    dispatch(updateCartSuccess(res.data));
    dispatch(addQuantityProduct({ ...res.data, condition2 }));
    SetLoadingGif(true);
  } catch (error) {
    dispatch(updateCartFailed());
  }
};

export const deleteOneProductCart = async (dispatch, timeCreated, Cartprice, SetLoadingGif) => {
  dispatch(deleteOneProductCartStart());
  try {
    const res = await publicRequest.delete(`cart/delete/${timeCreated}`);
    dispatch(deleteOneProductCartSuccess({timeCreated, Cartprice}));
    SetLoadingGif(true);
    // dispatch(countTotalSuccess(cartprice));
  } catch (error) {
    dispatch(deleteOneProductCartFailed());
  }
};

export const getAllCartbyUserName = async (dispatch, username)=>{
  dispatch(getAllCartbyUserNameStart());
  try{
    const res = await publicRequest.get(`cart/find/${username}`);
    dispatch(getAllCartbyUserNameSuccess(res.data));
  }catch(error){
    dispatch(getAllCartbyUserNameFailed());
  }
}

export const addWishUser = async (dispatch, addwish)=>{
  dispatch(addWishListStart());
  try {
    const res = await publicRequest.post("wish", addwish);
    dispatch(addWishListSuccess(res.data));
  } catch (error) {
    dispatch(addWishListFailed());
  }
}

export const getAllUserWish = async (dispatch, username)=>{
  dispatch(getAllUserWishStart());
  try{
    const res = await publicRequest.get(`wish/find/${username}`);
    dispatch(getAllUserWishSuccess(res.data));
  }catch(error){
    dispatch(getAllUserWishFailed());
  }
}

export const deleteWishbyTimeCreated = async (dispatch, timeCreated)=>{
  dispatch(deleteWishbyTimeCreatedStart());
  try {
    const res = await publicRequest.delete(`wish/delete/${timeCreated}`);
    dispatch(deleteWishbyTimeCreatedSuccess(timeCreated));
  } catch (error) {
    dispatch(deleteWishbyTimeCreatedFailed());
  }
}

export const deleteManyCartbyUsername = async (dispatch, username)=>{
  dispatch(deleteManyCartbyUsernameStart())
  try {
    const res = await publicRequest.delete(`cart/deleteMany/${username}`);
    dispatch(deleteManyCartbyUsernameSuccess());
  } catch (error) {
    dispatch(deleteManyCartbyUsernameFailed());
  }
}

export const getAllUserOrder = async (dispatch, username)=>{
  dispatch(getAllUserOrderStart());
  try{
    const res = await publicRequest.get(`order/find/${username}`);
    dispatch(getAllUserOrderSuccess(res.data));
  }catch(error){
    dispatch(getAllUserOrderFailed());
  }
}

export const deleteOrder = async (dispatch, id)=>{
  dispatch(deleteOrderStart());
  try{
    const res = await publicRequest.delete(`order/delete/${id}`);
    dispatch(deleteOrderSuccess(id));
  }catch(error){
    dispatch(deleteOrderFailed());
  }
}

export const deleteAllWishbyUsername = async (dispatch, username) => {
  dispatch(deleteAllWishbyUsernameStart());
  try {
    const res = await publicRequest.delete(`wish/deleteMany/${username}`);
    dispatch(deleteAllWishbyUsernameSuccess());
  } catch (error) {
    dispatch(deleteAllWishbyUsernameFailed());
  }
};

export const sendmessage = (dispatch, message)=>{
  dispatch(sendmessageStart());
  try{
    const res = publicRequest.post("message", message);
    dispatch(sendmessageSuccess());
  }catch(error){
      dispatch(sendmessageFailed());
  }
}


export const deleteWishFromList = async (dispatch, productID)=>{
  dispatch(deleteWishFromListStart());
  try{
    const res = publicRequest.delete(`wish/delete?productID=${productID}`);
    dispatch(deleteWishFromListSuccess(productID));
  }catch(error){
    dispatch(deleteWishFromListFailed());
  }
}