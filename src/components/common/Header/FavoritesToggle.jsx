import { useFavorites } from '../../../contexts/MarraContext';

function FavoritesToggle({ showFavoritesOnly, setShowFavoritesOnly }) {
  const { favoritesCount } = useFavorites();
  
  const handleFavoritesToggle = () => {
    setShowFavoritesOnly(!showFavoritesOnly);
  };
  
  return (
    <button 
      onClick={handleFavoritesToggle}
      className={`p-2 relative transition-colors duration-200 ${
        showFavoritesOnly ? 'text-red-500' : 'text-gray-700 hover:text-red-500'
      }`}
      title={showFavoritesOnly ? 'Mostrar todos' : 'Mostrar favoritos'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={showFavoritesOnly ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
      {favoritesCount > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
          {favoritesCount}
        </span>
      )}
    </button>
  );
}

export default FavoritesToggle;