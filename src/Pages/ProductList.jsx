import React,{useState} from "react";
import Announcement from "../Components/Announcement";
import Footer from "../Components/Footer";
import Navbar from "../Components/Navbar";
import Newsletter from "../Components/Newsletter";
import Product from "../Components/Product";
import "../Components/Components.css";
import {useParams} from "react-router-dom";
import Author from '../Components/Author';

const ProductList = () => {

  const {category} = useParams();
  const [Filters, setFilters] = useState({});
  const [Sort, setSort] = useState("Newest")
 
  
  const handleChange = (e)=>{
    e.preventDefault();
    const name = e.target.name;
    const value = e.target.value;
    setFilters({ ...Filters, [name]: value });
  }
  
  

  return (
    <main>
      <Announcement />
      <Navbar />
      <div className="productlist-container">
        <h1>{category}</h1>
        <div className="productlist-select-container">
          <div>
            <p>Filter Products:</p>
            <select name="color" id="" onChange={handleChange}>
              <option selected disabled>
                Color
              </option>
              <option value="White">White</option>
              <option value="Black">Black</option>
              <option value="Red">Red</option>
              <option value="Blue">Blue</option>
              <option value="Yellow">Yellow</option>
              <option value="Green">Green</option>
              <option value="Gray">Gray</option>
            </select>
            <select name="size" className="select-container-2" onChange={handleChange}>
              <option  selected  disabled>
                Size
              </option>
              <option value="XS">XS</option>
              <option value="S">S</option>
              <option value="M">M</option>
              <option value="L">L</option>
              <option value="XL">XL</option>
            </select>
          </div>
          <div>
            <p>Sort Products:</p>
            <select name="price" onChange={(e) => setSort(e.target.value)}>
              <option selected disabled>
                Price
              </option>
              <option value="Newest">Newest</option>
              <option value="asc">Price (Cheap to Expensive)</option>
              <option value="desc">Price (Expensive to Cheap)</option>
            </select>
          </div>
        </div>
      </div>
      <Product cat={category} Filters={Filters} Sort={Sort}  />
      <Newsletter />
      <Footer />
      <Author />
    </main>
  );
};

export default ProductList;
