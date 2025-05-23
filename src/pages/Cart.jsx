// src/pages/Cart.jsx
import { useRef } from 'react';
import { motion } from "motion/react"
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/Cart/CartItem';
import CartSummary from '../components/Cart/CartSummary';
import { Link } from 'react-router-dom';


function Cart() {
  const { cartItems } = useCart();
  const cartRef = useRef(null);
  
  return (
    <main ref={cartRef} className="pb-12">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <motion.h1 
          className="text-2xl font-bold mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Shopping Cart
        </motion.h1>
        
        {cartItems.length === 0 ? (
          <motion.div 
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-gray-500 mb-4">Your cart is empty</p>
            <Link
                to="/"
                className="inline-block bg-black text-white px-6 py-2 rounded-lg text-center"
                >
                Continue Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {cartItems.map((item, index) => (
                <CartItem key={item.id} item={item} index={index} />
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <CartSummary />
            </div>
          </div>
        )}
      </div>
    </main>
  );
}

export default Cart;