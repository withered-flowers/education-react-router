// ? import Link dari react-router-dom
import { Link } from "react-router-dom";

const NavBar = () => {
  const navigationOnClickHandler = (event, pageName) => {
    event.preventDefault();

    // ? Ini jadinya tidak digunakan lagi karena sudah menggunakan Router
    // setCurrentPage(pageName);
  };

  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <h1>Belajar Router</h1>
      </div>

      <ul
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "1em",
          listStyleType: "none",
          padding: "0em",
        }}
      >
        <li>
          {/* Ganti a href menjadi Link */}
          {/* <a href="#" onClick={(evt) => navigationOnClickHandler(evt, "card")}>
            Table JSONServer
          </a> */}
          <Link to="/">Table JSONServer</Link>
        </li>
        <li>
          {/* Ganti a href menjadi Link */}
          {/* <a href="#" onClick={(evt) => navigationOnClickHandler(evt, "form")}>
            Form JSONServer
          </a> */}
          <Link to="/form-add">Form JSONServer</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
