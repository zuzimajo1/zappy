import React from 'react'
import { Link } from "react-router-dom";
import { deleteOrder } from "../redux/apiCalls";
import { useDispatch } from 'react-redux';

const OrderItems = ({items}) => {
    const dispatch = useDispatch();
  return (
      <div className="cart-order-container">
          <div className="cart-order-wrapper">
              <div>
                  <p>
                      <b>Order no:</b>
                      <span>{items._id}</span>
                  </p>
                  <p>
                      <b>Product/s order quantity:</b>
                      <span>{items.product.length}</span>
                  </p>
                  <p>
                      <b>Total amount:</b>
                      <span>{items.amount}</span>
                  </p>
                  <p>
                      <b>Order Status:</b>
                      <span>{items.status}</span>
                  </p>
              </div>
              <div className="cart-order-button-container">
                  <div className='order-container-main' >
                      <button>
                          <Link to={`/order/${items._id}`}>
                              View Order
                          </Link>
                      </button>
                  </div>
                  <div className='order-container-main'>
                      <button onClick={() => deleteOrder(dispatch, items._id)}>
                              Cancel Order
                      </button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default OrderItems