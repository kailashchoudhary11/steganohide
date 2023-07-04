import React from "react";
import axios from "axios";
import { useEffect } from "react";
import "../App.css";
import "../css/button.css"
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";


export default function Home() {
  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://127.0.0.1:8000/api/hide/");
      console.log(res);
    }
    getData();
  }, []);


  return (<>
    <div className="section">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome To SteganoHide!</h1>
          <p>Unlock the secret world of hidden messages and convert communication with the art of steganography!</p>
          <h3>Happy Steganography!</h3>
          <Link to="hide"><button class='glowing-btn' id="btnHome"><span class='glowing-txt'>H<span class='faulty-letter'>I</span>DE</span></button></Link>
          <Link to="reveal"><button class='glowing-btn'><span class='glowing-txt'>R<span class='faulty-letter'>E</span>VEAL</span></button></Link>
        </div>
        <img src="/public/heroSection.jpeg" alt="Hero Image" className="hero-image" />
      </div>
      <hr></hr>
      <div className="Allabout">
        <div className="about">
          <div class="grid-item" id="para1">
            <h1>What is Steganography?</h1>
            <p>Steganography is the practice of concealing messages or data within seemingly harmless carriers, such as images, videos, audio files, or even text. It is a powerful technique used for covert communication, privacy protection, and data security. By embedding information within the structure or properties of digital media, steganography ensures that the hidden message goes unnoticed by casual observers.</p>
          </div>
          <div class="grid-item">
            <img src="/public/about.jpg" alt="Hero Image" class="about-image" />
          </div>
        </div>


        <div className="mission">
          <div class="grid-item">
            <img src="/public/mission.jpg" alt="Hero Image" class="about-image" />
          </div>
          <div class="grid-item" id="para2">
            <h1>Mission</h1>
            <p>Our mission is to promote and educate others about the fascinating world of hidden messages and covert communication through steganographic techniques. With our website, we aim to provide a comprehensive platform where individuals can learn, explore, and engage with this intriguing field.</p>
          </div>
        </div>

        <div className="privacy">
          <div class="grid-item" id="para3">
            <h1>Privacy and Security</h1>
            <p>We prioritize the importance of privacy and security in steganography. We offer guidelines and best practices to ensure responsible usage of steganographic techniques, empowering you to protect sensitive information and communicate covertly while maintaining ethical standards.</p>
          </div>
          <div class="grid-item">
            <img src="/public/security.png" alt="Hero Image" class="about-image" />
          </div>
        </div>
      </div>
    </div>
  </>);
}