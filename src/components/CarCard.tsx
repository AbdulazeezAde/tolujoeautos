import React from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import { Settings, Calendar, Gauge } from 'lucide-react';

interface CarCardProps {
  car: Car;
}

const CarCard: React.FC<CarCardProps> = ({ car }) => {
  return (
    <div className="bg-white rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group flex flex-col h-full">
      <div className="relative aspect-[4/3] overflow-hidden bg-brand-gray">
        <img 
          src={car.images[0] || 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=800'} 
          alt={car.title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          loading="lazy"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
        
        {car.status === 'sold' && (
          <>
            <div className="absolute inset-0 bg-black/50 z-10 transition-opacity group-hover:bg-black/60 pointer-events-none backdrop-blur-[2px]"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-red text-white px-8 py-3 rounded-full text-xl font-bold uppercase tracking-widest z-20 shadow-2xl border-2 border-white/20 transform -rotate-12">
              Sold
            </div>
          </>
        )}
        
        {car.status === 'available' && (
          <div className="absolute top-4 right-4 bg-emerald-500 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest z-20 shadow-lg border border-white/20">
            For Sale
          </div>
        )}
      </div>
      
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-heading font-bold text-xl text-brand-black line-clamp-1 group-hover:text-brand-red transition-colors" title={car.title}>
            {car.title}
          </h3>
        </div>
        
        <div className="text-2xl font-bold text-brand-black mb-6">
          {car.price}
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-6 text-sm text-gray-600 bg-gray-50 rounded-2xl p-4 mt-auto">
          <div className="flex flex-col items-center text-center">
            <Calendar className="h-5 w-5 mb-2 text-brand-red" />
            <span className="font-medium">{car.year}</span>
          </div>
          <div className="flex flex-col items-center text-center border-l border-r border-gray-200">
            <Gauge className="h-5 w-5 mb-2 text-brand-red" />
            <span className="font-medium">{car.mileage}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <Settings className="h-5 w-5 mb-2 text-brand-red" />
            <span className="font-medium">{car.transmission}</span>
          </div>
        </div>
        
        <Link 
          to={`/cars/${car.id}`}
          className="block w-full text-center bg-brand-black hover:bg-gray-800 text-white py-4 rounded-xl font-bold transition-all hover:shadow-md"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
