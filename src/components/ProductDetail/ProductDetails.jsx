import PriceDisplay from './PriceDisplay';

function ProductDetails({ product }) {
  return (
    <div className="space-y-6">
      <PriceDisplay 
        originalPrice={product.originalPrice}
        price={product.price}
        discount={product.discount}
        className="text-2xl"
      />
      
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
    </div>
  );
}

export default ProductDetails;