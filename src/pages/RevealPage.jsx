import { useState } from "react";
import { Form, useActionData, useNavigation } from "react-router-dom";
import axios from "axios";
import "../css/reveal.css";

import { GoCopy } from "react-icons/go";
import { FcCheckmark } from "react-icons/fc";
import RevealImage from "../assets/reveal.jpg";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export async function action({ request }) {
  const formData = await request.formData();
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/reveal/", formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export default function RevealPage() {
  const [isCopied, setIsCopied] = useState(false);
  const actionData = useActionData();

  const navigation = useNavigation();

  function copyText() {
    navigator.clipboard.writeText(actionData.secret_text);
    setIsCopied(!isCopied);
  }

  return !actionData || (actionData && actionData.error) ? (
    <>
    <Navbar/>
    <div className="glass-container2">
      <div className="form-container">
        <div className="image-container">
          <img src={RevealImage} alt="Reveal" className="form-image" />
        </div>
        <div>
          <Form method="post" encType="multipart/form-data" className="form">
            <input
              type="file"
              name="image"
              accept="image/png, image/gif, image/jpeg"
              className="input-field"
            />
            <input
              type="password"
              name="password"
              className="input-field"
              placeholder="Password"
            />
            {actionData?.error && <div className="red">{actionData?.error}</div>}
            <button
              disabled={navigation.state === "submitting"}
              type="submit"
              className="submit-button2"
            >
              {navigation.state === "submitting" ? "Revealing..." : "Reveal"}
            </button>
          </Form>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  ) : (
    <div className="container">
      <h1>Your Secret Text:</h1>
      <div className="glass-container3">
        <p className="text2">{actionData.secret_text}</p>
        {!isCopied ? (
          <button className="copy-btn" type="button" onClick={copyText}>
            <GoCopy className="copy-icon" />
          </button>
        ) : (
          <div className="copied">
            <FcCheckmark className="check-icon" />
            <span className="copy-text">Copied</span>
          </div>
        )}
      </div>
    </div>
  );
}
