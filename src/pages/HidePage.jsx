import axios from "axios";
import { Form, useActionData } from "react-router-dom";
import { saveAs } from "file-saver";
import "../css/hide.css";

import HideImage from "../assets/hide.jpg";

export async function action({ request }) {
  const formData = await request.formData();
  const res = await axios.post("http://127.0.0.1:8000/api/hide/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
}

export default function HidePage() {
  const actionData = useActionData();

  function handleDownloadClick() {
    const url = actionData?.img;
    saveAs(url, "hidden-img.png");
  }

  return !actionData ? (
    <div class="container">
      <div className="glass-container2">
        <div class="image-container">
          <img src={HideImage} alt="Hide" class="form-image" />
        </div>
        <div class="form-container">
          <form method="post" enctype="multipart/form-data" class="form">
            <input type="text" name="secret_text" class="input-field" placeholder="Enter Secret Text" />
            <input type="password" name="password" class="input-field" placeholder="Enter Password" />
            <input type="file" alt="image" name="image" accept="image/png, image/gif, image/jpeg" class="input-field" />
            <button type="submit" class="submit-button2">Hide</button>
          </form>
        </div>
      </div>
      <div>
      </div>
    </div>

  ) : (
    <div>
      <div>Processed Image is as below:</div>
      <div>
        <img src={actionData?.img} alt="Processed" />
      </div>
      <button type="button" onClick={handleDownloadClick}>
        Download Image
      </button>
    </div>
  );
}
