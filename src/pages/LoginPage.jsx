import {
  Form, useActionData, redirect, useNavigation,
} from "react-router-dom";
import getAxiosInstance from "../utils/getAxiosInstance";
import "../css/login.css";

export async function action({ request }) {
  const formData = await request.formData();
  try {
    const axiosInstance = getAxiosInstance();
    const res = await axiosInstance.post("/api/login/", formData);
    return redirect(`/password_storage?message=${res.data.message}`);
  } catch (error) {
    console.log(error);
    return error.response.data;
  }
}

export default function LoginPage() {
  const actionData = useActionData();
  const navigation = useNavigation();
  return (
    <div className="glass-container3">
      <Form method="post" className="form">
        <div>
          <label style={{ margin: "20px" }} htmlFor="username">
            <input
              defaultValue={actionData?.values?.username}
              type="text"
              name="username"
              className="input-field"
              placeholder="Username"
              required
            />
          </label>
        </div>

        <div style={{ margin: "20px" }}>
          <label style={{ margin: "20px" }} htmlFor="password">
            <input
              defaultValue={actionData?.values?.password}
              type="password"
              name="password"
              className="input-field"
              placeholder="Password"
              required
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.error}
          </div>
        </div>
        <button
          disabled={navigation.state === "submitting"}
          style={{ margin: "40px" }}
          type="submit"
          className="submit-button2"
        >
          {navigation.state === "submitting" ? "Logging In" : "Log In"}
        </button>
      </Form>
    </div>
  );
}
