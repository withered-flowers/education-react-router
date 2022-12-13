// Import createBrowserRouter dari react-router-dom
// ini berfungsi untuk membuat router

// sebenarnya ada banyak tipe router (tidak hanya browser router saja)
// tapi untuk web, kita akan menggunakan browser router
import { createBrowserRouter } from "react-router-dom";
// ? Import redirect dari react-router-dom
import { redirect } from "react-router-dom";

// Import Component yang dibutuhkan
import Home from "../views/Home";
import FormAdd from "../views/FormAdd";
// ? Import Detail
import Detail from "../views/Detail";
// ? Import Login
import Login from "../views/Login";

// ? Import BaseLayout di sini
import BaseLayout from "../layouts/BaseLayout";

// mari kita membuat browser routernya di sini
const router = createBrowserRouter([
  // ? Kita akan mencoba untuk menggunakan Layout di sini
  // ? Bungkus yang awalnya array ini menjadi sebuah object
  {
    // ? Tambahkan element di sini untuk menggunakan BaseLayout
    element: <BaseLayout />,
    // ? Ceritanya untuk setiap route yang ada di bawah ini
    // ? Akan kita proteksi
    // ? Jika tidak ada token, maka akan di redirect ke halaman login
    loader: () => {
      // ? Cek apakah ada token di localStorage
      const token = localStorage.getItem("token");
      // ? Jika tidak ada, maka redirect ke halaman login
      if (!token) {
        return redirect("/login");
      }

      // ? Harus ada sesuatu yang direturn pada loader
      // ? sehingga kita return null saja cukup
      return null;
    },
    // ? Gunakan routesnya jadi di sini dengan dibungkus "children"
    children: [
      // definisikan routing yang dibutuhkan di sini
      {
        // Rute yang ingin ditambahkan
        path: "/",
        // Element / Component apa yang muncul ketika pengguna masuk ke rute ini?
        element: <Home />,
        children: [
          // ? Tambahkan path detail di sini
          // ? Perhatikan di sini kita tidak menggunakan absolute path
          // ? Tidak ada `/` di depannya
          {
            path: ":id",
            element: <Detail />,
          },
        ],
      },
      // Tambahan endpoint untuk form-add (FormAdd.jsx)
      {
        path: "/form-add",
        element: <FormAdd />,
      },
    ],
  },
  // ? Tambahkan route baru untuk melakukan login di sini
  {
    path: "/login",
    element: <Login />,
  },
]);

export default router;
