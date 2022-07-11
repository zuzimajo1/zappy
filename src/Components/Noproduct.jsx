import React from 'react'
import "./Components.css";

const Noproduct = ({message}) => {
  return (
    <section className='noproduct-section'>
        <h3>
           {message} 
        </h3>
    </section>
  )
}

export default Noproduct