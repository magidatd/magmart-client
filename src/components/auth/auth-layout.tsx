import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
	return (
		<>
			<main className='h-dvh'>
				{/* Content */}
				<Outlet />
			</main>
		</>
	);
};

export default AuthLayout;
