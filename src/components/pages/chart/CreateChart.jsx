import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
	Chart as ChartJS,
	BarElement,
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	ArcElement,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import { FiPlusCircle, FiEye } from "react-icons/fi";
import { toast } from "react-toastify";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import fetchAllDataPoints from "../../../utils/dataPoints/fetchAllDataPoints";
import handleSubmitForChartForm from "../../../utils/chart/handleSubmitForChartForm";

ChartJS.register(
	BarElement,
	CategoryScale,
	LinearScale,
	LineElement,
	PointElement,
	ArcElement,
	Tooltip,
	Legend
);

const chartTypes = ["bar", "line", "pie"];

export default function CreateChart() {
	const [dataPoints, setDataPoints] = useState([]);
	const [pivoted, setPivoted] = useState(false);
	const navigate = useNavigate();

	// Using fetchAllDataPoints function to fetch data points
	useEffect(() => {
		const getDataPoints = async () => {
			const points = await fetchAllDataPoints();
			setDataPoints(points);
		};
		getDataPoints();
	}, []);

	const initialValues = {
		selectedDataPointId: "",
		chartTitle: "",
		xAxis: "",
		yAxis: "",
		pivotValue: "",
		selectedCharts: [],
	};

	const validationSchema = Yup.object({
		selectedDataPointId: Yup.string().required("Data point is required"),
		chartTitle: Yup.string().required("Chart title is required"),
		xAxis: Yup.string().required("X-axis field is required"),
		yAxis: Yup.string().required("Y-axis field is required"),
		selectedCharts: Yup.array().min(1, "Select at least one chart type"),
	});

	const getChartPreview = (type, xAxis, yAxis) => {
		const sampleData = {
			labels: ["Jan", "Feb", "Mar", "Apr"],
			datasets: [
				{
					label: `${yAxis || "Y"} vs ${xAxis || "X"}`,
					data: [12, 19, 3, 5],
					backgroundColor: [
						"#3b82f6",
						"#10b981",
						"#f59e0b",
						"#ef4444",
					],
					borderColor: "#3b82f6",
					borderWidth: 1,
				},
			],
		};

		switch (type) {
			case "bar":
				return <Bar data={sampleData} />;
			case "line":
				return <Line data={sampleData} />;
			case "pie":
				return <Pie data={sampleData} />;
			default:
				return null;
		}
	};


	return (
		<div className="p-4 sm:p-6 max-w-6xl mx-auto">
			<h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center">
				Create Dashboard Charts
			</h2>

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={
					(values, { resetForm }) =>
						handleSubmitForChartForm(
							values,
							{ resetForm },
							pivoted,
							setPivoted
						) 
				}
			>
				{({ values, setFieldValue }) => (
					<Form>
						{/* Select Data Point */}
						<div className="mb-4">
							<label className="block font-semibold mb-1">
								Select Data Point:
							</label>
							<Field
								as="select"
								name="selectedDataPointId"
								className="w-full p-2 border rounded"
							>
								<option value="">
									-- Select Data Point --
								</option>
								{dataPoints.map((dp) => (
									<option key={dp._id} value={dp._id}>
										{dp.name} ({dp.type})
									</option>
								))}
							</Field>
							<ErrorMessage
								name="selectedDataPointId"
								component="div"
								className="text-red-500 text-sm"
							/>
						</div>

						{/* Chart Title */}
						<div className="mb-4">
							<label className="block font-semibold mb-1">
								Chart Title:
							</label>
							<Field
								type="text"
								name="chartTitle"
								className="w-full p-2 border rounded"
								placeholder="e.g. Radio 1 plotted against Timestamp"
							/>
							<ErrorMessage
								name="chartTitle"
								component="div"
								className="text-red-500 text-sm"
							/>
						</div>

						{/* X Axis */}
						<div className="mb-4">
							<label className="block font-semibold mb-1">
								X-Axis Field:
							</label>
							<Field
								type="text"
								name="xAxis"
								className="w-full p-2 border rounded"
								placeholder="e.g numberOfResponse or date"
							/>
							<ErrorMessage
								name="xAxis"
								component="div"
								className="text-red-500 text-sm"
							/>
						</div>

						{/* Y Axis */}
						<div className="mb-4">
							<label className="block font-semibold mb-1">
								Y-Axis Field:
							</label>
							<Field
								type="text"
								name="yAxis"
								className="w-full p-2 border rounded"
								placeholder="numberOfResponse or date"
							/>
							<ErrorMessage
								name="yAxis"
								component="div"
								className="text-red-500 text-sm"
							/>
						</div>

						{/* Pivot Checkbox */}
						<div className="mb-4 flex items-center gap-3">
							<input
								type="checkbox"
								id="pivoted"
								checked={pivoted}
								onChange={() => setPivoted(!pivoted)}
								className="h-4 w-4"
							/>
							<label htmlFor="pivoted" className="font-medium">
								Pivoted
							</label>
							{pivoted && (
								<Field
									type="text"
									name="pivotValue"
									placeholder="Enter pivot value"
									className="border rounded p-2 ml-4"
								/>
							)}
						</div>

						{/* Chart Selection */}
						<div className="mb-6">
							<p className="font-semibold mb-2">
								Select Chart Type(s):
							</p>
							<ErrorMessage
								name="selectedCharts"
								component="div"
								className="text-red-500 text-sm mb-2"
							/>
							<div className="flex flex-wrap gap-4">
								{chartTypes.map((type) => {
									const isSelected =
										values.selectedCharts.includes(type);
									return (
										<div
											key={type}
											className={`w-full sm:w-[48%] md:w-[30%] border p-4 rounded-lg cursor-pointer transition-all ${
												isSelected
													? "border-blue-600 shadow-lg"
													: "border-gray-300"
											}`}
											onClick={() => {
												const updated = isSelected
													? values.selectedCharts.filter(
															(t) => t !== type
													  )
													: [
															...values.selectedCharts,
															type,
													  ];
												setFieldValue(
													"selectedCharts",
													updated
												);
											}}
										>
											<div className="w-full aspect-[4/3]">
												{getChartPreview(
													type,
													values.xAxis,
													values.yAxis
												)}
											</div>
											<p className="text-center font-medium mt-2 capitalize">
												{type}
											</p>
										</div>
									);
								})}
							</div>
						</div>

						{/* Submit + View All Buttons */}
						<div className="flex flex-col sm:flex-row gap-4">
							<button
								type="submit"
								className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 w-full sm:w-auto"
							>
								<FiPlusCircle className="text-lg" />
								Add Chart
							</button>
							<button
								type="button"
								className="flex items-center justify-center gap-2 bg-gray-200 text-gray-800 px-6 py-2 rounded hover:bg-gray-300 w-full sm:w-auto"
								onClick={() => navigate("/all-chart")}
							>
								<FiEye className="text-lg" />
								View All Charts
							</button>
						</div>
					</Form>
				)}
			</Formik>
		</div>
	);
}
