import React from 'react';
import { ClipboardList, Stethoscope, HeartHandshake } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 lg:left-20 opacity-30 pointer-events-none">
        {/* DNA Icon */}
        <svg width="180" height="180" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-200 animate-float" style={{ animationDuration: '8s' }}>
           <path d="M30,10 Q50,30 30,50 T30,90" strokeLinecap="round" />
           <path d="M70,10 Q50,30 70,50 T70,90" strokeLinecap="round" />
           <line x1="30" y1="20" x2="70" y2="20" opacity="0.5" />
           <line x1="40" y1="30" x2="60" y2="30" opacity="0.5" />
           <line x1="30" y1="40" x2="70" y2="40" opacity="0.5" />
           <line x1="40" y1="50" x2="60" y2="50" opacity="0.5" />
           <line x1="30" y1="60" x2="70" y2="60" opacity="0.5" />
           <line x1="40" y1="70" x2="60" y2="70" opacity="0.5" />
           <line x1="30" y1="80" x2="70" y2="80" opacity="0.5" />
        </svg>
      </div>
       <div className="absolute bottom-10 right-0 lg:right-20 opacity-30 pointer-events-none">
        {/* Atom Icon */}
        <svg width="200" height="200" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-200 animate-float" style={{ animationDelay: '2s', animationDuration: '10s' }}>
            <circle cx="50" cy="50" r="5" fill="currentColor" className="text-blue-300" />
            <ellipse cx="50" cy="50" rx="40" ry="12" className="text-blue-300" transform="rotate(0 50 50)" />
            <ellipse cx="50" cy="50" rx="40" ry="12" className="text-blue-300" transform="rotate(60 50 50)" />
            <ellipse cx="50" cy="50" rx="40" ry="12" className="text-blue-300" transform="rotate(120 50 50)" />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-24">
          <span className="text-primary-500 font-bold tracking-wide text-lg block mb-3">Working Process</span>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">How We Work?</h2>
        </div>

        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            
            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center group">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center mb-8 relative z-10 group-hover:-translate-y-2 transition-transform duration-300 border border-slate-50">
                    <div className="text-blue-600">
                       <ClipboardList className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                    {/* Glow effect */}
                    <div className="absolute inset-0 bg-blue-100 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">Make Appointment</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                    If you are going to use a passage Ipsum, you need to anything for hidden.
                </p>
                
                {/* Arrow to Step 2 */}
                 <div className="hidden md:block absolute top-8 -right-1/2 w-full h-20 pointer-events-none z-0">
                    <svg width="100%" height="100%" viewBox="0 0 200 80" fill="none" preserveAspectRatio="none">
                         <path d="M20,40 C80,10 120,10 180,40" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8 8" fill="none"/>
                         <path d="M175,35 L180,40 L175,45" stroke="#cbd5e1" strokeWidth="2" fill="none"/>
                    </svg>
                </div>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center group mt-12 md:mt-0">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center mb-8 relative z-10 group-hover:-translate-y-2 transition-transform duration-300 border border-slate-50">
                    <div className="text-[#ff8c69]">
                       <Stethoscope className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                    <div className="absolute inset-0 bg-orange-100 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">Get Consultant</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                    If you are going to use a passage Ipsum, you need to anything for hidden.
                </p>

                 {/* Arrow to Step 3 */}
                 <div className="hidden md:block absolute top-8 -right-1/2 w-full h-20 pointer-events-none z-0">
                    <svg width="100%" height="100%" viewBox="0 0 200 80" fill="none" preserveAspectRatio="none">
                         <path d="M20,40 C80,70 120,70 180,40" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="8 8" fill="none"/>
                         <path d="M175,35 L180,40 L175,45" stroke="#cbd5e1" strokeWidth="2" fill="none"/>
                    </svg>
                </div>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center group mt-12 md:mt-0">
                <div className="w-24 h-24 bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center mb-8 relative z-10 group-hover:-translate-y-2 transition-transform duration-300 border border-slate-50">
                    <div className="text-emerald-500">
                       <HeartHandshake className="w-10 h-10" strokeWidth={1.5} />
                    </div>
                     <div className="absolute inset-0 bg-emerald-100 blur-2xl opacity-0 group-hover:opacity-40 transition-opacity duration-300 -z-10 rounded-full"></div>
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-4 font-serif">Get Care & Relief</h3>
                <p className="text-slate-500 leading-relaxed max-w-xs mx-auto">
                    If you are going to use a passage Ipsum, you need to anything for hidden.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Features;