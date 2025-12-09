import React from 'react';
import { Doctor } from '../types';
import { Star, MapPin, Briefcase, Clock, Calendar, ArrowLeft, ShieldCheck, Award, ThumbsUp } from 'lucide-react';

interface DoctorDetailsProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
  onBack: () => void;
}

const DoctorDetails: React.FC<DoctorDetailsProps> = ({ doctor, onBook, onBack }) => {
  return (
    <div className="pt-24 pb-12 bg-slate-50 min-h-screen animate-fade-in-up">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Button */}
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-primary-600 font-medium mb-8 transition-colors"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Doctors
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Profile Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden sticky top-28">
              <div className="relative h-80 bg-slate-100">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center shadow-sm">
                  <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                  <span className="font-bold text-slate-800">{doctor.rating}</span>
                  <span className="text-xs text-slate-500 ml-1">({doctor.reviews} Reviews)</span>
                </div>
              </div>
              
              <div className="p-8">
                <span className="inline-block px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
                  {doctor.specialty}
                </span>
                <h1 className="text-3xl font-bold text-slate-900 mb-2">{doctor.name}</h1>
                <div className="flex items-center text-slate-500 mb-6">
                  <MapPin className="w-4 h-4 mr-2" />
                  {doctor.location}
                </div>

                <div className="grid grid-cols-3 gap-4 border-t border-b border-slate-100 py-6 mb-6">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900">{doctor.experience}+</p>
                    <p className="text-xs text-slate-500 uppercase">Years Exp.</p>
                  </div>
                  <div className="text-center border-l border-r border-slate-100">
                    <p className="text-2xl font-bold text-slate-900">{doctor.reviews}+</p>
                    <p className="text-xs text-slate-500 uppercase">Patients</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-slate-900">4.9</p>
                    <p className="text-xs text-slate-500 uppercase">Rating</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6">
                   <div>
                     <p className="text-sm text-slate-500">Consultation Fee</p>
                     <p className="text-2xl font-bold text-primary-600">${doctor.price}</p>
                   </div>
                </div>

                <button 
                  onClick={() => onBook(doctor)}
                  className="w-full bg-slate-900 hover:bg-primary-600 text-white py-4 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  Book Appointment Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Details & Availability */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* About Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center">
                <ShieldCheck className="w-6 h-6 mr-3 text-primary-500" />
                About Doctor
              </h2>
              <p className="text-slate-600 leading-relaxed text-lg mb-6">
                {doctor.about}
                <br/><br/>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              
              <h3 className="font-bold text-slate-900 mb-3">Specializations</h3>
              <div className="flex flex-wrap gap-2">
                 {['General Medicine', 'Prevention', 'Diagnostics', 'Surgery', 'Therapy'].map((tag) => (
                   <span key={tag} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-lg text-sm font-medium">
                     {tag}
                   </span>
                 ))}
              </div>
            </div>

            {/* Awards & Experience */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                    <Briefcase className="w-5 h-5 mr-2 text-blue-500" />
                    Experience
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                       <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                       <div>
                         <p className="font-semibold text-slate-900">Senior Resident</p>
                         <p className="text-sm text-slate-500">City Hospital (2015 - 2018)</p>
                       </div>
                    </li>
                    <li className="flex gap-3">
                       <div className="w-2 h-2 mt-2 rounded-full bg-blue-500 flex-shrink-0"></div>
                       <div>
                         <p className="font-semibold text-slate-900">Head of Department</p>
                         <p className="text-sm text-slate-500">Medical Center (2018 - Present)</p>
                       </div>
                    </li>
                  </ul>
               </div>

               <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                  <h3 className="font-bold text-slate-900 mb-4 flex items-center">
                    <Award className="w-5 h-5 mr-2 text-yellow-500" />
                    Awards
                  </h3>
                  <ul className="space-y-4">
                    <li className="flex gap-3">
                       <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500 flex-shrink-0"></div>
                       <div>
                         <p className="font-semibold text-slate-900">Best Surgeon Award</p>
                         <p className="text-sm text-slate-500">2021 National Health Assoc.</p>
                       </div>
                    </li>
                    <li className="flex gap-3">
                       <div className="w-2 h-2 mt-2 rounded-full bg-yellow-500 flex-shrink-0"></div>
                       <div>
                         <p className="font-semibold text-slate-900">Excellence in Service</p>
                         <p className="text-sm text-slate-500">2023 City Medical Board</p>
                       </div>
                    </li>
                  </ul>
               </div>
            </div>

            {/* Availability Section */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-primary-500" />
                Availability & Booking
              </h2>
              
              <div className="mb-6">
                <p className="text-sm text-slate-500 mb-3">Available Time Slots for Today:</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {doctor.availability.map((time, index) => (
                    <div key={index} className="flex items-center justify-center border border-slate-200 rounded-xl py-3 px-4 text-sm font-semibold text-slate-700 bg-slate-50 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 cursor-pointer transition-all">
                      <Clock className="w-4 h-4 mr-2" />
                      {time}
                    </div>
                  ))}
                  {/* Mock extra slots for display */}
                  <div className="flex items-center justify-center border border-slate-200 rounded-xl py-3 px-4 text-sm font-semibold text-slate-700 bg-slate-50 hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 cursor-pointer transition-all">
                    <Clock className="w-4 h-4 mr-2" />
                    06:00 PM
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 rounded-xl p-4 flex items-start gap-3">
                 <ThumbsUp className="w-5 h-5 text-blue-600 mt-1" />
                 <div>
                   <p className="font-bold text-blue-900">High Demand Specialist</p>
                   <p className="text-sm text-blue-700">Dr. {doctor.name} is highly rated. We recommend booking your appointment at least 2 days in advance.</p>
                 </div>
              </div>

              <div className="mt-8 pt-8 border-t border-slate-100 flex justify-end">
                 <button 
                  onClick={() => onBook(doctor)}
                  className="bg-primary-600 hover:bg-primary-700 text-white px-8 py-3 rounded-xl font-bold transition-all shadow-lg shadow-primary-500/30"
                >
                  Book Visit Now
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorDetails;