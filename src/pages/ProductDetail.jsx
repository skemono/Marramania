import { useParams } from 'react-router-dom';
import { useMemo } from 'react';
import { useReviews } from '../contexts/MarraContext';
import Breadcrumb from '../components/common/Breadcrumb';
import ProductInfo from '../components/ProductDetail/ProductInfo';
import ProductRating from '../components/ProductDetail/Review/ProductRating';
import ReviewItem from '../components/ProductDetail/Review/ReviewItem';
import AddReviewForm from '../components/ProductDetail/Review/AddReviewForm';
import RelatedProducts from '../components/ProductDetail/RelatedProducts';
import { products } from '../data/products';

function ProductDetail() {
  const { id } = useParams();
  const { getReviewsByProduct, addReview, getAverageRating } = useReviews();
  
  const product = useMemo(() => {
    return products.find(p => p.id === parseInt(id));
  }, [id]);
  
  const productReviews = useMemo(() => {
    return getReviewsByProduct(parseInt(id));
  }, [id, getReviewsByProduct]);
  
  const averageRating = useMemo(() => {
    return getAverageRating(parseInt(id));
  }, [id, getAverageRating]);
  
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
        <ProductInfo product={product} />
        <ProductRating 
          rating={averageRating || product.rating} 
          reviewCount={productReviews.length} 
          productName={product.name}
        />
        
        <div className="mt-8">
          {productReviews.map((review, index) => (
            <ReviewItem key={review.id} review={review} index={index} />
          ))}
        </div>
        
        <AddReviewForm 
          productId={product.id} 
          onAddReview={addReview}
        />
        
        <RelatedProducts products={products} currentProductId={product.id} />
      </div>
    </main>
  );
}

export default ProductDetail;