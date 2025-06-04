import { useState } from 'react';
import { motion } from "motion/react";
import { useCart } from '../../../contexts/MarraContext';

function AddToCartIcon({ product }) {
  const { addToCart } = useCart();
  const [isActive, setIsActive] = useState(false);
  
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    
    setIsActive(true);
    setTimeout(() => setIsActive(false), 1000);
  };
  
  return (
    <motion.button
      onClick={handleAddToCart}
      className="absolute bottom-2 right-2 p-2 rounded-full bg-black text-white hover:bg-gray-800 transition-colors duration-200 z-10"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {isActive ? (
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
          initial={{ scale: 0, rotate: 0 }}
          animate={{ scale: 1, rotate: 360 }}
          transition={{ duration: 0.3 }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
        </motion.svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-4 h-4"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      )}
    </motion.button>
  );
}

export default AddToCartIcon;