// src/components/Cart/CartItem.jsx
import { motion } from "motion/react"
import { useCart } from '../../contexts/CartContext';
import QuantitySelector from './QuantitySelector';

function CartItem({ item, index }) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityDecrease = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };
  
  const handleQuantityIncrease = () => {
    updateQuantity(item.id, item.quantity + 1);
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
        <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
        <p className="text-xs text-gray-400">Size: {item.size || 'N/A'}</p>
      </div>
      
      <QuantitySelector 
        quantity={item.quantity}
        onDecrease={handleQuantityDecrease}
        onIncrease={handleQuantityIncrease}
      />
    </motion.div>
  );
}

export default CartItem;