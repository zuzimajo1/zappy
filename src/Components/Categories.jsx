import React from 'react'
import { CategoriesData } from '../data'
import CategoryItem from './CategoryItem'
import "./Components.css";

const Categories = () => {
    return (
        <div className="categories-container">
            {CategoriesData.map((items)=>{
                return(
                    <div key={items.id} className='categories-wrapper'>
                    <CategoryItem items={items}></CategoryItem>
                  </div>      
                )
            })}
        </div>
    )
}

export default Categories;
