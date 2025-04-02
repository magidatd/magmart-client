import SearchBar from '@/components/ui/search-bar';
import { FaBars } from 'react-icons/fa6';
import { HiOutlineUser } from 'react-icons/hi2';
import { Link } from 'react-router-dom';

interface AdminHeaderProps {
	toggleSideBar: () => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ toggleSideBar }) => {
	return (
		<nav className='hidden md:block bg-gray-300 sticky top-0'>
			<div className='container mx-auto flex flex-col space-y-2 md:space-y-0 md:flex-row items-center justify-between py-4 px-6'>
				{/* Left - Logo */}
				<div className='flex items-center gap-4'>
					<button onClick={toggleSideBar}>
						<FaBars size={24} />
					</button>
					<Link
						to='/'
						className='text-2xl font-medium'
					>
						MagMart
					</Link>
				</div>

				{/* Right - Icons */}
				<div className='flex items-center space-x-4'>
					<Link
						to='/'
						className='block bg-black px-2 rounded text-sm text-white'
					>
						Shop
					</Link>
					<Link
						to='/profile'
						className='hover:text-black'
					>
						<HiOutlineUser className='h-6 w-6 text-gray-700' />
					</Link>

					{/* Search */}
					<div className='overflow-hidden'>
						<SearchBar />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default AdminHeader;
