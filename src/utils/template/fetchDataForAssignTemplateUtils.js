import { fetchDataForAssignTemplateForm } from "../../service/tempateService/fetchDataForAssignTemplateForm";

export const fetchData = async (setTemplates, setUserGroups) => {
	try {
		const { templates, userGroups } =
			await fetchDataForAssignTemplateForm();
		setTemplates(templates);
		setUserGroups(userGroups);
	} catch (error) {
		console.error("Error fetching data in component:", error);
	}
};