import React, { useState, useEffect } from "react";
import "./Components.css";

import * as MdIcon from "react-icons/md";
import { Data } from "../data";
import { Link } from "react-router-dom"


const Slider = () => {
  const [ArrowIndex, SetArrowIndex] = useState(0);
  const HandleClickLeft = () => {
    IndexHandler(ArrowIndex - 1);
  };

  const HandleClickRight = () => {
    IndexHandler(ArrowIndex + 1);
  };

const IndexHandler = (IndexCondition)=>{
    if(IndexCondition > 2){
        SetArrowIndex(0);
    }else if (IndexCondition < 0){
        SetArrowIndex(Data.length - 1);
    }else{
        SetArrowIndex(IndexCondition);
    }
}

  useEffect(() => {
    const interval = setInterval(() => {
      IndexHandler(ArrowIndex + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, [ArrowIndex]);


  return (
    <section className="slide-section">
      <div className="arrow-icon-left" onClick={HandleClickLeft}>
        <MdIcon.MdOutlineArrowLeft></MdIcon.MdOutlineArrowLeft>
      </div>
      <div className="slide-container">
        {Data.map((items, index) => {
            let product = "next"
            if(index === ArrowIndex ){
                product = "current"
            }else if(ArrowIndex + 2  === index){
                product = "previous"
            }else if (ArrowIndex + 1  === index){
                product = "next";
            }else if (ArrowIndex - 1 === index){
                product = "previous"
            }else if(ArrowIndex - 2 === index){
                product = "next";
            }

          return (
            <div className={product} key={index}>
              <div className="image-container">
                <img src={items.image} alt="clothes"></img>
              </div>
              <div className="description-container">
                <h1>{items.title}</h1>
                <p>{items.info}</p>
                <Link to={`products/${items.cat}`}>
                <button>SHOP NOW</button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="arrow-icon-right" onClick={HandleClickRight}>
        <MdIcon.MdOutlineArrowRight></MdIcon.MdOutlineArrowRight>
      </div>
    </section>
  );
};

export default Slider;
