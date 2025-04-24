import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const PhotoForm = () => {
	const navigate = useNavigate();

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

			// const response = await fetch(`http://localhost:3000/photos`, {
			//   method: "POST",
			//   headers: {
			//     "Content-Type": "application/json",
			//   },
			//   body: JSON.stringify(dataToSend),
			// });
			// await response.json();

			const { data } = await axios.post(
				"http://localhost:3000/photos",
				dataToSend,
			);
			console.log(data);

			resetFormInput();

			// TODO: Pindah ke halaman /
			navigate("/");
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
