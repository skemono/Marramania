// src/components/ProductDetail/ProductRating.jsx
import { motion } from "motion/react"

function ProductRating({ rating, reviewCount }) {
  const starCount = 5;
  
  const getPercentageForRating = (ratingNum) => {
    const count = reviewCount * (ratingNum === Math.floor(rating) ? 0.5 : 
                               ratingNum < Math.floor(rating) ? 0.1 : 0.2);
    return Math.round((count / reviewCount) * 100);
  };
  
  return (
    <motion.div 
      className="mt-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <h2 className="text-xl font-semibold mb-4">King Pig Smooth Cheeks</h2>
      
      <div className="flex items-center mb-4">
        <span className="text-3xl font-bold mr-6">{rating}</span>
        
        <div className="flex">
          {Array.from({ length: starCount }).map((_, index) => (
            <svg 
              key={index}
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill={index < Math.floor(rating) ? "currentColor" : "none"}
              stroke="currentColor" 
              strokeWidth="2" 
              className="mr-1"
            >
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          ))}
          <span className="ml-2 text-sm text-gray-500">{reviewCount} reviews</span>
        </div>
      </div>
      
      <div className="space-y-2">
        {Array.from({ length: starCount }).map((_, index) => {
          const ratingNum = starCount - index;
          const percentage = getPercentageForRating(ratingNum);
          
          return (
            <div key={index} className="flex items-center">
              <span className="w-4 text-sm text-gray-600">{ratingNum}</span>
              <div className="flex-1 h-2 bg-gray-200 rounded-full mx-2 overflow-hidden">
                <div 
                  className="h-full bg-gray-700 rounded-full"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="w-8 text-xs text-gray-500">{percentage}%</span>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default ProductRating;