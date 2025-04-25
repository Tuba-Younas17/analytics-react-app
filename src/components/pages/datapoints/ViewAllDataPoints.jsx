import React, { useEffect, useState } from "react";
import { Button, Card } from "flowbite-react";
import SkeletonLoader from "../../layout/SkeletonLoader";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import deleteDataPointById from "../../../utils/dataPoints/deleteDataPointById";
import fetchAllDataPoints from "../../../utils/dataPoints/fetchAllDataPoints";

const ViewAllDataPoints = () => {
	const [dataPoints, setDataPoints] = useState([]);
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const loadData = async () => {
			const data = await fetchAllDataPoints();
			console.log(data)
			setDataPoints(data);
			setLoading(false);
		};
		loadData();
	}, []);

	const handleDelete = async (id) => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this data point?"
		);
		if (!confirmDelete) return;

		const isDeleted = await deleteDataPointById(id);
		if (isDeleted) {
			setDataPoints((prev) => prev.filter((dp) => dp._id !== id));
			toast.success("Data point deleted successfully!");
		} else {
			toast.error("Failed to delete data point.");
		}
	};

	const handleUpdate = (id) => {
		navigate(`/update/${id}`);
	};

	if (loading) {
		return <SkeletonLoader />;
	}

	if (dataPoints.length === 0) {
		return (
			<h1 className="text-center text-gray-600">No data points found.</h1>
		);
	}

	return (
		<>
			<ToastContainer position="top-right" autoClose={3000} />
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
				{dataPoints.map((dp) => (
					<Card key={dp._id} className="shadow-md">
						<h5 className="text-xl font-bold tracking-tight text-gray-900">
							{dp.name}
						</h5>
						<p className="text-gray-600 mb-2">
							<b>Type:</b> {dp.type}
						</p>
						<p className="text-gray-600 mb-2">
							<b>Description:</b> {dp.description}
						</p>
						<p className="text-gray-600 mb-2">
							<b>Frequency:</b> {dp.frequency}
						</p>
						<p className="text-gray-600 mb-2">
							<b>User Roles:</b> {dp.userRoles.join(", ")}
						</p>

						{/* Display the data array if needed */}
						{dp.data.length > 0 && (
							<div className="mt-4">
								<h6 className="font-semibold text-gray-800">
									Data:
								</h6>
								<ul className="text-gray-600">
									{dp.data.map((item, index) => (
										<li key={index}>
											<b>Number of Response:</b>{" "}
											{item.response}, <b>Date:</b>{" "}
											{item.date}
											{/* Directly display the numeric date */}
										</li>
									))}
								</ul>
							</div>
						)}

						<div className="flex gap-4 mt-4">
							<Button
								className="text-black-800 mb-2 bg-red-600"
								color="failure"
								size="lg"
								onClick={() => handleDelete(dp._id)}
								title="Delete"
							>
								Delete{" "}
								<FontAwesomeIcon
									icon={faTrash}
									className="ml-2"
								/>
							</Button>
							<Button
								className="text-black-800 mb-2 bg-green-600"
								color="info"
								size="lg"
								onClick={() => handleUpdate(dp._id)}
								title="Update"
							>
								Update{" "}
								<FontAwesomeIcon
									icon={faPenToSquare}
									className="ml-2"
								/>
							</Button>
						</div>
					</Card>
				))}
			</div>
		</>
	);
};

export default ViewAllDataPoints;
