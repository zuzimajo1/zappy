import React, { useState, useEffect } from 'react'
import * as MdIcon from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { sendmessage } from "../redux/apiCalls";
import { useHistory } from "react-router-dom";

import "./Components.css"

const Newsletter = () => {
    const [message, setmessage] = useState("");
    const [messageSent, setmessageSent] = useState(false);
    const dispatch = useDispatch();
    const userName = useSelector(state=>state.user.currentUser?.username);
    const history = useHistory();

    const HandleMessageClick = (e) => {
        e.preventDefault();
        if (userName && message ) {
            sendmessage(dispatch, {
                userID: new Date().getFullYear()+ new Date().getMonth()+new Date().getTime(),
                message,
                userName
                 })
            setmessageSent(true);
        } else {
            history.push("/login");
        }
    }

    useEffect(() => {
     messageSent && (setInterval(() => {
            setmessageSent(false);
            setmessage("");
        }, 3000))
    }, [messageSent])


    return (
        <section className="newsletter-container">
            <h1>Newsletter</h1>
            <p>Get timely updates from your favourite products.</p>
            <form >
                <div className="newsletter-formdiv">
                    <input type="text" name='message' value={message} onChange={(e) => setmessage(e.target.value)} placeholder="Send Message"></input>
                    <button type="button" onClick={(e) => HandleMessageClick(e)}>
                        {messageSent ? <MdIcon.MdSendAndArchive/> : <MdIcon.MdSend />}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Newsletter
