import React, { useState } from "react";
import {
	Sidebar,
	SidebarItem,
	SidebarItems,
	SidebarItemGroup,
} from "flowbite-react";
import {
	HiChartPie,
	HiViewBoards,
	HiUsers,
	HiUserCircle,
	HiUserGroup,
	HiDatabase,
	HiFolderAdd,
	HiOutlineMenuAlt2,
} from "react-icons/hi";

const AppSidebar = ({ children }) => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarOpen((prev) => !prev);
	};

	return (
		<div className="flex min-h-screen">
			{/* Sidebar */}
			<div
				className={`transition-all duration-300 ${
					isSidebarOpen ? "w-20 md:w-64" : "w-0"
				} overflow-hidden bg-white shadow-md`}
			>
				<Sidebar aria-label="Sidebar" className="h-full">
					<SidebarItems className="py-6">
						<SidebarItemGroup className="space-y-6">
							<SidebarItem href="/" icon={HiDatabase}>
								<span className="hidden md:inline">
									Data Points
								</span>
							</SidebarItem>
							<SidebarItem
								href="/assign-template-form"
								icon={HiFolderAdd}
							>
								<span className="hidden md:inline">
									Collections
								</span>
							</SidebarItem>
							<SidebarItem href="/create-chart" icon={HiChartPie}>
								<span className="hidden md:inline">Charts</span>
							</SidebarItem>
							<SidebarItem href="/dashBoard" icon={HiViewBoards}>
								<span className="hidden md:inline">
									Dashboards
								</span>
							</SidebarItem>
							<SidebarItem href="/userGroup" icon={HiUserGroup}>
								<span className="hidden md:inline">
									User Groups
								</span>
							</SidebarItem>
							<SidebarItem href="/user" icon={HiUsers}>
								<span className="hidden md:inline">Users</span>
							</SidebarItem>
							<SidebarItem href="#" icon={HiUserCircle}>
								<span className="hidden md:inline">Admins</span>
							</SidebarItem>
						</SidebarItemGroup>
					</SidebarItems>
				</Sidebar>
			</div>

			{/* Main Content */}
			<div className="flex-1 relative">
				{/* Menu Button */}
				<button
					className="absolute top-4 left-4 z-10 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition"
					onClick={toggleSidebar}
				>
					<HiOutlineMenuAlt2 className="h-6 w-6 text-gray-700" />
				</button>

				{/* Actual content */}
				<div className="p-6">{children}</div>
			</div>
		</div>
	);
};

export default AppSidebar;
