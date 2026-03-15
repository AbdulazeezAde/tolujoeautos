import { Link } from 'react-router-dom';
import { Instagram, Phone, Mail, MapPin, Car } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-gray-300 pt-16 pb-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <img 
                src="/logo.jpg" 
                alt="Tolujoe Autos Logo" 
                className="h-16 w-auto" 
              />
            </Link>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              No Stories! Just Clean Cars — A Trial Will Convince You. We specialize in sourcing, repairing, and selling premium vehicles.
            </p>
            <div className="flex space-x-4">
              <a href="https://instagram.com/tolujoe_autos" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-brand-red transition-all duration-300">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="https://tiktok.com/@tolujoe_autos" target="_blank" rel="noopener noreferrer" className="bg-gray-800 p-3 rounded-full text-gray-400 hover:text-white hover:bg-brand-red transition-all duration-300">
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.04-.1z" />
                </svg>
                <span className="sr-only">TikTok</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-heading font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="hover:text-brand-red transition-colors">Home</Link></li>
              <li><Link to="/cars" className="hover:text-brand-red transition-colors">Available Cars</Link></li>
              <li><Link to="/about" className="hover:text-brand-red transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-brand-red transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-white font-heading font-semibold text-lg mb-6">Contact Us</h3>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="bg-gray-800 p-3 rounded-full mr-4 flex-shrink-0">
                  <Phone className="h-5 w-5 text-brand-red" />
                </div>
                <div className="flex flex-col gap-2">
                  <a href="tel:+447393435895" className="text-lg hover:text-white transition-colors block font-medium">+44 7393435895</a>
                  <a 
                    href="https://wa.me/447393435895" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-whatsapp hover:text-whatsapp-dark transition-colors text-sm font-bold"
                  >
                    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    Chat on WhatsApp
                  </a>
                </div>
              </li>
              <li className="flex items-center">
                <div className="bg-gray-800 p-3 rounded-full mr-4 flex-shrink-0">
                  <Mail className="h-5 w-5 text-brand-red" />
                </div>
                <a href="mailto:info@tolujoeautos.com" className="hover:text-white transition-colors">info@tolujoeautos.com</a>
              </li>
              <li className="flex items-center">
                <div className="bg-gray-800 p-3 rounded-full mr-4 flex-shrink-0">
                  <MapPin className="h-5 w-5 text-brand-red" />
                </div>
                <span>United Kingdom</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500 mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Tolujoe Autos. All rights reserved.
          </p>
          <div className="flex space-x-6 text-sm text-gray-500">
            <Link to="#" className="hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="#" className="hover:text-white transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
