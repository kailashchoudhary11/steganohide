import { Form, useActionData } from "react-router-dom";
import getAxiosInstance from "../utils/getAxiosInstance";

export async function action({ request }) {
  const formData = await request.formData();
  try {
    const axiosInstance = getAxiosInstance();
    const res = await axiosInstance.post(
      "/api/login/",
      formData,
    );
    console.log(res.data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
}

export default function LoginPage() {
  const actionData = useActionData();
  return (
    <div>
      <Form method="post">
        <div style={{ margin: "20px" }}>
          <label style={{ margin: "20px" }} htmlFor="username">
            Username
            <input
              defaultValue={actionData?.values?.username}
              type="text"
              name="username"
              id="username"
              placeholder="Username"
            />
          </label>
        </div>

        <div style={{ margin: "20px" }}>
          <label style={{ margin: "20px" }} htmlFor="password">
            Password
            <input
              defaultValue={actionData?.values?.password}
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.detail}
          </div>
        </div>
        <button style={{ margin: "40px" }} type="submit">
          Log In
        </button>
      </Form>
    </div>
  );
}
