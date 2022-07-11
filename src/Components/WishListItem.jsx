import React from 'react'
import * as IoIcon from "react-icons/io5";
// import { deleteWishList } from '../redux/WishListRedux';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { deleteWishbyTimeCreated } from "../redux/apiCalls";

const WishListItem = ({ items }) => {
    const dispatch = useDispatch();

    const HandleCloseWish = (item)=>{
        deleteWishbyTimeCreated(dispatch, item.timeCreated);
    }



    return (
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
                        {items.color?.map((items) => (
                            <div key={items} style={{ backgroundColor: items }} className="singleproduct-color-wish" ></div>))}</div>
                    <p>
                        <b>Size:</b>
                        <span>{items.size}</span>
                    </p>
                    <p>
                        <b>Price:</b>
                        <span>{items.price}</span>
                    </p>
                </div>
                <div className="cart-order-button-container">
                    <div className="cart-order-button2">
                        <span>
                            <Link to={`/product/${items.productID}`}>
                                View Product
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
            <div>
                <button className='closecart-icon' onClick={() => HandleCloseWish(items)}>
                    <IoIcon.IoCloseSharp />
                </button>
            </div>
        </div>
    )
}

export default WishListItem