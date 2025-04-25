import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "react-toastify/dist/ReactToastify.css";
import getAllCharts from "../../../service/chart/getAllCharts";
import { renderChart } from "../../../utils/chart/renderChart";
import { customUploadAdapterPlugin } from "../../../utils/customUploadAdapterPlugin";

const CreateDashboardForm = () => {
	const [availableCharts, setAvailableCharts] = useState([]);

	useEffect(() => {
		const fetchCharts = async () => {
			try {
				const charts = await getAllCharts();
				setAvailableCharts(charts);
			} catch (error) {
				console.error("Error fetching charts:", error);
				toast.error("Failed to load charts");
			}
		};

		fetchCharts();
	}, []);

	const formik = useFormik({
		initialValues: {
			title: "",
			description: "",
			charts: [],
		},
		validationSchema: Yup.object({
			title: Yup.string().required("Dashboard title is required"),
			description: Yup.string().required("Description is required"),
			charts: Yup.array().min(1, "At least one chart must be selected"),
		}),
		onSubmit: async (values, { resetForm }) => {
			try {
				await axios.post(
					"http://localhost:3000/api/v1/dashboard/create",
					values
				);
				toast.success("Dashboard created successfully!");
				resetForm();
			} catch (error) {
				console.error("Error creating dashboard:", error);
				toast.error(
					error.response?.data?.message ||
						"Failed to create dashboard"
				);
			}
		},
	});

	return (
		<div className="w-full max-w-7xl mx-auto px-4 py-6 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-bold mb-4 text-center">
				Create Dashboard
			</h2>
			<form onSubmit={formik.handleSubmit} className="space-y-6">
				{/* Dashboard Name */}
				<div>
					<label className="block font-medium mb-1">
						Dashboard Name
					</label>
					<input
						type="text"
						name="title"
						className="w-full p-2 border rounded"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.title}
					/>
					{formik.touched.title && formik.errors.title && (
						<div className="text-red-500 text-sm">
							{formik.errors.title}
						</div>
					)}
				</div>

				{/* Description */}
				{/* Description */}
				<div>
					<label className="block font-medium mb-1">
						Description
					</label>
					<div className="border rounded">
						<CKEditor
							editor={ClassicEditor}
							data={formik.values.description}
							onChange={(event, editor) => {
								formik.setFieldValue(
									"description",
									editor.getData()
								);
							}}
							config={{
								extraPlugins: [customUploadAdapterPlugin],
							}}
						/>
					</div>
				</div>

				{/* Chart Selection */}
				<div>
					<label className="block font-medium mb-2">
						Select Charts
					</label>
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-h-[500px] overflow-y-auto">
						{availableCharts.map((chart) => (
							<label
								key={chart._id}
								className={`p-4 border rounded-lg cursor-pointer transition-all duration-200 hover:shadow-md ${
									formik.values.charts.includes(chart._id)
										? "border-blue-600"
										: "border-gray-300"
								}`}
							>
								<div className="flex items-center gap-2 mb-2">
									<input
										type="checkbox"
										name="charts"
										value={chart._id}
										onChange={formik.handleChange}
										checked={formik.values.charts.includes(
											chart._id
										)}
									/>
									<span className="font-medium">
										{chart.title}
									</span>
								</div>
								<div className="h-60 w-full overflow-hidden">
									{renderChart(chart)}
								</div>
							</label>
						))}
					</div>

					{formik.touched.charts && formik.errors.charts && (
						<div className="text-red-500 text-sm mt-1">
							{formik.errors.charts}
						</div>
					)}
				</div>

				{/* Submit Button */}
				<div className="flex justify-center">
					<button
						type="submit"
						className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-all"
					>
						Create Dashboard
					</button>
				</div>
			</form>
		</div>
	);
};

export default CreateDashboardForm;
