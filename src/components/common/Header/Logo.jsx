import { Link } from 'react-router-dom';

function Logo() {
  return (
    <Link to="/" className="flex items-center gap-2">
    <div className="w-6 h-6 bg-black rounded-full"></div>
    <span className="font-bold text-xl">Marramanía</span>
    </Link>
  );
}

export default Logo;