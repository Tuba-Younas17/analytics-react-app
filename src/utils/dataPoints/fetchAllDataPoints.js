import axios from "axios";
import { END_POINTS } from "../../constants/urls";

const fetchAllDataPoints = async () => {
	try {
		const response = await axios.get(
			// "http://127.0.0.1:3000/api/v1/datapoint/get-all-data-point"
			END_POINTS.DATAPOINT.GET_ALL_DATA_POINTS
		);
		return response.data || [];
	} catch (error) {
		console.error("Error fetching data points:", error);
		return [];
	}
};

export default fetchAllDataPoints;
