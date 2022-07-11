import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import * as AiIcon from "react-icons/ai";
import * as BsIcon from "react-icons/bs";
import "./Components.css";
import { Link } from "react-router-dom";
import { addUserCart, addWishUser } from '../redux/apiCalls';


const AllProductListItem = ({ items, HandleModalClick}) => {
    const [ClickHeart, SetClickHeart] = useState(false);
    const [ClickShop, SetClickShop] = useState(false);
    const username = useSelector(state=>state.user.currentUser.username);
    const dispatch = useDispatch();


    const HandleClickAdd = (item) => {
        SetClickHeart(true);
        addWishUser(dispatch, {
            userID: new Date().getFullYear() + new Date().getDay() + new Date().getTime() + new Date().getSeconds(),
            userName: username,
            productID: item._id,
            title: item.title,
            description: item.description,
            img: item.img,
            color: item.color.map((items) => items),
            price: item.price,
            timeCreated: new Date().getFullYear() + new Date().getDay() + new Date().getTime(),
        })
        HandleModalClick("Added to Wishlist");
    }

    const HandleShopAdd = (item) => {
        addUserCart(dispatch, {
            userID: new Date().getFullYear() + new Date().getDay() + new Date().getTime() + new Date().getSeconds(),
            userName: username,
            productID: item._id,
            title: item.title,
            quantity: 1,
            Cartprice: item.price * 1,
            color: item.color[0],
            size: item.size[0],
            price: item.price,
            timeCreated: new Date().getFullYear() + new Date().getDay() + new Date().getTime(),
            img: item.img,
        })
        SetClickShop(true);
        HandleModalClick("Added to Cart");
    }



    return (
        <>
            <section className="productitem-container">
                <img src={items.img} alt="dresses"></img>
                <div className="productitem-icons">
                    <Link to={`/product/${items._id}`}>
                        <p>
                            <AiIcon.AiOutlineSearch />
                        </p>
                    </Link>
                    <p>
                        {ClickShop ?
                            (<BsIcon.BsCartFill className="fillshop-icon" />)
                            : (<BsIcon.BsCart onClick={() => HandleShopAdd(items)} />)}
                    </p>
                    <p>
                        {ClickHeart ? (
                            <AiIcon.AiFillHeart className="fillheart-icon"  />
                        ) : (
                            <AiIcon.AiOutlineHeart onClick={() => HandleClickAdd(items)} />
                        )}
                    </p>
                </div>
            </section >
        </>
    )
}

export default AllProductListItem