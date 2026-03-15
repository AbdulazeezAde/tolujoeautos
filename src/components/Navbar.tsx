import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car } from 'lucide-react';
import { useState } from 'react';
import { logoBase64 } from '../logoBase64';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Cars', path: '/cars' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="bg-brand-black text-brand-white sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <img 
                src={logoBase64} 
                alt="Tolujoe Autos Logo" 
                className="h-12 w-auto" 
                referrerPolicy="no-referrer"
              />
            </Link>
          </div>
          
            <div className="hidden md:flex space-x-8 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-bold uppercase tracking-wider transition-colors hover:text-brand-red ${
                    isActive(link.path) ? 'text-brand-red' : 'text-gray-300'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a 
                href="https://wa.me/447393435895" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-whatsapp hover:bg-whatsapp-dark text-white px-6 py-2.5 rounded-full font-bold transition-all hover:shadow-[0_0_15px_rgba(37,211,102,0.3)] flex items-center gap-2"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                WhatsApp Us
              </a>
            </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-black border-t border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  isActive(link.path) ? 'text-brand-red bg-gray-900' : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {link.name}
              </Link>
            ))}
              <a 
                href="https://wa.me/447393435895" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full text-center mt-4 bg-whatsapp hover:bg-whatsapp-dark text-white px-5 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                WhatsApp Us
              </a>
          </div>
        </div>
      )}
    </nav>
  );
}
