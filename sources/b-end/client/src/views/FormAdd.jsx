import { useState } from "react";

const FormAdd = () => {
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

      // ? Ini jadinya tidak digunakan lagi karena ada di tempat yang berbeda
      // await fetchPhotos();

      // ? Ini jadinya tidak digunakan lagi karena ada di tempat yang berbeda
      // setCurrentPage("card");
    } catch (err) {
      console.log(err);
    }
  };

  const formInputOnChangeHandler = (event) => {
    const newObj = {
      ...formInput,
    };

    newObj[event.target.name] = event.target.value;

    setFormInput(newObj);
  };

  return (
    // ? Di sini akan menambahkan style untuk sans-serif dan fontSize lagi
    <section style={{ fontFamily: "sans-serif", fontSize: "1.2em" }}>
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
  );
};

export default FormAdd;
