import axios from "axios";
import { Form, useActionData } from "react-router-dom";
import "../css/register.css";

export async function action({ request }) {
  const formData = await request.formData();
  try {
    const res = await axios.post(
      "http://localhost:8000/api/register/",
      formData,
    );

    console.log(res.data);

    if (res.data?.errors) {
      const { errors } = res.data;
      const values = Object.fromEntries(formData);
      return { errors, values };
    }
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export default function RegisterPage() {
  const actionData = useActionData();

  return (
    <div className="glass-container4">
      <Form method="post" className="form">
        <div>
          <label style={{ margin: "20px" }} htmlFor="username">
            <input
              defaultValue={actionData?.values?.username}
              type="text"
              name="username"
              id="username"
              className="input-field4"
              placeholder="Username"
              required
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.username}
          </div>
        </div>
        <div>
          <label style={{ margin: "20px" }} htmlFor="first_name">
            <input
              defaultValue={actionData?.values?.first_name}
              type="text"
              name="first_name"
              id="first_name"
              className="input-field4"
              placeholder="First Name"
              required
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.first_name}
          </div>
        </div>
        <div>
          <label style={{ margin: "20px" }} htmlFor="last_name">
            <input
              defaultValue={actionData?.values?.last_name}
              type="text"
              name="last_name"
              id="last_name"
              className="input-field4"
              placeholder="Last Name"
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.last_name}
          </div>
        </div>
        <div>
          <label style={{ margin: "20px" }} htmlFor="email">
            <input
              defaultValue={actionData?.values?.email}
              type="email"
              name="email"
              id="email"
              className="input-field4"
              placeholder="Email"
              required
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.email}
          </div>
        </div>
        <div>
          <label style={{ margin: "20px" }} htmlFor="password">
            <input
              defaultValue={actionData?.values?.password}
              type="password"
              name="password"
              id="password"
              className="input-field4"
              placeholder="Password"
              required
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.password}
          </div>
        </div>
        <div>
          <label style={{ margin: "20px" }} htmlFor="password2">
            <input
              defaultValue={actionData?.values?.password2}
              type="password"
              name="password2"
              id="password2"
              className="input-field4"
              placeholder="Confirm Password"
              required
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.password2}
          </div>
        </div>
        <button style={{ margin: "40px" }} type="submit" className="submit-button2">
          Register
        </button>
      </Form>
    </div>
  );
}
