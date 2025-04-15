import axios from "axios";

const BASE_URL = "http://127.0.0.1:3000/api/v1/datapoint";

export const getDataPointById = async (id) => {
	try {
		const response = await axios.get(`${BASE_URL}/get-by-id/${id}`);
		return response.data;
	} catch (error) {
		console.error("Error fetching data point by ID:", error);
		throw error;
	}
};
