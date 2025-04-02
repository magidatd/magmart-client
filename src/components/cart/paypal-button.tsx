import { PayPalButtons, PayPalScriptProvider } from '@paypal/react-paypal-js';
import { CLIENT_ID } from '@/config/config';

interface PaypalButtonProps {
	amount: number;
	onSuccess: (details: Record<string, unknown>) => void;
	onError: (err: Record<string, unknown>) => void;
}

const PaypalButton = ({ amount, onSuccess, onError }: PaypalButtonProps) => {
	const initialOptions = {
		clientId: CLIENT_ID,
		currency: 'USD',
		intent: 'capture',
	};
	return (
		<PayPalScriptProvider options={initialOptions}>
			<PayPalButtons
				style={{ layout: 'vertical' }}
				createOrder={(_data, actions) => {
					return actions.order.create({
						intent: 'CAPTURE',
						purchase_units: [
							{ amount: { currency_code: 'USD', value: amount.toString() } },
						],
					});
				}}
				onApprove={(_data, actions) => {
					if (actions.order) {
						return actions.order.capture().then(onSuccess);
					}
					return Promise.reject(new Error('Order not found'));
				}}
				onError={onError}
			/>
		</PayPalScriptProvider>
	);
};

export default PaypalButton;
