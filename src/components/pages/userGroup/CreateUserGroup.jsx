import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify"; // Update import

const UserGroupForm = () => {
	const [users, setUsers] = useState([]);
	const [approvingOfficers, setApprovingOfficers] = useState([]);

	// Fetch users for the form
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const response = await axios.get(
					"http://127.0.0.1:3000/api/v1/user/get-all-user"
				);
				setUsers(response.data.users); // assuming the response contains a list of users
				setApprovingOfficers(response.data.users); // assuming the approving officer is also a user
			} catch (error) {
				console.error("Error fetching users:", error);
			}
		};

		fetchUsers();
	}, []);

	// Formik form initialization
	const formik = useFormik({
		initialValues: {
			name: "",
			groupRole: "",
			approvingOfficer: "",
			members: [], // Ensure members are included in the initial form values
		},
		onSubmit: async (values) => {
			try {
				const response = await axios.post(
					"http://127.0.0.1:3000/api/v1/usergroup/create",
					values
				);
				console.log("User group created:", response.data);
				toast.success("User group created successfully!"); // Toast on success
			} catch (error) {
				console.error("Error creating user group:", error);
				toast.error("Error creating user group."); // Toast on error
				if (error.response) {
					console.log(
						"Backend returned status code:",
						error.response.status
					);
					console.log("Response data:", error.response.data);
				}
			}
		},
	});

	// Handle adding/removing members using Formik's setFieldValue
	const handleMemberChange = (userId) => {
		const newMembers = formik.values.members.includes(userId)
			? formik.values.members.filter((id) => id !== userId)
			: [...formik.values.members, userId];

		// Update the members in Formik's state
		formik.setFieldValue("members", newMembers);
	};

	return (
		<div className="container mx-auto p-6 bg-white shadow-md rounded-md">
			<h1 className="text-3xl font-semibold text-center mb-6 text-gray-800">
				Create User Group
			</h1>
			<form
				onSubmit={formik.handleSubmit}
				className="max-w-2xl mx-auto space-y-6 bg-gray-50 p-8 rounded-lg shadow-md"
			>
				<div className="flex flex-col">
					<label
						className="mb-2 font-medium text-gray-700"
						htmlFor="name"
					>
						Name
					</label>
					<input
						type="text"
						id="name"
						name="name"
						onChange={formik.handleChange}
						value={formik.values.name}
						className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					/>
				</div>

				<div className="flex flex-col">
					<label
						className="mb-2 font-medium text-gray-700"
						htmlFor="groupRole"
					>
						Group Role
					</label>
					<select
						id="groupRole"
						name="groupRole"
						onChange={formik.handleChange}
						value={formik.values.groupRole}
						className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">Select Role</option>
						<option value="dashboardViewer">
							Dashboard Viewer
						</option>
						<option value="dataCollector">Data Collector</option>
						<option value="administrator">Administrator</option>
					</select>
				</div>

				<div className="flex flex-col">
					<label
						className="mb-2 font-medium text-gray-700"
						htmlFor="approvingOfficer"
					>
						Approving Officer
					</label>
					<select
						id="approvingOfficer"
						name="approvingOfficer"
						onChange={formik.handleChange}
						value={formik.values.approvingOfficer}
						className="px-4 py-2 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						<option value="">Select Officer</option>
						{approvingOfficers.map((user) => (
							<option key={user._id} value={user._id}>
								{user.name}
							</option>
						))}
					</select>
				</div>

				<div className="flex flex-col">
					<label className="mb-2 font-medium text-gray-700">
						Members
					</label>
					<div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
						{users.map((user) => (
							<div
								key={user._id}
								className="flex items-center space-x-2"
							>
								<input
									type="checkbox"
									id={user._id}
									checked={formik.values.members.includes(
										user._id
									)}
									onChange={() =>
										handleMemberChange(user._id)
									}
									className="h-5 w-5 text-blue-500 border-gray-300 rounded"
								/>
								<label
									htmlFor={user._id}
									className="text-sm text-gray-700"
								>
									{user.name}
								</label>
							</div>
						))}
					</div>
				</div>

				<div className="flex justify-center">
					<button
						type="submit"
						className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
					>
						Create Group
					</button>
				</div>
			</form>

			{/* ToastContainer for global toast notifications */}
			<ToastContainer />
		</div>
	);
};

export default UserGroupForm;
