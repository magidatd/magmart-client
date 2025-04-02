import ProductDetails from '@/components/products/product-details';
import { selectedProduct, similarProducts } from '@/data/products';

const Product = () => {
	return (
		<>
			<ProductDetails
				selectedProduct={selectedProduct}
				similarProducts={similarProducts}
			/>
		</>
	);
};

export default Product;
