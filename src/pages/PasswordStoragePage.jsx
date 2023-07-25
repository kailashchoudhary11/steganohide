import { Link, redirect } from "react-router-dom";
import getAxiosInstance from "../utils/getAxiosInstance";

export async function loader() {
  try {
    const axiosInstance = getAxiosInstance();
    const res = await axiosInstance.get("/api/password_storage/", {
    });
    console.log(res.data);
  } catch (error) {
    if (error.response.status === 403) {
      return redirect("/login");
    }
  }
  return null;
}

export default function PasswordStoragePage() {
  return (
    <div>
      <h1>Secured Password Storage</h1>
      <Link to="/store_password">Store New Password</Link>
    </div>
  );
}
