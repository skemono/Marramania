import { motion } from "motion/react";
import StarDisplay from './StarDisplay';
import RatingBreakdown from './RatingBreakdown';

function ProductRating({ rating, reviewCount, productName }) {
  return (
    <motion.div 
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">{productName}</h2>
      
      <StarDisplay rating={rating} reviewCount={reviewCount} />
      <RatingBreakdown rating={rating} reviewCount={reviewCount} />
    </motion.div>
  );
}

export default ProductRating;