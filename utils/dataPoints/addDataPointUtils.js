import { addDatapointService } from "../../service/dataPointService/addDataPointService";

export const handleDatapointSubmit = async (
	formData,
	isMultiColumn,
	resetForm
) => {
	try {
		const payload = {
			...formData,
			isMultiColumn,
		};

		const data = await addDatapointService(payload);

		console.log("Data Point Created:", data);
		alert("Data Point Created Successfully!");
		resetForm();
	} catch (error) {
		console.error("Error creating data point:", error);
		alert("Failed to create data point. Check console for more.");
	}
};
