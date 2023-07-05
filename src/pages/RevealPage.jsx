import { useState } from "react";
import { Form, useActionData } from "react-router-dom";
import axios from "axios";
import "../css/reveal.css";

import { GoCopy } from "react-icons/go";
import { FcCheckmark } from "react-icons/fc";
import RevealImage from "../assets/reveal.jpg";

export async function action({ request }) {
  const formData = await request.formData();
  const res = await axios.post("http://127.0.0.1:8000/api/reveal/", formData);
  return res.data;
}

export default function RevealPage() {
  const [isCopied, setIsCopied] = useState(false);
  const actionData = useActionData();

  function copyText() {
    navigator.clipboard.writeText(actionData.secret_text);
    setIsCopied(!isCopied);
  }

  return !actionData ? (
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
            <button type="submit" className="submit-button2">
              Reveal
            </button>
          </Form>
        </div>
      </div>
    </div>
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
