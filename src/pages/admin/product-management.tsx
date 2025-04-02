import { products } from '@/data/products';
import { Link } from 'react-router-dom';

const ProductMangement = () => {
	const handleDeleteProduct = (productId: string) => {
		if (window.confirm('Are you sure you want to delete this product?')) {
			console.log('Delete Product Id: ', productId);
		}
	};

	return (
		<div className='max-w-7xl mx-auto p-6'>
			<h2 className='text-2xl font-bold mb-6'>Product Management</h2>
			<div className='overflow-auto shadow-md sm:rounded-lg'>
				<table className='min-w-full text-left text-gray-500'>
					<thead className='bg-gray-100 text-xs uppercase text-gray-700'>
						<tr>
							<th className='py-3 px-4'>Name</th>
							<th className='py-3 px-4'>Price</th>
							<th className='py-3 px-4 max-sm:hidden'>Sku</th>
							<th className='py-3 px-4 max-sm:hidden'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{products.length > 0 ? (
							products.map((product) => (
								<tr
									key={product.id}
									className='border-b hover:bg-gray-50 cursor-pointer'
								>
									<td className='py-2 px-4 flex items-center'>
										<img
											src={product.image}
											alt={product.altText}
											className='hidden md:block w-12 h-12 object-scale-down rounded-lg mr-4
                                                '
										/>
										<span className='text-wrap md:whitespace-nowrap'>{product.name}</span>
									</td>
									<td className='p-4'>${product.price}</td>
									<td className='p-4 max-sm:hidden'>{product.sku}</td>
									<td className='p-4 max-sm:hidden'>
										<Link
											to={`/admin/products/${product.id}/edit`}
											className='bg-yellow-500 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-600'
										>
											Edit
										</Link>
										<button
											onClick={() => handleDeleteProduct(product.id)}
											className='bg-red-500 text-white px-1.5 py-0.5 rounded hover:bg-red-600'
										>
											Delete
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td
									colSpan={7}
									className='py-4 px-4 text-center text-gray-500'
								>
									No products found.
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default ProductMangement;
