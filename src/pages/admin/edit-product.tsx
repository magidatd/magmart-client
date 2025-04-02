import { useState } from 'react';

const EditProduct = () => {
	const [productData, setProductData] = useState<{
		name: string;
		description: string;
		price: number;
		countInStock: number;
		sku: string;
		category: string;
		brand: string;
		sizes: string[];
		colours: string[];
		collections: string;
		material: string;
		gender: string;
		images: { url: string; altText: string }[];
	}>({
		name: 'Cream Long Sleeve Broderie Patchwork Shirt',
		description:
			'This Cream Long Sleeve Broderie Patchwork Shirt is a perfect blend of elegance and comfort, designed to elevate your wardrobe. Crafted from high-quality fabric, it features intricate broderie detailing that adds a touch of sophistication to any outfit.',
		price: 100,
		countInStock: 45,
		sku: '548878999987888',
		category: '',
		brand: '',
		sizes: [
			'12(UK)',
			'14(UK)',
			'15(UK)',
			'16(UK)',
			'17(UK)',
			'18(UK)',
			'20(UK)',
			'22(UK)',
		],
		colours: ['Cream'],
		collections: 'Spring',
		material: 'Cotton',
		gender: 'Women',
		images: [
			{
				url: '../../../src/assets/clothes/920034_main.avif',
				altText: 'Cream Long Sleeve Broderie Patchwork Shirt Main',
			},
			{
				url: '../../../src/assets/clothes/920034_alt1.avif',
				altText: 'Cream Long Sleeve Broderie Patchwork Shirt Alt1',
			},
			{
				url: '../../../src/assets/clothes/920034_rollover.avif',
				altText: 'Cream Long Sleeve Broderie Patchwork Shirt Rollover',
			},
			{
				url: '../../../src/assets/clothes/920034_back.avif',
				altText: 'Cream Long Sleeve Broderie Patchwork Shirt Back',
			},
			{
				url: '../../../src/assets/clothes/920034_alt2.avif',
				altText: 'Cream Long Sleeve Broderie Patchwork Shirt Alt2',
			},
			{
				url: '../../../src/assets/clothes/920034_alt3.avif',
				altText: 'Cream Long Sleeve Broderie Patchwork Shirt Alt3',
			},
		],
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
	) => {
		const { name, value } = e.target;

		setProductData((prevData) => ({ ...prevData, [name]: value }));
	};

	const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!e.target.files) return;
		const file = e.target.files[0];
		console.log(file);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log(productData);
	};

	return (
		<div className='max-w-5xl mx-auto p-6 shadow-md rounded-md'>
			<h2 className='text-3xl font-bold mb-6'>Edit Product</h2>
			<form onSubmit={handleSubmit}>
				{/* Name */}
				<div className='mb-6'>
					<label className='block font-semibold mb-2'>Name</label>
					<input
						type='text'
						name='name'
						value={productData.name}
						onChange={handleChange}
						className='w-full border border-gray-300 rounded-md p-2'
						required
					/>
				</div>
				{/* Description */}
				<div className='mb-6'>
					<label className='block font-semibold mb-2'>Description</label>
					<textarea
						name='description'
						value={productData.description}
						onChange={handleChange}
						className='w-full border border-gray-300 rounded-md p-2'
						rows={4}
						required
					/>
				</div>
				<div className='flex flex-col w-full md:flex-row md:items-center justify-between md:gap-8'>
					<div className='flex flex-col md:flex-row md:items-center md:justify-start md:gap-4'>
						{/* Price */}
						<div className='mb-6'>
							<label className='block font-semibold mb-2'>Price</label>
							<input
								type='number'
								name='price'
								value={productData.price}
								onChange={handleChange}
								className='w-full border border-gray-300 rounded-md p-2'
								required
								min={0}
							/>
						</div>
						{/* Count In Stock */}
						<div className='mb-6'>
							<label className='block font-semibold mb-2'>Count In Stock</label>
							<input
								type='number'
								name='countInStock'
								value={productData.countInStock}
								onChange={handleChange}
								className='w-full border border-gray-300 rounded-md p-2'
								required
								min={0}
							/>
						</div>
					</div>
					{/* SKU */}
					<div className='mb-6 w-full flex-end'>
						<label className='block font-semibold mb-2'>SKU</label>
						<input
							type='text'
							name='sku'
							value={productData.sku}
							onChange={handleChange}
							className='w-full border border-gray-300 rounded-md p-2'
							required
						/>
					</div>
				</div>
				{/* Sizes */}
				<div className='mb-6'>
					<label className='block font-semibold mb-2'>Sizes (Comma Separated)</label>
					<input
						type='text'
						name='sizes'
						value={productData.sizes.join(', ')}
						onChange={(e) =>
							setProductData({
								...productData,
								sizes: e.target.value.split(',').map((size) => size.trim()),
							})
						}
						className='w-full border border-gray-300 rounded-md p-2'
						required
					/>
				</div>
				{/* Colours */}
				<div className='mb-6'>
					<label className='block font-semibold mb-2'>
						Colours (Comma Separated)
					</label>
					<input
						type='text'
						name='colours'
						value={productData.colours.join(', ')}
						onChange={(e) =>
							setProductData({
								...productData,
								colours: e.target.value.split(',').map((colour) => colour.trim()),
							})
						}
						className='w-full border border-gray-300 rounded-md p-2'
						required
					/>
				</div>
				{/* Image Uploads */}
				<div className='mb-6'>
					<label className='block font-semibold mb-2'>Upload Image</label>
					<input
						type='file'
						onChange={handleImageUpload}
					/>
					<div className='flex gap-4 mt-4'>
						{productData.images.map((image, index) => (
							<div key={index}>
								<img
									src={image.url}
									alt={image.altText || 'Product Image'}
									className='w-20 h-20 object-scale-down rounded-md shadow-md'
								/>
							</div>
						))}
					</div>
				</div>
				<button
					type='submit'
					className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors'
				>
					Update Product
				</button>
			</form>
		</div>
	);
};

export default EditProduct;
