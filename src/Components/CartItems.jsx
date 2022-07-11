import React, { useState, useEffect } from 'react';
import * as AiIcon from "react-icons/ai";
import * as IoIcon from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { updateProductCart, deleteOneProductCart } from "../redux/apiCalls";

const CartItems = ({ items, SetLoadingGif }) => {
    const { quantity } = items;
    const [Update, setUpdate] = useState(false);
    const [ProductQuantity2, SetProductQuantity2] = useState(quantity);

    const [Condition, setCondition] = useState("");
    const dispatch = useDispatch();


    const SetQuantity = (condition) => {
        if (condition === 'plus') {
            setUpdate(true);
            SetProductQuantity2(ProductQuantity2 + 1);
            setCondition("plusCondition");
        } else {
            setUpdate(true);
            SetProductQuantity2(ProductQuantity2 - 1)
            setCondition("minusConditon");
        }
    }


    useEffect(() => {
     
        Update && (updateProductCart(dispatch, items._id, {
            quantity: ProductQuantity2,
            Cartprice: items.price * ProductQuantity2,
        }, Condition, SetLoadingGif))
      
    }, [ProductQuantity2, Condition])


    const SetProductDelete = (items) => {
   
        setUpdate(false);
        deleteOneProductCart(dispatch, items.timeCreated, items.Cartprice, SetLoadingGif);
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
                    <div style={{ backgroundColor: items.color }} className="first-order-color"></div>
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
                    <div className="cart-order-button">
                        <button
                            type="button"
                            className="button-minus"
                        >
                            {quantity > 1 ?
                                (<AiIcon.AiOutlineMinus className="button-minus-icon" onClick={() => SetQuantity('minus')} />)
                                : (<AiIcon.AiOutlineMinus className="button-minus-icon-fade" />)
                            }
                        </button>
                        <span>{quantity}</span>
                        <button
                            type="button"
                            className="button-plus"
                            onClick={() => SetQuantity('plus')}
                        >
                            <AiIcon.AiOutlinePlus />
                        </button>
                    </div>
                    <span>${items.Cartprice}</span>
                </div>
            </div>
            <div>
                <button className='closecart-icon' onClick={() => SetProductDelete(items)}>
                    <IoIcon.IoCloseSharp />
                </button>
            </div>
        </div>
    );
};

export default CartItems;
