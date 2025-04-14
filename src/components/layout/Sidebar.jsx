// src/components/layout/Sidebar.jsx
import React from "react";
import {
	Sidebar,
	SidebarItem,
	SidebarItems,
	SidebarItemGroup,
} from "flowbite-react";
import {
	HiCollection,
	HiChartPie,
	HiViewBoards,
	HiUsers,
	HiUserCircle,
	HiUserGroup,
} from "react-icons/hi";

const AppSidebar = () => {
	return (
		<Sidebar
			aria-label="Sidebar"
			className="h-screen w-64 min-w-fit bg-white shadow-md"
		>
			<SidebarItems className="py-6">
				<SidebarItemGroup className="space-y-6">
					<SidebarItem href="#" icon={HiCollection}>
						Data Points
					</SidebarItem>
					<SidebarItem href="#" icon={HiChartPie}>
						Charts
					</SidebarItem>
					<SidebarItem href="#" icon={HiViewBoards}>
						Dashboards
					</SidebarItem>
					<SidebarItem href="#" icon={HiUserGroup}>
						User Groups
					</SidebarItem>
					<SidebarItem href="#" icon={HiUsers}>
						Users
					</SidebarItem>
					<SidebarItem href="#" icon={HiUserCircle}>
						Admins
					</SidebarItem>
				</SidebarItemGroup>
			</SidebarItems>
		</Sidebar>
	);
};

export default AppSidebar;
