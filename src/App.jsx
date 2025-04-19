import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import the styles for toast notifications

import DataPointManagementPage from "./components/pages/datapoints/DataPointManagementPage";
import AppSidebar from "./components/layout/Sidebar";
import ViewAllDataPoints from "./components/pages/datapoints/ViewAllDataPoints";
import UpdateDataPoint from "./components/pages/datapoints/UpdateDataPoint";
import AssignTemplateForm from "./components/pages/template/AssignTemplateForm";
import AddTemplateForm from "./components/pages/template/AddTemplateForm";

const App = () => {
	return (
		<>
			<div className="flex h-screen">
				<AppSidebar />
				<div className="flex-1 p-4 overflow-auto">
					<Routes>
						<Route exact path="/" element={<DataPointManagementPage />} />
						<Route exact path="/view-all-data-points" element={<ViewAllDataPoints />} />
						<Route exact path="/update/:id" element={<UpdateDataPoint />} />
						<Route exact path="/assign-template-form" element={<AssignTemplateForm />} />
						<Route exact path="/add-template-form" element={<AddTemplateForm />} />
						
					</Routes>
				</div>
			</div>

			{/* Add ToastContainer for global toast notifications */}
		<ToastContainer
	position="top-right"
	autoClose={3000}
	hideProgressBar={false}
	newestOnTop
	closeOnClick
	pauseOnHover={false}
	draggable
/>

		</>
	);
};

export default App;
