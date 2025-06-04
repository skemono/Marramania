import { useState } from 'react';

function StarRating({ rating, setRating, readonly = false }) {
  const [hoverRating, setHoverRating] = useState(0);
  
  const handleClick = (value) => {
    if (!readonly && setRating) {
      setRating(value);
    }
  };
  
  const handleMouseEnter = (value) => {
    if (!readonly) {
      setHoverRating(value);
    }
  };
  
  const handleMouseLeave = () => {
    if (!readonly) {
      setHoverRating(0);
    }
  };
  
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, index) => {
        const starValue = index + 1;
        const isFilled = starValue <= (hoverRating || rating);
        
        return (
          <button
            key={index}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            className={`transition-colors ${readonly ? 'cursor-default' : 'cursor-pointer hover:scale-110'}`}
            disabled={readonly}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill={isFilled ? "#fbbf24" : "none"}
              stroke="#fbbf24"
              strokeWidth="2"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          </button>
        );
      })}
    </div>
  );
}

export default StarRating;