import CheckoutComponent from '@/components/cart/checkout-component';
import { cart } from '@/data/cart';
import { useEffect, useState } from 'react';

const Checkout = () => {
	const [cartTotal, setCartTotal] = useState<number | null>(null);

	const computeTotals = () => {
		let subTotal: number = 0;

		if (cart) {
			cart.products.map((product) => {
				let total = null;
				total = product.price * product.quantity;

				total = Math.round((total + Number.EPSILON) * 100) / 100;

				subTotal += total;

				subTotal = Math.round((subTotal + Number.EPSILON) * 100) / 100;
			});
		}

		setCartTotal(subTotal);
	};

	useEffect(() => {
		computeTotals();
	});

	return (
		<>
			<CheckoutComponent
				cart={cart}
				total={cartTotal}
			/>
		</>
	);
};

export default Checkout;
