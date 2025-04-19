// src/services/templateService.js

import axios from "axios";

const API_URL = "http://127.0.0.1:3000/api/v1";

export const fetchDataForAssignTemplateForm = async () => {
	try {
		const [templateRes, userGroupRes] = await Promise.all([
			axios.get(`${API_URL}/template/get-all-template`),
			axios.get(`${API_URL}/users/get-all-user-groups`),
		]);
		return {
			templates: templateRes.data.data,
			userGroups: userGroupRes.data.data,
		};
	} catch (error) {
		console.error("Error fetching data in templateService:", error);
		throw error; // Re-throw the error to be handled in the component
	}
};


