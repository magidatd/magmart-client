export const mockOrders = [
	{
		id: '12445',
		createdAt: new Date(),
		shippingAddress: { city: 'Masvingo', country: 'Zimbabwe' },
		orderItems: [
			{
				name: 'Blue Cargo Jeans',
				image: 'src/assets/clothes/377787_main.avif',
			},
		],
		totalPrice: 120,
		isPaid: true,
	},
	{
		id: '12578',
		createdAt: new Date(),
		shippingAddress: { city: 'Masvingo', country: 'Zimbabwe' },
		orderItems: [
			{
				name: 'Grey Cuffed Cargo Trousers',
				image: 'src/assets/clothes/377582_main.avif',
			},
		],
		totalPrice: 40,
		isPaid: true,
	},
];

export const checkout = {
	id: 1,
	createdAt: new Date(),
	checkoutItems: [
		{
			productId: '78925',
			name: 'Beige Check Slim Waistcoat',
			size: '36L',
			colour: 'Beige',
			quantity: 1,
			price: 147.55,
			image: '../src/assets/clothes/378162_main.avif',
		},
		{
			productId: '84788',
			name: 'Blue Denim Straight Leg Jeans',
			size: '28',
			colour: 'Blue',
			quantity: 2,
			price: 55.54,
			image: '../src/assets/clothes/379474_main.avif',
		},
		{
			productId: '65888',
			name: 'Beige Short Sleeve Drape Side Midi Dress',
			size: 'S',
			colour: 'Beige',
			quantity: 4,
			price: 51.0,
			image: '../src/assets/clothes/923560_main.avif',
		},
		{
			productId: '21455',
			name: 'Blue Denim High Waisted Wide Leg Trousers',
			size: '14',
			colour: 'Blue',
			quantity: 1,
			price: 42.0,
			image: '../src/assets/clothes/919045_main.avif',
		},
		{
			productId: '45788',
			name: 'Blue Floral Wide Leg Plisse Trousers',
			size: '10',
			colour: 'Blue',
			quantity: 1,
			price: 49.22,
			image: '../src/assets/clothes/918464_main.avif',
		},
		{
			productId: '32332',
			name: 'Brown Faux Suede Block Heel Ankle Boots',
			size: '7',
			colour: 'Brown',
			quantity: 1,
			price: 143.81,
			image: '../src/assets/clothes/920111_main.avif',
		},
	],
	shippingAddress: {
		address: 'Plot 34 Flesk, Aquamarine Street, Morningside',
		city: 'Masvingo',
		country: 'Zimbabwe',
	},
};

export const orders = [
	{
		id: '451122',
		user: { name: 'John Doe' },
		totalPrice: 111,
		status: 'Processing',
	},
	{
		id: '451123',
		user: { name: 'Jin Moyo' },
		totalPrice: 174,
		status: 'Processing',
	},
	{
		id: '451124',
		user: { name: 'Rob Kyes' },
		totalPrice: 140,
		status: 'Processing',
	},
	{
		id: '451125',
		user: { name: 'Hebert Gondo' },
		totalPrice: 114,
		status: 'Processing',
	},
	{
		id: '451126',
		user: { name: 'Elvira Ralston' },
		totalPrice: 142,
		status: 'Processing',
	},
	{
		id: '451127',
		user: { name: 'John Donker' },
		totalPrice: 114,
		status: 'Processing',
	},
];
