import React from "react";
import { Routes, Route } from "react-router-dom";
import DataPointManagementPage from "./components/pages/DataPointManagementPage";
import AppSidebar from "./components/layout/Sidebar";



const App = () => {
  return (
		<>
			<div className="flex h-screen">
				<AppSidebar />
				<div className="flex-1 p-4 overflow-auto">
					<Routes>
						<Route path="/" element={<DataPointManagementPage />} />
						{/* Add more routes here */}
					</Routes>
				</div>
			</div>
		</>
  );
};

export default App;
