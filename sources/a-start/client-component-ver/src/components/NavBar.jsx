const NavBar = ({ setCurrentPage }) => {
  const navigationOnClickHandler = (event, pageName) => {
    event.preventDefault();

    setCurrentPage(pageName);
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
          <a href="#" onClick={(evt) => navigationOnClickHandler(evt, "card")}>
            Table JSONServer
          </a>
        </li>
        <li>
          <a href="#" onClick={(evt) => navigationOnClickHandler(evt, "form")}>
            Form JSONServer
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
