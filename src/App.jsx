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
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route action={hidePageAction} path="hide" element={<HidePage />} />
      <Route action={revealPageAction} path="reveal" element={<RevealPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}
