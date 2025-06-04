import React from 'react';

function QuantitySelector({ quantity, onDecrease, onIncrease, maxQuantity = 9, isAtMax = false }) {
  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        -
      </button>
      <span className="w-8 text-center font-medium">{quantity}</span>
      <button 
        onClick={onIncrease}
        disabled={quantity >= maxQuantity || isAtMax}
        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;