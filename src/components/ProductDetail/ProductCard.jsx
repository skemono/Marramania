import { Link } from 'react-router-dom';
import { motion } from "motion/react";
import FavoriteButton from '../common/Header/FavoriteButton';
import AddToCartIcon from '../common/Header/AddToCartIcon';
import PriceDisplay from './PriceDisplay';

function ProductCard({ product }) {
  return (
    <motion.div 
      className="flex flex-col relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/product/${product.id}`} className="group">
        <div className="aspect-square bg-gray-100 rounded-lg overflow-hidden mb-2 relative">
          <img 
            src={product.image || `/images/placeholder.png`} 
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          <FavoriteButton product={product} />
          <AddToCartIcon product={product} />
        </div>
        
        <h3 className="font-medium text-base mb-1">{product.name}</h3>
        <PriceDisplay 
          originalPrice={product.originalPrice}
          price={product.price}
          discount={product.discount}
          className="text-sm"
        />
      </Link>
    </motion.div>
  );
}

export default ProductCard;