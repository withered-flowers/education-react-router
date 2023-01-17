import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const PhotoDetail = () => {
  const { id } = useParams();
  const [detailPhotos, setDetailPhotos] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`http://localhost:3000/photos/${id}`);
        const responseJson = await response.json();

        setDetailPhotos(responseJson);
      } catch (err) {
        console.log(err);
      }
    })();
  }, [id]);

  return (
    <section>
      <h1>Id yang diambil adalah: {id}</h1>

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
