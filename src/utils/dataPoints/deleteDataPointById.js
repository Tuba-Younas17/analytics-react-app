import axios from "axios";
import { END_POINTS } from "../../constants/urls";

const deleteDataPointById = async (id) => {
	try {
		await axios.delete(
			`${END_POINTS.DATAPOINT.DELETE_DATA_POINT_BY_ID}${id}`
		);
		return true;
	} catch (error) {
		console.error("Error deleting data point:", error);
		return false;
	}
};

export default deleteDataPointById;
