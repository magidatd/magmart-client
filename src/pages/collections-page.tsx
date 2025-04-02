import FilterSidebar from '@/components/products/filter-sidebar';
import ProductGrid from '@/components/products/product-grid';
import SortOptions from '@/components/products/sort-options';
import { fetchedProducts } from '@/data/products';
import { useEffect, useRef, useState } from 'react';
import { FaFilter } from 'react-icons/fa6';

const CollectionsPage = () => {
	interface Product {
		id: string;
		name: string;
		price: number;
		image: string;
		altText: string;
	}

	const [products, setProducts] = useState<Product[]>([]);
	const sidebarRef = useRef<HTMLDivElement>(null);
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);

	const handleClickOutside = (e: MouseEvent | TouchEvent) => {
		// Close sidebar if clicked outside
		if (sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
			setIsSidebarOpen(false);
		}
	};

	const toggleSidebar = () => {
		setIsSidebarOpen(!isSidebarOpen);
	};

	useEffect(() => {
		// Add event listener for clicks
		document.addEventListener('mousedown', handleClickOutside, true);
		document.addEventListener('touchstart', handleClickOutside, true);
		document.addEventListener('click', handleClickOutside, true);
		// clean event listener
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
			document.removeEventListener('touchend', handleClickOutside);
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

	useEffect(() => {
		setTimeout(() => {
			setProducts(fetchedProducts);
		}, 1000);
	}, []);

	return (
		<div className='flex flex-col lg:flex-row'>
			{/* Mobile button */}
			<button
				onClick={toggleSidebar}
				className='lg:hidden border p-2 flex items-center justify-center'
			>
				<FaFilter className='mr-2' /> Filters
			</button>

			{/* Filter Sidebar */}
			<div
				ref={sidebarRef}
				className={`${
					isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
				} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
			>
				<FilterSidebar />
			</div>
			<div className='flex-grow p-4'>
				<h2 className='text-2xl uppercase mb-4'>All collection</h2>
				{/* Sort Options */}
				<SortOptions />
				{/* Product Grid */}
				<ProductGrid products={products} />
			</div>
		</div>
	);
};

export default CollectionsPage;
