import React, { useState, useEffect } from "react";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { publicRequest, userRequest } from "../requestMethod";
import CartItemsLoadings from "../Components/CartItemsLoadings";
import { deleteAllProduct } from "../redux/CartRedux";
import { deleteManyCartbyUsername } from "../redux/apiCalls";
import "../Components/Components.css";
import Noproduct from "../Components/Noproduct";
import Author from '../Components/Author';
import Zappy from "../images/Zappy.jpeg";


const Cart = () => {

  const [ProductQuantity3, SetProductQuantity3] = useState(1);

  const wish = useSelector(state => state.wish.wishlist);
  const cart = useSelector(state => state.cart);
  const cartproduct = useSelector(state => state.cart.products);
  const username = useSelector(state => state.user.currentUser?.username);
  const userApproval = useSelector(state => state.user?.validator);
  

  const dispatch = useDispatch();

  const { total, quantity } = cart;


  const publishablekey = "pk_test_51K4L2ZDzQhQJzaeDQsRHvTxoP5igLCiRXZmRxntKRawxrUR1coMppkwEfyhfpS48soXgo3GR3q8RQlLvW9ymTKJN006EFFhZIo";
  const [StripeToken, setStripeToken] = useState(null);
  const history = useHistory();

  const onToken = (token) => {
    setStripeToken(token);
  }


  useEffect(() => {
    const makeRequest = async () => {
      try {
        const res = await userRequest.post(
          "/checkout/payment",
          {
            tokenId: StripeToken.id,
            amount: total * 100,
          });
        history.push("/success", {stripedata: res.data, products: cart});

        deleteManyCartbyUsername(dispatch, username)
      } catch (error) {}
    }
    StripeToken && makeRequest();
  }, [StripeToken, total, history]);


  return (
    <main>
      <Navbar />
      <Announcement />
      <section className="cart-container">
        <h1>Your Cart</h1>
        <div className="cart-wrapper-first-row">
          <div>
            <Link to="/">
              <button className="button-wrapper-continue" type="button">
                continue shopping
              </button>
            </Link>
            {/* <button className="button2-wrapper-continue" type="button" onClick={() => dispatch(deleteAllProduct())}>
              Delete All
            </button> */}
          </div>
          <div className="button-wrapper-middle2">
            <p>
              <Link to="/cart">
                Shopping Bag<span>({quantity})</span>
              </Link>
            </p>
            <p>
              <Link to="/wish">
                Your Wishlist<span>({wish.length})</span>
              </Link>
            </p>
          </div>
          <div>
            <Link to="/order">
            <button className="button2-wrapper-continue">
                View Order
            </button>
            </Link>
          </div>
        </div>
        <div className="cart-wrapper-second-row">
          <div className="cart-order-list">
            {cartproduct.length > 0 ?
              cart.products && cart.products.map((items) => (
                <CartItemsLoadings items={items} />
              ))
              :
              <Noproduct message={"Empty Cart"}/>
            }
          </div>
          <div className="cart-order-amount">
            <h1>order summary</h1>
            <div>
              <div>
                <p>Subtotal</p>
                <p>${total}</p>
              </div>
              <div>
                <p>Estimated Shipping</p>
                <p>$5.90</p>
              </div>
              <div>
                <p>Shipping Discount</p>
                <p>$-5.90</p>
              </div>
              <div>
                <h1>
                  <b>Total</b>
                </h1>
                <h1>
                  <b>${total}</b>
                </h1>
              </div>
            </div>
            <StripeCheckout
              name="ZAPPY."
              image={Zappy}
              billingAddress
              shippingAddress
              description={`Your total is ${total} dollars`}
              amount={`${total}00`}
              token={onToken}
              stripeKey={publishablekey} >
              <button type="button">Place out now</button>
            </StripeCheckout>
          </div>
        </div>
      </section>
      <Footer />
      <Author />
    </main>
  );
};

export default Cart;
