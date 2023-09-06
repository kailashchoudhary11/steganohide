import { Form, useActionData } from "react-router-dom";
import getAxiosInstance from "../utils/getAxiosInstance";

export async function action({ request }) {
  const formData = await request.formData();
  try {
    const axiosInstance = getAxiosInstance();

    const res = await axiosInstance.post("/api/password_storage/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

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

export default function StorePassword() {
  const actionData = useActionData();
  return (
    <div>
      <Form method="post" encType="multipart/form-data">
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
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.username}
          </div>
        </div>
        <div style={{ margin: "20px" }}>
          <label style={{ margin: "20px" }} htmlFor="password">
            Password
            <input
              defaultValue={actionData?.values?.username}
              type="text"
              name="password"
              id="password"
              placeholder="P  assword"
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.username}
          </div>
        </div>
        <div style={{ margin: "20px" }}>
          <label style={{ margin: "20px" }} htmlFor="service">
            Service
            <input
              defaultValue={actionData?.values?.service}
              type="text"
              name="service"
              id="service"
              placeholder="Service"
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.service}
          </div>
        </div>
        <div style={{ margin: "20px" }}>
          <label style={{ margin: "20px" }} htmlFor="image">
            Image
            <input
              type="file"
              alt="image"
              name="image"
              accept="image/png, image/gif, image/jpeg"
              className="input-field"
              required
            />
          </label>
          <div style={{ color: "red", margin: "20px" }}>
            {actionData?.errors?.image}
          </div>
        </div>
        <button style={{ margin: "40px" }} type="submit">
          Store
        </button>
      </Form>
    </div>
  );
}
