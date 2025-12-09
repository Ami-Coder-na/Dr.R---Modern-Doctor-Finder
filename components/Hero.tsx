import React from 'react';
import { ShieldCheck, Star, Users, ArrowRight, Play, Calendar } from 'lucide-react';

interface HeroProps {
  onSearchClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onSearchClick }) => {
  return (
    <div className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-slate-50">
      
      {/* Abstract Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-primary-100/50 blur-[100px]" />
        <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-100/50 blur-[100px]" />
        <div className="absolute top-[40%] left-[20%] w-32 h-32 bg-yellow-100/60 rounded-full blur-[60px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="lg:grid lg:grid-cols-12 lg:gap-16 items-center">
          
          {/* Text Content */}
          <div className="lg:col-span-6 text-center lg:text-left z-10">
            
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 shadow-sm mb-8 animate-fade-in-up">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-600 tracking-wider uppercase">#1 Trusted Health Platform</span>
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight text-slate-900 mb-6 leading-[1.1]">
              Find the Best <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-primary-800">
                Doctors Nearby
              </span>
            </h1>
            
            <p className="mt-6 text-xl text-slate-600 leading-relaxed mb-10 max-w-2xl mx-auto lg:mx-0 font-light">
              Connect with top-rated specialists in seconds. Get AI-powered recommendations, read verified reviews, and book your appointment instantly.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button
                onClick={onSearchClick}
                className="group inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-2xl text-white bg-slate-900 hover:bg-primary-600 transition-all duration-300 shadow-xl hover:shadow-primary-500/20 hover:-translate-y-1"
              >
                Book Appointment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-2xl text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 transition-all shadow-sm hover:shadow-md">
                <Play className="w-4 h-4 mr-2 fill-slate-700" />
                How it Works
              </button>
            </div>

            <div className="mt-12 pt-8 border-t border-slate-200 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-4 text-slate-500">
               <div className="flex items-center gap-2">
                 <ShieldCheck className="w-5 h-5 text-primary-600" />
                 <span className="text-sm font-semibold text-slate-700">Verified Specialists</span>
               </div>
               <div className="flex items-center gap-2">
                 <Star className="w-5 h-5 text-yellow-500 fill-current" />
                 <span className="text-sm font-semibold text-slate-700">4.9/5 Average Rating</span>
               </div>
            </div>
          </div>

          {/* Image Content - Right Side */}
          <div className="hidden lg:block lg:col-span-6 relative mt-12 lg:mt-0">
             {/* Main Image Container */}
             <div className="relative z-10 mx-auto w-full max-w-[550px]">
                {/* Decorative background blob behind image */}
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-100 to-blue-50 rounded-[3rem] rotate-6 transform scale-95 translate-y-4 -z-10"></div>
                
                <img 
                  src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800"
                  alt="Professional Doctor" 
                  className="relative rounded-[2.5rem] shadow-2xl object-cover w-full h-[650px] z-10"
                />
                
                {/* Floating Glass Card 1 - Review */}
                <div className="absolute top-12 -right-6 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 z-20 animate-float w-48">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-400">Review</span>
                    <div className="flex">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                    </div>
                  </div>
                  <p className="text-xs font-medium text-slate-800 leading-snug">
                    "Dr.R helped me find a specialist in minutes. Highly recommended!"
                  </p>
                  <div className="mt-3 flex items-center gap-2">
                     <img src="https://i.pravatar.cc/100?img=32" alt="User" className="w-6 h-6 rounded-full" />
                     <span className="text-xs text-slate-500">Sarah K.</span>
                  </div>
                </div>

                {/* Floating Glass Card 2 - Stats */}
                <div className="absolute bottom-24 -left-10 bg-white/90 backdrop-blur-xl p-5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 z-20 animate-float" style={{ animationDelay: '2s' }}>
                   <div className="flex items-center gap-4">
                     <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                        <Calendar className="w-6 h-6" />
                     </div>
                     <div>
                        <p className="text-2xl font-bold text-slate-900">24/7</p>
                        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">Instant Booking</p>
                     </div>
                   </div>
                </div>

                 {/* Floating Glass Card 3 - Users */}
                 <div className="absolute top-[40%] -right-12 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 z-20 animate-float" style={{ animationDelay: '4s' }}>
                   <p className="text-xs font-semibold text-slate-500 mb-2 text-center">Active Doctors</p>
                   <div className="flex -space-x-2 justify-center">
                     <img className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-slate-100" src="https://i.pravatar.cc/100?img=11" alt="" />
                     <img className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-slate-100" src="https://i.pravatar.cc/100?img=68" alt="" />
                     <img className="w-8 h-8 rounded-full border-2 border-white ring-1 ring-slate-100" src="https://i.pravatar.cc/100?img=33" alt="" />
                     <div className="w-8 h-8 rounded-full border-2 border-white bg-primary-100 flex items-center justify-center text-[10px] font-bold text-primary-700 ring-1 ring-slate-100">50+</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;