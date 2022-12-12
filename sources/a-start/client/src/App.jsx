import { useEffect, useState } from "react";

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
            <section>
              <h3>Section - Detail Photos</h3>

              <div>Id: {detailPhotos?.id}</div>
              <div>AlbumId: {detailPhotos?.albumId}</div>
              <div>Title: {detailPhotos?.title}</div>
              <div>URL: {detailPhotos?.url}</div>
              <div>Thumbnail URL: {detailPhotos?.thumbnailUrl}</div>
            </section>
          )}

          {/* List Photos JSONServer */}
          <section>
            <h3>Section - List of Photos</h3>

            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "1em",
                margin: "auto auto",
              }}
            >
              {photos.map((photo) => (
                <div key={photo.id}>
                  <img height={120} width={120} src={photo.url} />
                  <div style={{ textAlign: "center" }}>
                    <a
                      href="#"
                      onClick={(evt) =>
                        cardPhotosAnchorOnClickHandler(evt, photo.id)
                      }
                    >
                      Detail
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      ) : (
        /* Form JSONServer */
        <section>
          <h3>Section - Form - Adding Photos</h3>

          <form
            onSubmit={formOnSubmitHandler}
            style={{ display: "flex", flexDirection: "column", gap: "0.5em" }}
          >
            <input
              type="text"
              name="title"
              placeholder="Insert Photo Title"
              style={{ padding: "1em 0.5em" }}
              value={formInput.title}
              onChange={formInputOnChangeHandler}
            />
            <input
              type="text"
              name="url"
              placeholder="Insert URL"
              style={{ padding: "1em 0.5em" }}
              value={formInput.url}
              onChange={formInputOnChangeHandler}
            />
            <input
              type="text"
              name="thumbnailUrl"
              placeholder="Insert Thumbnail URL"
              style={{ padding: "1em 0.5em" }}
              value={formInput.thumbnailUrl}
              onChange={formInputOnChangeHandler}
            />
            <button type="submit" style={{ padding: "1em 0.5em" }}>
              Add Photos
            </button>
          </form>
        </section>
      )}
    </div>
  );
}

export default App;
