const PhotoDetail = ({ detailPhotos }) => {
  return (
    <section>
      <h3>Section - Detail Photos</h3>

      <div>Id: {detailPhotos?.id}</div>
      <div>AlbumId: {detailPhotos?.albumId}</div>
      <div>Title: {detailPhotos?.title}</div>
      <div>URL: {detailPhotos?.url}</div>
      <div>Thumbnail URL: {detailPhotos?.thumbnailUrl}</div>
    </section>
  );
};

export default PhotoDetail;
