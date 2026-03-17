import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Car } from '../types';
import CarCard from '../components/CarCard';
import { ShieldCheck, Wrench, Car as CarIcon, CheckCircle2, ArrowRight, Phone, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';
import useEmblaCarousel from 'embla-carousel-react';

export default function Home() {
  const [featuredCars, setFeaturedCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true, 
    align: 'start',
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 768px)': { slidesToScroll: 2 },
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/cars.json');
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        const available = (data.cars as Car[]).filter(car => car.status === 'available').slice(0, 3);
        setFeaturedCars(available);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load cars:', err);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  const sourcingCars = [
    { name: "Toyota Camry", img: "https://images.unsplash.com/photo-1657872737697-737a2d123ef2?auto=format&fit=crop&q=80&w=800" },
    { name: "Honda Civic", img: "https://images.unsplash.com/photo-1634737581963-5a22ba471961?auto=format&fit=crop&q=80&w=800" },
    { name: "Ford Mustang", img: "https://images.unsplash.com/photo-1547744152-14d985cb937f?auto=format&fit=crop&q=80&w=800" },
    { name: "Lexus RX", img: "https://images.unsplash.com/photo-1664427356346-c31b46248e71?auto=format&fit=crop&q=80&w=800" },
    { name: "Ford Pickup", img: "https://images.unsplash.com/photo-1636882441787-d9ac4ea22637?auto=format&fit=crop&q=80&w=800" },
    { name: "Audi", img: "https://images.unsplash.com/photo-1622198717748-ca120c5590f6?auto=format&fit=crop&q=80&w=800" },
    { name: "BMW", img: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Ym13fGVufDB8fDB8fHww" },
    { name: "Hyundai Tucson", img: "https://images.unsplash.com/photo-1575090536203-2a6193126514?auto=format&fit=crop&q=80&w=800" },
    { name: "Toyota Corolla", img: "https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&q=80&w=800" },
    { name: "Mercedes-Benz", img: "https://images.unsplash.com/photo-1669234226129-8ede05b40eff?auto=format&fit=crop&q=80&w=800" },
    { name: "Range Rover", img: "https://images.unsplash.com/photo-1725815761064-b84c3f4f9b94?auto=format&fit=crop&q=80&w=800" },
    { name: "BMW", img: "https://images.unsplash.com/photo-1607853554439-0069ec0f29b6?auto=format&fit=crop&q=80&w=800" },
    { name: "Mercedes-Benz", img: "https://images.unsplash.com/photo-1577615792595-d38014354328?auto=format&fit=crop&q=80&w=800" }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <motion.img 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 10, ease: "easeOut" }}
            src="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&q=80&w=2000" 
            alt="Luxury Cars" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/50 to-brand-black"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 border border-white/20 text-white text-sm font-medium tracking-wider uppercase mb-6 backdrop-blur-md">
              TOLUJOE AUTOS
            </span>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold text-white mb-6 tracking-tight leading-[1.1]">
              No Stories.<br />
              <span className="text-brand-red">Just Clean Cars.</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-10 font-light max-w-2xl mx-auto">
              A trial will convince you. Browse our handpicked selection of premium, fully-inspected vehicles.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link 
                to="/cars" 
                className="w-full sm:w-auto bg-white text-brand-black px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center justify-center gap-2"
              >
                View Inventory <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/50"
        >
          <span className="text-xs uppercase tracking-widest mb-2">Scroll</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-white/50 to-transparent"></div>
        </motion.div>
      </section>

      {/* Featured Cars Section */}
      <section className="py-24 bg-brand-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-black mb-4 tracking-tight">Featured Vehicles</h2>
              <p className="text-gray-600 text-lg font-light">
                Handpicked premium vehicles ready for their next owner. Clean titles, fully inspected, and ready to drive.
              </p>
            </div>
            <Link 
              to="/cars" 
              className="hidden md:flex items-center gap-2 text-brand-black font-semibold hover:text-brand-red transition-colors group"
            >
              View All Inventory <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-black"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredCars.map((car, index) => (
                <motion.div 
                  key={car.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <CarCard car={car} />
                </motion.div>
              ))}
            </div>
          )}

          <div className="text-center mt-12 md:hidden">
            <Link 
              to="/cars" 
              className="inline-flex items-center gap-2 border-2 border-brand-black text-brand-black hover:bg-brand-black hover:text-white px-8 py-3 rounded-full font-bold transition-all"
            >
              View All Inventory <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <span className="text-brand-red font-bold tracking-widest uppercase text-sm mb-2 block">How It Works</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-black tracking-tight">Our Process</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-[1px] bg-gray-200 z-0"></div>

            {[
              { icon: CarIcon, title: "1. We Source Cars", desc: "We carefully select high-quality vehicles from trusted auctions and private sellers globally." },
              { icon: Wrench, title: "2. We Repair & Rebuild", desc: "Our expert mechanics inspect, repair, and restore vehicles to pristine condition." },
              { icon: ShieldCheck, title: "3. We Sell to Customers", desc: "You get a clean, reliable, and verified car at a competitive price with zero hassle." }
            ].map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2, duration: 0.6 }}
                className="relative z-10 flex flex-col items-center bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50"
              >
                <div className="w-24 h-24 bg-brand-red rounded-full flex items-center justify-center mb-8 shadow-lg text-white">
                  <step.icon className="h-10 w-10" />
                </div>
                <h3 className="text-2xl font-heading font-bold mb-4">{step.title}</h3>
                <p className="text-gray-500 text-center leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* UK Sourcing Section */}
      <section className="py-24 bg-brand-gray border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-black font-bold tracking-widest uppercase text-sm mb-2 block">Based in the UK</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold text-brand-red tracking-tight mb-6">Global Sourcing & Shipping</h2>
            <p className="text-2xl text-gray-800 max-w-3xl mx-auto font-medium leading-relaxed">
              We can source these cars and ship to you anywhere in the world.
            </p>
          </div>

          <div className="relative mb-12">
            <div className="overflow-hidden" ref={emblaRef}>
              <div className="flex touch-pan-y -ml-4">
                {sourcingCars.map((car, i) => (
                  <div 
                    key={i}
                    className="flex-[0_0_100%] sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] min-w-0 pl-4"
                  >
                    <div className="group relative rounded-2xl overflow-hidden aspect-square shadow-sm h-full">
                      <img 
                        src={car.img} 
                        alt={car.name} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end p-6">
                        <h3 className="text-white font-bold text-lg md:text-xl tracking-wide">{car.name}</h3>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Carousel Navigation Buttons */}
            <button 
              onClick={scrollPrev}
              className="absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-black p-3 rounded-full shadow-lg transition-all z-10 border border-gray-100 hidden sm:block"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button 
              onClick={scrollNext}
              className="absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-brand-black p-3 rounded-full shadow-lg transition-all z-10 border border-gray-100 hidden sm:block"
              aria-label="Next slide"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-10 shadow-sm border border-gray-100 text-center">
            <h3 className="text-2xl font-bold text-brand-red mb-4">Popular Car Makes We Source</h3>
            <div className="flex flex-wrap justify-center gap-3 md:gap-4">
              {['Land Rover', 'Range Rover', 'Lexus', 'BMW', 'Mercedes-Benz', 'Audi', 'Volkswagen', 'Toyota', 'Honda', 'Ford', 'Porsche'].map((make, i) => (
                <span key={i} className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-gray-700 font-medium text-sm">
                  {make}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-0 bg-brand-black text-white overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
          <div className="p-12 md:p-24 flex flex-col justify-center">
            <span className="text-gray-400 font-bold tracking-widest uppercase text-sm mb-4 block">The Tolujoe Difference</span>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 tracking-tight text-brand-red">Why Choose Us?</h2>
            <p className="text-gray-300 mb-12 text-lg font-light leading-relaxed max-w-xl">
              We don't just sell cars; we sell peace of mind. Every vehicle that leaves our lot has been thoroughly vetted to ensure you get the best value for your money.
            </p>
            
            <ul className="space-y-6">
              {[
                'Clean verified cars with full history',
                'Rigorous 150-point quality inspection',
                'Trusted dealership with proven track record',
                'Highly competitive pricing with no hidden fees'
              ].map((item, i) => (
                <motion.li 
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="flex items-start"
                >
                  <div className="w-6 h-6 rounded-full bg-brand-red/20 flex items-center justify-center mr-4 flex-shrink-0 mt-0.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-red" />
                  </div>
                  <span className="text-lg font-light text-gray-200">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
          
          <div className="relative h-full min-h-[400px]">
            <img 
              src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&q=80&w=1000" 
              alt="Happy Customer" 
              className="absolute inset-0 w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-black to-transparent w-1/3"></div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-brand-gray text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-black via-transparent to-transparent"></div>
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <h2 className="text-4xl md:text-6xl font-heading font-bold mb-6 tracking-tight text-brand-red">Ready to Find Your Dream Car?</h2>
          <p className="text-xl mb-12 text-gray-600 font-light">Get in touch with us today. Our team is ready to assist you.</p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <a 
              href="https://wa.me/447393435895" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-whatsapp hover:bg-whatsapp-dark text-white px-10 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 hover:shadow-[0_0_20px_rgba(37,211,102,0.4)] flex items-center justify-center gap-3"
            >
              <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              WhatsApp Us
            </a>
            <a 
              href="tel:+447393435895" 
              className="bg-white border border-gray-200 hover:border-gray-300 text-brand-black px-10 py-4 rounded-full font-bold text-lg transition-all hover:shadow-md flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Call Dealer
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
