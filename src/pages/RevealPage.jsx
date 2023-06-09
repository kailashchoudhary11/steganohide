import { Form, useActionData } from "react-router-dom";
import axios from "axios";

export async function action({ request }) {
  const formData = await request.formData();
  const res = await axios.post("http://127.0.0.1:8000/api/reveal/", formData);
  return res.data;
}

export default function RevealPage() {
  const actionData = useActionData();
  return !actionData ? (
    <Form method="post" encType="multipart/form-data">
      <input type="text" name="key" />
      <input type="file" name="img" accept="image/png, image/gif, image/jpeg" />
      <button type="submit">Reveal</button>
    </Form>
  ) : (
    <div>
      Your Secret Text is:
      <div>{actionData.secret_text}</div>
    </div>
  );
}
