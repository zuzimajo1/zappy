import React from 'react';
import Navbar from '../Components/Navbar';
import Announcement from '../Components/Announcement';
import Newsletter from '../Components/Newsletter';
import Footer from '../Components/Footer';
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"
import Noproduct from "../Components/Noproduct";
import OrderItems from "../Components/OrderItems";
import "../Components/Components.css";
import Author from '../Components/Author';

const Order = () => {
  const orders = useSelector(state => state.order.orderProducts);
  return (
    <>
      <Navbar />
      <Announcement />
      <section className="cart-container">
        <h1>{orders <= 1 ? `Your order` : `Your Orders`}</h1>
      <div className='cart-wrapper-first-row3'>
        <div>
          <Link to="/">
            <button className="button-wrapper-continue" type="button">
              continue shopping
            </button>
          </Link>
        </div>
      </div>
      <div className="cart-order-list">
        {orders.length > 0 ?
          orders && orders.map((items) => (
            <OrderItems items={items} />
          ))
          :
          <Noproduct message={"Empty Order"} />
        }
      </div>
      <div />
        </section>
      <Newsletter />
      <Footer />
      <Author/>
    </>
  )
}

export default Order