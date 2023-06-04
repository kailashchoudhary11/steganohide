import {
  Route, RouterProvider, createBrowserRouter, createRoutesFromElements,
} from "react-router-dom";
import Home from "./pages/Home";

const router = createBrowserRouter(createRoutesFromElements(
  <Route path="/">
    <Route index element={<Home />} />
  </Route>,
));

export default function App() {
  return (
    <RouterProvider router={router} />
  );
}
