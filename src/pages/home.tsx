import FeaturedCollections from '@/components/home/featured-collections';
import FeaturesSection from '@/components/home/features-section';
import FlexibleBanner from '@/components/home/flexible-banner';
import GenderCollectionSection from '@/components/home/gender-collection-section';
import Hero from '@/components/home/hero';
import NewArrivals from '@/components/home/new-arrivals';
import ProductDetails from '@/components/products/product-details';
import ProductGrid from '@/components/products/product-grid';
import { collectionData, newArrivals } from '@/data/home-data';
import {
	placeholderProducts,
	selectedProduct,
	similarProducts,
} from '@/data/products';

const Home = () => {
	return (
		<div>
			<FlexibleBanner />
			<Hero />
			<GenderCollectionSection collections={collectionData} />
			<NewArrivals newArrivals={newArrivals} />

			<h2 className='text-3xl text-center font-bold mb-4'>Best Seller</h2>
			<ProductDetails
				selectedProduct={selectedProduct}
				similarProducts={similarProducts}
			/>

			<div className='container mx-auto'>
				<h2 className='text-3xl text-center font-bold mb-4'>Top Wears For Women</h2>
				<ProductGrid products={placeholderProducts} />
			</div>

			<FeaturedCollections />
			<FeaturesSection />
		</div>
	);
};

export default Home;
