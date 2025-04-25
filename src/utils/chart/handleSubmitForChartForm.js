// utils/chart/handleSubmitForChartForm.js
import { toast } from "react-toastify";
import addChartService from "../../service/chart/addChartService";

const handleSubmitForChartForm = async (
	values,
	{ resetForm },
	pivoted,
	setPivoted
) => {
	try {
		// Loop through selected chart types and call the addChartService for each chart type
		for (const chartType of values.selectedCharts) {
			await addChartService({
				dataPointId: values.selectedDataPointId,
				xAxis: values.xAxis,
				yAxis: values.yAxis,
				chartType,
				title: values.title,
				pivoted,
				pivotValue: pivoted ? values.pivotValue : null,
			});

		}

		toast.success("Chart(s) created successfully!");
		resetForm();
		setPivoted(false);
	} catch (err) {
		toast.error("Failed to create charts. Please try again.");
		console.error(err);
	}
};

export default handleSubmitForChartForm;
