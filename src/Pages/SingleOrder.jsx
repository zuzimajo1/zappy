import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { publicRequest } from "../requestMethod"
import Navbar from "../Components/Navbar";
import Announcement from "../Components/Announcement";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import Loading from "./Loading";
import * as IoIcon from "react-icons/io5";
import * as FaIcon from "react-icons/fa";
import * as MdIcon from "react-icons/md";
import { useSelector } from "react-redux";
import Author from '../Components/Author';

const SingleOrder = () => {
    const { orderID } = useParams();
    const [OrderIDdata, setOrderIDdata] = useState([]);
    const [loading, setloading] = useState(true)
    const User = useSelector(state=>state.user?.currentUser);
    const {username, email} = User;

    useEffect(() => {

        const getOrderID = async () => {
            try {
                const res = await publicRequest.get(`order/find?orderID=${orderID}`);
                setOrderIDdata(res.data);
                setloading(false);
            } catch (error) {
             
            }
        }
        getOrderID();


    }, [orderID])

    if (loading) {
        return (
            <Loading />
        )
    }

    return (
        <>
            <Navbar />
            <Announcement />
            <section className="cart-container">
               
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
                            <button className="button-wrapper-continue" type="button">
                                View Orders
                            </button>
                        </Link>

                    </div>
                </div>
                <h1>Order No: {OrderIDdata._id}</h1>
                <div className='delivery'>
                    <div>
                        <IoIcon.IoLocationSharp />
                        <h2>Delivery Address</h2>
                    </div>
                    <p>{OrderIDdata.address.name}</p>
                    <p>{email}</p>
                    <p>{`${OrderIDdata.address.address.city}, ${OrderIDdata.address.address.line1}, ${OrderIDdata.address.address.country}`}</p>
                </div>
                <div className='delivery'>
                    <div>
                        <FaIcon.FaTruck />
                        <h2>Shipping Information</h2>
                    </div>
                    <p>J&T Express</p>
                </div>
                <div className='delivery'>
                    <div>
                        <MdIcon.MdPayment />
                        <h2>Payment Method</h2>
                    </div>
                    <p>Cash on Delivery</p>
                </div>
                <div className="cart-wrapper-second-row">
                    <div className="cart-order-list">
                        {
                            OrderIDdata.product.map((items) => (
                                <div className="cart-order-container">
                                    <img
                                        src={items.img}
                                        alt={items.title}
                                    ></img>
                                    <div className="cart-order-wrapper">
                                        <div>
                                            <p>
                                                <b>Product:</b>
                                                <span>{items.title}</span>
                                            </p>
                                            <p>
                                                <b>ID:</b>
                                                <span>{items._id}</span>
                                            </p>
                                            <div className="singleproduct-container-color-div">
                                                <div style={{ backgroundColor: items.color }} className="singleproduct-color-wish" ></div>
                                            </div>
                                            <p>
                                                <b>Size:</b>
                                                <span>{items.size}</span>
                                            </p>
                                            <p>
                                                <b>Price:</b>
                                                <span>{items.price}</span>
                                            </p>
                                            <p>
                                                <b>Quantity:</b>
                                                <span>{items.quantity}</span>
                                            </p>
                                        </div>
                                        <div className="cart-order-button-container">
                                            <div className="cart-order-button2">
                                                <p>
                                                    <b>Amount:</b>
                                                    <span>{items.Cartprice}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="cart-order-button4">
                    <div>
                        <h3>Total:</h3>
                        <h3>{OrderIDdata.amount}</h3>
                    </div>
                </div>

            </section>
            <Newsletter />
            <Footer />
            <Author />
        </>
    )
}

export default SingleOrder