import axios from "axios";
import { Form } from "react-router-dom";

export async function action({ request }) {
  const formData = await request.formData();
  try {
    const res = await axios.post(
      "http://127.0.0.1:8000/api/register/",
      formData,
    );
    return res.data;
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export default function RegisterPage() {
  return (
    <div>
      <Form method="post">
        <input type="text" name="username" id="username" />
        <input type="text" name="first_name" id="first_name" />
        <input type="text" name="last_name" id="last_name" />
        <input type="email" name="email" id="email" />
        <input type="password" name="password" id="password" />
        <input type="password" name="password2" id="password2" />
        <button type="submit">Register</button>
      </Form>
    </div>
  );
}
