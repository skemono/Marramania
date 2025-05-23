import React from 'react';

function QuantitySelector({ quantity, onDecrease, onIncrease }) {
  return (
    <div className="flex items-center gap-2">
      <button 
        onClick={onDecrease}
        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
      >
        -
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button 
        onClick={onIncrease}
        className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50"
      >
        +
      </button>
    </div>
  );
}

export default QuantitySelector;