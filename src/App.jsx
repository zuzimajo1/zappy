import React, { useState } from "react";
import Home from "./Pages/Home";
import "./index.css";
import ProductList from "./Pages/ProductList";
import SingleProduct from "./Pages/SingleProduct";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Cart from "./Pages/Cart";
import { useSelector } from "react-redux";
import AllProductList from "./Pages/AllProductList"

import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import Success from "./Pages/Success";
import WishList from "./Pages/WishList";
import Order from "./Pages/Order";
import SingleOrder from "./Pages/SingleOrder";
import SearchProduct from "./Pages/SearchProduct";



const App = () => {
  const User = useSelector(state => state.user.validator);
  // const [User, setUser] = useate(false);

  return (
    <Router>
      <Switch>
        <Route exact path="/" >
          {User ? <Home /> : <Home />}
        </Route>
        <Route path="/products/:category">
          {User ? <ProductList /> : <Redirect to="/login"/>}
        </Route>
        <Route path="/product/:id">
          {User ? <SingleProduct /> : <Redirect to="/login"/>}
        </Route>
        <Route path="/order/:orderID">
          {User ? <SingleOrder /> : <Redirect to="/login" />}
        </Route>
        <Route path="/productsItems">
          {User ? <AllProductList/> : <Redirect to="/login" />}
        </Route>
        <Route path="/cart">
          {User ? <Cart/> : <Redirect to="/login"/> }
        </Route>
        <Route path="/wish">
          {User ? <WishList /> : <Redirect to="/login" />}
        </Route>
        <Route path="/order">
          {User ? <Order /> : <Redirect to="/login" />}
        </Route>
        <Route path="/success">
          {User ? <Success /> : <Redirect to="/login" />}
        </Route>
        <Route path="/searchproduct">
          {User ? <SearchProduct /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          { User ? <Redirect to ="/"/> : <Login/>  }
        </Route>
        <Route path="/register">
            {User ? <Redirect to="/" /> : <Register />}
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
