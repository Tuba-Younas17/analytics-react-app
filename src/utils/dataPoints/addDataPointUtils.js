import { toast } from "react-toastify"; 
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
		toast.success("Data Point Created Successfully!");

		resetForm();
	} catch (error) {
		console.error("Error creating data point:", error);
		toast.error("Failed to create data point. Check console for more.");
	}
};
