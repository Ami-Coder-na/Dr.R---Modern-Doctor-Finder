
import React, { useState, useMemo } from 'react';
import { Medicine } from '../types';
import { useCart } from '../context/CartContext';
import { Search, Filter, Star, Plus, ShoppingCart, SlidersHorizontal, ChevronDown, Check } from 'lucide-react';

interface AllMedicinePageProps {
  onProductClick: (product: Medicine) => void;
}

// Reusing data structure for consistency
const CATEGORIES = ['Supplements', 'Medicines', 'Baby Care', 'Personal Care', 'Devices', 'Herbs'];
const BRANDS = ['Himalaya', 'Accu-Chek', 'Vicks', 'Dettol', 'Dabur', 'Ensure', 'NatureHealth'];

// Extended Mock Data
const PRODUCTS: Medicine[] = [
  { id: 1, name: 'Vitamin C 500mg Sugarless Tab X', category: 'Supplements', rating: 4, price: 16.00, oldPrice: 35.00, image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400', tag: 'Sale', tagColor: 'bg-green-500' },
  { id: 2, name: 'Vitamin D3 (1000IU) Cap X', category: 'Supplements', rating: 5, price: 30.00, oldPrice: 40.00, image: 'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?auto=format&fit=crop&q=80&w=400', tag: 'Sale', tagColor: 'bg-green-500' },
  { id: 3, name: 'Own Vitamin B1 250mg Tab X 75', category: 'Medicines', rating: 3, price: 15.50, image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400' },
  { id: 4, name: 'Spring Leaf Liver Detox', category: 'Supplements', rating: 5, price: 31.95, oldPrice: 22.00, image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400', tag: 'Sale', tagColor: 'bg-green-500' },
  { id: 5, name: 'Amazonia Raw Protein Slim &', category: 'Herbs', rating: 4, price: 37.50, oldPrice: 33.50, image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80&w=400', tag: 'Sale', tagColor: 'bg-green-500' },
  { id: 6, name: 'Enterosgel Tube', category: 'Medicines', rating: 4, price: 41.95, image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=400' },
  { id: 7, name: 'Protein Chocolate Flake', category: 'Supplements', rating: 5, price: 54.95, image: 'https://images.unsplash.com/photo-1593095818028-d1e5672691f1?auto=format&fit=crop&q=80&w=400' },
  { id: 8, name: 'Advil Minis Liquid Cap X 90', category: 'Medicines', rating: 5, price: 22.00, image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=400', tag: 'Popular', tagColor: 'bg-purple-500' },
  { id: 9, name: 'Digital Thermometer', category: 'Devices', rating: 5, price: 12.50, image: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&q=80&w=400', tag: 'Essential', tagColor: 'bg-blue-500' },
  { id: 10, name: 'Gentle Baby Lotion', category: 'Baby Care', rating: 4, price: 18.00, image: 'https://images.unsplash.com/photo-1515488042361-25e508358255?auto=format&fit=crop&q=80&w=400' },
  { id: 11, name: 'Hydrating Face Serum', category: 'Personal Care', rating: 5, price: 25.00, image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400', tag: 'New', tagColor: 'bg-pink-500' },
  { id: 12, name: 'Herbal Cough Syrup', category: 'Herbs', rating: 4, price: 8.50, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=400' },
  { id: 13, name: 'Blood Pressure Monitor', category: 'Devices', rating: 5, price: 45.00, image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&q=80&w=400' },
  { id: 14, name: 'Organic Diapers (Pack of 50)', category: 'Baby Care', rating: 5, price: 28.00, image: 'https://images.unsplash.com/photo-1558223637-d9560a80e427?auto=format&fit=crop&q=80&w=400' },
];

const AllMedicinePage: React.FC<AllMedicinePageProps> = ({ onProductClick }) => {
  const { addToCart } = useCart();
  
  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<number>(100);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState('popular');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Toggle Selection Helper
  const toggleSelection = (item: string, list: string[], setList: React.Dispatch<React.SetStateAction<string[]>>) => {
    if (list.includes(item)) {
      setList(list.filter(i => i !== item));
    } else {
      setList([...list, item]);
    }
  };

  // Filter Logic
  const filteredProducts = useMemo(() => {
    let result = PRODUCTS.filter(p => {
      const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCategory = selectedCategories.length === 0 || selectedCategories.includes(p.category);
      const matchPrice = p.price <= priceRange;
      const matchRating = p.rating >= minRating;
      // Mocking Brand match by checking if name contains brand string or just random assignment since mock data lacks brand field
      // For demo: if brands selected, check if name includes it (loose match) or category match for variety
      const matchBrand = selectedBrands.length === 0 || Math.random() > 0.5; 

      return matchSearch && matchCategory && matchPrice && matchRating && matchBrand;
    });

    // Sorting
    if (sortBy === 'price-low') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchQuery, selectedCategories, selectedBrands, priceRange, minRating, sortBy]);

  const renderProductCard = (product: Medicine) => (
    <div 
        key={product.id} 
        onClick={() => onProductClick(product)}
        className="group bg-white rounded-[2rem] p-4 border border-slate-100 hover:border-primary-100 hover:shadow-xl transition-all duration-300 relative cursor-pointer flex flex-col h-full"
    >
        {product.tag && (
            <span className={`absolute top-4 left-4 ${product.tagColor || 'bg-green-500'} text-white text-[10px] font-bold px-2 py-1 rounded-full z-10`}>
                {product.tag}
            </span>
        )}
        
        <div className="relative h-48 mb-4 flex items-center justify-center bg-slate-50 rounded-3xl overflow-hidden">
            <img src={product.image} alt={product.name} className="h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
        </div>

        <div className="px-2 flex-grow flex flex-col">
            <p className="text-xs text-slate-400 font-bold mb-1 uppercase tracking-wide">{product.category}</p>
            <h3 className="font-bold text-slate-900 text-sm mb-2 line-clamp-2 leading-snug group-hover:text-primary-600 transition-colors">{product.name}</h3>
            
            <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-3 h-3 ${i < product.rating ? 'text-yellow-400 fill-current' : 'text-slate-200 fill-current'}`} />
                ))}
            </div>

            <div className="flex items-center justify-between mt-auto pt-2 border-t border-slate-50">
                <div>
                    <span className="font-bold text-slate-900 text-lg">${product.price.toFixed(2)}</span>
                    {product.oldPrice && (
                        <span className="text-xs text-slate-400 line-through ml-2">${product.oldPrice.toFixed(2)}</span>
                    )}
                </div>
                <button 
                    onClick={(e) => {
                        e.stopPropagation();
                        addToCart(product);
                    }}
                    className="bg-slate-900 text-white p-2.5 rounded-full hover:bg-primary-600 transition-colors shadow-lg shadow-slate-900/10"
                >
                    <Plus className="w-4 h-4" />
                </button>
            </div>
        </div>
    </div>
  );

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen animate-fade-in-up">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
           <div>
              <span className="text-primary-600 font-bold tracking-wide uppercase text-sm mb-2 block">Online Pharmacy</span>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">All Medicines & Products</h1>
           </div>
           
           <div className="flex items-center gap-3 w-full md:w-auto">
              <button 
                className="md:hidden flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm"
                onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              >
                 <Filter className="w-4 h-4" /> Filters
              </button>
              
              <div className="relative group w-full md:w-48">
                 <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-white border border-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-sm focus:outline-none focus:border-primary-500 cursor-pointer"
                 >
                    <option value="popular">Popularity</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                 </select>
                 <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
           </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <div className={`lg:w-1/4 ${isMobileFiltersOpen ? 'block' : 'hidden lg:block'}`}>
             <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 sticky top-28">
                <div className="flex items-center justify-between mb-6">
                   <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                      <SlidersHorizontal className="w-5 h-5" /> Filters
                   </h3>
                   <button 
                      onClick={() => {
                          setSearchQuery('');
                          setSelectedCategories([]);
                          setSelectedBrands([]);
                          setPriceRange(100);
                          setMinRating(0);
                      }}
                      className="text-xs font-bold text-rose-500 hover:underline"
                   >
                      Reset All
                   </button>
                </div>

                {/* Search */}
                <div className="mb-6">
                   <div className="relative">
                      <Search className="absolute left-3 top-3.5 h-4 w-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Search products..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-1 focus:ring-primary-500 outline-none"
                      />
                   </div>
                </div>

                {/* Categories */}
                <div className="mb-8 border-b border-slate-100 pb-6">
                   <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Categories</h4>
                   <div className="space-y-3">
                      {CATEGORIES.map(cat => (
                         <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${selectedCategories.includes(cat) ? 'bg-primary-600 border-primary-600' : 'bg-white border-slate-300 group-hover:border-primary-400'}`}>
                               {selectedCategories.includes(cat) && <Check className="w-3.5 h-3.5 text-white" />}
                            </div>
                            <input 
                              type="checkbox" 
                              className="hidden" 
                              checked={selectedCategories.includes(cat)}
                              onChange={() => toggleSelection(cat, selectedCategories, setSelectedCategories)}
                            />
                            <span className={`text-sm ${selectedCategories.includes(cat) ? 'text-primary-700 font-bold' : 'text-slate-600'}`}>{cat}</span>
                         </label>
                      ))}
                   </div>
                </div>

                {/* Price Range */}
                <div className="mb-8 border-b border-slate-100 pb-6">
                   <div className="flex justify-between items-center mb-4">
                      <h4 className="font-bold text-slate-800 text-sm uppercase tracking-wide">Max Price</h4>
                      <span className="text-primary-600 font-bold text-sm">${priceRange}</span>
                   </div>
                   <input 
                     type="range" 
                     min="0" 
                     max="200" 
                     step="5" 
                     value={priceRange}
                     onChange={(e) => setPriceRange(Number(e.target.value))}
                     className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-600"
                   />
                </div>

                {/* Brands */}
                <div className="mb-8 border-b border-slate-100 pb-6">
                   <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Brands</h4>
                   <div className="space-y-3 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      {BRANDS.map(brand => (
                         <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                             <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${selectedBrands.includes(brand) ? 'bg-primary-600 border-primary-600' : 'bg-white border-slate-300 group-hover:border-primary-400'}`}>
                                {selectedBrands.includes(brand) && <div className="w-2 h-2 bg-white rounded-full" />}
                             </div>
                            <input 
                              type="checkbox" 
                              className="hidden" 
                              checked={selectedBrands.includes(brand)}
                              onChange={() => toggleSelection(brand, selectedBrands, setSelectedBrands)}
                            />
                            <span className={`text-sm ${selectedBrands.includes(brand) ? 'text-primary-700 font-bold' : 'text-slate-600'}`}>{brand}</span>
                         </label>
                      ))}
                   </div>
                </div>

                {/* Rating */}
                <div>
                   <h4 className="font-bold text-slate-800 mb-4 text-sm uppercase tracking-wide">Minimum Rating</h4>
                   <div className="flex flex-col gap-2">
                      {[4, 3, 2, 1].map(rating => (
                         <label key={rating} className="flex items-center gap-3 cursor-pointer group">
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors ${minRating === rating ? 'bg-primary-600 border-primary-600' : 'bg-white border-slate-300 group-hover:border-primary-400'}`}>
                                {minRating === rating && <div className="w-2 h-2 bg-white rounded-full" />}
                            </div>
                            <input 
                               type="radio" 
                               name="rating"
                               className="hidden" 
                               checked={minRating === rating}
                               onChange={() => setMinRating(rating)}
                            />
                            <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={`w-3.5 h-3.5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-slate-200 fill-current'}`} />
                                ))}
                                <span className="text-xs text-slate-500 ml-1">& Up</span>
                            </div>
                         </label>
                      ))}
                   </div>
                </div>

             </div>
          </div>

          {/* Product Grid */}
          <div className="lg:w-3/4">
             {filteredProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                   {filteredProducts.map(product => renderProductCard(product))}
                </div>
             ) : (
                <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 flex flex-col items-center justify-center h-96">
                   <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6">
                      <Search className="w-8 h-8 text-slate-300" />
                   </div>
                   <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                   <p className="text-slate-500 max-w-xs mx-auto mb-8">
                      We couldn't find any products matching your current filters. Try adjusting your search criteria.
                   </p>
                   <button 
                      onClick={() => {
                          setSearchQuery('');
                          setSelectedCategories([]);
                          setPriceRange(100);
                          setMinRating(0);
                      }}
                      className="bg-primary-50 text-primary-700 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-primary-100 transition-colors"
                   >
                      Clear Filters
                   </button>
                </div>
             )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default AllMedicinePage;
