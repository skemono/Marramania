import Logo from './Logo';
import SearchBar from './SearchBar';
import FavoritesToggle from './FavoritesToggle';
import CartButton from './CartButton';

function Header({ showFavoritesOnly, setShowFavoritesOnly, onSearch }) {
  return (
    <header className="sticky top-0 z-10 bg-white shadow-sm py-4 px-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Logo />
        
        <div className="flex items-center gap-4">
          <SearchBar onSearch={onSearch} />
          <FavoritesToggle 
            showFavoritesOnly={showFavoritesOnly}
            setShowFavoritesOnly={setShowFavoritesOnly}
          />
          <CartButton />
        </div>
      </div>
    </header>
  );
}

export default Header;