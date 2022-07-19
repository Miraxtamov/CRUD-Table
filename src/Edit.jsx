import React, { useState } from "react";
import students from "./students";

const Edit = () => {
	const memory = localStorage.getItem("key");

	const [data, setData] = useState(memory ? JSON.parse(memory) : students);
	const [names, setNames] = useState("");
	const [surnames, setSurnames] = useState("");
	const [select, setSelect] = useState(null);
	const [nameTitle, setNameTitle] = useState("");
	const [surnameTitle, setSurnameTitle] = useState("");

	localStorage.setItem("key", JSON.stringify(data));

	// Delete
	const getDelete = (ids) => {
		const newData = data.filter((value) => value.id !== ids);
		setData(newData);
	};

	// Add
	const getAdd = (e) => {
		if (names === "" || surnames === "") {
			alert("Please Fill All Required Field");
			e.preventDefault();
		} else {
			e.preventDefault();
			const newName = [
				...data,
				{
					id: data.length + 1,
					name: names,
					surname: surnames,
				},
			];
			setData(newName);
		}
	};

	// Delete all Data
	const getDeleteAll = () => {
		localStorage.clear();
		setData([]);
	};

	// Edit
	const getEdit = (item) => {
		setSelect(item.id);
		setNameTitle(item.name);
		setSurnameTitle(item.surname);
	};

	// Save
	const getSave = () => {
		const newSave = data.map((value) => {
			return select === value.id
				? { ...value, name: nameTitle, surname: surnameTitle }
				: value;
		});

		setData(newSave);
		setSelect(null);
	};

	// Cancel
	const getCancel = () => {
		setSelect(null);
	};

	return (
		<div className="container">
			<h1 className="title">CRUD Table</h1>
			<form>
				<input
					onChange={(e) => setNames(e.target.value)}
					type="text"
					placeholder="Name"
				/>
				<input
					onChange={(e) => setSurnames(e.target.value)}
					type="text"
					placeholder="Surname"
				/>
				<button className="button add-btn" onClick={getAdd}>
					Add
				</button>
			</form>
			<button onClick={getDeleteAll} className="button1 delete-all">
				Delete All
			</button>
			<table border="1">
				<thead>
					<tr>
						<th>Id</th>
						<th>Name</th>
						<th>Surname</th>
						<th style={{ width: "20%" }}>Action</th>
					</tr>
				</thead>
				<tbody>
					{data.map((value, index) => {
						return (
							<tr key={value.id}>
								<td>{index + 1}</td>
								<td>
									{select === value.id ? (
										<input
											onChange={(e) => setNameTitle(e.target.value)}
											value={nameTitle}
											className="input-save"
											placeholder="Name"
											type="text"
										/>
									) : (
										value.name
									)}
								</td>
								<td>
									{select === value.id ? (
										<input
											onChange={(e) => setSurnameTitle(e.target.value)}
											value={surnameTitle}
											className="input-save"
											placeholder="Surname"
											type="text"
										/>
									) : (
										value.surname
									)}
								</td>
								<td>
									{value.id === select ? (
										<>
											<button className="button1 btn-save" onClick={getSave}>
												Save
											</button>
											<button
												className="button1 btn-cancel"
												onClick={getCancel}
											>
												Cancel
											</button>
										</>
									) : (
										<button
											onClick={() => getEdit(value)}
											className="button1 btn-edit"
										>
											Edit
										</button>
									)}
									<button
										onClick={() => getDelete(value.id)}
										className="button1 btn-delete"
									>
										Delete
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

export default Edit;
