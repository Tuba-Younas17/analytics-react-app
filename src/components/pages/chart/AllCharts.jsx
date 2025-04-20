// src/components/AllCharts.jsx

import { useEffect, useState } from "react";
import getAllCharts from "../../../service/chart/getAllCharts";
import { renderChart } from "../../../utils/chart/renderChart";


const AllCharts = () => {
	const [charts, setCharts] = useState([]);

	useEffect(() => {
		const fetchCharts = async () => {
			try {
				const data = await getAllCharts(); // Use the service to fetch chart data
				setCharts(data);
			} catch (error) {
				console.error("Error fetching charts", error);
			}
		};
		fetchCharts();
	}, []);

	return (
		<div className="p-4 sm:p-6">
			<h2 className="text-2xl font-bold mb-6 text-center">
				All Dashboard Charts
			</h2>

			<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
				{charts.map((chart, idx) => (
					<div
						key={idx}
						className="p-4 border rounded-md shadow bg-white"
					>
						<h2 className="font-semibold text-lg mb-4 text-center">
							{chart.title}
						</h2>
						{renderChart(chart)} {/* Render the chart */}
					</div>
				))}
			</div>
		</div>
	);
};

export default AllCharts;
