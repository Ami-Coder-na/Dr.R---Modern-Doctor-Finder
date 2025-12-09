import React from 'react';
import { Plus } from 'lucide-react';

const ContactSection: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Left Column: Map & Text */}
          <div>
            <span className="text-primary-600 font-medium tracking-wide uppercase text-sm relative pl-10">
              <span className="absolute top-1/2 left-0 w-8 h-[2px] bg-primary-600"></span>
              Contact Us
            </span>
            <h2 className="text-4xl font-bold text-slate-900 mt-3 mb-8">Get In Touch</h2>
            
            <div className="relative mt-8">
              {/* Abstract World Map Representation */}
              <div className="bg-slate-50 rounded-3xl overflow-hidden p-8 border border-slate-100 relative h-[400px] w-full flex items-center justify-center">
                 {/* Map Image */}
                 <img 
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/World_map_blank_without_borders.svg/2000px-World_map_blank_without_borders.svg.png" 
                    alt="World Map" 
                    className="absolute inset-0 w-full h-full object-cover opacity-10 grayscale"
                 />
                 
                 {/* Pointers */}
                 <div className="absolute top-1/3 left-1/4 animate-bounce">
                    <div className="bg-primary-500 rounded-full p-1 shadow-lg shadow-primary-500/40">
                        <Plus className="w-4 h-4 text-white" />
                    </div>
                 </div>
                 <div className="absolute bottom-1/3 right-1/3 animate-bounce" style={{ animationDelay: '1s' }}>
                    <div className="bg-primary-500 rounded-full p-1 shadow-lg shadow-primary-500/40">
                        <Plus className="w-4 h-4 text-white" />
                    </div>
                 </div>
                 <div className="absolute top-1/4 right-1/4 animate-bounce" style={{ animationDelay: '2s' }}>
                    <div className="bg-primary-500 rounded-full p-1 shadow-lg shadow-primary-500/40">
                        <Plus className="w-4 h-4 text-white" />
                    </div>
                 </div>

                 {/* Central Content on Map */}
                 <div className="relative z-10 text-center">
                     <p className="text-slate-400 font-semibold mb-2">Global Presence</p>
                     <h3 className="text-2xl font-bold text-slate-800">We are available worldwide</h3>
                 </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div>
             <form className="space-y-6">
                 <div>
                     <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">Name</label>
                     <input 
                        type="text" 
                        id="name"
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                     />
                 </div>
                 
                 <div>
                     <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email</label>
                     <input 
                        type="email" 
                        id="email"
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                     />
                 </div>

                 <div>
                     <label htmlFor="phone" className="block text-sm font-semibold text-slate-700 mb-2">Contact No.</label>
                     <input 
                        type="tel" 
                        id="phone"
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all"
                     />
                 </div>

                 <div>
                     <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                     <textarea 
                        id="message"
                        rows={4}
                        className="w-full px-5 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all resize-none"
                     ></textarea>
                 </div>

                 <button 
                    type="button"
                    className="inline-block px-10 py-3 bg-[#ff8c69] hover:bg-[#ff7a50] text-white font-bold rounded-full shadow-lg shadow-orange-200 transition-all hover:-translate-y-1"
                 >
                    Submit
                 </button>
             </form>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ContactSection;