
import axios from "axios";

export const addDatapointService = async (payload) => {
	const response = await axios.post(
		"http://127.0.0.1:3000/api/v1/datapoint/add",
		payload
	);
	return response.data;
};
