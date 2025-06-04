function RatingBar({ ratingNum, percentage }) {
  return (
    <div className="flex items-center">
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
}

export default RatingBar;