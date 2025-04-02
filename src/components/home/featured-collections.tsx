import parser from 'html-react-parser';
import { featuredCollection } from '@/data/home-data';
import { Link } from 'react-router-dom';

const FeaturedCollections = () => {
	return (
		<section className='py-16 px-4 lg:px-0'>
			<div className='container mx-auto flex flex-col-reverse lg:flex-row items-center bg-green-50 rounded-3xl'>
				{/* Left Content */}
				<div className='lg:w-1/2 p-8 text-center lg:text-left'>
					<h2 className='text-lg font-semibold text-gray-700 mb-2'>
						{parser(featuredCollection.header1)}
					</h2>
					<h2 className='text-4xl lg:text-5xl font-bold mb-6'>
						{parser(featuredCollection.header2)}
					</h2>
					<p className='text-lg text-gray-600 mb-6'>
						{parser(featuredCollection.paragraph)}
					</p>
					<Link
						to='/collections/all'
						className='bg-black text-white px-6 py-3 rounded-lg text-lg hover:bg-gray-800'
					>
						Shop Now
					</Link>
				</div>
				{/* Right Content */}
				<div className='lg:w-1/2'>
					<img
						src={featuredCollection.image.url}
						alt={featuredCollection.image.alt}
						className='w-full h-full object-cover lg:rounded-tr-3xl lg:rounded-br-3xl'
					/>
				</div>
			</div>
		</section>
	);
};

export default FeaturedCollections;
