import { createBrowserRouter, redirect } from "react-router-dom";

import BaseLayout from "../layouts/BaseLayout";
import Home from "../views/Home";
import PhotoForm from "../views/PhotoForm";
import PhotoDetail from "../views/PhotoDetail";
import Login from "../views/Login";

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    loader: () => {
      const token = localStorage.getItem("token");

      if (!token) {
        return redirect("/login");
      }

      return null;
    },
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: ":id",
            element: <PhotoDetail />,
          },
        ],
      },
      {
        path: "/form-add",
        element: <PhotoForm />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
