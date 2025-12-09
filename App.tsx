import React, { useState, useMemo, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryList from './components/CategoryList';
import Features from './components/Features';
import DoctorCard from './components/DoctorCard';
import DoctorSkeleton from './components/DoctorSkeleton';
import BookingModal from './components/BookingModal';
import AIAssistant from './components/AIAssistant';
import { Doctor, Specialty } from './types';

// Mock Data
const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Smith',
    specialty: Specialty.CARDIOLOGIST,
    image: 'https://picsum.photos/seed/doctor1/300/300',
    rating: 4.9,
    reviews: 124,
    experience: 15,
    location: 'New York Heart Center',
    price: 150,
    about: 'Expert in non-invasive cardiology and echocardiography. Passionate about preventative heart health.',
    availability: ['09:00 AM', '11:00 AM', '02:00 PM']
  },
  {
    id: '2',
    name: 'Dr. John Doe',
    specialty: Specialty.DERMATOLOGIST,
    image: 'https://picsum.photos/seed/doctor2/300/300',
    rating: 4.7,
    reviews: 89,
    experience: 8,
    location: 'Skin Care Clinic',
    price: 120,
    about: 'Specializes in acne treatment and cosmetic dermatology. Board certified.',
    availability: ['10:00 AM', '01:00 PM', '04:00 PM']
  },
  {
    id: '3',
    name: 'Dr. Emily Chen',
    specialty: Specialty.PEDIATRICIAN,
    image: 'https://picsum.photos/seed/doctor3/300/300',
    rating: 4.9,
    reviews: 210,
    experience: 12,
    location: 'Happy Kids Hospital',
    price: 100,
    about: 'Loving and caring pediatrician with expertise in child development and immunizations.',
    availability: ['08:30 AM', '09:30 AM', '03:30 PM']
  },
  {
    id: '4',
    name: 'Dr. Michael Brown',
    specialty: Specialty.NEUROLOGIST,
    image: 'https://picsum.photos/seed/doctor4/300/300',
    rating: 4.8,
    reviews: 150,
    experience: 20,
    location: 'City Neuro Institute',
    price: 200,
    about: 'Top specialist in migraines and stroke prevention. Chief of Neurology.',
    availability: ['11:00 AM', '02:00 PM', '05:00 PM']
  },
  {
    id: '5',
    name: 'Dr. Alan Grant',
    specialty: Specialty.ORTHOPEDIC,
    image: 'https://picsum.photos/seed/doctor5/300/300',
    rating: 4.6,
    reviews: 75,
    experience: 10,
    location: 'Bone & Joint Clinic',
    price: 180,
    about: 'Expert in sports injuries and joint replacement surgeries.',
    availability: ['09:00 AM', '12:00 PM', '03:00 PM']
  },
  {
    id: '6',
    name: 'Dr. Lisa Ray',
    specialty: Specialty.DENTIST,
    image: 'https://picsum.photos/seed/doctor6/300/300',
    rating: 4.9,
    reviews: 300,
    experience: 7,
    location: 'Bright Smiles Dental',
    price: 80,
    about: 'Gentle dentistry focusing on cosmetic procedures and general oral hygiene.',
    availability: ['10:00 AM', '02:00 PM', '04:00 PM']
  },
  {
    id: '7',
    name: 'Dr. Robert House',
    specialty: Specialty.GENERAL_PHYSICIAN,
    image: 'https://picsum.photos/seed/doctor7/300/300',
    rating: 4.5,
    reviews: 500,
    experience: 25,
    location: 'Princeton Plainsboro',
    price: 250,
    about: 'Diagnostician specializing in infectious diseases and nephrology.',
    availability: ['08:00 AM', '01:00 PM']
  },
    {
    id: '8',
    name: 'Dr. Hannibal Lecter',
    specialty: Specialty.PSYCHIATRIST,
    image: 'https://picsum.photos/seed/doctor8/300/300',
    rating: 5.0,
    reviews: 1000,
    experience: 30,
    location: 'Baltimore State Hospital',
    price: 300,
    about: 'Renowned psychiatrist with a unique approach to therapy.',
    availability: ['06:00 PM', '07:00 PM']
  }
];

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'doctors'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Specialty | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);

  // Simulate API data fetching
  useEffect(() => {
    const fetchDoctors = async () => {
      setIsLoadingDoctors(true);
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      setDoctors(MOCK_DOCTORS);
      setIsLoadingDoctors(false);
    };

    fetchDoctors();
  }, []);

  // Filter logic
  const filteredDoctors = useMemo(() => {
    if (!selectedCategory) return doctors;
    return doctors.filter(doc => doc.specialty === selectedCategory);
  }, [selectedCategory, doctors]);

  const handleNavigate = (page: 'home' | 'doctors') => {
    setCurrentPage(page);
    if (page === 'home') setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBook = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  const handleCategorySelect = (specialty: Specialty) => {
    setSelectedCategory(specialty);
    setCurrentPage('doctors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Callback for AI Assistant to auto-filter based on suggestion
  const handleAIRecommendation = (text: string) => {
    const foundSpecialty = Object.values(Specialty).find(s => 
      text.toLowerCase().includes(s.toLowerCase())
    );

    if (foundSpecialty) {
      setSelectedCategory(foundSpecialty);
      setCurrentPage('doctors');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      <Navbar onNavigate={handleNavigate} />
      
      {currentPage === 'home' && (
        <>
          <Hero onSearchClick={() => handleNavigate('doctors')} />
          <Features />
          <CategoryList 
            onSelectCategory={handleCategorySelect} 
            selectedCategory={selectedCategory} 
          />
        </>
      )}

      {currentPage === 'doctors' && (
        <div className="pt-24 pb-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-center mb-10">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                {selectedCategory ? `${selectedCategory}s` : 'Find Your Specialist'}
              </h2>
              <p className="text-slate-500 mt-2 text-lg">
                {isLoadingDoctors 
                    ? 'Finding best specialists...' 
                    : `${filteredDoctors.length} doctors available near you`
                }
              </p>
            </div>
            
            {selectedCategory && (
              <button 
                onClick={() => setSelectedCategory(null)}
                className="mt-4 md:mt-0 text-primary-600 hover:text-primary-800 font-medium hover:underline bg-primary-50 px-4 py-2 rounded-lg transition-colors"
              >
                Show All Specialists
              </button>
            )}
          </div>

          {isLoadingDoctors ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <DoctorSkeleton key={i} />
                ))}
            </div>
          ) : filteredDoctors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredDoctors.map(doctor => (
                <DoctorCard 
                  key={doctor.id} 
                  doctor={doctor} 
                  onBook={handleBook} 
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100">
                <p className="text-xl text-slate-500 mb-4">No doctors found for this category.</p>
                <button 
                    onClick={() => setSelectedCategory(null)}
                    className="text-primary-600 font-bold hover:underline"
                >
                    View all doctors
                </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
             <span className="font-bold text-2xl text-white">Dr.<span className="text-primary-500">R</span></span>
             <p className="mt-6 text-sm leading-relaxed text-slate-400">
               Dr.R is a pioneering healthcare platform connecting patients with top-tier specialists through AI-driven recommendations and instant booking.
             </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Services</h4>
            <ul className="space-y-4 text-sm text-slate-400">
                <li className="hover:text-primary-400 cursor-pointer transition-colors">Find Doctors</li>
                <li className="hover:text-primary-400 cursor-pointer transition-colors">Video Consult</li>
                <li className="hover:text-primary-400 cursor-pointer transition-colors">Symptom Check</li>
                <li className="hover:text-primary-400 cursor-pointer transition-colors">Lab Tests</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-slate-400">
                <li className="hover:text-primary-400 cursor-pointer transition-colors">About Us</li>
                <li className="hover:text-primary-400 cursor-pointer transition-colors">Careers</li>
                <li className="hover:text-primary-400 cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-primary-400 cursor-pointer transition-colors">Terms of Service</li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-6">Contact</h4>
            <ul className="space-y-4 text-sm text-slate-400">
                <li>support@dr-r.com</li>
                <li>+1 (555) 123-4567</li>
                <li>123 Medical Plaza, NY</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
            <p>© {new Date().getFullYear()} Dr.R Healthcare. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
               <span className="cursor-pointer hover:text-white transition-colors">Twitter</span>
               <span className="cursor-pointer hover:text-white transition-colors">LinkedIn</span>
               <span className="cursor-pointer hover:text-white transition-colors">Instagram</span>
            </div>
        </div>
      </footer>

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        doctor={selectedDoctor} 
      />

      <AIAssistant onRecommendation={handleAIRecommendation} />
    </div>
  );
}