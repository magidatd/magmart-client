import { cartItems } from '@/data/cart';
import { BiPlus, BiMinus } from 'react-icons/bi';
import { BsCartCheck } from 'react-icons/bs';
import { RiDeleteBin3Line } from 'react-icons/ri';

const CartComponent = () => {
	return (
		<div>
			{cartItems.map((product, index) => (
				<div
					key={index}
					className='flex items-start justify-between py-4 border-b'
				>
					<div className='flex items-start w-full'>
						<img
							src={product.image}
							alt={product.name}
							className='w-20 h-24 object-cover mr-4 rounded-md'
						/>

						<div className='w-full'>
							<div className='flex items-center justify-between gap-2'>
								<div className='float-start min-w-2/3'>
									<h3 className='capitalize'>{product.name}</h3>
									<p className='text-sm text-gray-500'>
										size: {product.size} | colour: {product.colour}
									</p>
								</div>

								<div className='items-end min-w-1/3 flex'>
									<div className='w-full justify-end flex flex-col md:flex-row items-center md:gap-2'>
										<p>$ {product.price * product.quantity}</p>
										<button>
											<RiDeleteBin3Line className='h-6 w-6 mt-2 text-red-600' />
										</button>
									</div>
								</div>
							</div>
							<div>
								<div className='relative flex items-center max-w-[11rem] mt-2'>
									<button
										type='button'
										className='bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 
                                    focus:ring-gray-100 focus:ring-2 focus:outline-none'
									>
										<BiMinus />
									</button>
									<input
										type='text'
										className='bg-gray-50 border-x-0 border-gray-300 h-11 font-medium text-center text-gray-900 
                                    text-sm outline-none focus:outline-none focus:border-none select-none block w-full pb-6'
										value={product.quantity}
										readOnly
									/>
									<div
										className='absolute bottom-1 start-1/2 -translate-x-1/2 rtl:translate-x-1/2 flex items-center 
                                    text-xs text-gray-400 space-x-1 rtl:space-x-reverse'
									>
										<BsCartCheck />
										<span>Items</span>
									</div>
									<button
										type='button'
										className='bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11
                                     focus:ring-gray-100 focus:ring-2 focus:outline-none'
									>
										<BiPlus />
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			))}
		</div>
	);
};

export default CartComponent;
