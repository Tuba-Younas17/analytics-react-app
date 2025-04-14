
import axios from "axios";
import { END_POINTS } from "../../constants/urls";

export const addDatapointService = async (payload) => {
	const response = await axios.post(
		// "http://127.0.0.1:3000/api/v1/datapoint/add",
		END_POINTS.DATAPOINT.ADD_DATA_POINT,
		payload
	);
	return response.data;
};
