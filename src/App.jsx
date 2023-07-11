import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/HomePage";
import HidePage, { action as hidePageAction } from "./pages/HidePage";
import RevealPage, { action as revealPageAction } from "./pages/RevealPage";
import LoginPage, { action as loginPageAction } from "./pages/LoginPage";
import RegisterPage, { action as registerPageAction } from "./pages/RegisterPage";
import Slider from "./pages/Slider";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route action={hidePageAction} path="hide" element={<HidePage />} />
      <Route action={revealPageAction} path="reveal" element={<RevealPage />} />
      <Route action={loginPageAction} path="/login" element={<LoginPage />} />
      <Route action={registerPageAction} path="/register" element={<RegisterPage />} />
      <Route action={registerPageAction} path="/slider" element={<Slider />} />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}
