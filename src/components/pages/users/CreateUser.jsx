import React, { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify"; // Import toast
import "react-toastify/dist/ReactToastify.css"; // Import CSS for toast notifications

const CreateUserForm = () => {
	const [userGroups, setUserGroups] = useState([]);
	const [rolePermissions, setRolePermissions] = useState([]);

	// Fetch user groups and role permissions (you can adjust the URLs as per your backend setup)
	// useEffect(() => {
	//     const fetchData = async () => {
	//         try {
	//             const userGroupsResponse = await axios.get("/api/v1/usergroup/get-all");
	//             setUserGroups(userGroupsResponse.data.userGroups || []);
	//
	//             const rolePermissionsResponse = await axios.get("/api/v1/rolePermission/get-all");
	//             setRolePermissions(rolePermissionsResponse.data.rolePermissions || []);
	//         } catch (error) {
	//             console.error("Error fetching data", error);
	//         }
	//     };
	//
	//     fetchData();
	// }, []);

	// Form validation schema using Yup
	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		email: Yup.string()
			.email("Invalid email format")
			.required("Email is required"),
		userTypes: Yup.array().min(
			1,
			"At least one user type must be selected"
		),
	});

	// Handle form submission
	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			const response = await axios.post(
				"http://127.0.0.1:3000/api/v1/user/create",
				values
			);
			console.log("User created successfully:", response.data);
			toast.success("User created successfully!"); // Show success toast
		} catch (error) {
			console.error("Error creating user:", error);
			if (error.response && error.response.status === 400) {
				toast.error("Email is already in use!"); // Show error toast for email conflict
			} else {
				toast.error("Error creating user!"); // General error toast
			}
		} finally {
			setSubmitting(false);
		}
	};

	return (
		<div className="container mx-auto p-6">
			<h1 className="text-3xl font-semibold mb-6">Create User</h1>
			<Formik
				initialValues={{
					name: "",
					email: "",
					userTypes: [],
					userGroups: [],
					rolePermissions: [],
				}}
				validationSchema={validationSchema}
				onSubmit={handleSubmit}
			>
				{({ setFieldValue, isSubmitting }) => (
					<Form className="space-y-6">
						<div className="form-group">
							<label
								htmlFor="name"
								className="block text-lg font-medium mb-2"
							>
								Name
							</label>
							<Field
								type="text"
								name="name"
								className="form-control block w-full p-3 border border-gray-300 rounded-md"
							/>
							<ErrorMessage
								name="name"
								component="div"
								className="text-danger text-sm mt-1"
							/>
						</div>

						<div className="form-group">
							<label
								htmlFor="email"
								className="block text-lg font-medium mb-2"
							>
								Email
							</label>
							<Field
								type="email"
								name="email"
								className="form-control block w-full p-3 border border-gray-300 rounded-md"
							/>
							<ErrorMessage
								name="email"
								component="div"
								className="text-danger text-sm mt-1"
							/>
						</div>

						<div className="form-group">
							<label className="block text-lg font-medium mb-2">
								User Types
							</label>
							<div className="space-y-2">
								<label className="flex items-center space-x-2">
									<Field
										type="checkbox"
										name="userTypes"
										value="dashboardViewer"
										className="form-checkbox"
									/>
									<span>Dashboard Viewer</span>
								</label>
								<label className="flex items-center space-x-2">
									<Field
										type="checkbox"
										name="userTypes"
										value="dataCollector"
										className="form-checkbox"
									/>
									<span>Data Collector</span>
								</label>
								<label className="flex items-center space-x-2">
									<Field
										type="checkbox"
										name="userTypes"
										value="administrator"
										className="form-checkbox"
									/>
									<span>Administrator</span>
								</label>
							</div>
							<ErrorMessage
								name="userTypes"
								component="div"
								className="text-danger text-sm mt-1"
							/>
						</div>

						<div className="form-group mt-6">
							<button
								type="submit"
								className="btn btn-primary w-full py-3 px-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
								disabled={isSubmitting}
							>
								{isSubmitting ? "Submitting..." : "Create User"}
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
};

export default CreateUserForm;
