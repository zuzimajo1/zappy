import React, {useEffect, useState} from 'react'
import Loading from "../Pages/Loading";
import CartItems from './CartItems';



const CartItemsLoadings = ({ items }) => {
    const [LoadingGif, SetLoadingGif] = useState(false);

    useEffect(()=>{
        setInterval(()=>{
            SetLoadingGif(false)
        },50)
    }, [LoadingGif])


    if (LoadingGif) {
        return (
            <>
                <Loading />
            </>
        )
    }

    return (
        <>
            <CartItems items={items} SetLoadingGif={SetLoadingGif}/>
        </>
    )
}

export default CartItemsLoadings