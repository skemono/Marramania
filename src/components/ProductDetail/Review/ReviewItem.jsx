// src/components/ProductDetail/ReviewItem.jsx
import { motion } from "motion/react"

function ReviewItem({ review, index }) {
  return (
    <motion.div 
      className="border-t py-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 * index }}
    >
      <div className="mb-2">
        <h3 className="font-medium">{review.name}</h3>
        <p className="text-sm text-gray-500">{review.date}</p>
      </div>
      
      <div className="flex mb-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg 
            key={i}
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill={i < review.rating ? "currentColor" : "none"}
            stroke="currentColor" 
            strokeWidth="2" 
            className="mr-1"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
      
      <p>{review.comment}</p>
    </motion.div>
  );
}

export default ReviewItem;