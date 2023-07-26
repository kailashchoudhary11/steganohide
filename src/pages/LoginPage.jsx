import {
  Form, useActionData, redirect, useNavigation,
} from "react-router-dom";
import getAxiosInstance from "../utils/getAxiosInstance";

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
            {actionData?.error}
          </div>
        </div>
        <button
          disabled={navigation.state === "submitting"}
          style={{ margin: "40px" }}
          type="submit"
        >
          {navigation.state === "submitting" ? "Logging In" : "Log In"}
        </button>
      </Form>
    </div>
  );
}
