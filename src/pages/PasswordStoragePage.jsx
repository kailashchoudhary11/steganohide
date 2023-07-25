import { Link, redirect, useLoaderData } from "react-router-dom";
import getAxiosInstance from "../utils/getAxiosInstance";

export async function loader() {
  try {
    const axiosInstance = getAxiosInstance();
    const res = await axiosInstance.get("/api/password_storage/", {});
    return res.data;
  } catch (error) {
    if (error.response.status === 403) {
      return redirect("/login");
    }
  }
  return null;
}

export default function PasswordStoragePage() {
  const data = useLoaderData();

  return (
    <div>
      <h1>Secured Password Storage</h1>
      <Link to="/store_password">Store New Password</Link>
      {data?.map((pass) => (
        <div id={pass.id}>
          <img style={{ width: "200px" }} src={pass.image} alt="Password" />
          <span>{pass.service}</span>
          <span>{pass.username}</span>
          <span>
            Last Updated On:
            {new Date(pass.updated).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
