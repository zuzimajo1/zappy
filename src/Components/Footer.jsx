import React from "react";
import * as BsIcon from "react-icons/bs";
import * as IoIcon from "react-icons/io5";
import * as ImIcon from "react-icons/im";
import "./Components.css";
import { PaymentCard } from "../data";

const Footer = () => {
  return (
    <section className="footer-container">
      <div className="footer-wrapper-left">
        <h1>ZAPPY.</h1>
        <p>
          There are many variations of passages of Clothes available. Feel free
          to shop in your conveniency!
        </p>
        <div className="footer-icons">
          <div className="footer-icons-fb">
            <a href="#">
              <BsIcon.BsFacebook />
            </a>
          </div>
          <div className="footer-icons-insta">
            <a href="#">
              <BsIcon.BsInstagram />
            </a>
          </div>
          <div className="footer-icons-dc">
            <a href="#">
              <BsIcon.BsDiscord />
            </a>
          </div>
          <div className="footer-icons-tt">
            <a href="#">
              <BsIcon.BsTwitter />
            </a>
          </div>
        </div>
      </div>
      <div className="footer-wrapper-center">
        <h1>Useful Links</h1>
        <ul>
          <div>
            <li>
              <a href="#">Home</a>
            </li>
            <li>
              <a href="#">Man Fashion</a>
            </li>
            <li>
              <a href="#">Accessories</a>
            </li>
            <li>
              <a href="#">Order Tracking</a>
            </li>
            <li>
              <a href="#">Wishlist</a>
            </li>
          </div>
          <div>
            <li>
              <a href="#">Cart</a>
            </li>
            <li>
              <a href="#">Woman Fashion</a>
            </li>
            <li>
              <a href="#">My Account</a>
            </li>
            <li>
              <a href="#">Wishlist</a>
            </li>
            <li>
              <a href="#">Terms</a>
            </li>
          </div>
        </ul>
      </div>
      <div className="footer-wrapper-right">
        <h1>Contact</h1>
        <div className="footer-contact">
          <p>
            <IoIcon.IoLocation /> <span>Purok-5, Brgy. San Juan SC SND</span>
          </p>
          <p>
            <ImIcon.ImPhone /> <span>09554369793</span>
          </p>
          <p>
            <IoIcon.IoMail /><span>ajozuzim@gmail.com</span>
          </p>
          <div className="payments-card">
            {PaymentCard.map((items) => (
              <a href="#" key={items.id}>
                <img src={items.img} alt={items.name}></img>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
