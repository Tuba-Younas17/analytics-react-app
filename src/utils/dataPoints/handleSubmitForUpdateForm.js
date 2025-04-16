
import { toast } from "react-toastify";
import { updateDataPointById } from "../../service/dataPointService/updateDataPointById";
export const handleSubmitForUpdateForm = async (id, values, navigate) => {
	try {
		console.log("Submitted values:", values); // 👈 Add this line
		await updateDataPointById(id, values);
		toast.success("Data point updated successfully!");
		setTimeout(() => {
			navigate("/view-all-data-points");
		}, 2000);
	} catch (err) {
		console.error("Update failed:", err);
		toast.error("Failed to update data point. Please try again.");
	}
};