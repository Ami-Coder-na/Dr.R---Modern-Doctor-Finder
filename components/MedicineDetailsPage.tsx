
import React, { useState } from 'react';
import { Medicine } from '../types';
import { useCart } from '../context/CartContext';
import { Star, Minus, Plus, ShoppingCart, Heart, Share2, ArrowLeft, Truck, ShieldCheck, RefreshCw } from 'lucide-react';

interface MedicineDetailsPageProps {
  product: Medicine;
  onBack: () => void;
  onGoToCart: () => void;
}

const MedicineDetailsPage: React.FC<MedicineDetailsPageProps> = ({ product, onBack, onGoToCart }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    onGoToCart();
  };

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen animate-fade-in-up">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb / Back */}
        <button 
          onClick={onBack} 
          className="flex items-center text-slate-500 hover:text-primary-600 mb-8 transition-colors font-medium"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Medicine Shop
        </button>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="bg-slate-50 rounded-2xl h-[400px] flex items-center justify-center p-8 relative overflow-hidden group">
               <img 
                 src={product.image} 
                 alt={product.name} 
                 className="h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110" 
               />
               {product.tag && (
                  <span className={`absolute top-4 left-4 ${product.tagColor || 'bg-green-500'} text-white text-xs font-bold px-3 py-1.5 rounded-full z-10`}>
                      {product.tag}
                  </span>
               )}
            </div>
            <div className="grid grid-cols-4 gap-4">
               {[1, 2, 3, 4].map((i) => (
                 <div key={i} className={`bg-slate-50 rounded-xl h-24 flex items-center justify-center p-2 cursor-pointer border-2 transition-all ${i === 1 ? 'border-primary-500' : 'border-transparent hover:border-slate-200'}`}>
                    <img src={product.image} className="h-full object-contain mix-blend-multiply" alt="Thumbnail" />
                 </div>
               ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div>
             <div className="flex justify-between items-start mb-4">
                <div>
                   <span className="text-primary-600 font-bold text-sm bg-primary-50 px-3 py-1 rounded-full uppercase tracking-wider">
                     {product.category}
                   </span>
                   <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-2">{product.name}</h1>
                   <div className="flex items-center gap-2 mb-4">
                      <div className="flex text-yellow-400">
                         {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`w-4 h-4 ${i < product.rating ? 'fill-current' : 'text-slate-200'}`} />
                         ))}
                      </div>
                      <span className="text-sm text-slate-500 font-medium">(128 Reviews)</span>
                      <span className="text-slate-300">|</span>
                      <span className="text-green-600 text-sm font-bold">In Stock</span>
                   </div>
                </div>
                <div className="flex gap-2">
                   <button className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-rose-500 transition-colors">
                      <Heart className="w-6 h-6" />
                   </button>
                   <button className="p-2 rounded-full hover:bg-slate-100 text-slate-400 hover:text-blue-500 transition-colors">
                      <Share2 className="w-6 h-6" />
                   </button>
                </div>
             </div>

             <div className="flex items-end gap-3 mb-8 border-b border-slate-100 pb-8">
                <span className="text-4xl font-bold text-slate-900">${product.price.toFixed(2)}</span>
                {product.oldPrice && (
                  <span className="text-xl text-slate-400 line-through mb-1">${product.oldPrice.toFixed(2)}</span>
                )}
             </div>

             <p className="text-slate-600 leading-relaxed mb-8">
               {product.description || "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."}
             </p>

             {/* Actions */}
             <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-slate-200 rounded-full h-12 w-32">
                   <button 
                     onClick={() => setQuantity(Math.max(1, quantity - 1))}
                     className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900"
                   >
                     <Minus className="w-4 h-4" />
                   </button>
                   <span className="flex-1 text-center font-bold text-slate-900">{quantity}</span>
                   <button 
                     onClick={() => setQuantity(quantity + 1)}
                     className="w-10 h-full flex items-center justify-center text-slate-500 hover:text-slate-900"
                   >
                     <Plus className="w-4 h-4" />
                   </button>
                </div>
                <button 
                  onClick={handleAddToCart}
                  className="flex-1 bg-slate-900 text-white h-12 rounded-full font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl hover:-translate-y-1"
                >
                   <ShoppingCart className="w-5 h-5" />
                   Add to Cart
                </button>
                <button 
                  onClick={handleBuyNow}
                  className="flex-1 bg-primary-600 text-white h-12 rounded-full font-bold hover:bg-primary-700 transition-all shadow-lg hover:shadow-primary-500/30 hover:-translate-y-1"
                >
                   Buy Now
                </button>
             </div>

             {/* Features */}
             <div className="grid grid-cols-3 gap-4 text-center">
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50">
                   <Truck className="w-6 h-6 text-slate-700" />
                   <span className="text-xs font-bold text-slate-600">Free Delivery</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50">
                   <ShieldCheck className="w-6 h-6 text-slate-700" />
                   <span className="text-xs font-bold text-slate-600">Authentic</span>
                </div>
                <div className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50">
                   <RefreshCw className="w-6 h-6 text-slate-700" />
                   <span className="text-xs font-bold text-slate-600">Easy Return</span>
                </div>
             </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
           <div className="flex border-b border-slate-200 mb-8">
              {['description', 'ingredients', 'reviews'].map((tab) => (
                 <button
                   key={tab}
                   onClick={() => setActiveTab(tab)}
                   className={`px-8 py-4 font-bold text-sm uppercase tracking-wider transition-all border-b-2 ${
                     activeTab === tab 
                     ? 'border-primary-600 text-primary-600' 
                     : 'border-transparent text-slate-400 hover:text-slate-700'
                   }`}
                 >
                   {tab}
                 </button>
              ))}
           </div>
           
           <div className="prose max-w-none text-slate-600">
              {activeTab === 'description' && (
                <div className="animate-fade-in">
                  <p className="mb-4">
                    This premium health product is formulated with high-quality ingredients to support your well-being. Clinically tested and approved by experts, it provides essential nutrients that may be missing from your daily diet.
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                     <li>Supports immune system health</li>
                     <li>Promotes energy levels and vitality</li>
                     <li>Made with natural, non-GMO ingredients</li>
                     <li>Free from artificial colors and preservatives</li>
                  </ul>
                </div>
              )}
              {activeTab === 'ingredients' && (
                 <div className="animate-fade-in">
                    <p>Active Ingredients: Vitamin C (as Ascorbic Acid), Vitamin D3 (as Cholecalciferol), Zinc (as Zinc Gluconate).</p>
                    <p className="mt-4">Other Ingredients: Microcrystalline Cellulose, Stearic Acid, Magnesium Stearate, Silica.</p>
                 </div>
              )}
              {activeTab === 'reviews' && (
                 <div className="animate-fade-in space-y-6">
                    {[1, 2].map((i) => (
                       <div key={i} className="border-b border-slate-100 last:border-0 pb-6 last:pb-0">
                          <div className="flex items-center gap-2 mb-2">
                             <div className="flex text-yellow-400">
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                                <Star className="w-4 h-4 fill-current" />
                             </div>
                             <span className="font-bold text-slate-900">Great Product!</span>
                          </div>
                          <p className="text-slate-600 text-sm mb-2">"I've been using this for a month and I can feel the difference. Highly recommended!"</p>
                          <p className="text-xs text-slate-400">- John Doe, Verified Buyer</p>
                       </div>
                    ))}
                 </div>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default MedicineDetailsPage;
