import React from 'react';
import { Doctor } from '../types';
import { Star, MapPin, Briefcase } from 'lucide-react';

interface DoctorCardProps {
  doctor: Doctor;
  onBook: (doctor: Doctor) => void;
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor, onBook }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 hover:shadow-xl transition-shadow duration-300 flex flex-col h-full">
      <div className="relative h-48 bg-slate-200">
        <img 
          src={doctor.image} 
          alt={doctor.name} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white px-2 py-1 rounded-md shadow-sm flex items-center">
            <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
            <span className="font-bold text-sm text-slate-800">{doctor.rating}</span>
            <span className="text-xs text-slate-500 ml-1">({doctor.reviews})</span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <div>
                <span className="inline-block px-2 py-1 text-xs font-semibold text-primary-700 bg-primary-50 rounded-full mb-2">
                {doctor.specialty}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{doctor.name}</h3>
            </div>
        </div>
        
        <p className="text-slate-500 text-sm line-clamp-2 mb-4 flex-grow">{doctor.about}</p>
        
        <div className="space-y-2 mb-6">
            <div className="flex items-center text-sm text-slate-600">
                <Briefcase className="w-4 h-4 mr-2 text-slate-400" />
                <span>{doctor.experience} years experience</span>
            </div>
            <div className="flex items-center text-sm text-slate-600">
                <MapPin className="w-4 h-4 mr-2 text-slate-400" />
                <span>{doctor.location}</span>
            </div>
        </div>

        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
            <div>
                <p className="text-xs text-slate-500">Consultation Fee</p>
                <p className="font-bold text-lg text-primary-600">${doctor.price}</p>
            </div>
            <button 
                onClick={() => onBook(doctor)}
                className="bg-slate-900 hover:bg-slate-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            >
                Book Visit
            </button>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;