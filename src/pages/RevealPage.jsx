import { Form, useActionData } from "react-router-dom";
import axios from "axios";
import "../css/reveal.css";

import RevealImage from "../assets/reveal.jpg";

export async function action({ request }) {
  const formData = await request.formData();
  const res = await axios.post("http://127.0.0.1:8000/api/reveal/", formData);
  return res.data;
}

export default function RevealPage() {
  const actionData = useActionData();
  return !actionData ? (
      <div class="container">
        <div className="glass-container2">
          <div class="image-container">
            <img src={RevealImage} alt="Reveal" class="form-image" />
          </div>
          <div class="form-container">
            <form method="post" enctype="multipart/form-data" class="form">
              <input type="password" name="password" className="input-field" placeholder="Password" />
              <input type="file" name="image" accept="image/png, image/gif, image/jpeg" className="input-field" />
              <button type="submit" class="submit-button2">Reveal</button>
            </form>
          </div>
        </div>
        <div>
        </div>
      </div>
  ) : (
    <div className="text">
      Your Secret Text is:
      <div>{actionData.secret_text}</div>
    </div>
  );
}
