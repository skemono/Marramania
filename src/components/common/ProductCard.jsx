// src/components/common/ProductCard.jsx
import { Link } from 'react-router-dom';
import { motion } from "motion/react";
import { useFavorites } from '../../contexts/FavoritesContext';

function ProductCard({ product }) {
  const { toggleFavorite, isFavorite } = useFavorites();
  const isProductFavorite = isFavorite(product.id);

  const handleFavoriteClick = (e) => {
    e.preventDefault(); // Prevent navigation when clicking the heart
    e.stopPropagation(); // Stop event bubbling
    toggleFavorite(product);
  };

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
          
          {/* Heart/Favorite Button */}
          <motion.button
            onClick={handleFavoriteClick}
            className="absolute top-2 right-2 p-2 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white transition-colors duration-200 z-10"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={isProductFavorite ? "#ef4444" : "none"}
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke={isProductFavorite ? "#ef4444" : "#6b7280"}
              className="w-5 h-5 transition-colors duration-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
              />
            </svg>
          </motion.button>
        </div>
        
        <h3 className="font-medium text-base mb-1">{product.name}</h3>
        <p className="text-sm text-gray-700">${product.price.toFixed(2)}</p>
      </Link>
    </motion.div>
  );
}

export default ProductCard;