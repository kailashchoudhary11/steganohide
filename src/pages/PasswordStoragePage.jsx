// import getAxios from "../utils/getAxios";
import axios from "axios";

export async function loader() {
  const res = await axios.get("http://localhost:8000/api/password_storage/", {
    withCredentials: true,
  });
  console.log(res.data);
  return null;
}

export default function PasswordStoragePage() {
  return <h1>This is password storage page</h1>;
}
