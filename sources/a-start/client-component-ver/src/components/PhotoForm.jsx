const PhotoForm = ({
  formOnSubmitHandler,
  formInput,
  formInputOnChangeHandler,
}) => {
  return (
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
  );
};

export default PhotoForm;
