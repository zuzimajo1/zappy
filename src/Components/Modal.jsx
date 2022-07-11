import React, { useState, useEffect } from 'react'
import "./Components.css";
import Check from "../images/check.gif";
import Check2 from "../images/check.png"


const Modal = ({ Clicked, setClicked, message }) => {


    useEffect(() => {
        const intervalclick = setInterval(() => {
            setClicked(false);
        }, 2000)
        return () => clearInterval(intervalclick);
    }, [Clicked])

    return (
        <>
            {Clicked &&
                (<section className='modal'>
                    <div className='modal-container'>
                        <img src={Check} alt="check image"></img>
                        <h2>{message}</h2>
                    </div>
                </section>)
            }
        </>
    )
}

export default Modal