import axios from "axios";
import { Form } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  try {
    const res = await axios.post("http://127.0.0.1:8000/api/token/", formData);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export default function LoginPage() {
  return (
    <div>
      <Form method="post">
        <input type="text" name="username" id="username" />
        <input type="password" name="password" id="password" />
        <button type="submit">Log In</button>
      </Form>
    </div>
  );
}
