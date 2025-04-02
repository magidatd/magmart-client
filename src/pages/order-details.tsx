import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

interface OrderItem {
	productId: string;
	name: string;
	size: string;
	colour: string;
	quantity: number;
	price: number;
	image: string;
}

interface OrderDetailsType {
	id: string | undefined;
	createdAt: Date;
	isPaid: boolean;
	isDelivered: boolean;
	paymentMethod: string;
	shippingMethod: string;
	shippingAddress: {
		address: string;
		city: string;
		country: string;
	};
	orderItems: OrderItem[];
}

const OrderDetails = () => {
	const { id } = useParams();
	const [orderDetails, setOrderDetails] = useState<OrderDetailsType | null>(
		null,
	);

	useEffect(() => {
		const mockOrderDetails = {
			id: id,
			createdAt: new Date(),
			isPaid: true,
			isDelivered: false,
			paymentMethod: 'PayPal',
			shippingMethod: 'Standard',
			shippingAddress: {
				address: 'Plot 34 Flesk Aquamarine Street, Morningside',
				city: 'Masvingo',
				country: 'Zimbabwe',
			},
			orderItems: [
				{
					productId: '15545',
					name: 'Grey Cuffed Cargo Trousers',
					size: 'M',
					colour: 'Grey',
					quantity: 2,
					price: 40.0,
					image: '../../../src/assets/clothes/377582_main.avif',
				},
				{
					productId: '54221',
					name: 'Grey Denim Hybrid Wide Leg Joggers',
					size: 'XL',
					colour: 'Grey',
					quantity: 3,
					price: 42.0,
					image: '../../../src/assets/clothes/919726_main.avif',
				},
				{
					productId: '87889',
					name: 'Red Caged Square Toe Heels',
					size: '6UK',
					colour: 'Red',
					quantity: 4,
					price: 46.0,
					image: '../../../src/assets/clothes/920895_main.avif',
				},
				{
					productId: '55888',
					name: 'Blue Wide Leg Tipping Joggers',
					size: 'XS',
					colour: 'Blue',
					quantity: 1,
					price: 38.0,
					image: '../../../src/assets/clothes/920269_main.avif',
				},
				{
					productId: '32555',
					name: 'Beige Webbing Front Raffia Tote Bag',
					size: 'One Size',
					colour: 'Beige',
					quantity: 5,
					price: 46.0,
					image: '../../../src/assets/clothes/921355_main.avif',
				},
				{
					productId: '67548',
					name: 'Cream Long Sleeve Broderie Patchwork Shirt',
					size: '6UK',
					colour: 'Cream',
					quantity: 1,
					price: 42,
					image: '../../../src/assets/clothes/920034_main.avif',
				},
			],
		};

		setOrderDetails(mockOrderDetails);
	}, [id]);

	return (
		<div className='max-w-7xl mx-auto p-4 sm:p-6'>
			<h2 className='text-2xl md:text-3xl font-bold mb-6'>Order Details</h2>
			{!orderDetails ? (
				<p>No Order details found</p>
			) : (
				<div className='p-4 sm:p-6 rounded-lg border'>
					{/* Order Info */}
					<div className='flex flex-col sm:flex-row justify-between mb-8'>
						<div>
							<h3 className='text-lg md:text-xl font-semibold'>
								Order ID: #{orderDetails.id}
							</h3>
							<p className='text-gray-600'>
								{new Date(orderDetails.createdAt).toLocaleDateString()}
							</p>
						</div>
						<div className='flex flex-col items-start sm:items-end mt-4 sm:mt-0'>
							<span
								className={`${
									orderDetails.isPaid
										? 'bg-green-100 text-green-700'
										: 'bg-red-100 text-red-700'
								} px-3 py1 rounded-full text-sm font-medium mb-2`}
							>
								Payment Status: {orderDetails.isPaid ? 'Paid' : 'Pending'}
							</span>
							<span
								className={`${
									orderDetails.isDelivered
										? 'bg-green-100 text-green-700'
										: 'bg-yellow-100 text-yellow-700'
								} px-3 py1 rounded-full text-sm font-medium mb-2`}
							>
								Delivery Status: {orderDetails.isDelivered ? 'Delivered' : 'Pending'}
							</span>
						</div>
					</div>
					{/* Customer, Payment, Shipping Info */}
					<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8'>
						<div>
							<h4 className='text-lg font-semibold mb-2'>Payment Information</h4>
							<div>
								<span className='font-semibold'>Payment Method: </span>
								<span className='text-gray-600'>{orderDetails.paymentMethod}</span>
							</div>
							<div>
								<span className='font-semibold'>Status: </span>
								<span className='text-gray-600'>
									{orderDetails.isPaid ? 'Paid' : 'Pending'}
								</span>
							</div>
						</div>
						<div>
							<h4 className='text-lg font-semibold mb-2'>Shipping Information</h4>
							<div>
								<span className='font-semibold'>Shipping Method: </span>
								<span className='text-gray-600'>{orderDetails.shippingMethod}</span>
							</div>
							<p className='font-semibold'>Address:</p>
							<p className='text-gray-600'>{orderDetails.shippingAddress.address}</p>
							<p className='text-gray-600'>
								{orderDetails.shippingAddress.city},{' '}
								{orderDetails.shippingAddress.country}
							</p>
						</div>
					</div>
					{/* Products List */}
					<div className='overflow-x-auto'>
						<h4 className='text-lg font-semibold mb-4'>Products</h4>
						<table className='min-w-full text-gray-600 mb-4'>
							<thead className='bg-gray-100'>
								<tr>
									<th className='py-2 px-4 text-start'>Name</th>
									<th className='py-2 px-4 text-start'>Unit Price</th>
									<th className='py-2 px-4 text-start'>Quantity</th>
									<th className='py-2 px-4 text-start'>Total</th>
								</tr>
							</thead>
							<tbody>
								{orderDetails.orderItems.map((item) => (
									<tr
										key={item.productId}
										className='border-b '
									>
										<td className='py-2 px-4 flex items-center'>
											<img
												src={item.image}
												alt={item.name}
												className='w-12 h-12 object-scale-down rounded-lg mr-4
                                                '
											/>
											<Link
												to={`/product/${item.productId}`}
												className='text-blue-500 hover:underline'
											>
												{item.name}
											</Link>
										</td>
										<td className='py-2 px-4'>${item.price}</td>
										<td className='py-2 px-4'>{item.quantity}</td>
										<td className='py-2 px-4'>${item.price * item.quantity}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
					<Link
						to='/orders'
						className='text-blue-500 hover:underline'
					>
						Back to My Orders
					</Link>
				</div>
			)}
		</div>
	);
};

export default OrderDetails;
