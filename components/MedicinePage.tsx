import React, { useState } from 'react';
import { Search, ShoppingCart, Plus, Filter, Tag } from 'lucide-react';

const MEDICINES = [
  {
    id: 1,
    name: 'Paracetamol 500mg',
    category: 'Pain Relief',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    discount: '10% OFF'
  },
  {
    id: 2,
    name: 'Vitamin C Complex',
    category: 'Supplements',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400',
    discount: null
  },
  {
    id: 3,
    name: 'First Aid Kit',
    category: 'Essentials',
    price: 24.99,
    image: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?auto=format&fit=crop&q=80&w=400',
    discount: '15% OFF'
  },
  {
    id: 4,
    name: 'Digital Thermometer',
    category: 'Devices',
    price: 15.00,
    image: 'https://images.unsplash.com/photo-1588775224632-91e65448332c?auto=format&fit=crop&q=80&w=400',
    discount: null
  },
  {
    id: 5,
    name: 'Hand Sanitizer',
    category: 'Hygiene',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1584467541262-1b6a38676231?auto=format&fit=crop&q=80&w=400',
    discount: 'Buy 1 Get 1'
  },
  {
    id: 6,
    name: 'Surgical Masks (50pcs)',
    category: 'Hygiene',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1585776245991-cf79dd8fc708?auto=format&fit=crop&q=80&w=400',
    discount: null
  },
  {
    id: 7,
    name: 'Omega 3 Fish Oil',
    category: 'Supplements',
    price: 18.75,
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80&w=400',
    discount: '5% OFF'
  },
  {
    id: 8,
    name: 'Antiseptic Liquid',
    category: 'Essentials',
    price: 6.25,
    image: 'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?auto=format&fit=crop&q=80&w=400',
    discount: null
  }
];

const CATEGORIES = ['All', 'Pain Relief', 'Supplements', 'Essentials', 'Devices', 'Hygiene'];

const MedicinePage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredMedicines = MEDICINES.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen animate-fade-in-up">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner */}
        <div className="relative bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 md:p-12 mb-12 overflow-hidden shadow-xl text-white">
          <div className="relative z-10 max-w-2xl">
            <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-wider mb-4 border border-white/30">
              Online Pharmacy
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Get Your Medicines Delivered <br/> in 30 Minutes</h1>
            <p className="text-emerald-50 text-lg mb-8 max-w-lg">
              Genuine medicines, health supplements, and personal care products at the best prices.
            </p>
            <div className="relative max-w-md">
              <input 
                type="text" 
                placeholder="Search for medicines..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl text-slate-900 focus:outline-none shadow-lg"
              />
              <Search className="absolute left-4 top-4 text-slate-400" />
            </div>
          </div>
          
          {/* Abstract Shapes */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-10 pointer-events-none">
             <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <path fill="#FFFFFF" d="M42.7,-62.9C50.9,-52.8,50.1,-34.4,51.7,-19.2C53.4,-4,57.4,8,54.2,18.7C51,29.4,40.6,38.8,29.1,47.3C17.6,55.8,5,63.4,-6.4,61.9C-17.8,60.4,-28,49.8,-39.1,38.6C-50.2,27.4,-62.2,15.6,-62.7,3.5C-63.1,-8.6,-51.9,-21,-40.5,-31.2C-29.1,-41.4,-17.5,-49.4,0.4,-50.1C18.4,-50.7,34.5,-73,42.7,-62.9Z" transform="translate(100 100)" />
             </svg>
          </div>
          <img 
            src="https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=600" 
            alt="Pharmacy" 
            className="absolute top-1/2 -right-12 transform -translate-y-1/2 w-80 h-80 object-cover rounded-full border-8 border-white/10 hidden md:block shadow-2xl"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 mb-8">
           {CATEGORIES.map(cat => (
             <button
               key={cat}
               onClick={() => setActiveCategory(cat)}
               className={`px-5 py-2 rounded-full text-sm font-semibold transition-all
                 ${activeCategory === cat 
                   ? 'bg-slate-900 text-white shadow-md' 
                   : 'bg-white border border-slate-200 text-slate-600 hover:border-slate-300'
                 }
               `}
             >
               {cat}
             </button>
           ))}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMedicines.map(item => (
            <div key={item.id} className="bg-white rounded-2xl border border-slate-100 p-4 hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48 bg-slate-100 rounded-xl mb-4 overflow-hidden">
                <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                {item.discount && (
                  <div className="absolute top-3 left-3 bg-rose-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm">
                    {item.discount}
                  </div>
                )}
                <button className="absolute bottom-3 right-3 bg-white p-2 rounded-full shadow-md text-slate-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors">
                  <ShoppingCart className="w-4 h-4" />
                </button>
              </div>
              
              <p className="text-xs text-slate-500 font-semibold uppercase mb-1">{item.category}</p>
              <h3 className="text-slate-900 font-bold text-lg mb-2">{item.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-emerald-600 font-bold text-xl">${item.price.toFixed(2)}</span>
                <button className="text-xs font-bold text-slate-500 hover:text-emerald-600 flex items-center gap-1">
                  Add to Cart <Plus className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredMedicines.length === 0 && (
          <div className="text-center py-20">
            <Filter className="w-12 h-12 text-slate-300 mx-auto mb-4" />
            <h3 className="text-lg font-bold text-slate-900">No products found</h3>
            <p className="text-slate-500">Try adjusting your search or filters.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default MedicinePage;
