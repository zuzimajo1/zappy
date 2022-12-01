import React, { useState, useEffect } from "react";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import Footer from "../Components/Footer";
import "../Components/Components.css";
import Announcement from "../Components/Announcement";
import { useParams, Link } from "react-router-dom";
import * as AiIcon from "react-icons/ai";
import { publicRequest } from "../requestMethod";
import Loading from "./Loading";
import { useDispatch, useSelector } from "react-redux";
import { addUserCart, deleteWishFromList } from "../redux/apiCalls";
import Modal from "../Components/Modal";
import Author from '../Components/Author';



const SingleProduct = () => {
  const [loading, setloading] = useState(true);
  const [ProductQuantity, SetProductQuantity] = useState(1);
  const [SingleProductId, setSingleProductId] = useState([]);
  const [SingleProductCondition, setSingleProductCondition] = useState(false);
  const [ColorSelected, setColorSelected] = useState("");
  const [SizeSelected, setSizeSelected] = useState("");
  const [ModalMessage, setModalMessage] = useState("");
  const [Clicked2, setClicked2] = useState(false);
  const { id } = useParams();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart);
  const totalquantity = useSelector(state => state.cart.totalquantity)
  const totalPrice = useSelector(state => state.cart.totalPrice)
  const userID = useSelector(state => state.user.currentUser._id);
  const username = useSelector(state=> state.user.currentUser.username);





  useEffect(() => {
    const getId = async () => {
      try {
        const res = await publicRequest.get(`/product/find/${id}`);
        setSingleProductId(res.data);
        setSingleProductCondition(true);
        setloading(false);
      } catch (error) {
        
      }
    }
    getId();
  }, [id])

  // const colors = new Array(SingleProductId.color).split(" "),

  const handlequantity = (type) => {
    if (type === "inc") {
      SetProductQuantity(ProductQuantity + 1);
    } else {
      ProductQuantity > 1 && SetProductQuantity(ProductQuantity - 1);
    }
  };

  const colorHandler = (items) => {
    setColorSelected(items);
  }

  const HandleModalClick = (message) => {
    setModalMessage(message)
  }

  const handleClick = (item) => {
    addUserCart(dispatch,{
      userID: new Date().getFullYear() + new Date().getDay() + new Date().getTime() + new Date().getSeconds(),
      userName: username,
      productID: item._id,
      title: item.title,
      quantity: ProductQuantity,
      Cartprice: item.price * ProductQuantity,
      color: ColorSelected,
      size: SizeSelected,
      price: item.price,
      timeCreated: new Date().getFullYear() + new Date().getDay() + new Date().getTime(),
      img: item.img,
    })

    deleteWishFromList(dispatch, item._id);

    setClicked2(true);
    HandleModalClick("Added to Cart")
  }

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <main>
      <Navbar />
      <Announcement />
      <>
        <div className='product-container-main2'>
          <button onClick={() => HandleModalClick("Loading")}>
            <Modal Clicked={Clicked2} setClicked={setClicked2} message={ModalMessage} />
          </button>
        </div>
        <div className="singleproduct-container">
          <div className="singleproduct-container-image">
            <img
              src={SingleProductId.img}
              alt={SingleProductId.title}
            ></img>
          </div>
          <div className="singleproduct-container-information">
            <h1>{SingleProductId.title}</h1>
            <p>{SingleProductId.description}</p>
            <p>${SingleProductId.price}</p>
            <div className="singleproduct-container-filters">
              <div>
                <h2>Colors:</h2>
                <div className="singleproduct-container-color-div">
                  {SingleProductId.color?.map((items) => (
                    <div key={items} style={{ backgroundColor: items }} onClick={() => colorHandler(items)} className={`${items === ColorSelected ? `singleproduct-color-focus` : `singleproduct-color`}`}></div>))}</div>
              </div>
              <div>
                <h2>Size:</h2>
                <select name="" id="" className="singleproduct-select-size" onChange={(e) => setSizeSelected(e.target.value)}>
                  <option selected disabled>Size</option>
                  {SingleProductId.size?.map((items, index) => (
                    <option key={index} value={items}>{items}</option>
                  ))};
                </select>
              </div>
            </div>
            <div className="singleproduct-container-filters">
              <div>
                <button type="button" className="button-minus" onClick={() => handlequantity("dec")}>
                  <AiIcon.AiOutlineMinus />
                </button>
                <span>{ProductQuantity}</span>
                <button type="button" className="button-plus" onClick={() => handlequantity("inc")}>
                  <AiIcon.AiOutlinePlus />
                </button>
              </div>
              <div>
                <button type="button" className="button-addcart" onClick={() => handleClick(SingleProductId)}>
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
      <Newsletter />
      <Footer />
      <Author />
    </main>
  );
};

export default SingleProduct;
