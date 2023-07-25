import { useEffect, useState } from "react";
import {
  Link,
  redirect,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
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
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState();

  useEffect(() => {
    const msg = searchParams.get("message");
    if (msg) {
      setMessage(msg);
      setSearchParams((prevParams) => {
        prevParams.delete("message");
        return prevParams;
      });
    }
  }, []);

  return (
    <div>
      {message && <div style={{ color: "green" }}>Logged In SuccessFully</div>}
      <h1>Secured Password Storage</h1>
      <Link to="/store_password">Store New Password</Link>
      {data?.map((pass) => (
        <div key={pass.id}>
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
