// src/components/ProductDetail/ProductInfo.jsx
import { motion } from "motion/react"
import { useState } from 'react';
import { useCart } from '../../contexts/CartContext';

function ProductInfo({ product }) {
  const { addToCart } = useCart();
  const [isActive, setIsActive] = useState(false);
  
  const handleAddToCart = () => {
    addToCart(product);
    
    // Trigger animation
    setIsActive(true);
    
    // Reset after 1 second
    setTimeout(() => {
      setIsActive(false);
    }, 1000);
  };
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
      
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h1 className="text-3xl font-bold mb-6">{product.name}</h1>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Tipo</h3>
              <p>{product.type}</p>
            </div>
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Color</h3>
              <p>{product.color}</p>
            </div>
          </div>
          
          {product.material && (
            <div>
              <h3 className="text-sm text-gray-500 mb-1">Material</h3>
              <p>{product.material}</p>
            </div>
          )}
          
          <button 
            onClick={handleAddToCart}
            className="
              relative w-full h-12 font-bold tracking-wide rounded-lg
              border-2 border-black bg-white text-black 
              hover:bg-black hover:text-white 
              cursor-pointer overflow-hidden
              transition-all duration-350
            "
            style={{
              fontSize: '16px',
              lineHeight: '1',
              transition: 'all 0.35s'
            }}
          >
            <span 
              className={`
                transition-all duration-350
                ${isActive ? 'opacity-0 invisible' : 'opacity-100 visible'}
              `}
            >
              Add to Cart
            </span>
            
            <div 
              className={`
                absolute top-0 left-0 w-full h-full 
                bg-white rounded-lg z-10
                transition-all duration-350
                ${isActive ? 'opacity-100 visible' : 'opacity-0 invisible'}
              `}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 29.756 29.756"
                className="w-5 h-5 absolute top-1/2 left-1/2"
                style={{
                  fill: 'yellowgreen',
                  transformOrigin: '50% 50%',
                  transform: isActive 
                    ? 'translateX(-50%) translateY(-50%) rotate(720deg) scale(1)' 
                    : 'translateX(-50%) translateY(-50%) rotate(0deg) scale(0)',
                  transition: 'all 0.35s'
                }}
              >
                <path d="M29.049,5.009L28.19,4.151c-0.943-0.945-2.488-0.945-3.434,0L10.172,18.737l-5.175-5.173c-0.943-0.944-2.489-0.944-3.432,0.001l-0.858,0.857c-0.943,0.944-0.943,2.489,0,3.433l7.744,7.752c0.944,0.943,2.489,0.943,3.433,0L29.049,8.442C29.991,7.498,29.991,5.953,29.049,5.009z"/>
              </svg>
            </div>
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default ProductInfo;