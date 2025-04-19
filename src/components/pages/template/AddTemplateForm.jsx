import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { fetchDataPoints } from "../../../utils/template/fetchDataPointForAddTemplateUtils";

const AddTemplateForm = () => {
	const [dataPointOptions, setDataPointOptions] = useState([]);

	// Fetch all data points on mount
    useEffect(() => {
        fetchDataPoints(setDataPointOptions, toast);
		}, []);


	const formik = useFormik({
		initialValues: {
			title: "",
			dataPoints: [],
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Title is required"),
			dataPoints: Yup.array()
				.min(1, "At least one data point is required")
				.required("Data points are required"),
		}),
		onSubmit: async (values, { resetForm }) => {
			try {
				const payload = {
					title: values.title,
					dataPoints: values.dataPoints.map((d) => d.value),
				};

				await axios.post(
					"http://127.0.0.1:3000/api/v1/template/add-template",
					payload
				);

				toast.success("Template added successfully!");
				resetForm();
			} catch (error) {
				console.error("Error adding template:", error);
				toast.error("Failed to add template");
			}
		},
	});

	return (
		<div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-md border">
			<h2 className="text-2xl font-bold mb-6 text-blue-700 text-center">
				Add New Template
			</h2>

			<form onSubmit={formik.handleSubmit} className="space-y-6">
				{/* Title */}
				<div>
					<label className="block font-medium text-gray-700 mb-1">
						Template Title
					</label>
					<input
						type="text"
						name="title"
						value={formik.values.title}
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						className="w-full p-2 border border-gray-300 rounded-md"
						placeholder="Enter template title"
					/>
					{formik.touched.title && formik.errors.title && (
						<p className="text-red-500 text-sm">
							{formik.errors.title}
						</p>
					)}
				</div>

				{/* Data Points */}
				<div>
					<label className="block font-medium text-gray-700 mb-1">
						Select Data Points
					</label>
					<Select
						isMulti
						name="dataPoints"
						options={dataPointOptions}
						value={formik.values.dataPoints}
						onChange={(selected) =>
							formik.setFieldValue("dataPoints", selected)
						}
						className="react-select-container"
						classNamePrefix="react-select"
						placeholder="Choose data points..."
					/>
					{formik.touched.dataPoints && formik.errors.dataPoints && (
						<p className="text-red-500 text-sm">
							{formik.errors.dataPoints}
						</p>
					)}
				</div>

				{/* Submit Button */}
				<div className="text-right">
					<button
						type="submit"
						className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
					>
						Add Template
					</button>
				</div>
			</form>
		</div>
	);
};

export default AddTemplateForm;
