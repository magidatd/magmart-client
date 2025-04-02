import {
	brands,
	categories,
	colours,
	genders,
	materials,
	minMaxValues,
	sizes,
} from '@/data/filter-sidebar-data';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FilterSidebar = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	const navigate = useNavigate();

	const [filters, setFilters] = useState<{
		category: string;
		gender: string;
		colour: string;
		size: string[];
		material: string[];
		brand: string[];
		minPrice: number;
		maxPrice: number;
	}>({
		category: '',
		gender: '',
		colour: '',
		size: [],
		material: [],
		brand: [],
		minPrice: minMaxValues.min,
		maxPrice: minMaxValues.max,
	});
	const [priceRange, setPriceRange] = useState([
		minMaxValues.min,
		minMaxValues.max,
	]);

	useEffect(() => {
		const params = Object.fromEntries([...searchParams]);

		setFilters({
			category: params.category || '',
			gender: params.gender || '',
			colour: params.colour || '',
			size: params.size ? params.size.split(',') : [],
			material: params.material ? params.material.split(',') : [],
			brand: params.brand ? params.brand.split(',') : [],
			minPrice: parseFloat(params.minPrice) || 0,
			maxPrice: parseFloat(params.maxPrice) || 100,
		});

		setPriceRange([0, parseFloat(params.maxPrice) || 100]);
	}, [searchParams]);

	const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value, checked, type } = e.target;

		const newFilters = { ...filters };

		if (type === 'checkbox') {
			if (checked) {
				if (name in newFilters) {
					(newFilters[name as keyof typeof filters] as string[]).push(value);
				}
			} else {
				(newFilters[name as keyof typeof filters] as string[]) = (
					newFilters[name as keyof typeof filters] as string[]
				).filter((item) => item !== value);
			}
		} else {
			if (name === 'category' || name === 'gender') {
				newFilters[name] = value;
			} else if (name === 'minPrice' || name === 'maxPrice') {
				newFilters[name] = parseFloat(value);
			} else {
				if (name in newFilters) {
					(newFilters[name as keyof typeof filters] as string[]) = [value];
				}
			}
		}

		setFilters(newFilters);
		updateURLParams(newFilters);
	};

	const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
		const value = e.currentTarget.value;

		const newFilters = { ...filters, colour: value };

		setFilters(filters);
		updateURLParams(newFilters);
	};

	const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newPrice = e.target.value;

		setPriceRange([0, parseFloat(newPrice)]);

		const newFilters = {
			...filters,
			minPrice: minMaxValues.min,
			maxPrice: parseFloat(newPrice),
		};

		setFilters(filters);
		updateURLParams(newFilters);
	};

	const updateURLParams = (newFilters: typeof filters) => {
		const params = new URLSearchParams();

		Object.keys(newFilters).forEach((key) => {
			if (
				Array.isArray(newFilters[key as keyof typeof filters]) &&
				(newFilters[key as keyof typeof filters] as string).length > 0
			) {
				params.append(
					key,
					(newFilters[key as keyof typeof filters] as string[]).join(','),
				);
			} else if (newFilters[key as keyof typeof filters]) {
				params.append(key, newFilters[key as keyof typeof filters] as string);
			}
		});

		setSearchParams(params);
		navigate({ pathname: '/collections/all', search: `?${params.toString()}` });
	};

	return (
		<div className='p-4'>
			<h3 className='text-xl font-medium text-gray-800 mb-4'>Filter</h3>
			<div className='mb-6'>
				<label className='block text-gray-600 font-medium mb-2'>Category</label>
				{categories.map((category) => (
					<div
						key={category}
						className='flex items-center mb-1'
					>
						<input
							type='radio'
							name='category'
							value={category}
							onChange={handleFilterChange}
							checked={filters.category === category}
							className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
						/>
						<span className='text-gray-700'>{category}</span>
					</div>
				))}
			</div>
			{/* Gender Filter */}
			<div className='mb-6'>
				<label className='block text-gray-600 font-medium mb-2'>Gender</label>
				{genders.map((gender) => (
					<div
						key={gender}
						className='flex items-center mb-1'
					>
						<input
							type='radio'
							name='gender'
							value={gender}
							onChange={handleFilterChange}
							checked={filters.gender === gender}
							className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
						/>
						<span className='text-gray-700'>{gender}</span>
					</div>
				))}
			</div>
			{/* Colour Filter */}
			<div className='mb-6'>
				<label className='block text-gray-600 font-medium mb-2'>Colour</label>
				<div className='flex flex-wrap gap-2'>
					{colours.map((colour) => (
						<button
							key={colour}
							name='colour'
							value={colour}
							onClick={(e) => handleButtonClick(e)}
							className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${
								filters.colour === colour ? 'ring-2 ring-blue-500' : ''
							}`}
							style={{ background: colour.toLowerCase() }}
						></button>
					))}
				</div>
			</div>
			{/* Size Filter */}
			<div className='mb-6'>
				<label className='block text-gray-600 font-medium mb-2'>Size</label>
				{sizes.map((size) => (
					<div
						key={size}
						className='flex items-center mb-1'
					>
						<input
							type='checkbox'
							name='size'
							value={size}
							onChange={handleFilterChange}
							checked={filters.size.includes(size)}
							className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
						/>
						<span className='text-gray-700'>{size}</span>
					</div>
				))}
			</div>
			{/* Material Filter */}
			<div className='mb-6'>
				<label className='block text-gray-600 font-medium mb-2'>Material</label>
				{materials.map((material) => (
					<div
						key={material}
						className='flex items-center mb-1'
					>
						<input
							type='checkbox'
							name='material'
							value={material}
							onChange={handleFilterChange}
							checked={filters.material.includes(material)}
							className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
						/>
						<span className='text-gray-700'>{material}</span>
					</div>
				))}
			</div>
			{/* Brand Filter */}
			<div className='mb-6'>
				<label className='block text-gray-600 font-medium mb-2'>Brand</label>
				{brands.map((brand) => (
					<div
						key={brand}
						className='flex items-center mb-1'
					>
						<input
							type='checkbox'
							name='brand'
							value={brand}
							onChange={handleFilterChange}
							checked={filters.brand.includes(brand)}
							className='mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300'
						/>
						<span className='text-gray-700'>{brand}</span>
					</div>
				))}
			</div>
			{/* Price Range */}
			<div className='mb-8'>
				<label className='block text-gray-600 font-medium mb-2'>Price Range</label>
				<input
					type='range'
					name='priceRange'
					min={minMaxValues.min}
					max={minMaxValues.max}
					value={priceRange[1]}
					onChange={handlePriceChange}
					className='w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer'
				/>
				<div className='flex justify-between text-gray-600 mt-2'>
					<span>${minMaxValues.min}</span>
					<span>${priceRange[1]}</span>
				</div>
			</div>
		</div>
	);
};

export default FilterSidebar;
