import React from 'react';
import { Check, Star, UserPlus, ThumbsUp } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          
          {/* Left Column: Image Composition */}
          <div className="relative mb-16 lg:mb-0">
            {/* Main Image */}
            <div className="relative rounded-[2rem] overflow-hidden shadow-2xl mx-auto max-w-[500px] lg:max-w-full">
              <img 
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800" 
                alt="Dental checkup procedure" 
                className="w-full h-[600px] object-cover"
              />
            </div>

            {/* Floating Card: Satisfied Patients (Top) */}
            <div className="absolute -top-6 right-8 bg-white p-4 rounded-2xl shadow-xl z-10 flex items-center gap-4 animate-float">
              <div>
                <p className="text-lg font-bold text-slate-900">3.5k Plus</p>
                <p className="text-xs text-slate-500">Satisfied Patients</p>
              </div>
              <div className="flex -space-x-3">
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100&h=100" alt="Patient" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100" alt="Patient" />
                <img className="w-10 h-10 rounded-full border-2 border-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100" alt="Patient" />
              </div>
            </div>

            {/* Floating Card: Cardiologist Profile (Center Right) */}
            <div className="absolute top-1/2 -right-4 lg:-right-10 transform -translate-y-1/2 bg-white p-3 pr-6 rounded-2xl shadow-xl z-20 flex items-center gap-3 animate-float" style={{ animationDelay: '1.5s' }}>
              <div className="relative">
                <img className="w-12 h-12 rounded-full object-cover" src="https://images.unsplash.com/photo-1559839734209-9f91b59f2eee?auto=format&fit=crop&q=80&w=100&h=100" alt="Doctor" />
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-0.5 border-2 border-white">
                  <Check className="w-2 h-2 text-white" />
                </div>
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Lily A. Wilson</p>
                <p className="text-xs text-slate-500">Senior Cardiologist</p>
              </div>
            </div>

            {/* Floating Card: Purple Box (Bottom Right) */}
            <div className="absolute bottom-8 -right-4 lg:-right-8 bg-[#A881FC] p-6 rounded-2xl shadow-xl z-10 text-center text-white max-w-[180px] animate-float" style={{ animationDelay: '2s' }}>
              <div className="bg-white/20 w-10 h-10 rounded-full flex items-center justify-center mx-auto mb-3">
                <UserPlus className="w-5 h-5 text-white" />
              </div>
              <p className="text-2xl font-bold mb-1">200 Plus</p>
              <p className="text-xs opacity-90 leading-tight">World's Top Doctors Consultation</p>
            </div>

             {/* Floating Card: Review (Bottom Left) */}
             <div className="absolute bottom-10 -left-4 lg:-left-8 bg-white p-5 rounded-2xl shadow-xl z-20 max-w-[200px] animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-1 text-yellow-400 mb-2">
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <Star className="w-3 h-3 fill-current" />
                    <span className="text-xs text-slate-400 ml-1">4.0</span>
                </div>
                <div className="flex items-start gap-3">
                    <div>
                        <p className="text-sm font-bold text-slate-900">Mark A. Wilson</p>
                        <p className="text-xs text-slate-500">Heart Patient</p>
                    </div>
                    <ThumbsUp className="w-4 h-4 text-yellow-500" />
                </div>
            </div>
          </div>

          {/* Right Column: Text Content */}
          <div className="lg:pl-10">
            <span className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-2 block">About Us</span>
            <h2 className="text-3xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
              Consult A Doctor Anytime, <br /> Anywhere By Search
            </h2>
            <p className="text-slate-500 text-lg leading-relaxed mb-8">
              Get latest news in your inbox. Consectetur adipiscing elitadipiscing elits eddo eiusmod tempor incididunt utlabore edolore magnased doeiusmod tempor incididunt ut laboreet dolore magna aliqua.
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
              Quis ipsum suspend isse ultrices gravida. Consectetur adipiscing elitadipiscing elitserissed & ddo eiusmodtempor incididunt utlabore et dolore magnased.
            </p>

            <ul className="space-y-4 mb-10">
              {[
                "Get latest news in your inbox. Consectetur elitadipiscing.",
                "Eddo eiusmod tempor incididunt utlabore edolore.",
                "Tempor incididunt ut laboreet dolore magna aliqua.",
                "Isse ultrices gravida. Consectetur adipiscing elitadipiscing.",
                "Ddo eiusmodtempor incididunt utlabore et dolore."
              ].map((item, index) => (
                <li key={index} className="flex items-start">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mt-0.5 mr-3">
                    <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                  </div>
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>

            <button className="bg-blue-500 hover:bg-blue-600 text-white px-10 py-4 rounded-lg font-medium shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-1">
              Read More
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;