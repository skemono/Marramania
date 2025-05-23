// src/pages/ProductDetail.jsx
import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductInfo from '../components/ProductDetail/ProductInfo';
import ProductRating from '../components/ProductDetail/ProductRating';
import ReviewItem from '../components/ProductDetail/ReviewItem';
import RelatedProducts from '../components/ProductDetail/RelatedProducts';
import { products } from '../data/products';
import { reviews } from '../data/products';

function ProductDetail() {
  const { id } = useParams();
  
  const product = useMemo(() => {
    return products.find(p => p.id === parseInt(id));
  }, [id]);
  
  const productReviews = useMemo(() => {
    return reviews.filter(review => review.productId === parseInt(id));
  }, [id]);
  
  if (!product) {
    return <div className="p-6">Product not found</div>;
  }
  
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: product.name },
  ];
  
  return (
    <main className="pb-12">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <span className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
            Details
          </span>
        </div>
        
        <ProductInfo product={product} />
        
        <h2 className="text-xl font-semibold mt-12 mb-6">Cerdito Details</h2>
        
        <div className="space-y-6 mb-8">
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Tipo</h3>
              <p>{product.type}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Color</h3>
              <p>{product.color}</p>
            </div>
          </div>
          
          {product.material && (
            <div>
              <h3 className="text-sm text-gray-500 mb-2">Material</h3>
              <p>{product.material}</p>
            </div>
          )}
        </div>
        
        <h2 className="text-xl font-semibold mb-6">Reseñas</h2>
        
        <ProductRating rating={product.rating} reviewCount={product.reviewCount} />
        
        <div className="mt-8">
          {productReviews.map((review, index) => (
            <ReviewItem key={review.id} review={review} index={index} />
          ))}
        </div>
        
        <RelatedProducts products={products} currentProductId={product.id} />
      </div>
    </main>
  );
}

export default ProductDetail;