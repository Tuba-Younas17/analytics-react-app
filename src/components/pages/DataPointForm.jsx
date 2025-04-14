// src/components/DataPointForm.jsx
import React, { useState } from "react";
import {
	Label,
	TextInput,
	Textarea,
	Select,
	Button,
	ToggleSwitch,
} from "flowbite-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { handleDatapointSubmit } from "../../../utils/dataPoints/addDataPointUtils";


const DataPointForm = () => {
	const [isMultiColumn, setIsMultiColumn] = useState(false);

	const formik = useFormik({
		initialValues: {
			name: "",
			type: "Text Field",
			description: "",
			columns: "1",
		},
		validationSchema: Yup.object({
			name: Yup.string().required("Name is required"),
			type: Yup.string().required("Type is required"),
			description: Yup.string()
				.required("Description is required")
				.min(10, "Must be at least 10 characters")
				.max(200, "Must be less than 200 characters"),
			columns: Yup.string().required("Columns required"),
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
							<option>Dropdown</option>
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

					<div className="flex items-center gap-4 mt-2">
						<ToggleSwitch
							checked={isMultiColumn}
							label="Enable Multi-Columns"
							onChange={(checked) => {
								setIsMultiColumn(checked);
								if (!checked) {
									formik.setFieldValue("columns", "1");
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
									onChange={formik.handleChange}
									onBlur={formik.handleBlur}
									value={formik.values.columns}
								>
									<option value="1">1 Column</option>
									<option value="2">2 Columns</option>
									<option value="3">3 Columns</option>
									<option value="4">4 Columns</option>
								</Select>
								{formik.touched.columns &&
									formik.errors.columns && (
										<p className="text-red-500 text-sm mt-1">
											{formik.errors.columns}
										</p>
									)}
							</div>
						)}
					</div>
				</div>

				<div className="flex gap-4 mt-6">
					<Button color="gray" type="submit">
						Submit
					</Button>
					<Button
						color="light"
						type="button"
						onClick={() => {
							formik.resetForm();
							setIsMultiColumn(false);
						}}
					>
						Reset
					</Button>
				</div>
			</form>
		</div>
	);
};

export default DataPointForm;
