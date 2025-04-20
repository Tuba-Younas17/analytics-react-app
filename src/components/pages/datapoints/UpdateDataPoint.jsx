import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faBan } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Select from "react-select";
import {
	Button,
	Label,
	TextInput,
	Textarea,
	Select as FlowbiteSelect,
} from "flowbite-react";
import { Formik } from "formik";
import * as Yup from "yup";
import SkeletonLoader from "../../layout/SkeletonLoader";
import { fetchDataForSpecificId } from "../../../utils/dataPoints/fetchDataForSpecificId";
import { handleSubmitForUpdateForm } from "../../../utils/dataPoints/handleSubmitForUpdateForm";
import {
	frequencyOptions,
	userRoleOptions,
} from "../../../constants/roleAndFrequencyConstants";

const UpdateDataPoint = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const [initialValues, setInitialValues] = useState(null);

	const validationSchema = Yup.object({
		name: Yup.string().required("Name is required"),
		type: Yup.string().required("Type is required"),
		description: Yup.string().required("Description is required"),
		frequency: Yup.string().required("Frequency is required"),
		userRoles: Yup.array().min(1, "Select at least one role"),
	});

	useEffect(() => {
		fetchDataForSpecificId(id, setInitialValues);
	}, [id]);

	if (!initialValues) return <SkeletonLoader />;

	return (
		<div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg p-8 rounded-lg">
			<h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
				Update Data Point
			</h2>
			<ToastContainer position="top-center" autoClose={2000} />

			<Formik
				initialValues={initialValues}
				validationSchema={validationSchema}
				onSubmit={(values) =>
					handleSubmitForUpdateForm(id, values, navigate)
				}
				enableReinitialize
			>
				{({
					values,
					handleChange,
					handleSubmit,
					errors,
					touched,
					handleBlur,
					setFieldValue,
				}) => (
					<form onSubmit={handleSubmit} className="space-y-6">
						{/* Name */}
						<div>
							<Label htmlFor="name" value="Data Point Name" />
							<TextInput
								id="name"
								name="name"
								placeholder="Enter name"
								value={values.name}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.name && errors.name && (
								<p className="text-red-500 text-sm mt-1">
									{errors.name}
								</p>
							)}
						</div>

						{/* Type */}
						<div>
							<Label htmlFor="type" value="Data Point Type" />
							<FlowbiteSelect
								id="type"
								name="type"
								value={values.type}
								onChange={handleChange}
								onBlur={handleBlur}
							>
								<option value="">Select Type</option>
								<option value="Text Field">Text Field</option>
								<option value="Number">Number</option>
								<option value="Date">Date</option>
								
							</FlowbiteSelect>
							{touched.type && errors.type && (
								<p className="text-red-500 text-sm mt-1">
									{errors.type}
								</p>
							)}
						</div>

						{/* Description */}
						<div>
							<Label htmlFor="description" value="Description" />
							<Textarea
								id="description"
								name="description"
								placeholder="Write something..."
								rows={4}
								value={values.description}
								onChange={handleChange}
								onBlur={handleBlur}
							/>
							{touched.description && errors.description && (
								<p className="text-red-500 text-sm mt-1">
									{errors.description}
								</p>
							)}
						</div>

						{/* Frequency */}
						<div>
							<Label htmlFor="frequency" value="Frequency" />
							<Select
								id="frequency"
								name="frequency"
								options={frequencyOptions}
								value={frequencyOptions.find(
									(opt) => opt.value === values.frequency
								)}
								onChange={(option) =>
									setFieldValue("frequency", option.value)
								}
								onBlur={handleBlur}
							/>
							{touched.frequency && errors.frequency && (
								<p className="text-red-500 text-sm mt-1">
									{errors.frequency}
								</p>
							)}
						</div>

						{/* User Roles */}
						<div>
							<Label htmlFor="userRoles" value="User Roles" />
							<Select
								id="userRoles"
								name="userRoles"
								isMulti
								options={userRoleOptions}
								value={userRoleOptions.filter((opt) =>
									values.userRoles.includes(opt.value)
								)}
								onChange={(selected) => {
									const roles = selected.map(
										(opt) => opt.value
									);
									setFieldValue("userRoles", roles);
								}}
								onBlur={handleBlur}
							/>
							{touched.userRoles && errors.userRoles && (
								<p className="text-red-500 text-sm mt-1">
									{errors.userRoles}
								</p>
							)}
						</div>

						{/* Buttons */}
						<div className="flex justify-between mt-6">
							<Button color="blue" type="submit">
								<FontAwesomeIcon
									icon={faPenToSquare}
									className="mr-2"
								/>
								Update Data Point
							</Button>
							<Button
								color="gray"
								onClick={() =>
									navigate("/view-all-data-points")
								}
							>
								<FontAwesomeIcon
									icon={faBan}
									className="mr-2"
								/>
								Cancel
							</Button>
						</div>
					</form>
				)}
			</Formik>
		</div>
	);
};

export default UpdateDataPoint;
