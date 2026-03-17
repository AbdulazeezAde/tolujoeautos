import { useState, useEffect } from 'react';
import { Car } from '../types';
import CarCard from '../components/CarCard';
import { Search, Filter, X, Car as CarIcon } from 'lucide-react';
import { motion } from 'motion/react';

export default function Cars() {
  const [cars, setCars] = useState<Car[]>([]);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  // Filters state
  const [makeFilter, setMakeFilter] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/cars.json?v=' + new Date().getTime());
        if (!response.ok) throw new Error('Failed to fetch');
        const data = await response.json();
        setCars(data.cars as Car[]);
        setFilteredCars(data.cars as Car[]);
        setLoading(false);
      } catch (err) {
        console.error('Failed to load cars:', err);
        setLoading(false);
      }
    };
    fetchCars();
  }, []);

  useEffect(() => {
    let result = cars;

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(car => 
        car.title.toLowerCase().includes(query) || 
        car.make?.toLowerCase().includes(query) ||
        car.model?.toLowerCase().includes(query)
      );
    }

    if (makeFilter) {
      result = result.filter(car => car.make === makeFilter);
    }

    if (yearFilter) {
      result = result.filter(car => car.year === yearFilter);
    }

    if (priceFilter) {
      // Very basic price filtering logic based on string parsing
      // In a real app, price should be a number in the JSON
      const parsePrice = (priceStr: string) => parseInt(priceStr.replace(/[^0-9]/g, ''), 10);
      
      if (priceFilter === 'under-50k') {
        result = result.filter(car => parsePrice(car.price) < 50000);
      } else if (priceFilter === '50k-100k') {
        result = result.filter(car => parsePrice(car.price) >= 50000 && parsePrice(car.price) <= 100000);
      } else if (priceFilter === 'over-100k') {
        result = result.filter(car => parsePrice(car.price) > 100000);
      }
    }

    setFilteredCars(result);
  }, [searchQuery, makeFilter, yearFilter, priceFilter, cars]);

  const uniqueMakes = Array.from(new Set(cars.map(car => car.make).filter(Boolean)));
  const uniqueYears = Array.from(new Set(cars.map(car => car.year))).sort().reverse();

  const clearFilters = () => {
    setSearchQuery('');
    setMakeFilter('');
    setYearFilter('');
    setPriceFilter('');
  };

  return (
    <div className="min-h-screen bg-brand-gray py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <span className="text-brand-red font-bold tracking-widest uppercase text-sm mb-2 block">Inventory</span>
          <h1 className="text-5xl md:text-6xl font-heading font-bold text-brand-black mb-4 tracking-tight">Available Cars</h1>
          <p className="text-xl text-gray-500 font-light max-w-2xl">Browse our selection of premium, fully-inspected vehicles.</p>
        </motion.div>

        {/* Filters Toggle (Mobile) */}
        <div className="md:hidden mb-8">
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className="w-full flex items-center justify-center gap-2 bg-brand-black text-white py-4 rounded-xl font-bold shadow-lg transition-transform active:scale-95"
          >
            <Filter className="h-5 w-5" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-10">
          
          {/* Sidebar Filters */}
          <div className={`w-full md:w-72 flex-shrink-0 ${showFilters ? 'block' : 'hidden md:block'}`}>
            <div className="bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50 sticky top-24">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-heading font-bold text-2xl flex items-center gap-3 text-brand-black">
                  <Filter className="h-6 w-6 text-brand-red" /> Filters
                </h2>
                {(searchQuery || makeFilter || yearFilter || priceFilter) && (
                  <button onClick={clearFilters} className="text-sm font-medium text-gray-400 hover:text-brand-red flex items-center transition-colors">
                    <X className="h-4 w-4 mr-1" /> Clear
                  </button>
                )}
              </div>

              {/* Make Filter */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Make</label>
                <select 
                  value={makeFilter}
                  onChange={(e) => setMakeFilter(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl focus:border-brand-black focus:ring-1 focus:ring-brand-black bg-gray-50 py-3 px-4 text-gray-700 outline-none transition-all cursor-pointer appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                >
                  <option value="">All Makes</option>
                  {uniqueMakes.map(make => (
                    <option key={make} value={make}>{make}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Year</label>
                <select 
                  value={yearFilter}
                  onChange={(e) => setYearFilter(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl focus:border-brand-black focus:ring-1 focus:ring-brand-black bg-gray-50 py-3 px-4 text-gray-700 outline-none transition-all cursor-pointer appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                >
                  <option value="">All Years</option>
                  {uniqueYears.map(year => (
                    <option key={year} value={year}>{year}</option>
                  ))}
                </select>
              </div>

              {/* Price Filter */}
              <div className="mb-2">
                <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wider">Price Range</label>
                <select 
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl focus:border-brand-black focus:ring-1 focus:ring-brand-black bg-gray-50 py-3 px-4 text-gray-700 outline-none transition-all cursor-pointer appearance-none"
                  style={{ backgroundImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 20 20\'%3e%3cpath stroke=\'%236b7280\' stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'1.5\' d=\'M6 8l4 4 4-4\'/%3e%3c/svg%3e")', backgroundPosition: 'right 0.5rem center', backgroundRepeat: 'no-repeat', backgroundSize: '1.5em 1.5em', paddingRight: '2.5rem' }}
                >
                  <option value="">Any Price</option>
                  <option value="under-50k">Under £50,000</option>
                  <option value="50k-100k">£50,000 - £100,000</option>
                  <option value="over-100k">Over £100,000</option>
                </select>
              </div>
            </div>
          </div>

          {/* Car Grid */}
          <div className="flex-grow">
            {/* Search Bar */}
            <div className="mb-10 relative group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-brand-black transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Search by make, model, or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="block w-full pl-14 pr-6 py-5 border border-gray-200 rounded-2xl leading-5 bg-white placeholder-gray-400 focus:outline-none focus:border-brand-black focus:ring-2 focus:ring-brand-black sm:text-lg shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all"
              />
            </div>

            {/* Results Count */}
            <div className="mb-8 text-gray-500 font-medium tracking-wide">
              Showing <span className="text-brand-black font-bold">{filteredCars.length}</span> {filteredCars.length === 1 ? 'vehicle' : 'vehicles'}
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-black"></div>
              </div>
            ) : filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredCars.map((car, index) => (
                  <motion.div
                    key={car.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                  >
                    <CarCard car={car} />
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white rounded-3xl p-16 text-center shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-50"
              >
                <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CarIcon className="h-10 w-10 text-gray-300" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-brand-black mb-3">No vehicles found</h3>
                <p className="text-gray-500 mb-8 max-w-md mx-auto font-light">We couldn't find any cars matching your current filters. Try adjusting your search criteria.</p>
                <button 
                  onClick={clearFilters}
                  className="bg-brand-black hover:bg-gray-800 text-white px-8 py-4 rounded-xl font-bold transition-all hover:shadow-lg inline-flex items-center gap-2"
                >
                  <X className="w-5 h-5" /> Clear All Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
