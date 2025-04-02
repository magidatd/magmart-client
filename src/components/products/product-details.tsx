import { useEffect, useState } from 'react';
import { PiMinus, PiPlus } from 'react-icons/pi';
import { toast } from 'sonner';

import placeholderImg from '@/assets/placeholder.png';
import ProductGrid from '@/components/products/product-grid';

interface ProductDetailsProps {
	selectedProduct: {
		name: string;
		price: number;
		originalPrice: number;
		description: string;
		brand: string;
		material: string;
		sizes: string[];
		colours: string[];
		images: { url: string; altText: string }[];
	};
	similarProducts: {
		id: string;
		name: string;
		price: number;
		image: string;
		altText: string;
	}[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({
	selectedProduct,
	similarProducts,
}) => {
	const [mainImage, setMainImage] = useState(placeholderImg);
	const [selectedSize, setSelectedSize] = useState('');
	const [selectedColour, setSelectedColour] = useState('');
	const [quantity, setQuantity] = useState(1);
	const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	useEffect(() => {
		if (selectedProduct?.images?.length > 0) {
			setMainImage(selectedProduct.images[0].url);
		}
	}, [selectedProduct.images]);

	const handleQuantityChange = (action: 'plus' | 'minus') => {
		if (action === 'plus') {
			setQuantity((prev) => prev + 1);
		}

		if (action === 'minus' && quantity > 1) {
			setQuantity((prev) => prev - 1);
		}
	};

	const handleAddToCart = async () => {
		if (!selectedColour) {
			toast.error('Please select colour before adding to cart.', {
				duration: 1000,
			});
			return;
		} else if (!selectedSize) {
			toast.error('Please select size before adding to cart.', { duration: 1000 });
			return;
		}

		setIsButtonDisabled(true);

		setTimeout(() => {
			toast.success('Product addwd to cart successfully.', { duration: 1000 });
			setIsButtonDisabled(false);
		}, 500);
	};

	return (
		<div className='p-6'>
			<div className='max-w-6xl mx-auto bg-white p-8 rounded-lg'>
				<div className='flex flex-col md:flex-row lg:flex-row'>
					{/* Left Thumbnails */}
					<div className='hidden lg:flex flex-col space-y-4 mr-4'>
						{selectedProduct.images.map((image, index) => (
							<img
								key={index}
								src={image.url}
								alt={image.altText || `Thumbnail ${index}`}
								onClick={() => setMainImage(image.url)}
								className={`h-20 w-20 object-scale-down rounded-lg cursor-pointer border ${
									mainImage === image.url ? 'border-black' : 'border-gray-300'
								}`}
							/>
						))}
					</div>
					{/* Main Image */}
					<div className='md:w-1/2'>
						<div>
							<div className='mb-4'>
								<img
									src={mainImage}
									alt='Main Product'
									className='w-full h-auto object-cover rounded-lg'
								/>
							</div>
						</div>
						{/* Mobile Thumbnails */}
						<div className='lg:hidden flex overflow-x-scroll space-x-2 mb-4 flex-wrap space-y-2'>
							{selectedProduct.images.map((image, index) => (
								<img
									key={index}
									src={image.url}
									alt={image.altText || `Thumbnail ${index}`}
									onClick={() => setMainImage(image.url)}
									className={`h-20 w-20 object-scale-down rounded-lg cursor-pointer border ${
										mainImage === image.url ? 'border-black' : 'border-gray-300'
									}`}
								/>
							))}
						</div>
					</div>

					{/* Right Section */}
					<div className='md:w-1/2 md:ml-5 lg:ml-10'>
						<h1 className='text-2xl md:text-3xl font-semibold mb-2'>
							{selectedProduct.name}
						</h1>
						<p className='text-lg text-gray-600 mb-1 line-through'>
							{selectedProduct.originalPrice && `${selectedProduct.originalPrice}`}
						</p>
						<p className='text-xl text-gray-500 mb-2'>${selectedProduct.price}</p>
						<p className='text-gray-600 mb-4'>{selectedProduct.description}</p>
						{/* Colours */}
						<div className='mb-4'>
							<p className='text-gray-700'>Colour:</p>
							<div className='flex gap-2 mt-2'>
								{selectedProduct.colours.map((colour) => (
									<button
										key={colour}
										className={`w-8 h-8 rounded-full border ${
											selectedColour === colour
												? 'border-4 border-gray-500'
												: 'border-gray-300'
										}`}
										style={{
											backgroundColor: colour.toLocaleLowerCase(),
											filter: 'brightness(0.5)',
										}}
										onClick={() => setSelectedColour(colour)}
									></button>
								))}
							</div>
						</div>
						{/* Sizes */}
						<div className='mb-4'>
							<p className='text-gray-700'>Size:</p>
							<div className='flex flex-wrap gap-2 mt-2'>
								{selectedProduct.sizes.map((size) => (
									<button
										key={size}
										className={`px-4 py-2 rounded border ${
											selectedSize === size ? 'bg-black text-white' : ''
										}`}
										onClick={() => setSelectedSize(size)}
									>
										{size}
									</button>
								))}
							</div>
						</div>
						{/* Quantity */}
						<div className='mb-6'>
							<p className='text-gray-700'>Quantity:</p>
							<div className='flex items-center space-x-4 mt-2'>
								<button
									onClick={() => handleQuantityChange('minus')}
									className='px-2 py-1 bg-gray-200 rounded text-lg'
								>
									<PiMinus />
								</button>
								<span className='text-lg'>{quantity}</span>
								<button
									onClick={() => handleQuantityChange('plus')}
									className='px-2 py-1 bg-gray-200 rounded text-lg'
								>
									<PiPlus />
								</button>
							</div>
						</div>

						<button
							onClick={handleAddToCart}
							disabled={isButtonDisabled}
							className={`bg-black text-white py-2 px-6 rounded w-full mb-4 capitalize ${
								isButtonDisabled ? 'cursor-not-allowed opacity-50' : 'hover:bg-gray-900'
							}`}
						>
							{isButtonDisabled ? 'Adding...' : 'add to cart'}
						</button>

						<div className='mt-10 text-gray-700'>
							<h3 className='text-xl font-bold mb-4'>Characteristics:</h3>
							<table className='w-full text-left text-sm text-gray-600'>
								<tbody>
									<tr>
										<td className='py-1'>Brand</td>
										<td className='py-1'>{selectedProduct.brand}</td>
									</tr>
									<tr>
										<td className='py-1'>Material</td>
										<td className='py-1'>{selectedProduct.material}</td>
									</tr>
								</tbody>
							</table>
						</div>
					</div>
				</div>
				<div className='mt-20'>
					<h2 className='text-2xl text-center font-medium mb-4'>
						You May Also Like
					</h2>
					<ProductGrid products={similarProducts} />
				</div>
			</div>
		</div>
	);
};

export default ProductDetails;
