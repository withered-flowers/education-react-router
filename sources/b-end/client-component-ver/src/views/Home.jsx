import { Outlet } from "react-router-dom";

import PhotoList from "../components/PhotoList";

function Home() {
  // card or form

  return (
    <div
      className="App"
      style={{ fontFamily: "sans-serif", fontSize: "1.2em" }}
    >
      <>
        {/* Detail Photos JSONServer */}
        <Outlet />

        {/* List Photos JSONServer */}
        <PhotoList />
      </>
    </div>
  );
}

export default Home;
