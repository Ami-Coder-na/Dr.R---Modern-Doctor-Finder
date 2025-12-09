import React, { useState } from 'react';
import { Star, CalendarCheck, Eye } from 'lucide-react';
import { Doctor, Specialty } from '../types';

interface TeamSectionProps {
  onBook: (doctor: Doctor) => void;
  onViewDetails: (doctor: Doctor) => void;
}

// Expanded mock data to match the Doctor interface required by BookingModal and DetailsPage
const TEAM_DATA: Doctor[] = [
  {
    id: 't1',
    name: 'Dr. Johnson',
    specialty: Specialty.CARDIOLOGIST,
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 4.8,
    reviews: 150,
    experience: 12,
    location: 'Central Heart Institute',
    price: 200,
    about: 'Dr. Johnson is a leading Cardiologist with over a decade of experience in treating complex heart conditions. He specializes in interventional cardiology.',
    availability: ['10:00 AM', '12:00 PM', '04:00 PM']
  },
  {
    id: 't2',
    name: 'Dr. Nancy',
    specialty: Specialty.ORTHOPEDIC, // Using Orthopedic as Surgeon proxy for types
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 4.9,
    reviews: 210,
    experience: 15,
    location: 'City General Hospital',
    price: 250,
    about: 'Dr. Nancy is a renowned Surgeon known for her precision and care. She has performed over 500 successful surgeries.',
    availability: ['09:00 AM', '11:00 AM', '02:00 PM']
  },
  {
    id: 't3',
    name: 'Dr. Jorz Maxwell',
    specialty: Specialty.DENTIST,
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 4.7,
    reviews: 95,
    experience: 8,
    location: 'Smile Bright Clinic',
    price: 100,
    about: 'Dr. Maxwell makes dental visits pain-free and comfortable. He specializes in cosmetic dentistry and implants.',
    availability: ['10:00 AM', '01:00 PM', '05:00 PM']
  },
  {
    id: 't4',
    name: 'Dr. Nilla Roy',
    specialty: Specialty.GENERAL_PHYSICIAN, // Proxy for Gynecologist if not in Enum
    image: 'https://images.unsplash.com/photo-1559839734-2b71ea860630?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 4.9,
    reviews: 180,
    experience: 14,
    location: 'Women\'s Wellness Center',
    price: 150,
    about: 'Dr. Roy is dedicated to women\'s health and provides comprehensive care from adolescence through menopause.',
    availability: ['08:30 AM', '12:30 PM', '03:30 PM']
  },
  {
    id: 't5',
    name: 'Dr. Adam Jani',
    specialty: Specialty.PEDIATRICIAN,
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 4.6,
    reviews: 112,
    experience: 6,
    location: 'Kinder Care Clinic',
    price: 120,
    about: 'Dr. Adam loves working with children and ensuring their healthy development. Parents trust his gentle approach.',
    availability: ['09:00 AM', '10:00 AM', '11:00 AM']
  },
  {
    id: 't6',
    name: 'Dr. Nikki Bella',
    specialty: Specialty.GENERAL_PHYSICIAN,
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 4.8,
    reviews: 134,
    experience: 10,
    location: 'Community Health Center',
    price: 140,
    about: 'Dr. Bella is a compassionate physician focusing on holistic women\'s health and preventive care.',
    availability: ['01:00 PM', '03:00 PM', '06:00 PM']
  },
  {
    id: 't7',
    name: 'Dr. Sanju Samson',
    specialty: Specialty.ORTHOPEDIC,
    image: 'https://images.unsplash.com/photo-1582750433449-d22b1274be8b?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 4.5,
    reviews: 88,
    experience: 18,
    location: 'Ortho Spine Center',
    price: 220,
    about: 'Dr. Samson is an expert in spinal surgery and sports injuries, helping athletes get back on track.',
    availability: ['11:00 AM', '02:00 PM']
  },
  {
    id: 't8',
    name: 'Dr. Charus Dolly',
    specialty: Specialty.DENTIST,
    image: 'https://images.unsplash.com/photo-1651008325506-71d380891319?auto=format&fit=crop&q=80&w=400&h=400',
    rating: 4.9,
    reviews: 205,
    experience: 9,
    location: 'Family Dental Care',
    price: 90,
    about: 'Dr. Dolly specializes in pediatric dentistry and orthodontics, creating beautiful smiles for all ages.',
    availability: ['09:30 AM', '12:30 PM', '04:30 PM']
  }
];

const FILTERS = ['All', 'Orthopedic', 'Cardiologist', 'Dentist', 'General Physician', 'Pediatrician'];

const TeamSection: React.FC<TeamSectionProps> = ({ onBook, onViewDetails }) => {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredTeam = activeFilter === 'All' 
    ? TEAM_DATA 
    : TEAM_DATA.filter(member => member.specialty.toLowerCase().includes(activeFilter.toLowerCase()) || 
                               (activeFilter === 'Orthopedic' && member.specialty === Specialty.ORTHOPEDIC) ||
                               (activeFilter === 'General Physician' && member.specialty === Specialty.GENERAL_PHYSICIAN)
    );

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-primary-600 font-medium tracking-wide uppercase text-sm relative px-4 py-1">
            Doctors Team
            <span className="absolute top-1/2 left-0 w-2 h-[1px] bg-primary-600"></span>
            <span className="absolute top-1/2 right-0 w-2 h-[1px] bg-primary-600"></span>
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mt-3">We Are Happy To Help You</h2>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {FILTERS.map(filter => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-6 py-2 rounded-full border text-sm font-medium transition-all duration-300
                ${activeFilter === filter 
                  ? 'bg-white border-primary-500 text-primary-600 shadow-sm' 
                  : 'bg-transparent border-slate-200 text-slate-600 hover:border-slate-300'
                }
              `}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTeam.map(member => (
            <div key={member.id} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-100 hover:shadow-xl transition-shadow duration-300 group relative flex flex-col h-full">
              
              {/* Rating Badge */}
              <div className="absolute top-4 left-4 flex items-center bg-rose-50 text-rose-500 px-2 py-1 rounded text-xs font-bold z-10">
                <Star className="w-3 h-3 fill-current mr-1" />
                {member.rating}
              </div>

              {/* Image */}
              <div className="mx-auto mb-5 relative inline-block">
                 <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-slate-50 shadow-inner">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                 </div>
              </div>

              {/* Info */}
              <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
              <p className="text-primary-500 font-medium text-sm mb-4">{member.specialty}</p>

              <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2">
                {member.about}
              </p>

              {/* Action Buttons */}
              <div className="mt-auto grid grid-cols-2 gap-3">
                <button 
                  onClick={() => onViewDetails(member)}
                  className="flex items-center justify-center px-3 py-2.5 rounded-xl border border-slate-200 text-slate-600 font-semibold text-xs hover:border-primary-500 hover:text-primary-600 hover:bg-primary-50 transition-all"
                >
                  <Eye className="w-3.5 h-3.5 mr-1.5" />
                  View Details
                </button>
                <button 
                  onClick={() => onBook(member)}
                  className="flex items-center justify-center px-3 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-primary-600 transition-all shadow-md hover:shadow-lg"
                >
                  <CalendarCheck className="w-3.5 h-3.5 mr-1.5" />
                  Book Now
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;