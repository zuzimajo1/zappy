import React, { useState, useEffect } from "react";
import "./Components.css";
import * as GrIcon from "react-icons/gr";
import * as AiIcon from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { LogoutFunction } from "../redux/apiCalls";
import * as IoIcon from "react-icons/io";
import { publicRequest } from "../requestMethod";
import { ProductsearchSuccess, ProductsearchStart, ProductsearchFailed } from "../redux/SearchProductRedux";
import { useHistory } from "react-router-dom";

const Navbar = ({ search }) => {

  const dispatch = useDispatch();
  const [ClickButton, setClickButton] = useState(false);
  const quantity = useSelector(state => state.cart.quantity);
  const userApproval = useSelector(state => state.user?.validator);
  const userImg = useSelector(state => state.user.currentUser?.img);
  const userUsername = useSelector(state => state.user.currentUser?.username);
  const [searchInput, setsearchInput] = useState(search)
  const [searchCondition, setsearchCondition] = useState(false);
 
  const history = useHistory();

  const HandleLogout = (e) => {
    e.preventDefault();
    LogoutFunction(dispatch);
  }

  const HandleClickSearch = (e) => {
    e.preventDefault();
    setsearchInput(e.target.value);
    setsearchCondition(true);
  }

  useEffect(() => {
    setInterval(() => {
      setsearchCondition(false)
    }, 50)
  }, [searchCondition]);



  useEffect(() => {
    const getProducts = async () => {
      dispatch(ProductsearchStart());
      try {
        const searchproducts = await publicRequest.get(`product/search?q=${searchInput}`);
        dispatch(ProductsearchSuccess(searchproducts.data));
        history.push('/searchproduct', { search: searchInput, searchCondition: searchCondition  });

      } catch (error) {
        dispatch(ProductsearchFailed());
      }
    }
    searchCondition && getProducts();
  }, [searchInput]);


  return (
    <div className="container">
      <div className="wrapper">
        <div className="wrapper-container">
          <div className="wrapper-search">
            <p>EN</p>
            <div className="searchdiv">
              <input type="text" name="search" value={searchInput} onChange={(e) => HandleClickSearch(e)} className="search-input" />
              <GrIcon.GrSearch className="search-icon"></GrIcon.GrSearch>
            </div>
          </div>
          <div className="wrapper-center">
            <h1>
              <Link to="/">
                ZAPPY.
              </Link>
            </h1>
          </div>
          <div className="wrapper-right-div">
            <div className={`${userApproval ? `wrapper-right-hide` : `wrapper-right`}`}>
              <h2>
                <Link to="/register">
                  REGISTER
                </Link>
              </h2>
              <h2>
                <Link to="/login">
                  SIGN-IN
                </Link>
              </h2>
            </div>
            <div className="cartdiv">
              <div>
                <Link to="/cart">
                  {userApproval &&
                    (<div className="cart">
                      <AiIcon.AiOutlineShoppingCart className="cart-icon">
                      </AiIcon.AiOutlineShoppingCart>
                      {quantity > 0 &&
                        <p>{quantity}</p>}
                    </div>)
                  }
                </Link>
                {userApproval && (
                  <div className='userdiv'>
                    <p>{userUsername}</p>
                    <button className='imgDiv' onClick={() => setClickButton(!ClickButton)}>
                      <img src={userImg || `https://i.stack.imgur.com/l60Hf.png`} alt="admin"></img>
                      {ClickButton ? <IoIcon.IoMdArrowDropdown className='ioicon' /> : <IoIcon.IoMdArrowDropleft className='ioiconhide' />}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      {userApproval &&
        (<div className={`${ClickButton ? `bottom-icon` : `button-iconhide`}`}>
          <ul>
            <li>
              <button>
                <p>
                  Manage Account
                </p>
              </button>
            </li>
            <li>
              <button>
                <p>
                  Settings
                </p>
              </button>
            </li>
            <li>
              <button onClick={HandleLogout}>
                <p>
                  Logout
                </p>
              </button>
            </li>
          </ul>
        </div>)}
    </div>
  );
};

export default Navbar;
