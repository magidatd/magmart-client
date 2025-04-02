import { Outlet } from 'react-router-dom';
import Header from '@/components/ui/header';
import Footer from '@/components/ui/footer';

const UserLayout = () => {
	return (
		<>
			{/* Header */}
			<Header />
			{/* Main */}
			<main>
				{/* Content */}
				<Outlet />
			</main>
			{/* Footer */}
			<Footer />
		</>
	);
};

export default UserLayout;
