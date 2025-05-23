// src/pages/Home.jsx
import { useRef } from 'react';
import Breadcrumb from '../components/common/Breadcrumb';
import CategoryHeader from '../components/Home/CategoryHeader';
import ProductGrid from '../components/Home/ProductGrid';
import { products } from '../data/products';

function Home() {
  const homeRef = useRef(null);
  
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Cerditos' },
  ];
  
  return (
    <main ref={homeRef} className="pb-12">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="max-w-7xl mx-auto px-6">
        <CategoryHeader title="Cerditos" />
        <ProductGrid products={products} />
      </div>
    </main>
  );
}

export default Home;