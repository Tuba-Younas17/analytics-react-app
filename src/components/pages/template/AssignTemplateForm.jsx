import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import Select from "react-select";
import { FiSend, FiPlus } from "react-icons/fi"; // Added FiPlus for Add button
import { useNavigate } from "react-router-dom";
import SkeletonLoader from "../../layout/SkeletonLoader";

import { fetchData } from "../../../utils/template/fetchDataForAssignTemplateUtils";
import { handleSubmitAssignTemplate } from "../../../service/tempateService/handleSubmitAssignTemplate";


const AssignTemplateForm = () => {
	const [templates, setTemplates] = useState([]);
	const [userGroups, setUserGroups] = useState([]);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate(); // hook for navigation

  useEffect(() => {
		fetchData(setTemplates, setUserGroups);
  }, []);

	const formik = useFormik({
		initialValues: {
			templates: [],
			userGroup: "",
			cycle: "",
		},
		validationSchema: Yup.object({
			templates: Yup.array().min(1, "Select at least one template"),
			userGroup: Yup.string().required("User group is required"),
			cycle: Yup.string().required("Cycle is required"),
		}),
		onSubmit: (values) => {
			handleSubmitAssignTemplate(
				values,
				setLoading,
				formik
			);
		},
	});

	const templateOptions = templates.map((t) => ({
		label: t.title,
		value: t._id,
	}));

	if (loading) return <SkeletonLoader />;

	return (
		<div className="max-w-4xl mx-auto mt-10 p-8 bg-white shadow-lg rounded-lg border border-gray-200">
			<div className="flex justify-between items-center mb-6">
				<h2 className="text-3xl font-bold text-blue-700">
					Assign Data Collection Template
				</h2>
				<button
					onClick={() => navigate("/add-template-form")}
					className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md shadow"
				>
					<FiPlus />
					Add Template
				</button>
			</div>
			<form onSubmit={formik.handleSubmit} className="space-y-6">
				{/* Templates Dropdown */}
				<div>
					<label className="block font-medium text-gray-700 mb-1">
						Select Templates
					</label>
					<Select
						isMulti
						name="templates"
						options={templateOptions}
						value={formik.values.templates}
						onChange={(selected) =>
							formik.setFieldValue("templates", selected)
						}
						className="react-select-container"
						classNamePrefix="react-select"
						placeholder="Choose templates..."
					/>
					{formik.errors.templates && formik.touched.templates && (
						<p className="text-red-500 text-sm mt-1">
							{formik.errors.templates}
						</p>
					)}
				</div>

				{/* User Group */}
				<div>
					<label
						htmlFor="userGroup"
						className="block font-medium text-gray-700 mb-1"
					>
						Select User Group
					</label>
					<select
						id="userGroup"
						name="userGroup"
						value={formik.values.userGroup}
						onChange={formik.handleChange}
						className="w-full p-2 border border-gray-300 rounded-md"
					>
						<option value="">Select a user group</option>
						{userGroups.map((group) => (
							<option key={group._id} value={group._id}>
								{group.name}
							</option>
						))}
					</select>
					{formik.errors.userGroup && formik.touched.userGroup && (
						<p className="text-red-500 text-sm mt-1">
							{formik.errors.userGroup}
						</p>
					)}
				</div>

				{/* Cycle */}
				<div>
					<label
						htmlFor="cycle"
						className="block font-medium text-gray-700 mb-1"
					>
						Select Data Collection Cycle
					</label>
					<select
						id="cycle"
						name="cycle"
						value={formik.values.cycle}
						onChange={formik.handleChange}
						className="w-full p-2 border border-gray-300 rounded-md"
					>
						<option value="">Select a cycle</option>
						<option value="Hourly">Hourly</option>
						<option value="Daily">Daily</option>
						<option value="Weekly">Weekly</option>
						<option value="Monthly">Monthly</option>
						<option value="Quarterly">Quarterly</option>
						<option value="Bi-Annually">Bi-Annually</option>
						<option value="Yearly">Yearly</option>
					</select>
					{formik.errors.cycle && formik.touched.cycle && (
						<p className="text-red-500 text-sm mt-1">
							{formik.errors.cycle}
						</p>
					)}
				</div>

				{/* Submit Button */}
				<div className="flex justify-end">
					<button
						type="submit"
						disabled={loading}
						className={`flex items-center gap-2 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm transition duration-200 ${
							loading ? "opacity-50 cursor-not-allowed" : ""
						}`}
					>
						<FiSend className="text-lg" />
						{loading ? "Assigning..." : "Assign Template"}
					</button>
				</div>
			</form>
		</div>
	);
};

export default AssignTemplateForm;
