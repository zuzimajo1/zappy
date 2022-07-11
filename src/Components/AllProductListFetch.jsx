import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getallProducts } from '../redux/apiCalls';
import AllProductListItem from './AllProductListItem';
import Loading from '../Pages/Loading';
import Modal from './Modal';

const AllProductListFetch = ({ FilterAllProducts, Sort }) => {
    const [loading, Setloading] = useState(true);
    const [Clicked, setClicked] = useState(false);
    const [ModalMessage, setModalMessage] = useState("");
    const dispatch = useDispatch();
    const AllProducts = useSelector(state => state.allproducts?.allproducts);
    const [AllProductsFilter, SetAllProductsFilter] = useState([]);


    useEffect(() => {
        getallProducts(dispatch);
        Setloading(false);
    }, [dispatch])

    useEffect(() => {
        FilterAllProducts && SetAllProductsFilter(AllProducts.filter((items) => Object.entries(FilterAllProducts).every(([key, value]) => items[key].includes(value))));
    }, [FilterAllProducts])

    useEffect(()=>{
        if (Sort === "Newest"){
            //From smallest to largest CreatedAt number
            SetAllProductsFilter((prev) => [...prev].sort((a, b) => b.createdOrderNo - a.createdOrderNo ));
        }else if(Sort === "asc"){
            //From smallest to largest price
            SetAllProductsFilter((prev)=> [...prev].sort((a,b)=> a.price - b.price));
        }else{
            //From largest to smallest price
            SetAllProductsFilter((prev)=> [...prev].sort((a,b)=> b.price - a.price));
        }

    },[Sort])

    const HandleModalClick = (message)=>{
        setModalMessage(message);
        setClicked(true);
    }


    if (loading) {
        return (
            <>
                <Loading />
            </>
        )
    }
    return (
        <>
            <div className='product-container-main2'>
                <button onClick={() => HandleModalClick("Loading")}>
                    <Modal Clicked={Clicked} setClicked={setClicked} message={ModalMessage} />
                </button>
            </div>
            <div className='product-container'>
                {
                    FilterAllProducts ?
                        AllProductsFilter.map((items) => <AllProductListItem items={items} HandleModalClick={HandleModalClick} />)
                        :
                        AllProducts.map((items) => <AllProductListItem items={items} HandleModalClick={HandleModalClick} />)}
            </div>
        </>
    )
}

export default AllProductListFetch