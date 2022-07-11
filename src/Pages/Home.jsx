
import React, { useState, useEffect } from "react";
import Announcement from "../Components/Announcement";
import Categories from "../Components/Categories";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider"
import "../Components/Components.css";
import Product from "../Components/Product";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import { getAllCartbyUserName, getAllUserWish, getAllUserOrder } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { deleteUserProductCart } from "../redux/CartRedux";
import Author from '../Components/Author';


const Home = () => {
  const dispatch = useDispatch();
  const validator = useSelector(state => state.user.validator)
  const userCurrentLogout = useSelector(state => state.user.accountUserLogout);
  const username = useSelector(state => state.user.currentUser?.username);


  useEffect(() => {
    validator && (getAllCartbyUserName(dispatch, username));
  }, [validator]);

  useEffect(() => {
    validator && (
      getAllUserWish(dispatch, username))
}, [validator]);


  useEffect(() => {
    validator && (getAllUserOrder(dispatch, username))
  }, [validator]);


  useEffect(() => {
    userCurrentLogout && dispatch(deleteUserProductCart());
  }, [userCurrentLogout])





  return (
    <div className="home">
      <Navbar />
      <Announcement />
      <Slider />
      <Categories />
      <Product />
      <Newsletter />
      <Footer />
      <Author />
    </div>
  );
};

export default Home;
