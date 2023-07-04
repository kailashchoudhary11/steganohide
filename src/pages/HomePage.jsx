import { useEffect } from "react";
import axios from "axios";

import "../App.css";
import "../css/button.css";
import { Link } from "react-router-dom";

import HeroSection from "../assets/heroSection.jpeg";
import AboutImage from "../assets/about.jpg";
import MissionImage from "../assets/mission.jpg";
import SecurityImage from "../assets/security.png";

export default function Home() {
  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://127.0.0.1:8000/api/hide/");
      console.log(res);
    }
    getData();
  }, []);

  return (
    <div className="section">
      <div className="hero">
        <div className="hero-content">
          <h1>Welcome To SteganoHide!</h1>
          <p>
            Unlock the secret world of hidden messages and
            convert communication with the art of steganography!
          </p>
          <h3>Happy Steganography!</h3>
          <Link to="hide">
            <button type="button" className="glowing-btn" id="btnHome">
              <span className="glowing-txt">
                H
                <span className="faulty-letter">I</span>
                DE
              </span>
            </button>
          </Link>
          <Link to="reveal">
            <button type="button" className="glowing-btn">
              <span className="glowing-txt">
                R
                <span className="faulty-letter">E</span>
                VEAL
              </span>
            </button>
          </Link>
        </div>
        <img src={HeroSection} alt="Hero" className="hero-image" />
      </div>
      <hr />
      <div className="Allabout">
        <div className="about">
          <div className="grid-item" id="para1">
            <h1>What is Steganography?</h1>
            <p>
              Steganography is the practice of concealing messages or
              data within seemingly harmless carriers,
              such as images, videos, audio files, or even text.
              It is a powerful technique used for covert communication,
              privacy protection, and data security.
              By embedding information within the structure or properties of digital media,
              steganography ensures that the hidden message goes unnoticed by casual observers.
            </p>
          </div>
          <div className="grid-item">
            <img src={AboutImage} alt="About" className="about-image" />
          </div>
        </div>

        <div className="mission">
          <div className="grid-item">
            <img src={MissionImage} alt="Mission" className="about-image" />
          </div>
          <div className="grid-item" id="para2">
            <h1>Mission</h1>
            <p>
              Our mission is to promote and educate others about the
              fascinating world of hidden messages and
              covert communication through steganographic techniques.
              With our website, we aim to provide a comprehensive platform
              where individuals can learn,
              explore, and engage with this intriguing field.
            </p>
          </div>
        </div>

        <div className="privacy">
          <div className="grid-item" id="para3">
            <h1>Privacy and Security</h1>
            <p>
              We prioritize the importance of privacy and security in steganography.
              We offer guidelines and best practices to ensure responsible usage of
              steganographic techniques, empowering you to protect sensitive information
              and communicate covertly while maintaining ethical standards.
            </p>
          </div>
          <div className="grid-item">
            <img src={SecurityImage} alt="Security" className="about-image" />
          </div>
        </div>
      </div>
    </div>
  );
}
