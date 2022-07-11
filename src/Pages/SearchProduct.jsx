import React, {useState, useEffect} from 'react'
import Navbar from '../Components/Navbar';
import Announcement from '../Components/Announcement';
import Footer from '../Components/Footer';
import { useLocation } from "react-router-dom";
import SearchProductFetch from "../Components/SearchProductFetch";
import Loading from "./Loading";
import { useSelector } from 'react-redux';
import Author from '../Components/Author';

const SearchProduct = () => {
    const location = useLocation();
    const search = location.state.search;

    const [FilterAllProducts, setFilterAllProducts] = useState({})
    const [Sort, setSort] = useState("Newest");

    const handleChangeAll = (e) => {
        e.preventDefault();
        const nameFilter = e.target.name;
        const valueFilter = e.target.value;
        setFilterAllProducts({ ...FilterAllProducts, [nameFilter]: valueFilter });
    }

    
    return (
        <>
            <Navbar search={search} />
            <Announcement />
            <div className="productlist-container">
                <h1>Searching for {search}...</h1>
                <div className="productlist-select-container">
                    <div>
                        <p>Filter Products:</p>
                        <select name="color" id="" onChange={handleChangeAll}>
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
                        <select name="size" className="select-container-2" onChange={handleChangeAll}>
                            <option selected disabled>
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
            <SearchProductFetch FilterAllProducts={FilterAllProducts} Sort={Sort} />
            <Footer />
            <Author />
        </>
    )
}

export default SearchProduct