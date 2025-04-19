import axios from "axios";

export const fetchDataPoints = async (setDataPointOptions,toast) => {
	try {
		const res = await axios.get(
			"http://127.0.0.1:3000/api/v1/datapoint/get-all-data-point"
		);
		const options = res.data.map((dp) => ({
			value: dp._id, // <-- ✅ Send _id instead of name
			label: dp.name, // <-- ✅ Display name in the dropdown
		}));
		setDataPointOptions(options);
	} catch (error) {
		console.error("Failed to fetch data points:", error);
		toast.error("Failed to load data points");
	}
};