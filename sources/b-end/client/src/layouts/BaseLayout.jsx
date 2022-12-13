// Import outlet dari react-router-dom
import { Outlet } from "react-router-dom";

// Import NavBar di sini
import NavBar from "../components/NavBar";

const BaseLayout = () => {
  return (
    // ? Ingat harus Single Root sehingga harus menggunakan Fragment
    <>
      {/* Gunakan NavBar di sini */}
      <NavBar />
      {/* Gunakan Outlet di sini */}
      <Outlet />
    </>
  );
};

export default BaseLayout;
