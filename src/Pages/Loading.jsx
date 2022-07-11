import React from 'react'
import "../Components/Components.css";
import LoadingGif from "../images/snipping-loading2.gif"

const Loading = () => {
    return (
        <div className='loadingcontainer'>
            <img src={LoadingGif} alt="loadingGif"></img>
        </div>
    )
}

export default Loading
