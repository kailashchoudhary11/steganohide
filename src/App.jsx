import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/HomePage";
import Hide from "./pages/HidePage";
import Reveal from "./pages/RevealPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="hide" element={<Hide />} />
      <Route path="reveal" element={<Reveal />} />
    </Route>,
  ),
);

export default function App() {
  return <RouterProvider router={router} />;
}
