import { useRef, useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useFavorites } from '../contexts/MarraContext';
import Breadcrumb from '../components/common/Breadcrumb';
import CategoryHeader from '../components/Home/CategoryHeader';
import ProductGrid from '../components/Home/ProductGrid';
import { products } from '../data/products';

function Home({ showFavoritesOnly, setShowFavoritesOnly, searchTerm, setSearchTerm }) {
  const homeRef = useRef(null);
  const { favorites } = useFavorites();
  const [searchParams] = useSearchParams();
  
  // Handle URL search params
  useEffect(() => {
    const urlSearchTerm = searchParams.get('search');
    if (urlSearchTerm && urlSearchTerm !== searchTerm) {
      setSearchTerm(urlSearchTerm);
    }
  }, [searchParams, searchTerm, setSearchTerm]);
  
  const filteredProducts = useMemo(() => {
    let result = products;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.color.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply favorites filter
    if (showFavoritesOnly) {
      result = result.filter(product => 
        favorites.some(fav => fav.id === product.id)
      );
    }
    
    return result;
  }, [searchTerm, showFavoritesOnly, favorites]);
  
  const getTitle = () => {
    if (searchTerm && showFavoritesOnly) {
      return `Favoritos: "${searchTerm}"`;
    }
    if (searchTerm) {
      return `Resultados: "${searchTerm}"`;
    }
    if (showFavoritesOnly) {
      return 'Tus Cerditos Favoritos';
    }
    return 'Cerditos';
  };
  
  const getBreadcrumbLabel = () => {
    if (searchTerm) {
      return `Búsqueda: ${searchTerm}`;
    }
    return showFavoritesOnly ? 'Favoritos' : 'Cerditos';
  };
  
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: getBreadcrumbLabel() },
  ];
  
  return (
    <main ref={homeRef} className="pb-12">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="max-w-7xl mx-auto px-6">
        <CategoryHeader 
          title={getTitle()}
          showFavoritesOnly={showFavoritesOnly}
        />
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            {searchTerm ? (
              <>
                <p className="text-gray-500 mb-4">
                  No se encontraron cerditos que coincidan con "{searchTerm}"
                </p>
                <button
                  onClick={() => setSearchTerm('')}
                  className="inline-block bg-black text-white px-6 py-2 rounded-lg mr-4"
                >
                  Limpiar búsqueda
                </button>
              </>
            ) : showFavoritesOnly ? (
              <>
                <p className="text-gray-500 mb-4">No tienes cerditos favoritos aún</p>
                <button
                  onClick={() => setShowFavoritesOnly(false)}
                  className="inline-block bg-black text-white px-6 py-2 rounded-lg"
                >
                  Ver todos los productos
                </button>
              </>
            ) : (
              <p className="text-gray-500">No hay productos disponibles</p>
            )}
          </div>
        ) : (
          <>
            <div className="mb-4 text-sm text-gray-600">
              Mostrando {filteredProducts.length} de {products.length} productos
            </div>
            <ProductGrid products={filteredProducts} />
          </>
        )}
      </div>
    </main>
  );
}

export default Home;