// services/chart/addChartService.js
import axios from "axios";

const addChartService = async ({
	dataPointId,
	xAxis,
	yAxis,
	chartType,
	title,
	pivoted,
	pivotValue,
}) => {
	try {
		// Making the POST request to create the chart
		const response = await axios.post(
			"http://127.0.0.1:3000/api/v1/chart/create",
			{
				dataPointId,
				plotCombination: { x: xAxis, y: yAxis },
				chartType,
				title,
				pivot: pivoted,
				pivotValue: pivotValue,
			}
		);
		console.log(response.data);

		return response.data;
	} catch (err) {
		console.error("Error creating chart:", err);
		throw new Error("Failed to create chart");
	}
};

export default addChartService;
