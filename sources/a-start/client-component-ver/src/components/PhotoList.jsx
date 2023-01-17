const PhotoList = ({ photos, cardPhotosAnchorOnClickHandler }) => {
  return (
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
                onClick={(evt) => cardPhotosAnchorOnClickHandler(evt, photo.id)}
              >
                Detail
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoList;
