import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SearchProductItem from './SearchProductItem';
import Loading from '../Pages/Loading';
import Modal from './Modal';
import Noproduct from "./Noproduct";


const SearchProductFetch = ({ FilterAllProducts, Sort }) => {
    const [Clicked, setClicked] = useState(false);
    const [ModalMessage, setModalMessage] = useState("");
    const AllSearchProduct = useSelector(state => state.search.searchproduct);
    const AllSearchLoading = useSelector(state => state.search.searchloading)
    const [AllSearchProductsFilter, SetAllSearchProductsFilter] = useState([]);


    useEffect(() => {
        FilterAllProducts && SetAllSearchProductsFilter(AllSearchProduct.filter((items) => Object.entries(FilterAllProducts).every(([key, value]) => items[key].includes(value))));
    }, [FilterAllProducts, AllSearchLoading ])

    useEffect(() => {
        if (Sort === "Newest") {
            //From smallest to largest CreatedAt number
            SetAllSearchProductsFilter((prev) => [...prev].sort((a, b) => b.createdOrderNo - a.createdOrderNo));
        } else if (Sort === "asc") {
            //From smallest to largest price
            SetAllSearchProductsFilter((prev) => [...prev].sort((a, b) => a.price - b.price));
        } else {
            //From largest to smallest price
            SetAllSearchProductsFilter((prev) => [...prev].sort((a, b) => b.price - a.price));
        }

    }, [Sort])

    const HandleModalClick = (message) => {
        setModalMessage(message);
        setClicked(true);
    }



    if (AllSearchLoading) {
        return (
            <>
                <Loading />
            </>
        )
    } else if (AllSearchProduct.length === 0){
        return(
            <>
                <Noproduct message={"No Result"}/>
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
                        AllSearchProductsFilter.map((items) => <SearchProductItem items={items} HandleModalClick={HandleModalClick} />)
                        :
                        AllSearchProduct.map((items) => <SearchProductItem items={items} HandleModalClick={HandleModalClick} />)}
            </div>
        </>
    )
}

export default SearchProductFetch