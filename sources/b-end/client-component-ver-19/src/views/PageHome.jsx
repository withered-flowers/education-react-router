import { Outlet } from "react-router";
import NavBar from "../components-router/NavBar";
import PhotoList from "../components/PhotoList";

const PageHome = () => {
	// card or form

	return (
		<div
			className="App"
			style={{ fontFamily: "sans-serif", fontSize: "1.2em" }}
		>
			{/* NavBar */}
			<NavBar />
			<>
				{/* Detail Photos JSONServer
				{Object.keys(detailPhotos).length !== 0 && (
					<PhotoDetail detailPhotos={detailPhotos} />
				)} */}
				<Outlet />

				{/* List Photos JSONServer */}
				<PhotoList />
			</>
			)
		</div>
	);
};

export default PageHome;
