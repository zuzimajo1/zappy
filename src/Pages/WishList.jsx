import React from 'react'
import Announcement from '../Components/Announcement'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import WishListItem from '../Components/WishListItem'
import "../Components/Components.css";
import { deleteAllWishbyUsername } from "../redux/apiCalls";
import Noproduct from '../Components/Noproduct'
import Author from '../Components/Author';

const WishList = () => {
    const wish = useSelector(state => state.wish);
    const { wishlist } = wish;
    const cartproducts = useSelector(state => state.cart.products);
    const username = useSelector(state=>state.user.currentUser.username);
    const dispatch = useDispatch();

    return (
        <>
            <Navbar />
            <Announcement />
            <section className="cart-container">
                <h1>Your Wishlist</h1>
                <div className="cart-wrapper-first-row">
                    <div>
                        <Link to="/">
                            <button className="button-wrapper-continue" type="button">
                                continue shopping
                            </button>
                        </Link>
                    </div>
                    <div className="button-wrapper-middle">
                        <p>
                            <Link to="/cart">
                                Shopping Bag<span>({cartproducts.length})</span>
                            </Link>
                        </p>
                        <p>
                            <Link to="/wish">
                                Your Wishlist<span>({wishlist.length})</span>
                            </Link>
                        </p>
                    </div>
                    <button className="button2-wrapper-continue" type="button" onClick={() => deleteAllWishbyUsername(dispatch, username )}>
                        Delete All
                    </button>
                </div>
                <div className="cart-wrapper-second-row">
                    <div className="cart-order-list">
                        {wishlist.length > 0 ?
                            wish.wishlist && wish.wishlist.map((items) => (
                                <WishListItem items={items} />
                            ))
                            :
                            <Noproduct message={"Empty Wishlist"}/>
                        }
                    </div>
                </div>
            </section>
            <Footer />
            <Author />
        </>
    )
}



export default WishList