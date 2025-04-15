import axios from "axios";
const BASE_URL = "http://127.0.0.1:3000/api/v1/datapoint";

export const updateDataPointById = async (id, updatedData) => {
	try {
		const response = await axios.put(
			`${BASE_URL}/update-by-id/${id}`,
			updatedData
		);
		return response.data;
	} catch (error) {
		console.error("Error updating data point by ID:", error);
		throw error;
	}
};
