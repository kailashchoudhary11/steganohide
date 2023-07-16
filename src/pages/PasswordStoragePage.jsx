import axios from "axios";
import { Link, redirect } from "react-router-dom";

export async function loader() {
  try {
    const res = await axios.get("http://localhost:8000/api/password_storage/", {
      withCredentials: true,
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
