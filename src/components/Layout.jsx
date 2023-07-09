import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Home from "../pages/HomePage";

export default function Layout() {
  return (
    <>
      <Navbar />
      <Home />
      <Footer />
    </>
  );
}
