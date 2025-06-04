import { motion } from "motion/react";

function ProductImage({ product }) {
  return (
    <motion.div 
      className="aspect-square rounded-lg overflow-hidden bg-gray-100"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <img 
        src={product.image || '/images/placeholder.png'} 
        alt={product.name}
        className="w-full h-full object-cover"
      />
    </motion.div>
  );
}

export default ProductImage;