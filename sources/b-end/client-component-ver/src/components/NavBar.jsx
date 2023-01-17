import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        fontFamily: "sans-serif",
        fontSize: "1.2em",
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
          <Link to="/">Table JSONServer</Link>
        </li>
        <li>
          <Link to="/form-add">Form JSONServer</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
