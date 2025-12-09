import React, { useState } from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const TESTIMONIALS = [
  {
    id: 1,
    name: 'John Smith',
    type: 'Heart Patient',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5.0,
    text: 'Get latest news in your own inbox. Consectetur adipisci eitae dipsicing elit sed do eiusmod tempor incididunt ut labore et dolore magna.'
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    type: 'Dental Patient',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.5,
    text: 'Adipiscing elitadi piscing elits eddo eiusmod tempor incididunt utlabore et dolore magna aliqua. Quis ipsum suspend isse ultrices and gravida.'
  },
  {
    id: 3,
    name: 'Michael Brown',
    type: 'Eye Care',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 5.0,
    text: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit.'
  },
  {
    id: 4,
    name: 'Emily Davis',
    type: 'Skin Care',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200&h=200',
    rating: 4.8,
    text: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Sed ut perspiciatis unde omnis.'
  }
];

const TestimonialSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % (TESTIMONIALS.length - 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + (TESTIMONIALS.length - 1)) % (TESTIMONIALS.length - 1));
  };

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Text & Navigation */}
          <div className="lg:col-span-4">
            <span className="text-primary-600 font-medium tracking-wide uppercase text-sm mb-2 block">
              20+ Years Of Experiences
            </span>
            <h2 className="text-4xl font-bold text-slate-900 leading-tight mb-6">
              What Our Patients Say About Us
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-10">
              Adipiscing elitadi piscing elits eddo eiusmod tempor incididunt utlabore edolore magna aliqua. Quis ipsum suspend isseultrices and gravida. Consectetur adipiscing elitadipiscing in elitserissed aliqua.
            </p>
            
            <div className="flex gap-4">
              <button 
                onClick={prevSlide}
                className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={nextSlide}
                className="w-12 h-12 rounded-xl bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-primary-600 hover:text-white transition-all duration-300 shadow-sm hover:shadow-lg"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column: Carousel */}
          <div className="lg:col-span-8">
            <div className="relative overflow-hidden p-4 -m-4">
               <div 
                 className="flex transition-transform duration-500 ease-out gap-8"
                 style={{ transform: `translateX(-${currentIndex * 50}%)` }}
               >
                 {TESTIMONIALS.map((item) => (
                   <div 
                     key={item.id} 
                     className="w-full md:w-[calc(50%-1rem)] flex-shrink-0 bg-white p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-slate-100 group hover:border-primary-100 transition-colors"
                   >
                      {/* Card Header */}
                      <div className="flex justify-between items-start mb-6">
                         <div className="flex items-center gap-4">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-14 h-14 rounded-xl object-cover shadow-sm"
                            />
                            <div>
                               <h4 className="font-bold text-lg text-slate-900">{item.name}</h4>
                               <p className="text-sm text-slate-500">{item.type}</p>
                            </div>
                         </div>
                         <Quote className="w-8 h-8 text-primary-100 fill-current" />
                      </div>

                      {/* Review Text */}
                      <p className="text-slate-600 leading-relaxed mb-6 italic">
                        "{item.text}"
                      </p>

                      {/* Rating */}
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 ${i < Math.floor(item.rating) ? 'text-yellow-400 fill-current' : 'text-slate-200 fill-current'}`} 
                          />
                        ))}
                        <span className="ml-2 text-sm font-bold text-slate-700">{item.rating}</span>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;