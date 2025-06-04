import { useRef } from 'react';
import { motion } from "motion/react";
import ProductCard from './ProductCard';

function RelatedProducts({ products, currentProductId }) {
  const relatedRef = useRef(null);
  const relatedProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);

  return (
    <motion.div
      ref={relatedRef}
      className="mt-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <h2 className="text-xl font-semibold mb-6">Recomendaciones</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            index={index} 
          />
        ))}
      </div>
    </motion.div>
  );
}

export default RelatedProducts;