import { useEffect, useState } from "react";

import PhotoForm from "./components/PhotoForm";
import PhotoList from "./components/PhotoList";
import PhotoDetail from "./components/PhotoDetail";

function App() {
  // card or form
  const [currentPage, setCurrentPage] = useState("card");
  const [photos, setPhotos] = useState([]);
  const [detailPhotos, setDetailPhotos] = useState({});

  const [formInput, setFormInput] = useState({
    url: "",
    thumbnailUrl: "",
    title: "",
  });

  const resetFormInput = () => {
    setFormInput({
      url: "",
      thumbnailUrl: "",
      title: "",
    });
  };

  const fetchPhotos = async () => {
    try {
      const response = await fetch("http://localhost:3000/photos");
      const responseJson = await response.json();

      setPhotos(responseJson);
    } catch (err) {
      console.log(err);
    }
  };

  const formOnSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const dataToSend = {
        ...formInput,
        albumId: 3,
      };

      const response = await fetch(`http://localhost:3000/photos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToSend),
      });
      await response.json();

      resetFormInput();

      await fetchPhotos();
      setCurrentPage("card");
    } catch (err) {
      console.log(err);
    }
  };

  const cardPhotosAnchorOnClickHandler = async (event, id) => {
    event.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/photos/${id}`);
      const responseJson = await response.json();

      setDetailPhotos(responseJson);
    } catch (err) {
      console.log(err);
    }
  };

  const navigationOnClickHandler = (event, pageName) => {
    event.preventDefault();

    setCurrentPage(pageName);
  };

  const formInputOnChangeHandler = (event) => {
    const newObj = {
      ...formInput,
    };

    newObj[event.target.name] = event.target.value;

    setFormInput(newObj);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div
      className="App"
      style={{ fontFamily: "sans-serif", fontSize: "1.2em" }}
    >
      {/* NavBar */}
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
            <a
              href="#"
              onClick={(evt) => navigationOnClickHandler(evt, "card")}
            >
              Table JSONServer
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={(evt) => navigationOnClickHandler(evt, "form")}
            >
              Form JSONServer
            </a>
          </li>
        </ul>
      </nav>

      {currentPage === "card" ? (
        <>
          {/* Detail Photos JSONServer */}
          {Object.keys(detailPhotos).length !== 0 && (
            <PhotoDetail detailPhotos={detailPhotos} />
          )}

          {/* List Photos JSONServer */}
          <PhotoList
            photos={photos}
            cardPhotosAnchorOnClickHandler={cardPhotosAnchorOnClickHandler}
          />
        </>
      ) : (
        /* Form JSONServer */
        <PhotoForm
          formInput={formInput}
          formInputOnChangeHandler={formInputOnChangeHandler}
          formOnSubmitHandler={formOnSubmitHandler}
        />
      )}
    </div>
  );
}

export default App;
