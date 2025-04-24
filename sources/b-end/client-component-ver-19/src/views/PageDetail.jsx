import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import NavBar from "../components-router/NavBar";
import PhotoDetail from "../components/PhotoDetail";
import PhotoList from "../components/PhotoList";

// const cardPhotosAnchorOnClickHandler = async (event, id) => {
// 	event.preventDefault();

// 	try {
// 		const response = await fetch(`http://localhost:3000/photos/${id}`);
// 		const responseJson = await response.json();

// 		setDetailPhotos(responseJson);
// 	} catch (err) {
// 		console.log(err);
// 	}
// };

const PageDetail = () => {
	// card or form
	const [detailPhotos, setDetailPhotos] = useState({});
	const { photoId } = useParams();

	useEffect(() => {
		const comotDataDariBackend = async () => {
			try {
				const { data } = await axios.get(
					`http://localhost:3000/photos/${photoId}`,
				);

				setDetailPhotos(data);
			} catch (err) {
				console.log(err);
			}
		};

		comotDataDariBackend();
	}, [photoId]);

	return (
		<>
			{/* Detail Photos JSONServer */}
			{Object.keys(detailPhotos).length !== 0 && (
				<PhotoDetail detailPhotos={detailPhotos} />
			)}
		</>
	);
};

export default PageDetail;
