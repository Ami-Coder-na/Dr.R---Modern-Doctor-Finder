import React from 'react';
import Features from './Features';
import { Heart, Brain, Bone, Baby, Stethoscope, Eye, Activity, Pill } from 'lucide-react';

const SERVICES = [
  { icon: Heart, title: 'Cardiology', desc: 'Comprehensive heart care, from diagnostics to surgery and rehabilitation.' },
  { icon: Brain, title: 'Neurology', desc: 'Advanced treatment for disorders of the nervous system, brain, and spine.' },
  { icon: Bone, title: 'Orthopedics', desc: 'Expert care for bones, joints, ligaments, tendons, and muscles.' },
  { icon: Baby, title: 'Pediatrics', desc: 'Specialized medical care for infants, children, and adolescents.' },
  { icon: Stethoscope, title: 'General Medicine', desc: 'Primary healthcare services for prevention and management of diseases.' },
  { icon: Eye, title: 'Ophthalmology', desc: 'Complete eye care services including vision tests and surgery.' },
  { icon: Activity, title: 'Pulmonology', desc: 'Diagnosis and treatment of respiratory system diseases.' },
  { icon: Pill, title: 'Pharmacy', desc: '24/7 onsite pharmacy ensuring quick access to prescribed medications.' },
];

const ServicesPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen animate-fade-in-up">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-2 block">Our Expertise</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">World-Class Medical Services</h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            We are committed to providing the highest quality healthcare through our team of specialized doctors and state-of-the-art facilities.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {SERVICES.map((service, index) => (
            <div key={index} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center text-primary-600 mb-6 group-hover:bg-primary-600 group-hover:text-white transition-colors">
                <service.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
              <p className="text-slate-500 leading-relaxed text-sm">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Reusing Features (How We Work) */}
      <Features />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="bg-slate-900 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full opacity-10">
              <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                 <path d="M0 100 C 20 0 50 0 100 100 Z" fill="white" />
              </svg>
           </div>
           <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 relative z-10">Ready to Get Started?</h2>
           <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10 relative z-10">
             Book an appointment today and take the first step towards better health.
           </p>
           <button className="bg-primary-600 hover:bg-primary-700 text-white px-10 py-4 rounded-xl font-bold text-lg shadow-lg shadow-primary-500/30 transition-all relative z-10">
             Find A Doctor
           </button>
        </div>
      </div>
    </div>
  );
};

export default ServicesPage;
