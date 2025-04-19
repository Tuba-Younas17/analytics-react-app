// src/services/template/handleSubmitAssignTemplateService.js

import axios from "axios";
import { toast } from "react-toastify";

const API_URL = "http://127.0.0.1:3000/api/v1/template/assign-template";

export const handleSubmitAssignTemplate = async (values, setLoading, formik) => {
	setLoading(true);
	try {
		const payload = {
			templates: values.templates.map((t) => t.value),
			userGroup: values.userGroup,
			cycle: values.cycle,
		};
		await axios.post(API_URL, payload);
		toast.success("Template assigned successfully!", { autoClose: 3000 });
		formik.resetForm();
	} catch (error) {
		console.error("Error assigning template:", error);
		toast.error("Error assigning template!");
	} finally {
		setLoading(false);
	}
};


