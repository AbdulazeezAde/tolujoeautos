import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Car } from '../types';
import { Calendar, Gauge, Settings, Fuel, ChevronLeft, ChevronRight, Phone, ArrowLeft } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';

export default function CarDetails() {
  const { id } = useParams<{ id: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch('/cars.json?v=' + new Date().getTime());
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        const foundCar = (data.cars as Car[]).find(c => c.id.toString() === id);
        setCar(foundCar || null);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load car details:', err);
        setLoading(false);
      }
    };
    fetchCar();
  }, [id]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index: number) => {
    if (emblaApi) emblaApi.scrollTo(index);
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi, setSelectedIndex]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  const whatsappMessage = car ? encodeURIComponent(`Hi Tolujoe Autos, I'm interested in the ${car.year} ${car.title} listed for ${car.price}. Is it still available?`) : '';

  return (
    <div className="min-h-screen bg-brand-gray py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <Link to="/cars" className="inline-flex items-center text-gray-600 hover:text-brand-red mb-8 transition-colors font-medium">
          <ArrowLeft className="h-5 w-5 mr-2" /> Back to Inventory
        </Link>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-red"></div>
          </div>
        ) : !car ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm border border-gray-100">
            <h1 className="text-4xl font-heading font-bold text-brand-black mb-4">Car Not Found</h1>
            <p className="text-gray-600 mb-8">The vehicle you are looking for does not exist or has been removed.</p>
            <Link to="/cars" className="bg-brand-red hover:bg-red-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Browse Available Cars
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              
              {/* Image Gallery with Embla Carousel */}
              <div className="relative bg-gray-900 aspect-[4/3] lg:aspect-auto h-full min-h-[400px] flex flex-col">
                {car.images.length > 0 ? (
                  <div className="relative flex-grow overflow-hidden" ref={emblaRef}>
                    <div className="flex h-full touch-pan-y">
                      {car.images.map((img, idx) => (
                        <div className="flex-[0_0_100%] min-w-0 relative h-full" key={idx}>
                          <img 
                            src={img} 
                            alt={`${car.title} - View ${idx + 1}`} 
                            className="w-full h-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                        </div>
                      ))}
                    </div>
                    
                    {car.images.length > 1 && (
                      <>
                        <button 
                          onClick={scrollPrev}
                          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors z-10"
                        >
                          <ChevronLeft className="h-6 w-6" />
                        </button>
                        <button 
                          onClick={scrollNext}
                          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/80 text-white p-2 rounded-full transition-colors z-10"
                        >
                          <ChevronRight className="h-6 w-6" />
                        </button>
                        
                        {/* Thumbnails */}
                        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 z-10">
                          {car.images.map((_, idx) => (
                            <button
                              key={idx}
                              onClick={() => scrollTo(idx)}
                              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                                idx === selectedIndex ? 'bg-brand-red' : 'bg-white/50 hover:bg-white/80'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500">
                    No images available
                  </div>
                )}
                
                {car.status === 'sold' && (
                  <>
                    <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>
                    <div className="absolute top-6 right-6 bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider shadow-lg z-20 border border-red-500">
                      Sold
                    </div>
                  </>
                )}
              </div>

              {/* Car Details */}
              <div className="p-8 lg:p-12 flex flex-col">
                <div className="mb-2">
                  <span className="text-sm font-bold tracking-wider text-gray-500 uppercase">{car.make}</span>
                </div>
                <h1 className="text-3xl lg:text-4xl font-heading font-bold text-brand-black mb-4">
                  {car.title}
                </h1>
                
                <div className="text-4xl font-bold text-brand-red mb-8">
                  {car.price}
                </div>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-6 mb-10">
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <Calendar className="h-8 w-8 text-brand-red mr-4" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Year</p>
                      <p className="font-bold text-brand-black">{car.year}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <Gauge className="h-8 w-8 text-brand-red mr-4" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Mileage</p>
                      <p className="font-bold text-brand-black">{car.mileage}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <Settings className="h-8 w-8 text-brand-red mr-4" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Transmission</p>
                      <p className="font-bold text-brand-black">{car.transmission}</p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <Fuel className="h-8 w-8 text-brand-red mr-4" />
                    <div>
                      <p className="text-sm text-gray-500 font-medium">Fuel Type</p>
                      <p className="font-bold text-brand-black">{car.fuel}</p>
                    </div>
                  </div>
                </div>

                <div className="mb-10 flex-grow">
                  <h3 className="text-xl font-heading font-bold mb-4 border-b border-gray-100 pb-2">Description</h3>
                  <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                    {car.description}
                  </p>
                  
                  {car.engine && (
                    <div className="mt-6">
                      <h4 className="font-bold text-brand-black mb-2">Engine</h4>
                      <p className="text-gray-600">{car.engine}</p>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mt-auto pt-6 border-t border-gray-100">
                  <a 
                    href={`https://wa.me/447393435895?text=${whatsappMessage}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-whatsapp hover:bg-whatsapp-dark text-white py-4 px-6 rounded-xl font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
                  >
                    <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    WhatsApp Inquiry
                  </a>
                  <a 
                    href="tel:+447393435895"
                    className="flex-1 bg-brand-black hover:bg-gray-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <Phone className="h-6 w-6" /> Call Dealer
                  </a>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
