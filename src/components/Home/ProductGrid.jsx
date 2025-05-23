// src/components/Home/ProductGrid.jsx
import { useRef } from 'react';
import ProductCard from '../common/ProductCard';

function ProductGrid({ products }) {
  const gridRef = useRef(null);
  
  return (
    <div 
      ref={gridRef}
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
    >
      {products.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default ProductGrid;