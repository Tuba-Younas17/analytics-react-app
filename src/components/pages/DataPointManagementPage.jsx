import React from "react";
import DataPointForm from "./DataPointForm";


const DataPointManagementPage = () => {
    return (
		<>
			<div className="flex min-h-screen bg-gray-50">
				{/* Main Content */}
				<div className="flex-1 p-6">
					<DataPointForm/>
				</div>
			</div>
		</>
	);
};

export default DataPointManagementPage;
