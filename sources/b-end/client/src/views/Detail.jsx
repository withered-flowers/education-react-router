import { useEffect, useState } from "react";
// ? Di sini kita harus menggunakan useParams
import { useParams } from "react-router-dom";

const Detail = () => {
  // ? Di sini kita harus menggunakan useParams
  // ? Ingat tadi kita menuliskan pada pathnya adalah :id
  const { id } = useParams();

  const [detailPhotos, setDetailPhotos] = useState({});

  const fetchPhotoDetail = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/photos/${id}`);
      const responseJson = await response.json();

      setDetailPhotos(responseJson);
    } catch (err) {
      console.log(err);
    }
  };

  // ? Di sini kita panggilnya dengan menggunakan useEffect
  useEffect(
    // Effect
    () => {
      fetchPhotoDetail(id);
    },
    // Jangan lupa Deps Listnya, karena akan kita panggil lagi ketika
    // Params berubah
    [id]
  );

  return (
    <>
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
    </>
  );
};

export default Detail;
