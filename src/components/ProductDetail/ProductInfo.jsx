import { motion } from "motion/react";
import ProductImage from './ProductImage';
import ProductDetails from './ProductDetails';
import AddToCartButton from './AddToCartButton';

function ProductInfo({ product }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <ProductImage product={product} />
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
        <ProductDetails product={product} />
        <div className="mt-6">
          <AddToCartButton product={product} />
        </div>
      </motion.div>
    </div>
  );
}

export default ProductInfo;