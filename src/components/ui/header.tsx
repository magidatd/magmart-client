import Navbar from '@/components/ui/navbar';
import Topbar from '@/components/ui/topbar';
import GlobalBanner from '@/components/ui/global-banner';

const Header = () => {
	return (
		<div className='border-b border-gray-200'>
			<Topbar />
			<Navbar />
			<GlobalBanner />
		</div>
	);
};

export default Header;
