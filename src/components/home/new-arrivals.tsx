import { useEffect, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

interface NewArrivalsProps {
	newArrivals: {
		id: string;
		name: string;
		price: number;
		images: { url: string; altText: string }[];
	}[];
}

const NewArrivals: React.FC<NewArrivalsProps> = ({ newArrivals }) => {
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isDragging, setIsDragging] = useState(false);
	const [startX, setStartX] = useState(0);
	const [scrollLeft, setScrollLeft] = useState<number>(0);
	const [canScrollRight, setCanScrollRight] = useState(true);
	const [canScrollLeft, setCanScrollLeft] = useState(false);

	const scroll = (direction: string) => {
		const scrollAmount = direction === 'left' ? -300 : 300;
		if (scrollRef.current) {
			scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
		}
	};

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
		setIsDragging(true);
		if (scrollRef.current) {
			setStartX(e.pageX - scrollRef.current.offsetLeft);
		}
		if (scrollRef.current?.scrollLeft !== undefined) {
			setScrollLeft(scrollRef.current.scrollLeft);
		}
	};

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (!isDragging) return;
		const x = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
		const walk = x - startX;
		if (scrollRef.current) {
			scrollRef.current.scrollLeft = scrollLeft - walk;
		}
	};

	const handleMouseUpOrLeave = () => {
		setIsDragging(false);
	};

	const updateScrollButtons = () => {
		const container = scrollRef.current;

		if (container) {
			const leftScroll = container.scrollLeft;
			const rightScrollable =
				container.scrollWidth > leftScroll + container.clientWidth;

			setCanScrollLeft(leftScroll > 0);
			setCanScrollRight(rightScrollable);
		}

		/* console.log({
			scrollLeft: container?.scrollLeft,
			clientWidth: container?.clientWidth,
			containerScrollWidth: container?.scrollWidth,
			offsetLeft: scrollRef.current?.offsetLeft,
		}); */
	};

	useEffect(() => {
		const container = scrollRef.current;
		if (container) {
			container.addEventListener('scroll', updateScrollButtons);
			updateScrollButtons();
		}

		return () => container?.removeEventListener('scroll', updateScrollButtons);
	}, []);

	return (
		<section className='py-16 px-4 lg:px-0'>
			<div className='container mx-auto text-center mb-10 relative'>
				<h2 className='text-3xl font-bold mb-1 md:mb-4'>Explore New Arrivals</h2>
				<p className='text-md md:text-lg text-gray-600 mb-12'>
					Discover the latest styles straight off the runway, freshly added to keep
					your wardrobe on the cutting edge of fashion.
				</p>
				{/* Scroll Buttons */}
				<div className='absolute right-0 bottom-[-40px] flex space-x-2'>
					<button
						onClick={() => scroll('left')}
						disabled={!canScrollLeft}
						className={`p-2 rounded border ${
							canScrollLeft ? 'bg-white text-black' : 'bg-gray-200 text-gray-400'
						}`}
					>
						<FiChevronLeft className='sm:text-xl text-2xl' />
					</button>
					<button
						onClick={() => scroll('right')}
						disabled={!canScrollRight}
						className={`p-2 rounded border ${
							canScrollRight ? 'bg-white text-black' : 'bg-gray-200 text-gray-400'
						}`}
					>
						<FiChevronRight className='sm:text-xl text-2xl' />
					</button>
				</div>
			</div>

			{/* Scrollable Content */}
			<div
				ref={scrollRef}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUpOrLeave}
				onMouseLeave={handleMouseUpOrLeave}
				className={`container mx-auto overflow-x-scroll flex space-x-6 relative shadow rounded-lg ${
					isDragging ? 'cursor-grabbing' : 'cursor-grab'
				}`}
			>
				{newArrivals.map((product) => (
					<div
						key={product.id}
						className='min-w-[100%] sm:min-w-[50%] lg:min-w-[30%] relative'
					>
						<img
							src={product.images[0]?.url}
							alt={product.images[0]?.altText || product.name}
							draggable='false'
							className='w-full h-[500px] object-cover rounded-lg'
						/>
						<div
							className='absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-md 
						text-white p-4 rounded-b-lg'
						>
							<Link
								to={`/product/${product.id}`}
								className='block'
							>
								<h4 className='font-medium capitalize'>{product.name}</h4>
								<p className='mt-1'>${product.price}</p>
							</Link>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default NewArrivals;
