import { Link } from 'react-router-dom';
import { useCart } from '../../../contexts/MarraContext';

function CartButton() {
  const { itemCount } = useCart();
  
  return (
    <Link to="/cart" className="p-2 relative hover:scale-110 transition-transform" title="Ver carrito">
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      {itemCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {itemCount}
        </span>
      )}
    </Link>
  );
}

export default CartButton;