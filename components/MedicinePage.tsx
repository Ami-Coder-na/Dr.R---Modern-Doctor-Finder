
import React, { useState, useRef } from 'react';
import { Medicine } from '../types';
import { useCart } from '../context/CartContext';
import { Search, ShoppingCart, Plus, Filter, Tag, ChevronLeft, ChevronRight, Star, Heart, Leaf, Pill, Baby, Sparkles, ShoppingBasket, Truck, ShieldCheck, CreditCard, Upload, Zap, Award, Thermometer, Stethoscope } from 'lucide-react';

interface MedicinePageProps {
  onProductClick: (product: Medicine) => void;
  onViewAll?: () => void;
}

// --- Mock Data ---

const HERO_SLIDES = [
  {
    id: 1,
    title: "Ultra organic face cream",
    subtitle: "New formula",
    discount: "SAVE 65% OFF",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=800",
    bgColor: "bg-[#F3E8FF]" // Light purple
  },
  {
    id: 2,
    title: "Multivitamin Complex",
    subtitle: "Boost Immunity",
    discount: "FLAT 30% OFF",
    image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=800",
    bgColor: "bg-[#ECFCCB]" // Light lime
  }
];

const SHOP_CATEGORIES = [
  { name: 'Medicines', image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300', color: 'bg-blue-50 text-blue-700' },
  { name: 'Supplements', image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80&w=300', color: 'bg-green-50 text-green-700' },
  { name: 'Baby Care', image: 'https://images.unsplash.com/photo-1515488042361-25e508358255?auto=format&fit=crop&q=80&w=300', color: 'bg-pink-50 text-pink-700' },
  { name: 'Personal Care', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=300', color: 'bg-purple-50 text-purple-700' },
  { name: 'Devices', image: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&q=80&w=300', color: 'bg-orange-50 text-orange-700' },
  { name: 'Herbs', image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=300', color: 'bg-emerald-50 text-emerald-700' },
];

const HEALTH_CONCERNS = [
  { title: 'Diabetes', image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=200' },
  { title: 'Heart Care', image: 'https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?auto=format&fit=crop&q=80&w=200' },
  { title: 'Stomach Care', image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&q=80&w=200' },
  { title: 'Skin Care', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=200' },
  { title: 'Eye Care', image: 'https://images.unsplash.com/photo-1597248881519-db089d3744a5?auto=format&fit=crop&q=80&w=200' },
  { title: 'Orthopaedics', image: 'https://images.unsplash.com/photo-1584744982491-665216d95f8b?auto=format&fit=crop&q=80&w=200' },
];

const BRANDS = [
  { name: 'Himalaya', color: 'bg-[#ECFDF5] text-[#047857]' },
  { name: 'Accu-Chek', color: 'bg-[#EFF6FF] text-[#1D4ED8]' },
  { name: 'Vicks', color: 'bg-[#EEF2FF] text-[#4338CA]' },
  { name: 'Dettol', color: 'bg-[#FFF7ED] text-[#C2410C]' },
  { name: 'Dabur', color: 'bg-[#FEF2F2] text-[#B91C1C]' },
  { name: 'Ensure', color: 'bg-[#FAF5FF] text-[#7E22CE]' },
];

const PRODUCTS: Medicine[] = [
  {
    id: 1,
    name: 'Vitamin C 500mg Sugarless Tab X',
    category: 'Supplements',
    rating: 4,
    price: 16.00,
    oldPrice: 35.00,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
    tag: 'Sale',
    tagColor: 'bg-green-500'
  },
  {
    id: 2,
    name: 'Vitamin D3 (1000IU) Cap X',
    category: 'Supplements',
    rating: 5,
    price: 30.00,
    oldPrice: 40.00,
    image: 'https://images.unsplash.com/photo-1624454002302-36b824d7bd0a?auto=format&fit=crop&q=80&w=400',
    tag: 'Sale',
    tagColor: 'bg-green-500'
  },
  {
    id: 3,
    name: 'Own Vitamin B1 250mg Tab X 75',
    category: 'Medicines',
    rating: 0,
    price: 15.50,
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031a831?auto=format&fit=crop&q=80&w=400',
    tag: undefined
  },
  {
    id: 4,
    name: 'Spring Leaf Liver Detox',
    category: 'Supplements',
    rating: 5,
    price: 31.95,
    oldPrice: 22.00,
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?auto=format&fit=crop&q=80&w=400',
    tag: 'Sale',
    tagColor: 'bg-green-500'
  },
  {
    id: 5,
    name: 'Amazonia Raw Protein Slim &',
    category: 'Herbs',
    rating: 4,
    price: 37.50,
    oldPrice: 33.50,
    image: 'https://images.unsplash.com/photo-1577401239170-897942555fb3?auto=format&fit=crop&q=80&w=400',
    tag: 'Sale',
    tagColor: 'bg-green-500'
  },
  {
    id: 6,
    name: 'Enterosgel Tube',
    category: 'Medicines',
    rating: 4,
    price: 41.95,
    image: 'https://images.unsplash.com/photo-1550572017-edd951aa8f72?auto=format&fit=crop&q=80&w=400',
    tag: undefined
  },
  {
    id: 7,
    name: 'Protein Chocolate Flake',
    category: 'Supplements',
    rating: 5,
    price: 54.95,
    image: 'https://images.unsplash.com/photo-1593095818028-d1e5672691f1?auto=format&fit=crop&q=80&w=400',
    tag: undefined
  },
  {
    id: 8,
    name: 'Advil Minis Liquid Cap X 90',
    category: 'Medicines',
    rating: 5,
    price: 22.00,
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&q=80&w=400',
    tag: 'Popular',
    tagColor: 'bg-purple-500'
  },
  {
    id: 9,
    name: 'Digital Thermometer',
    category: 'Devices',
    rating: 5,
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1583324113626-70df0f4deaab?auto=format&fit=crop&q=80&w=400',
    tag: 'Essential',
    tagColor: 'bg-blue-500'
  },
  {
    id: 10,
    name: 'Gentle Baby Lotion',
    category: 'Baby Care',
    rating: 4,
    price: 18.00,
    image: 'https://images.unsplash.com/photo-1515488042361-25e508358255?auto=format&fit=crop&q=80&w=400',
    tag: undefined
  },
  {
    id: 11,
    name: 'Hydrating Face Serum',
    category: 'Personal Care',
    rating: 5,
    price: 25.00,
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400',
    tag: 'New',
    tagColor: 'bg-pink-500'
  }
];

const MedicinePage: React.FC<MedicinePageProps> = ({ onProductClick, onViewAll }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('All');
  const { addToCart } = useCart();
  const productGridRef = useRef<HTMLDivElement>(null);

  const filteredProducts = activeTab === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeTab);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

  const handleCategoryClick = (category: string) => {
      setActiveTab(category);
      // Smooth scroll to product grid
      if (productGridRef.current) {
          productGridRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
  };

  const renderProductCard = (product: Medicine) => (
    <div 
        key={product.id} 
        onClick={() => onProductClick(product)}
        className="group bg-white rounded-[2rem] p-4 border border-slate-50 hover:border-slate-100 hover:shadow-xl transition-all duration-300 relative cursor-pointer flex flex-col h-full"
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
            <h3 className="font-bold text-slate-900 text-base mb-2 line-clamp-2 leading-snug">{product.name}</h3>
            
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
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen animate-fade-in-up font-sans text-slate-800">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* --- Hero Slider --- */}
        <div className="relative rounded-[2.5rem] overflow-hidden shadow-sm mb-8 h-[400px] md:h-[500px] group">
          <div 
            className="w-full h-full transition-all duration-700 ease-in-out flex"
            style={{ transform: `translateX(-${currentSlide * 100}%)` }}
          >
            {HERO_SLIDES.map((slide) => (
              <div key={slide.id} className={`w-full flex-shrink-0 h-full ${slide.bgColor} relative flex items-center justify-center`}>
                 <div className="text-center z-10 px-4">
                    <p className="text-sm md:text-base text-slate-500 font-medium mb-2 uppercase tracking-widest">{slide.subtitle}</p>
                    <h2 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 max-w-2xl mx-auto leading-tight">
                      {slide.title}
                    </h2>
                    <div className="inline-block bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-8">
                      {slide.discount}
                    </div>
                    <div>
                      <button className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold shadow-lg hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2 mx-auto">
                        Buy it now <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                 </div>
                 <div className="absolute right-0 bottom-0 w-1/2 h-full hidden md:block opacity-80 pointer-events-none">
                    <img src={slide.image} alt={slide.title} className="w-full h-full object-cover mix-blend-multiply opacity-80" />
                 </div>
              </div>
            ))}
          </div>

          <button onClick={prevSlide} className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"><ChevronLeft className="w-6 h-6 text-slate-700" /></button>
          <button onClick={nextSlide} className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/50 hover:bg-white p-2 rounded-full backdrop-blur-sm transition-all opacity-0 group-hover:opacity-100"><ChevronRight className="w-6 h-6 text-slate-700" /></button>
        </div>

        {/* --- Upload Prescription & Flash Sale --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
           <div className="bg-blue-600 rounded-3xl p-6 text-white flex flex-col justify-between relative overflow-hidden group hover:shadow-lg transition-all">
               <div className="relative z-10">
                   <h3 className="text-2xl font-bold mb-2">Order with Prescription</h3>
                   <p className="text-blue-100 text-sm mb-6">Upload your prescription and we will deliver your medicines.</p>
                   <button className="bg-white text-blue-600 px-6 py-2.5 rounded-full font-bold text-sm flex items-center gap-2 hover:bg-blue-50 transition-colors">
                       <Upload className="w-4 h-4" /> Upload Now
                   </button>
               </div>
               <div className="absolute -right-4 -bottom-4 bg-white/10 w-32 h-32 rounded-full blur-2xl"></div>
           </div>
           
           <div className="md:col-span-2 bg-gradient-to-r from-rose-500 to-orange-500 rounded-3xl p-6 text-white flex items-center justify-between relative overflow-hidden">
                <div className="relative z-10">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-3 inline-block">Flash Sale Ends in 24h</span>
                    <h3 className="text-3xl font-bold mb-1">Super Healthy Sale</h3>
                    <p className="text-white/90 mb-4">Get up to 80% off on all health products</p>
                    <button className="bg-white text-rose-600 px-6 py-2.5 rounded-full font-bold text-sm hover:bg-rose-50 transition-colors">Shop Now</button>
                </div>
                <img src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=300" className="absolute right-0 bottom-0 h-[140%] object-contain mix-blend-multiply opacity-50" alt="Sale"/>
           </div>
        </div>

        {/* --- Shop by Category (NEW) --- */}
        <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {SHOP_CATEGORIES.map((cat, idx) => (
                    <div 
                        key={idx} 
                        onClick={() => handleCategoryClick(cat.name)}
                        className="bg-white rounded-[1.5rem] p-4 text-center border border-slate-100 hover:shadow-xl transition-all hover:border-primary-200 cursor-pointer group hover:-translate-y-1"
                    >
                        <div className={`w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-50 group-hover:border-primary-50 transition-all flex items-center justify-center ${cat.color.split(' ')[0]}`}>
                            <img src={cat.image} alt={cat.name} className="w-full h-full object-cover mix-blend-multiply" />
                        </div>
                        <h3 className={`font-bold text-sm ${cat.color.split(' ')[1] || 'text-slate-700'}`}>{cat.name}</h3>
                    </div>
                ))}
            </div>
        </div>

        {/* --- Shop by Health Concern --- */}
        <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Shop by Health Concern</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {HEALTH_CONCERNS.map((item, index) => (
                    <div key={index} className="bg-white rounded-2xl p-4 text-center border border-slate-100 hover:shadow-lg transition-all hover:border-primary-200 cursor-pointer group">
                        <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-50 group-hover:border-primary-50 transition-all">
                            <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                        </div>
                        <h3 className="font-bold text-slate-700 text-sm group-hover:text-primary-600">{item.title}</h3>
                    </div>
                ))}
            </div>
        </div>

        {/* --- Popular Products Tabs --- */}
        <div ref={productGridRef} className="scroll-mt-32 flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 md:mb-0">Popular Products</h2>
            <div className="flex gap-2 flex-wrap justify-center items-center">
                {['All', 'Supplements', 'Medicines', 'Herbs', 'Devices', 'Baby Care', 'Personal Care'].map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                            activeTab === cat 
                            ? 'bg-slate-900 text-white border-slate-900' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
                 <button 
                    onClick={onViewAll}
                    className="px-4 py-2 rounded-full text-sm font-bold transition-all border bg-primary-50 text-primary-700 border-primary-200 hover:bg-primary-100"
                >
                    View All Products
                </button>
            </div>
        </div>

        {/* --- Products Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 min-h-[400px]">
            {filteredProducts.length > 0 ? (
                filteredProducts.map(product => renderProductCard(product))
            ) : (
                <div className="col-span-full text-center py-20 bg-white rounded-3xl border border-slate-100">
                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-8 h-8 text-slate-400" />
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">No products found</h3>
                    <p className="text-slate-500">We currently don't have any items in the {activeTab} category.</p>
                </div>
            )}
        </div>

        {/* --- Membership Banner --- */}
        <div className="bg-indigo-900 rounded-[2.5rem] p-8 md:p-12 mb-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative z-10 text-white max-w-xl">
                 <div className="flex items-center gap-2 mb-4 text-yellow-400">
                    <Award className="w-6 h-6" />
                    <span className="font-bold tracking-widest uppercase text-sm">Plus Membership</span>
                 </div>
                 <h2 className="text-3xl md:text-5xl font-bold mb-4">Save Extra 5% on Every Order</h2>
                 <p className="text-indigo-200 mb-8 text-lg">Become a member and get free delivery, exclusive deals, and priority support.</p>
                 <button className="bg-yellow-400 text-indigo-900 px-8 py-3 rounded-full font-bold hover:bg-yellow-300 transition-colors shadow-lg">
                    Join Now @ $9/mo
                 </button>
            </div>
            <div className="relative z-10">
                <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20 text-white max-w-xs">
                    <div className="flex items-center gap-3 mb-3">
                        <Truck className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold">Free Delivery</span>
                    </div>
                    <div className="flex items-center gap-3 mb-3">
                        <Zap className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold">Rapid Access</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <ShieldCheck className="w-5 h-5 text-yellow-400" />
                        <span className="font-bold">Double Points</span>
                    </div>
                </div>
            </div>
            {/* Abstract Background Shapes */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        </div>

        {/* --- Wellness Essentials (Second Grid) --- */}
        <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold text-slate-900">Wellness Essentials</h2>
                <button 
                    onClick={() => handleCategoryClick('Supplements')}
                    className="text-primary-600 font-bold hover:underline"
                >
                    View All
                </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {PRODUCTS.slice(0, 4).map(product => renderProductCard(product))}
            </div>
        </div>

        {/* --- Featured Brands --- */}
        <div className="mb-16">
            <h2 className="text-2xl font-bold text-slate-900 mb-8 text-center">Featured Brands</h2>
            <div className="flex flex-wrap justify-center gap-6">
                {BRANDS.map((brand, idx) => (
                    <div key={idx} className={`px-10 py-5 rounded-2xl font-bold text-lg ${brand.color} hover:-translate-y-1 hover:shadow-lg transition-all duration-300 cursor-pointer min-w-[150px] text-center flex items-center justify-center`}>
                        {brand.name}
                    </div>
                ))}
            </div>
        </div>

      </div>
    </div>
  );
};

export default MedicinePage;
