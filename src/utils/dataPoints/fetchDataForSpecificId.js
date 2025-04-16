import { getDataPointById } from "../../service/dataPointService/getDataPointById";

export const fetchDataForSpecificId = async (id, setInitialValues) => {
	try {
		const dp = await getDataPointById(id);

		setInitialValues({
			name: dp.name || "",
			type: dp.type || "Text Field",
			description: dp.description || "",
			frequency: dp.frequency || "Daily",
			userRoles: dp.userRoles || [],
			date: dp.date ? dp.date.split("T")[0] : "", // Extract yyyy-mm-dd if needed
		});
	} catch (err) {
		console.error("Error fetching data point:", err);
		throw err;
	}
};
