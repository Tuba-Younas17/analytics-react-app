import React, { useState } from "react";
import {
	Label,
	TextInput,
	Textarea,
	Select,
	Button,
	ToggleSwitch,
	Checkbox,
	Datepicker,
	Radio,
} from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleDatapointSubmit } from "../../../utils/dataPoints/addDataPointUtils";
import { useNavigate } from "react-router-dom";
import { FaCheck, FaEye, FaUndo } from "react-icons/fa"; // Importing Font Awesome icons

const DataPointForm = () => {
	const navigate = useNavigate();
	const [isMultiColumn, setIsMultiColumn] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: "",
			type: "Text Field",
			description: "",
			columns: "1", // For number of columns (e.g., 1 or 2)
			frequency: "", // For Radio buttons (e.g., hourly, daily)
			userRoles: [], // For checkboxes (e.g., Data Collector, Administrator)
			date: "", // For date input
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Name is required"),
			type: Yup.string().required("Type is required"),
			description: Yup.string()
				.required("Description is required")
				.min(10, "Must be at least 10 characters")
				.max(200, "Must be less than 200 characters"),
			columns: Yup.string()
				.required("Columns required")
				.matches(/^[1-9]$/, "Columns must be a number between 1 and 9"), // Added validation for columns
			frequency: Yup.string().required("Frequency is required"),
			userRoles: Yup.array().min(1, "At least one role is required"),
			date: Yup.date().required("Date is required").nullable(), // Handle nullable date
		}),
		onSubmit: async (values, { resetForm }) => {
			await handleDatapointSubmit(values, isMultiColumn, resetForm);
			setIsMultiColumn(false);
		},
	});

	return (
		<div className="p-6 bg-white rounded-lg shadow-md">
			<h2 className="text-lg font-semibold mb-4">Create Data Point</h2>

			<form onSubmit={formik.handleSubmit}>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div>
						<Label htmlFor="name" value="Data Point Name" />
						<TextInput
							id="name"
							name="name"
							placeholder="Enter name"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.name}
						/>
						{formik.touched.name && formik.errors.name && (
							<p className="text-red-500 text-sm mt-1">
								{formik.errors.name}
							</p>
						)}
					</div>

					<div>
						<Label htmlFor="type" value="Data Point Type" />
						<Select
							id="type"
							name="type"
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.type}
						>
							<option>Text Field</option>
							<option>Number</option>
							<option>Date</option>
							{/* <option>Dropdown</option> */}
						</Select>
						{formik.touched.type && formik.errors.type && (
							<p className="text-red-500 text-sm mt-1">
								{formik.errors.type}
							</p>
						)}
					</div>

					<div className="md:col-span-2">
						<Label htmlFor="description" value="Description" />
						<Textarea
							id="description"
							name="description"
							placeholder="Write something..."
							rows={4}
							onChange={formik.handleChange}
							onBlur={formik.handleBlur}
							value={formik.values.description}
						/>
						{formik.touched.description &&
							formik.errors.description && (
								<p className="text-red-500 text-sm mt-1">
									{formik.errors.description}
								</p>
							)}
					</div>

					{/* Frequency (Radio Buttons) */}
					<div className="md:col-span-2">
						<p className="text-sm text-gray-600 mb-4">
							<h1 className="text-xl text-gray-900 font-semibold mb-2">
								Frequency
							</h1>
							Select the frequency for data tracking.
						</p>

						<div className="flex gap-6 flex-wrap">
							<div className="flex items-center">
								<Radio
									id="hourly"
									name="frequency"
									label="Hourly"
									onChange={formik.handleChange}
									value="Hourly"
									checked={
										formik.values.frequency === "Hourly"
									}
								/>
								<Label
									htmlFor="hourly"
									className="ml-2 text-sm"
								>
									Hourly
								</Label>
							</div>
							<div className="flex items-center">
								<Radio
									id="daily"
									name="frequency"
									label="Daily"
									onChange={formik.handleChange}
									value="Daily"
									checked={
										formik.values.frequency === "Daily"
									}
								/>
								<Label htmlFor="daily" className="ml-2 text-sm">
									Daily
								</Label>
							</div>
							<div className="flex items-center">
								<Radio
									id="weekly"
									name="frequency"
									label="Weekly"
									onChange={formik.handleChange}
									value="Weekly"
									checked={
										formik.values.frequency === "Weekly"
									}
								/>
								<Label
									htmlFor="weekly"
									className="ml-2 text-sm"
								>
									Weekly
								</Label>
							</div>
							<div className="flex items-center">
								<Radio
									id="monthly"
									name="frequency"
									label="Monthly"
									onChange={formik.handleChange}
									value="Monthly"
									checked={
										formik.values.frequency === "Monthly"
									}
								/>
								<Label
									htmlFor="monthly"
									className="ml-2 text-sm"
								>
									Monthly
								</Label>
							</div>
							<div className="flex items-center">
								<Radio
									id="quarterly"
									name="frequency"
									label="Quarterly"
									onChange={formik.handleChange}
									value="Quarterly"
									checked={
										formik.values.frequency === "Quarterly"
									}
								/>
								<Label
									htmlFor="quarterly"
									className="ml-2 text-sm"
								>
									Quarterly
								</Label>
							</div>
							<div className="flex items-center">
								<Radio
									id="biannually"
									name="frequency"
									label="Biannually"
									onChange={formik.handleChange}
									value="Biannually"
									checked={
										formik.values.frequency === "Biannually"
									}
								/>
								<Label
									htmlFor="biannually"
									className="ml-2 text-sm"
								>
									Biannually
								</Label>
							</div>
							<div className="flex items-center">
								<Radio
									id="yearly"
									name="frequency"
									label="Yearly"
									onChange={formik.handleChange}
									value="Yearly"
									checked={
										formik.values.frequency === "Yearly"
									}
								/>
								<Label
									htmlFor="yearly"
									className="ml-2 text-sm"
								>
									Yearly
								</Label>
							</div>
						</div>
						{formik.touched.frequency &&
							formik.errors.frequency && (
								<p className="text-red-500 text-sm mt-1">
									{formik.errors.frequency}
								</p>
							)}
					</div>

					{/* User Roles (Checkboxes) */}
					<div className="md:col-span-2">
						<p className="text-sm text-gray-600 mb-4">
							<h1 className="text-xl text-gray-900 font-semibold mb-2">
								User Roles
							</h1>
							Select the user roles for the individual.
						</p>

						<div className="flex gap-6 flex-wrap">
							<div className="flex items-center">
								<Checkbox
									id="dataCollector"
									name="userRoles"
									value="Data Collector"
									onChange={formik.handleChange}
									checked={formik.values.userRoles.includes(
										"Data Collector"
									)}
								/>
								<Label
									htmlFor="dataCollector"
									className="ml-2 text-sm"
								>
									Data Collector
								</Label>
							</div>
							<div className="flex items-center">
								<Checkbox
									id="dashboardViewer"
									name="userRoles"
									value="Dashboard Viewer"
									onChange={formik.handleChange}
									checked={formik.values.userRoles.includes(
										"Dashboard Viewer"
									)}
								/>
								<Label
									htmlFor="dashboardViewer"
									className="ml-2 text-sm"
								>
									Dashboard Viewer
								</Label>
							</div>
							<div className="flex items-center">
								<Checkbox
									id="administrator"
									name="userRoles"
									value="Administrator"
									onChange={formik.handleChange}
									checked={formik.values.userRoles.includes(
										"Administrator"
									)}
								/>
								<Label
									htmlFor="administrator"
									className="ml-2 text-sm"
								>
									Administrator
								</Label>
							</div>
						</div>
						{formik.touched.userRoles &&
							formik.errors.userRoles && (
								<p className="text-red-500 text-sm mt-1">
									{formik.errors.userRoles}
								</p>
							)}
					</div>

					{/* Date (Date Input) */}
					<div className="md:col-span-2">
						<p className="text-sm text-gray-600 mb-4">
							<h1 className="text-xl text-gray-900 mb-2">Date</h1>
							Please select a date that is relevant to the data
							point. This field is used to track specific data
							based on time.
						</p>

						<Datepicker
							id="date"
							name="date"
							selected={formik.values.date}
							onChange={(date) =>
								formik.setFieldValue("date", date)
							}
						/>
						{formik.touched.date && formik.errors.date && (
							<p className="text-red-500 text-sm mt-1">
								{formik.errors.date}
							</p>
						)}
					</div>
				</div>

				<div className="flex gap-4 mt-6">
					<Button color="gray" type="submit">
						<FaCheck className="mr-2" /> Submit
					</Button>
					<Button
						color="gray"
						type="button"
						onClick={() => navigate("/view-all-data-points")} // <-- Navigation on click
					>
						<FaEye className="mr-2" /> View All DataPoints
					</Button>
					<Button
						color="light"
						type="button"
						onClick={() => {
							formik.resetForm();
							setIsMultiColumn(false);
						}}
					>
						<FaUndo className="mr-2" /> Reset
					</Button>
				</div>
			</form>
		</div>
	);
};

export default DataPointForm;
