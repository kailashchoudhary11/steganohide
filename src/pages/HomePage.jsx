import axios from "axios";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    async function getData() {
      const res = await axios.get("http://127.0.0.1:8000/api/hide/");
      console.log(res);
    }
    getData();
  }, []);
  return <h1>This is Home Page</h1>;
}
