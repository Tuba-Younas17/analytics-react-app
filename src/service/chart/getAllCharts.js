// src/service/chart/getAllChartService.js

import axios from "axios";

const getAllCharts = async () => {
	try {
		const response = await axios.get(
			"http://localhost:3000/api/v1/chart/get-all-charts"
		);
		return response.data;
	} catch (error) {
		console.error("Error fetching charts", error);
		throw error; // Re-throw the error to be handled by the caller
	}
};

export default getAllCharts;
