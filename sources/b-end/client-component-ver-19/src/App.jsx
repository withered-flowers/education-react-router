import { Outlet, Route, Routes, useNavigate } from "react-router";

import { useEffect } from "react";
import PageDetail from "./views/PageDetail";
import PageFormAdd from "./views/PageFormAdd";
import PageHome from "./views/PageHome";

// const DummyPage = () => {
// 	const { photoId } = useParams();

// 	return (
// 		<div>
// 			<h1>Dummy Page - {photoId}</h1>
// 		</div>
// 	);
// };

const ProtectedLayout = () => {
	const navigate = useNavigate();

	// Logic untuk memproteksi diri
	useEffect(() => {
		// Logic Proteksi
		const token = localStorage.getItem("token");

		if (!token) {
			navigate("/");
		}
	}, [navigate]);

	return (
		<>
			<Outlet />
		</>
	);
};

function App() {
	return (
		<Routes>
			<Route path="/" element={<PageHome />}>
				<Route path=":photoId" element={<PageDetail />} />
			</Route>
			<Route element={<ProtectedLayout />}>
				<Route path="/form-add" element={<PageFormAdd />} />
			</Route>
		</Routes>
	);
}

export default App;
