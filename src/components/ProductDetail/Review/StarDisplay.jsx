function StarDisplay({ rating, reviewCount }) {
  const starCount = 5;
  
  return (
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
  );
}

export default StarDisplay;