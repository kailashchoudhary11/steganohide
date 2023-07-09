import axios from "axios";
import { Form, useActionData } from "react-router-dom";
import { saveAs } from "file-saver";
import "../css/hide.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

import HideImage from "../assets/hide.jpg";

export async function action({ request }) {
  const formData = await request.formData();
  const res = await axios.post("http://127.0.0.1:8000/api/hide/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  console.log(res.data.name);
  return res.data;
}

export default function HidePage() {
  const actionData = useActionData();

  function handleDownloadClick() {
    const url = actionData?.img;
    const name = actionData?.name;
    saveAs(url, name);
  }

  return !actionData ? (
    <>
     <Navbar />
    <div className="glass-container2">
      <div className="form-container">
        <div className="image-container">
          <img src={HideImage} alt="Hide" className="form-image" />
        </div>
        <div>
          <Form method="post" encType="multipart/form-data" className="form">
            <input
              type="text"
              name="secret_text"
              className="input-field"
              placeholder="Secret Text"
            />
            <input
              type="password"
              name="password"
              className="input-field"
              placeholder="Password"
            />
            <input
              type="file"
              alt="image"
              name="image"
              accept="image/png, image/gif, image/jpeg"
              className="input-field"
            />
            <button type="submit" className="submit-button2">
              Submit
            </button>
          </Form>
        </div>
      </div>
    </div>
    <Footer />
    </>
  ) : (
    <div className="container">
      <h1>Processed Image</h1>
      <div className="image-container2">
        <img src={actionData?.img} alt="Processed" />
      </div>
      <button
        type="button"
        className="submit-button2"
        onClick={handleDownloadClick}
      >
        Download Image
      </button>
    </div>
  );
}
