import { countryList } from '@/data/countries';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaypalButton from './paypal-button';

interface CheckoutComponentProps {
	cart: {
		products: {
			productId: number;
			name: string;
			size: string;
			colour: string;
			quantity: number;
			price: number;
			image: string;
		}[];
	};
	total: number | null;
}

const CheckoutComponent: React.FC<CheckoutComponentProps> = ({
	cart,
	total,
}) => {
	const navigate = useNavigate();
	const [checkoutID, setCheckoutID] = useState<number | null>(null);

	const [shippingAddress, setShippingAddress] = useState<{
		firstName: string;
		lastName: string;
		address: string;
		city: string;
		postalCode: string;
		country: string;
		phone: string;
	}>({
		firstName: '',
		lastName: '',
		address: '',
		city: '',
		postalCode: '',
		country: '',
		phone: '',
	});

	const handleCreateCheckout = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setCheckoutID(123);
	};

	const handlePaypalPaymentSuccess = (details: Record<string, unknown>) => {
		console.log('Payment successful: ', details);
		navigate('/order-confirmation');
	};

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto py-10 px-6 tracking-tighter'>
			{/* Left Section */}
			<div className='bg-white rounded-lg p-6'>
				<h2 className='text-2xl uppercase mb-6'>checkout</h2>
				<form onSubmit={handleCreateCheckout}>
					<h3 className='text-lg mb-4'>Contact Details</h3>
					<div className='mb-4'>
						<label className='block text-gray-700'>Email</label>
						<input
							type='email'
							value='user@example.com'
							className='w-full p-2 border rounded'
							disabled
						/>
					</div>
					<h3 className='text-lg mb-4'>Delivery</h3>
					<div className='mb-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-gray-700'>First Name</label>
							<input
								type='text'
								value={shippingAddress.firstName}
								onChange={(e) =>
									setShippingAddress({
										...shippingAddress,
										firstName: (e.target as HTMLInputElement).value,
									})
								}
								className='w-full p-2 border rounded'
								required
							/>
						</div>
						<div>
							<label className='block text-gray-700'>Last Name</label>
							<input
								type='text'
								value={shippingAddress.lastName}
								onChange={(e) =>
									setShippingAddress({
										...shippingAddress,
										lastName: (e.target as HTMLInputElement).value,
									})
								}
								className='w-full p-2 border rounded'
								required
							/>
						</div>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Address</label>
						<input
							type='text'
							value={shippingAddress.address}
							onChange={(e) =>
								setShippingAddress({
									...shippingAddress,
									address: (e.target as HTMLInputElement).value,
								})
							}
							className='w-full p-2 border rounded'
							required
						/>
					</div>
					<div className='mb-4 grid grid-cols-1 md:grid-cols-2 gap-4'>
						<div>
							<label className='block text-gray-700'>City</label>
							<input
								type='text'
								value={shippingAddress.city}
								onChange={(e) =>
									setShippingAddress({
										...shippingAddress,
										city: (e.target as HTMLInputElement).value,
									})
								}
								className='w-full p-2 border rounded'
								required
							/>
						</div>
						<div>
							<label className='block text-gray-700'>Postal Code</label>
							<input
								type='text'
								value={shippingAddress.postalCode}
								onChange={(e) =>
									setShippingAddress({
										...shippingAddress,
										postalCode: (e.target as HTMLInputElement).value,
									})
								}
								className='w-full p-2 border rounded'
								required
							/>
						</div>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Select Country</label>
						<select
							value={shippingAddress.country}
							onChange={(e) =>
								setShippingAddress({ ...shippingAddress, country: e.target.value })
							}
							className='w-full p-2 border rounded'
						>
							<option value=''>Select your country</option>
							{countryList.map((country) => (
								<option
									key={country.code}
									value={country.name}
								>
									{country.flagEmoji} {country.name}
								</option>
							))}
						</select>
					</div>
					<div className='mb-4'>
						<label className='block text-gray-700'>Phone</label>
						<input
							type='tel'
							value={shippingAddress.phone}
							onChange={(e) =>
								setShippingAddress({
									...shippingAddress,
									phone: (e.target as HTMLInputElement).value,
								})
							}
							className='w-full p-2 border rounded'
							required
						/>
					</div>
					<div className='mt-6'>
						{!checkoutID ? (
							<button
								type='submit'
								className='w-full bg-black text-white py-3 rounded'
							>
								Continue to Payment
							</button>
						) : (
							<div>
								<h3 className='text-lg mb-4'>Pay with Paypal or PayNow</h3>
								{/* Paypal Button Component */}
								<PaypalButton
									amount={100}
									onSuccess={handlePaypalPaymentSuccess}
									onError={(err) =>
										alert(`Payment failed. Try again. With error: ${err}`)
									}
								/>
								{/* Paynow Button Component */}
							</div>
						)}
					</div>
				</form>
			</div>
			{/* Right Section */}
			<div className='bg-gray-50 p-6 rounded-lg'>
				<h3 className='text-lg mb-4'>Order Summary</h3>
				<div className='border-t py-4 mb-4'>
					{cart.products.map((product, index) => (
						<div
							key={index}
							className='flex items-start justify-between py-2 border-b'
						>
							<div className='flex items-start'>
								<img
									src={product.image}
									alt={product.name}
									className='w-20 h-24 object-scale-down mr-4'
								/>
								<div>
									<h3 className='text-md'>{product.name}</h3>
									<p className='text-gray-500'>Size: {product.size}</p>
									<p className='text-gray-500'>Colour: {product.colour}</p>
								</div>
							</div>
							<p className='text-xl'>${product.price?.toLocaleString()}</p>
						</div>
					))}
				</div>
				<div className='flex justify-between items-center text-lg mb-4'>
					<p>Sub Total</p>
					<p>${total}</p>
				</div>
				<div className='flex justify-between items-center text-lg'>
					<p>Shipping</p>
					<p>Free</p>
				</div>
				<div className='flex justify-between items-center text-lg mt-4 border-t pt-4'>
					<p>Total</p>
					<p>${total}</p>
				</div>
			</div>
		</div>
	);
};

export default CheckoutComponent;
