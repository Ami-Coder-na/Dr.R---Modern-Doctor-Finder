
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, CreditCard, MapPin, CheckCircle, ArrowLeft, ArrowRight, Truck } from 'lucide-react';

interface CheckoutPageProps {
  onBack: () => void;
  onContinueShopping: () => void;
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ onBack, onContinueShopping }) => {
  const { cart, updateQuantity, removeFromCart, cartTotal, clearCart } = useCart();
  const [step, setStep] = useState(1); // 1: Cart, 2: Shipping, 3: Payment, 4: Success
  const [isProcessing, setIsProcessing] = useState(false);

  const shippingCost = cartTotal > 50 ? 0 : 10;
  const tax = cartTotal * 0.05; // 5% tax
  const finalTotal = cartTotal + shippingCost + tax;

  const handlePayment = async () => {
    setIsProcessing(true);
    // Simulate API
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    clearCart();
    setStep(4);
  };

  if (cart.length === 0 && step !== 4) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex items-center justify-center animate-fade-in-up">
        <div className="text-center">
           <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-6">
              <Truck className="w-10 h-10 text-slate-400" />
           </div>
           <h2 className="text-2xl font-bold text-slate-900 mb-2">Your Cart is Empty</h2>
           <p className="text-slate-500 mb-8">Looks like you haven't added anything yet.</p>
           <button 
             onClick={onContinueShopping}
             className="bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition-colors"
           >
             Start Shopping
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen animate-fade-in-up">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Step Indicator */}
        {step < 4 && (
          <div className="mb-12">
             <button onClick={onBack} className="flex items-center text-slate-500 hover:text-primary-600 mb-6 font-medium">
               <ArrowLeft className="w-4 h-4 mr-2" /> Continue Shopping
             </button>
             <div className="flex items-center justify-center max-w-2xl mx-auto">
                <div className={`flex flex-col items-center ${step >= 1 ? 'text-primary-600' : 'text-slate-400'}`}>
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step >= 1 ? 'bg-primary-600 text-white' : 'bg-slate-200'}`}>1</div>
                   <span className="text-xs font-bold uppercase">Cart</span>
                </div>
                <div className={`flex-1 h-1 mx-4 rounded-full ${step >= 2 ? 'bg-primary-600' : 'bg-slate-200'}`}></div>
                <div className={`flex flex-col items-center ${step >= 2 ? 'text-primary-600' : 'text-slate-400'}`}>
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step >= 2 ? 'bg-primary-600 text-white' : 'bg-slate-200'}`}>2</div>
                   <span className="text-xs font-bold uppercase">Shipping</span>
                </div>
                <div className={`flex-1 h-1 mx-4 rounded-full ${step >= 3 ? 'text-primary-600' : 'bg-slate-200'}`}></div>
                <div className={`flex flex-col items-center ${step >= 3 ? 'text-primary-600' : 'text-slate-400'}`}>
                   <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 transition-colors ${step >= 3 ? 'bg-primary-600 text-white' : 'bg-slate-200'}`}>3</div>
                   <span className="text-xs font-bold uppercase">Payment</span>
                </div>
             </div>
          </div>
        )}

        {step === 4 ? (
           <div className="text-center max-w-lg mx-auto py-12 bg-white rounded-3xl shadow-sm border border-slate-100 animate-fade-in">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
                 <CheckCircle className="w-10 h-10" />
              </div>
              <h2 className="text-3xl font-bold text-slate-900 mb-2">Order Confirmed!</h2>
              <p className="text-slate-500 mb-8 px-8">Thank you for your purchase. Your order #MED-8932 has been placed and will be delivered shortly.</p>
              <button 
                onClick={onContinueShopping}
                className="bg-slate-900 text-white px-10 py-3.5 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg"
              >
                Back to Shop
              </button>
           </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Left Column: Forms */}
            <div className="lg:col-span-8">
               <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
                  
                  {/* Step 1: Cart Items */}
                  {step === 1 && (
                     <div className="p-8 animate-fade-in">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Shopping Cart ({cart.length})</h2>
                        <div className="space-y-6">
                           {cart.map(item => (
                              <div key={item.id} className="flex items-center gap-6 pb-6 border-b border-slate-100 last:border-0 last:pb-0">
                                 <div className="w-24 h-24 bg-slate-50 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <img src={item.image} alt={item.name} className="h-20 w-20 object-contain mix-blend-multiply" />
                                 </div>
                                 <div className="flex-1">
                                    <h3 className="font-bold text-slate-900 text-lg mb-1">{item.name}</h3>
                                    <p className="text-sm text-slate-500 mb-2">{item.category}</p>
                                    <div className="font-bold text-primary-600 text-lg">${item.price.toFixed(2)}</div>
                                 </div>
                                 <div className="flex flex-col items-end gap-4">
                                     <button onClick={() => removeFromCart(item.id)} className="text-slate-400 hover:text-rose-500 transition-colors">
                                        <Trash2 className="w-5 h-5" />
                                     </button>
                                     <div className="flex items-center border border-slate-200 rounded-full h-9">
                                        <button 
                                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                          className="w-8 h-full flex items-center justify-center hover:bg-slate-50 rounded-l-full"
                                        >
                                          <Minus className="w-3 h-3" />
                                        </button>
                                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                                        <button 
                                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                          className="w-8 h-full flex items-center justify-center hover:bg-slate-50 rounded-r-full"
                                        >
                                          <Plus className="w-3 h-3" />
                                        </button>
                                     </div>
                                 </div>
                              </div>
                           ))}
                        </div>
                     </div>
                  )}

                  {/* Step 2: Shipping */}
                  {step === 2 && (
                     <div className="p-8 animate-fade-in space-y-6">
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Shipping Details</h2>
                        <div className="grid grid-cols-2 gap-6">
                           <div className="col-span-2">
                              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                              <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 outline-none" placeholder="John Doe" />
                           </div>
                           <div className="col-span-2">
                              <label className="block text-sm font-bold text-slate-700 mb-2">Address</label>
                              <div className="relative">
                                 <MapPin className="absolute left-3 top-3.5 h-5 w-5 text-slate-400" />
                                 <input type="text" className="w-full pl-10 p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 outline-none" placeholder="123 Medical Plaza" />
                              </div>
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-slate-700 mb-2">City</label>
                              <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 outline-none" placeholder="New York" />
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-slate-700 mb-2">Zip Code</label>
                              <input type="text" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 outline-none" placeholder="10001" />
                           </div>
                           <div className="col-span-2">
                              <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                              <input type="tel" className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 outline-none" placeholder="+1 (555) 000-0000" />
                           </div>
                        </div>
                     </div>
                  )}

                  {/* Step 3: Payment */}
                  {step === 3 && (
                     <div className="p-8 animate-fade-in">
                        <h2 className="text-2xl font-bold text-slate-900 mb-6">Payment Method</h2>
                        
                        <div className="space-y-4">
                           <label className="flex items-center p-4 border border-primary-500 bg-primary-50 rounded-xl cursor-pointer">
                              <input type="radio" name="payment" defaultChecked className="w-5 h-5 text-primary-600" />
                              <div className="ml-4 flex items-center gap-3">
                                 <CreditCard className="w-6 h-6 text-primary-600" />
                                 <span className="font-bold text-slate-900">Credit / Debit Card</span>
                              </div>
                           </label>
                           
                           <div className="pl-9 pr-4 space-y-4 mb-6">
                              <input type="text" placeholder="Card Number" className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 outline-none" />
                              <div className="grid grid-cols-2 gap-4">
                                 <input type="text" placeholder="MM/YY" className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 outline-none" />
                                 <input type="text" placeholder="CVC" className="w-full p-3 bg-white border border-slate-200 rounded-xl focus:ring-1 focus:ring-primary-500 outline-none" />
                              </div>
                           </div>

                           <label className="flex items-center p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50">
                              <input type="radio" name="payment" className="w-5 h-5 text-slate-400" />
                              <div className="ml-4 flex items-center gap-3">
                                 <Truck className="w-6 h-6 text-slate-500" />
                                 <span className="font-bold text-slate-700">Cash on Delivery</span>
                              </div>
                           </label>
                        </div>
                     </div>
                  )}

                  {/* Footer Actions */}
                  <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
                     {step > 1 ? (
                        <button onClick={() => setStep(step - 1)} className="text-slate-500 font-bold hover:text-slate-900">
                           Back
                        </button>
                     ) : (
                        <div></div>
                     )}
                     
                     <button 
                        onClick={() => step < 3 ? setStep(step + 1) : handlePayment()}
                        disabled={isProcessing}
                        className="bg-slate-900 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors shadow-lg flex items-center gap-2"
                     >
                        {isProcessing ? 'Processing...' : step === 3 ? 'Pay Now' : 'Continue'}
                        {!isProcessing && step < 3 && <ArrowRight className="w-4 h-4" />}
                     </button>
                  </div>
               </div>
            </div>

            {/* Right Column: Order Summary */}
            <div className="lg:col-span-4">
               <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 sticky top-32">
                  <h3 className="font-bold text-slate-900 text-lg mb-6">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6 border-b border-slate-100 pb-6">
                     <div className="flex justify-between text-slate-600">
                        <span>Subtotal</span>
                        <span className="font-bold text-slate-900">${cartTotal.toFixed(2)}</span>
                     </div>
                     <div className="flex justify-between text-slate-600">
                        <span>Shipping</span>
                        <span className="font-bold text-slate-900">{shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`}</span>
                     </div>
                     <div className="flex justify-between text-slate-600">
                        <span>Tax (5%)</span>
                        <span className="font-bold text-slate-900">${tax.toFixed(2)}</span>
                     </div>
                  </div>

                  <div className="flex justify-between items-center mb-8">
                     <span className="font-bold text-xl text-slate-900">Total</span>
                     <span className="font-bold text-2xl text-primary-600">${finalTotal.toFixed(2)}</span>
                  </div>

                  {step === 3 && (
                     <div className="flex items-center gap-2 text-xs text-slate-400 justify-center">
                        <CheckCircle className="w-3 h-3" /> Secure SSL Payment
                     </div>
                  )}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
