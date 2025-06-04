import { motion } from "motion/react"
import { useCart } from '../../contexts/MarraContext';
import QuantitySelector from './QuantitySelector';
import PriceDisplay from '../ProductDetail/PriceDisplay';

function CartItem({ item, index }) {
  const { updateQuantity, removeFromCart, getMaxQuantity, isAtMaxQuantity } = useCart();

  const handleQuantityDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const handleQuantityIncrease = () => {
    if (item.quantity < getMaxQuantity()) {
      updateQuantity(item.id, item.quantity + 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(item.id);
  };
  
  return (
    <motion.div 
      className="flex items-center gap-4 py-4 border-b"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
    >
      <img 
        src={item.image || '/images/placeholder.png'} 
        alt={item.name}
        className="w-16 h-16 object-cover rounded"
      />
      
      <div className="flex-1">
        <h3 className="font-medium">{item.name}</h3>
        <PriceDisplay 
          originalPrice={item.originalPrice}
          price={item.price}
          discount={item.discount}
          className="text-sm"
        />
        <p className="text-xs text-gray-400">Size: {item.size || 'N/A'}</p>
        {isAtMaxQuantity(item.id) && (
          <p className="text-xs text-red-500">Max quantity reached</p>
        )}
      </div>
      
      <div className="flex items-center gap-3">
        <QuantitySelector 
          quantity={item.quantity}
          onDecrease={handleQuantityDecrease}
          onIncrease={handleQuantityIncrease}
          maxQuantity={getMaxQuantity()}
          isAtMax={isAtMaxQuantity(item.id)}
        />
        
        <button
          onClick={handleRemove}
          className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors"
          title="Remove item"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3,6 5,6 21,6"></polyline>
            <path d="M19,6V20a2,2,0,0,1-2,2H7a2,2,0,0,1-2-2V6M8,6V4a2,2,0,0,1,2-2h4a2,2,0,0,1,2,2V6"></path>
            <line x1="10" y1="11" x2="10" y2="17"></line>
            <line x1="14" y1="11" x2="14" y2="17"></line>
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default CartItem;