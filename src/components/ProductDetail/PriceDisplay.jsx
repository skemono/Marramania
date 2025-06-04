function PriceDisplay({ originalPrice, price, discount, className = "" }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {originalPrice && originalPrice !== price ? (
        <>
          <span className="text-lg font-bold text-green-600">
            ${price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-500 line-through">
            ${originalPrice.toFixed(2)}
          </span>
          <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full font-medium">
            -{discount}%
          </span>
        </>
      ) : (
        <span className="text-lg font-bold">
          ${price.toFixed(2)}
        </span>
      )}
    </div>
  );
}

export default PriceDisplay;