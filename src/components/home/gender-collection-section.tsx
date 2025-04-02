import { Link } from 'react-router-dom';
import parser from 'html-react-parser';

interface GenderCollectionSectionProps {
	collections: {
		leftCollection: {
			name: string;
			image: { url: string; alt: string };
			link: string;
		};
		rightCollection: {
			name: string;
			image: { url: string; alt: string };
			link: string;
		};
	};
}

const GenderCollectionSection: React.FC<GenderCollectionSectionProps> = ({
	collections,
}) => {
	return (
		<section className='py-16 px-4 lg:px-0'>
			<div className='container mx-auto flex flex-col md:flex-row gap-8'>
				{/* Left Collection */}
				<div className='relative flex-1'>
					<img
						src={collections.leftCollection.image.url}
						alt={
							typeof collections.leftCollection.image.alt === 'string'
								? collections.leftCollection.image.alt
								: ''
						}
						className='w-full h-[700px] object-cover'
					/>
					<div className='absolute bottom-8 left-8 bg-white/90 p-4'>
						<h2 className='text-2xl font-bold text-gray-900 mb-3'>
							{parser(collections.leftCollection.name)}
						</h2>
						<Link
							to='/collections/all?gender=Women'
							className='text-gray-900 underline'
						>
							{collections.leftCollection.link}
						</Link>
					</div>
				</div>
				{/* Right Collection */}
				<div className='relative flex-1'>
					<img
						src={collections.rightCollection.image.url}
						alt={
							typeof collections.rightCollection.image.alt === 'string'
								? collections.rightCollection.image.alt
								: ''
						}
						className='w-full h-[700px] object-cover'
					/>
					<div className='absolute bottom-8 left-8 bg-white/90 p-4'>
						<h2 className='text-2xl font-bold text-gray-900 mb-3'>
							{parser(collections.rightCollection.name)}
						</h2>
						<Link
							to='/collections/all?gender=Men'
							className='text-gray-900 underline'
						>
							{collections.rightCollection.link}
						</Link>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GenderCollectionSection;
