import { useState } from "react";

import NavBar from "./components/NavBar";
import PhotoForm from "./components/PhotoForm";
import PhotoList from "./components/PhotoList";
import PhotoDetail from "./components/PhotoDetail";

function App() {
  // card or form
  const [currentPage, setCurrentPage] = useState("card");
  const [detailPhotos, setDetailPhotos] = useState({});

  return (
    <div
      className="App"
      style={{ fontFamily: "sans-serif", fontSize: "1.2em" }}
    >
      {/* NavBar */}
      <NavBar setCurrentPage={setCurrentPage} />

      {currentPage === "card" ? (
        <>
          {/* Detail Photos JSONServer */}
          {Object.keys(detailPhotos).length !== 0 && (
            <PhotoDetail detailPhotos={detailPhotos} />
          )}

          {/* List Photos JSONServer */}
          <PhotoList setDetailPhotos={setDetailPhotos} />
        </>
      ) : (
        /* Form JSONServer */
        <PhotoForm />
      )}
    </div>
  );
}

export default App;
