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
import PasswordStoragePage, { loader as passwordStoragePageLoader } from "./pages/PasswordStoragePage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route action={hidePageAction} element={<HidePage />} path="hide" />
      <Route action={revealPageAction} element={<RevealPage />} path="reveal" />
      <Route action={loginPageAction} element={<LoginPage />} path="login" />
      <Route action={registerPageAction} element={<RegisterPage />} path="register" />
      <Route element={<PasswordStoragePage />} loader={passwordStoragePageLoader} path="password_storage" />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}
