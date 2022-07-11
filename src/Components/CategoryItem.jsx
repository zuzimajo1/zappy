import React from 'react';
import "./Components.css";
import {Link} from "react-router-dom";


const CategoryItem = ({items}) => {
  
    return (
      <div className="categoryitem-container">
        <Link to={`/products/${items.cat}`}>
        <img src={items.img} alt={items.name}></img>
        <div className="categoryitem-wrapper">
          <p>{items.name}</p>
          <button type="button">Shop now</button>
        </div>
        </Link>
      </div>
    );

}

export default CategoryItem;
