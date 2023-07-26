import getAxiosInstance from "../utils/getAxiosInstance";

export async function loader() {
  try {
    const axiosInstance = getAxiosInstance();
    const res = await axiosInstance.get("/api/single_password/1/");
    console.log(res.data);
  } catch (error) {
    console.log("Error", error);
  }
  return null;
}

export default function SinglePassword() {
  return <div>Saved Password goes here...</div>;
}
