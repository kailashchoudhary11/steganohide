import { Form, useActionData } from "react-router-dom";
import axios from "axios";
import "../css/reveal.css";

export async function action({ request }) {
  const formData = await request.formData();
  const res = await axios.post("http://127.0.0.1:8000/api/reveal/", formData);
  return res.data;
}

export default function RevealPage() {
  const actionData = useActionData();
  return !actionData ? (
    <div className="glass-container">
      <div className="form-container">
        <div className="image-container">
          <img src="/public/reveal.jpg" alt="Reveal" className="form-image" />
        </div>
        <div>
          <Form method="post" encType="multipart/form-data" className="form">
            <input type="password" name="password" className="input-field" placeholder="Password" />
            <input type="file" name="image" accept="image/png, image/gif, image/jpeg" className="input-field" />
            <button type="submit" className="submit-button">Reveal</button>
          </Form>
        </div>
      </div>
    </div>

  ) : (
    <div>
      Your Secret Text is:
      <div>{actionData.secret_text}</div>
    </div>
  );
}
