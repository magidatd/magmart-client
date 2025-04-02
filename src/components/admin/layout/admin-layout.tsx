import { useState } from 'react';
import { FaBars } from 'react-icons/fa6';
import { Outlet } from 'react-router-dom';
import AdminSidebar from '@/components/admin/ui/admin-sidebar';
import AdminHeader from '../ui/admin-header';

const AdminLayout = () => {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isOpen, setIsOpen] = useState(true);

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	const toggleSideBar = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className='flex flex-col md:flex-row min-h-screen'>
			{/* Mobile Toggle Button */}
			<div className='flex md:hidden p-4 bg-gray-900 text-white z-20 sticky top-0'>
				<button onClick={toggleSidebar}>
					<FaBars size={24} />
				</button>
				<h1 className='ml-4 text-xl font-medium'>Admin Dashboard</h1>
			</div>

			{/* Overlay For Mobile Sidebar */}
			{isSidebarOpen && (
				<div
					className='fixed inset-0 z-10 bg-black/50 md:hidden'
					onClick={toggleSidebar}
				></div>
			)}

			{/* Sidebar */}
			<div
				className={`bg-gray-900 w-64 min-h-screen text-white absolute transform ${
					isOpen ? 'md:w-52' : 'md:w-0 md:overflow-hidden'
				} 
				${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} transition-transform md:translate-x-0 md:transition-all fixed z-20 duration-300`}
			>
				<AdminSidebar setIsSidebarOpen={setIsSidebarOpen} />
			</div>

			<div
				className={`flex-grow ${
					isOpen ? 'md:ml-52' : 'md:ml-0'
				}  transition-all duration-300`}
			>
				<AdminHeader toggleSideBar={toggleSideBar} />
				<Outlet />
			</div>
		</div>
	);
};

export default AdminLayout;
