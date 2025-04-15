import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faBan } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
	Button,
	Label,
	TextInput,
	Textarea,
	Select,
	ToggleSwitch,
} from "flowbite-react";
import { Formik } from "formik";
import * as Yup from "yup";
import SkeletonLoader from "../../layout/SkeletonLoader";
import { fetchDataForSpecificId } from "../../../utils/dataPoints/fetchDataForSpecificId";
import { handleSubmitForUpdateForm } from "../../../utils/dataPoints/handleSubmitForUpdateForm";

const UpdateDataPoint = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [isMultiColumn, setIsMultiColumn] = useState(false);
	const [initialValues, setInitialValues] = useState(null);

	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		type: Yup.string().required("Type is required"),
		description: Yup.string().required("Description is required"),
		columns: Yup.string().required("Columns is required"),
	});

useEffect(() => {
	// Fetch the data when the component mounts and pass the necessary setters
	fetchDataForSpecificId(id, setInitialValues, setIsMultiColumn);
}, [id]);

	if (!initialValues) return <SkeletonLoader />;

	return (
		<div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-lg">
			<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
				Update Data Point
			</h2>
			<ToastContainer position="top-center" autoClose={2000} />

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) =>
					handleSubmitForUpdateForm(id, values, navigate)
				}
				enableReinitialize
			>
				{({
					values,
					handleChange,
					handleSubmit,
					errors,
					touched,
					handleBlur,
					setFieldValue,
				}) => (
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Name */}
						<div>
							<Label htmlFor="name" value="Data Point Name" />
							<TextInput
								id="name"
								name="name"
								placeholder="Enter name"
								value={values.name}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.name && errors.name && (
								<p className="text-red-500 text-sm mt-1">
									{errors.name}
								</p>
							)}
						</div>

						{/* Type */}
						<div>
							<Label htmlFor="type" value="Data Point Type" />
							<Select
								id="type"
								name="type"
								value={values.type}
								onChange={handleChange}
								onBlur={handleBlur}
							>
								<option>Text Field</option>
								<option>Number</option>
								<option>Date</option>
								<option>Dropdown</option>
							</Select>
							{touched.type && errors.type && (
								<p className="text-red-500 text-sm mt-1">
									{errors.type}
								</p>
							)}
						</div>

						{/* Description */}
						<div>
							<Label htmlFor="description" value="Description" />
							<Textarea
								id="description"
								name="description"
								placeholder="Write something..."
								rows={4}
								value={values.description}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.description && errors.description && (
								<p className="text-red-500 text-sm mt-1">
									{errors.description}
								</p>
							)}
						</div>

						{/* Multi-Column Toggle */}
						<div className="flex items-center gap-4 mt-2">
							<ToggleSwitch
								checked={isMultiColumn}
								label="Enable Multi-Columns"
								onChange={(checked) => {
									setIsMultiColumn(checked);
									if (!checked) {
										setFieldValue("columns", "1");
									}
								}}
							/>

							{isMultiColumn && (
								<div className="w-40">
									<Label
										htmlFor="columns"
										value="No. of Columns"
									/>
									<Select
										id="columns"
										name="columns"
										value={values.columns}
										onChange={handleChange}
										onBlur={handleBlur}
									>
										<option value="1">1 Column</option>
										<option value="2">2 Columns</option>
										<option value="3">3 Columns</option>
										<option value="4">4 Columns</option>
									</Select>
									{touched.columns && errors.columns && (
										<p className="text-red-500 text-sm mt-1">
											{errors.columns}
										</p>
									)}
								</div>
							)}
						</div>

						{/* Buttons */}
						<div className="flex justify-between mt-6">
							<Button color="blue" type="submit">
								<FontAwesomeIcon
									icon={faPenToSquare}
									className="mr-2"
								/>
								Update Data Point
							</Button>
							<Button
								color="gray"
								onClick={() =>
									navigate("/view-all-data-points")
								}
							>
								<FontAwesomeIcon
									icon={faBan}
									className="mr-2"
								/>
								Cancel
							</Button>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default UpdateDataPoint;
