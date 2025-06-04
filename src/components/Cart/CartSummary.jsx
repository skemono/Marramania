import { motion } from "motion/react"
import { useCart } from '../../contexts/MarraContext';
import { useMemo } from 'react';

function CartSummary() {
  const { cartTotal, clearCart, getMaxCartTotal, isNearMaxTotal } = useCart();
  
  const shipping = 0;
  const discount = 15;
  
  const estimatedTotal = useMemo(() => {
    return Math.min(cartTotal + shipping - discount, getMaxCartTotal());
  }, [cartTotal, shipping, discount, getMaxCartTotal]);
  
  const isAtLimit = cartTotal >= getMaxCartTotal();
  const nearLimit = isNearMaxTotal();
  
  return (
    <motion.div 
      className="mt-8 space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex justify-between py-2">
        <span>Subtotal</span>
        <span>${cartTotal.toFixed(2)}</span>
      </div>
      
      <div className="flex justify-between py-2">
        <span>Shipping</span>
        <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
      </div>
      
      <div className="flex justify-between py-2">
        <span>Discount</span>
        <span>-${discount.toFixed(2)}</span>
      </div>
      
      {(nearLimit || isAtLimit) && (
        <div className={`p-3 rounded-lg text-sm ${isAtLimit ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {isAtLimit 
            ? `Cart limit reached ($${getMaxCartTotal().toFixed(2)})`
            : `Approaching cart limit ($${getMaxCartTotal().toFixed(2)})`
          }
        </div>
      )}
      
      <div className="border-t pt-4">
        <div className="flex justify-between font-semibold text-lg mb-4">
          <span>Estimated Total</span>
          <span>${estimatedTotal.toFixed(2)}</span>
        </div>
        
        <button
          onClick={clearCart} 
          className="w-full bg-green-500 text-white py-3 rounded-lg font-medium hover:bg-green-600 transition-colors mb-4"
        >
          Checkout
        </button>
        
        <button 
          onClick={clearCart}
          className="w-full bg-white border border-gray-300 text-gray-700 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors"
        >
          Empty Cart
        </button>
      </div>
    </motion.div>
  );
}

export default CartSummary;