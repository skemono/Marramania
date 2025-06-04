import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Header from './components/common/Header/Header';

function App() {
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSearch = (term) => {
    setSearchTerm(term);
    setShowFavoritesOnly(false); // Reset favorites filter when searching
  };
  
  console.log('App component rendered');
  return (
    <div className="min-h-screen bg-white">
      <Header 
        showFavoritesOnly={showFavoritesOnly}
        setShowFavoritesOnly={setShowFavoritesOnly}
        onSearch={handleSearch}
      />
      <Routes>
        <Route 
          path="/" 
          element={
            <Home 
              showFavoritesOnly={showFavoritesOnly}
              setShowFavoritesOnly={setShowFavoritesOnly}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          } 
        />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;