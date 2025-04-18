import React from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AssignDataCollectionTemplate = () => {
	// Formik validation schema
	const validationSchema = Yup.object({
		title: Yup.string().required("Title is required"),
		roles: Yup.array()
			.min(1, "At least one role must be selected")
			.required("Roles are required"),
		cycle: Yup.string().required("Collection cycle is required"),
	});

	const handleSubmit = async (values, { setSubmitting }) => {
		try {
			await axios.post(
				"http://localhost:3000/api/v1/template/assign-template",
				values
			);
			toast.success("Template assigned successfully!");
		} catch (error) {
			toast.error("Assignment failed: " + error.message);
		}
		setSubmitting(false);
	};

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<div className="w-full max-w-md lg:max-w-2xl p-6 bg-white shadow rounded-lg">
				<div className="mb-6">
					<h2 className="text-2xl font-bold text-center">
						Assign Data Collection Template
					</h2>
					
				</div>

				<Formik
					initialValues={{
						title: "",
						roles: [],
						cycle: "",
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{({
						values,
						handleChange,
						setFieldValue,
						isSubmitting,
					}) => (
						<Form>
							{/* Title */}
							<div className="mb-4">
								<label className="block text-gray-700 mb-1">
									Enter Collection Title
								</label>
								<Field
									type="text"
									name="title"
									className="w-full px-4 py-2 border border-gray-300 rounded"
									placeholder="Enter a title"
								/>
								<ErrorMessage
									name="title"
									component="div"
									className="text-red-500 text-sm"
								/>
							</div>

							{/* Roles */}
							<div className="mb-4">
								<label className="block text-gray-700 mb-1">
									Select Role(s)
								</label>
								<div className="flex flex-wrap gap-4">
									{[
										"dataCollector",
										"administrator",
										"dashboardViewer",
									].map((role) => (
										<label
											key={role}
											className="inline-flex items-center gap-2"
										>
											<Field
												type="checkbox"
												name="roles"
												value={role}
												checked={values.roles.includes(
													role
												)}
												onChange={(e) => {
													const { checked } =
														e.target;
													if (checked) {
														setFieldValue("roles", [
															...values.roles,
															role,
														]);
													} else {
														setFieldValue(
															"roles",
															values.roles.filter(
																(r) =>
																	r !== role
															)
														);
													}
												}}
											/>
											<span className="capitalize">
												{role}
											</span>
										</label>
									))}
								</div>
								<ErrorMessage
									name="roles"
									component="div"
									className="text-red-500 text-sm"
								/>
								<p className="text-xs text-gray-500 mt-1">
									Select one or more roles to assign the
									template
								</p>
							</div>

							{/* Collection Cycle */}
							<div className="mb-6">
								<label className="block text-gray-700 mb-1">
									Collection Cycle
								</label>
								<div className="flex flex-wrap gap-4">
									{[
										"Hourly",
										"Daily",
										"Weekly",
										"Monthly",
										"Quarterly",
										"Bi-Annually",
										"Yearly",
									].map((cycleOption) => (
										<label
											key={cycleOption}
											className="inline-flex items-center gap-1"
										>
											<Field
												type="radio"
												name="cycle"
												value={cycleOption}
												className="form-radio"
											/>
											{cycleOption}
										</label>
									))}
								</div>
								<ErrorMessage
									name="cycle"
									component="div"
									className="text-red-500 text-sm"
								/>
							</div>

							{/* Submit */}
							<button
								type="submit"
								disabled={isSubmitting}
								className="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded shadow"
							>
								{isSubmitting
									? "Assigning..."
									: "Assign Template"}
							</button>
						</Form>
					)}
				</Formik>
			</div>
		</div>
	);
};

export default AssignDataCollectionTemplate;
