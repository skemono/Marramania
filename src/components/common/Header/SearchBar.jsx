import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      navigate(`/?search=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      onSearch('');
      navigate('/');
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      onSearch('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-64">
      <input
        type="text"
        placeholder="Buscar cerditos..."
        value={searchTerm}
        onChange={handleInputChange}
        className="w-full py-2 px-4 bg-gray-100 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-black"
      />
      <button
        type="submit"
        className="absolute right-3 top-2.5 hover:scale-110 transition-transform"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </form>
  );
}

export default SearchBar;