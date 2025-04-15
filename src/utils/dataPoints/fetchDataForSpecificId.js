import { getDataPointById } from "../../service/dataPointService/getDataPointById";

export const fetchDataForSpecificId = async (
	id,
	setInitialValues,
	setIsMultiColumn
) => {
	try {
		const dp = await getDataPointById(id);
		setIsMultiColumn(dp.columns && parseInt(dp.columns) > 1);

		setInitialValues({
			name: dp.name || "",
			type: dp.type || "Text Field", 
			description: dp.description || "", 
			columns: dp.columns || "1", 
		});
	} catch (err) {
		console.error("Error fetching data point:", err);
		throw err; 
	}
};
