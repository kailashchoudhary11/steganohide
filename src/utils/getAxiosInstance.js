import Cookies from "js-cookie";
import axios from "axios";

export default function getAxiosInstance() {
  const csrftoken = Cookies.get("csrftoken");
  const baseURL = "http://localhost:8000";
  const axiosInstance = axios.create({
    baseURL,
  });
  axiosInstance.defaults.headers.common["X-CSRFToken"] = csrftoken;
  axiosInstance.defaults.withCredentials = true;

  return axiosInstance;
}
