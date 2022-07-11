import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import Announcement from '../Components/Announcement';
import Footer from '../Components/Footer';
import Navbar from '../Components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { createOrder } from "../redux/apiCalls";
import { Link } from "react-router-dom";
import "../Components/Components.css";
import Author from '../Components/Author';

const Success = () => {
    const location = useLocation();
    const data = location.state.stripedata;
    const products = location.state.products;
    const userID = useSelector(state => state.user.currentUser._id);
    const cartProducts = useSelector(state => state.cart?.products);
    const username = useSelector(state => state.user.currentUser?.username);
    const orderID = useSelector(state => state.order.orderID);
    const orderSuccess = useSelector(state => state.order.orderSuccess)
    const dispatch = useDispatch();

    useEffect(() => {
        createOrder(dispatch, {
            userID: new Date().getFullYear() + new Date().getMonth() + new Date().getTime(),
            userName: username,
            product: cartProducts.map((items) => items),
            amount: products.total,
            address: data.billing_details,
        })
    }, [data, products]);

    return (
        <>
            <Navbar />
            <Announcement />
            <section className='order-section'>
                <div className="cart-wrapper-first-row">
                    <div>
                        <Link to="/">
                            <button className="button-wrapper-continue" type="button">
                                Back Home
                            </button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/order">
                        <button className="button2-wrapper-continue">
                            View Order
                        </button>
                        </Link>
                    </div>
                </div>
                <div className='order-container'>
                    {orderSuccess ?
                        (<h3>Your order was created successfully!. Your order number is {orderID}</h3>)
                        :
                        (<h3>Your order is processing...</h3>)
                    }
                </div>
            </section>
            <Footer/>
            <Author/>
        </>
    )
}

export default Success
