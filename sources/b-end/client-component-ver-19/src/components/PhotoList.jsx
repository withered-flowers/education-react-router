import { useEffect, useState } from "react";
import { Link } from "react-router";

const PhotoList = () => {
	const [photos, setPhotos] = useState([]);

	const fetchPhotos = async () => {
		try {
			const response = await fetch("http://localhost:3000/photos");
			const responseJson = await response.json();

			setPhotos(responseJson);
		} catch (err) {
			console.log(err);
		}
	};

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

	useEffect(() => {
		fetchPhotos();
	}, []);

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
							{/* <a
                href="#"
                onClick={(evt) => cardPhotosAnchorOnClickHandler(evt, photo.id)}
              >
                Detail
              </a> */}
							<Link to={`/${photo.id}`}>Detail</Link>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default PhotoList;
