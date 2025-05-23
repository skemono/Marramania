// src/components/ProductDetail/RelatedProducts.jsx
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from "motion/react"

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
          <motion.div 
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 * index }}
          >
            <Link to={`/product/${product.id}`}>
              <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2">
                <img 
                  src={product.image || '/images/placeholder.png'} 
                  alt={product.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="font-medium text-sm mb-1">{product.name}</h3>
              <p className="text-sm text-gray-600">${product.price.toFixed(2)}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default RelatedProducts;