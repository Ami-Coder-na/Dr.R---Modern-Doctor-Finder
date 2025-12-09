
import React, { useState } from 'react';
import { Medicine } from '../types';
import { useCart } from '../context/CartContext';
import { Search, ShoppingCart, Plus, Filter, Tag, ChevronLeft, ChevronRight, Star, Heart, Leaf, Pill, Baby, Sparkles, ShoppingBasket, Truck, ShieldCheck, CreditCard, Upload } from 'lucide-react';

interface MedicinePageProps {
  onProductClick: (product: Medicine) => void;
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

const CATEGORY_ICONS = [
  { name: 'Baby', icon: Baby, color: 'text-blue-400' },
  { name: 'Beauty', icon: Sparkles, color: 'text-pink-400' },
  { name: 'Grocery', icon: ShoppingBasket, color: 'text-green-500' },
  { name: 'Health', icon: Heart, color: 'text-red-400' },
  { name: 'Herbs', icon: Leaf, color: 'text-emerald-500' },
  { name: 'Medicines', icon: Pill, color: 'text-blue-500' },
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
  }
];

const MedicinePage: React.FC<MedicinePageProps> = ({ onProductClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [activeTab, setActiveTab] = useState('Supplements');
  const { addToCart } = useCart();

  const filteredProducts = activeTab === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === activeTab || (activeTab === 'Supplements' && p.category === 'Supplements'));

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
  };

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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
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

        {/* --- Category Icons --- */}
        <div className="flex justify-between md:justify-center md:gap-16 overflow-x-auto pb-4 mb-16 no-scrollbar">
            {CATEGORY_ICONS.map((cat, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 min-w-[80px] cursor-pointer group">
                    <div className="w-16 h-16 rounded-full bg-white border border-slate-100 flex items-center justify-center shadow-sm group-hover:border-primary-200 group-hover:shadow-md transition-all">
                        <cat.icon className={`w-7 h-7 ${cat.color}`} />
                    </div>
                    <span className="text-xs font-bold text-slate-700 group-hover:text-primary-600">{cat.name}</span>
                </div>
            ))}
        </div>

        {/* --- Popular Products Tabs --- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4 md:mb-0">Popular Products</h2>
            <div className="flex gap-2">
                {['Supplements', 'Medicines', 'Herbs'].map(cat => (
                    <button 
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`px-6 py-2 rounded-full text-sm font-bold transition-all border ${
                            activeTab === cat 
                            ? 'bg-slate-900 text-white border-slate-900' 
                            : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>
        </div>

        {/* --- Products Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {filteredProducts.map(product => (
                <div 
                   key={product.id} 
                   onClick={() => onProductClick(product)}
                   className="group bg-white rounded-[2rem] p-4 border border-slate-50 hover:border-slate-100 hover:shadow-xl transition-all duration-300 relative cursor-pointer flex flex-col"
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
                                className="bg-slate-900 text-white p-2.5 rounded-full hover:bg-primary-600 transition-colors"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
};

export default MedicinePage;
