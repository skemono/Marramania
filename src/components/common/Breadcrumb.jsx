// src/components/common/Breadcrumb.jsx
import { Link } from 'react-router-dom';

function Breadcrumb({ items }) {
  return (
    <div className="max-w-7xl mx-auto flex items-center py-4 px-6">
      {items.map((item, index) => (
        <div key={index} className="flex items-center">
          {index > 0 && (
            <span className="mx-2 text-gray-400">
              /
            </span>
          )}
          
          {item.link ? (
            <Link 
              to={item.link} 
              className="text-gray-500 hover:text-gray-800"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-gray-800">{item.label}</span>
          )}
        </div>
      ))}
    </div>
  );
}

export default Breadcrumb;