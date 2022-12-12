// Import createBrowserRouter dari react-router-dom
// ini berfungsi untuk membuat router

// sebenarnya ada banyak tipe router (tidak hanya browser router saja)
// tapi untuk web, kita akan menggunakan browser router
import { createBrowserRouter } from "react-router-dom";

// Import Component yang dibutuhkan
import Home from "../views/Home";
import FormAdd from "../views/FormAdd";

// mari kita membuat browser routernya di sini
const router = createBrowserRouter([
  // definisikan routing yang dibutuhkan di sini
  {
    // Rute yang ingin ditambahkan
    path: "/",
    // Element / Component apa yang muncul ketika pengguna masuk ke rute ini?
    element: <Home />,
  },
  // Tambahan endpoint untuk form-add (FormAdd.jsx)
  {
    path: "/form-add",
    element: <FormAdd />,
  },
]);

export default router;