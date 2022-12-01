import React, { useState, useEffect } from 'react'
import ProductItem from './ProductItem'
import "./Components.css";
import axios from "axios";
import Loading from '../Pages/Loading';
import { Link } from "react-router-dom"
import Modal from './Modal';

const Product = ({ cat, Filters, Sort }) => {

    const [loading, setloading] = useState(true);
    const [products, setproducts] = useState([]);
    const [filteredproducts, setfilteredproducts] = useState([]);
    const [Clicked, setClicked] = useState(false);
    const [ModalMessage,setModalMessage] = useState("");

    useEffect(() => {
        const getProducts = async () => {
            try {
                const res = await axios.get(cat ? `https://zappyfashion.onrender.com/api/product?category=${cat}` : `https://zappyfashion.onrender.com/api/product`);
                setproducts(res.data);
                setloading(false);
            } catch (error) {}
        }
        getProducts();
    }, [cat]);


    const HandleModalClick = (message)=>{
        setClicked(true)
        setModalMessage(message);
    }



    //filtering the array of objects
    useEffect(() => {
        cat && setfilteredproducts(
            products.filter((items) => Object.entries(Filters).every(([key, value]) =>
                items[key].includes(value)
            )))
    }, [products, cat, Filters]);



    //sorting the newest and oldest & price
    //[...prev] is all the data, being sorted
    useEffect(() => {
        if (Sort === "Newest") {
            //From smallest to largest CreatedAt number
            setfilteredproducts((prev) => [...prev].sort((a, b) => b.createdOrderNo - a.createdOrderNo))
        } else if (Sort === "asc") {
            //Smalest number to largest
            setfilteredproducts((prev) => [...prev].sort((a, b) => a.price - b.price))
        } else {
            //Largest number to smallest
            setfilteredproducts((prev) => [...prev].sort((a, b) => b.price - a.price))
        }
    }, [Sort])


    if (loading) {
        return (
            <Loading />
        )
    }
    return (
        <>
            <div className='product-container-main'>
                <Link to="/productsItems">
                    <button>
                        See All
                    </button>
                </Link>
            </div>
            <div className='product-container-main2'>
                <button onClick={()=>HandleModalClick("Loading")}>
                    <Modal Clicked={Clicked} setClicked={setClicked} message={ModalMessage}  />
                </button>
            </div>
            <div className="product-container">
                {cat
                    ? filteredproducts.map(items => <ProductItem key={items.id} HandleModalClick={HandleModalClick} item={items} />)
                    : products.slice(0, 8).map(items => <ProductItem key={items.id} HandleModalClick={HandleModalClick} item={items} />)
                }
            </div>
        </>
    )



}

export default Product
