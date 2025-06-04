import RatingBar from './RatingBar';

function RatingBreakdown({ rating, reviewCount }) {
  const starCount = 5;
  
  const getPercentageForRating = (ratingNum) => {
    const count = reviewCount * (ratingNum === Math.floor(rating) ? 0.5 : 
                               ratingNum < Math.floor(rating) ? 0.1 : 0.2);
    return Math.round((count / reviewCount) * 100);
  };
  
  return (
    <div className="space-y-2">
      {Array.from({ length: starCount }).map((_, index) => {
        const ratingNum = starCount - index;
        const percentage = getPercentageForRating(ratingNum);
        
        return (
          <RatingBar 
            key={index}
            ratingNum={ratingNum}
            percentage={percentage}
          />
        );
      })}
    </div>
  );
}

export default RatingBreakdown;