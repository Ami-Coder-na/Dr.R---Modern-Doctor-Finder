import React, { useState, useMemo, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryList from './components/CategoryList';
import Features from './components/Features';
import AboutSection from './components/AboutSection';
import TeamSection from './components/TeamSection';
import StatsSection from './components/StatsSection';
import TestimonialSection from './components/TestimonialSection';
import FAQSection from './components/FAQSection';
import ContactSection from './components/ContactSection';
import DoctorCard from './components/DoctorCard';
import DoctorSkeleton from './components/DoctorSkeleton';
import BookingModal from './components/BookingModal';
import AIAssistant from './components/AIAssistant';
import DoctorDetails from './components/DoctorDetails';
import UserProfile from './components/UserProfile';
import AuthModal from './components/AuthModal';
import ScrollToTop from './components/ScrollToTop';
import { Doctor, Specialty } from './types';
import { Search, Filter, X } from 'lucide-react';

// Mock Data
const MOCK_DOCTORS: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Smith',
    specialty: Specialty.CARDIOLOGIST,
    image: 'https://images.unsplash.com/photo-1559839734209-9f91b59f2eee?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1594824476966-509f8169a5aa?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1582750433449-d22b1274be8b?auto=format&fit=crop&q=80&w=800',
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
    image: 'https://images.unsplash.com/photo-1622902046580-2b47f47f5471?auto=format&fit=crop&q=80&w=800',
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
  const [currentPage, setCurrentPage] = useState<'home' | 'doctors' | 'doctor-details' | 'user-profile'>('home');
  const [selectedCategory, setSelectedCategory] = useState<Specialty | null>(null);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [doctorForDetails, setDoctorForDetails] = useState<Doctor | null>(null);
  
  // Modals
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Data
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [isLoadingDoctors, setIsLoadingDoctors] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState('');
  const [genderFilter, setGenderFilter] = useState<'All' | 'Male' | 'Female'>('All');
  const [priceRange, setPriceRange] = useState<number>(300);

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

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter logic
  const filteredDoctors = useMemo(() => {
    return doctors.filter(doc => {
      // 1. Search Query
      const matchesSearch = doc.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            doc.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            doc.specialty.toLowerCase().includes(searchQuery.toLowerCase());
      
      // 2. Category
      const matchesCategory = selectedCategory ? doc.specialty === selectedCategory : true;

      // 3. Gender (Mocking random gender based on name for now as data doesn't have it)
      const isFemale = doc.name.includes('Sarah') || doc.name.includes('Emily') || doc.name.includes('Lisa') || doc.name.includes('Nancy') || doc.name.includes('Nikki') || doc.name.includes('Charus');
      const docGender = isFemale ? 'Female' : 'Male';
      const matchesGender = genderFilter === 'All' ? true : docGender === genderFilter;

      // 4. Price
      const matchesPrice = doc.price <= priceRange;

      return matchesSearch && matchesCategory && matchesGender && matchesPrice;
    });
  }, [selectedCategory, doctors, searchQuery, genderFilter, priceRange]);

  const handleNavigate = (page: 'home' | 'doctors' | 'user-profile') => {
    setCurrentPage(page);
    if (page === 'home') setSelectedCategory(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBook = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsBookingModalOpen(true);
  };

  const handleViewDetails = (doctor: Doctor) => {
    setDoctorForDetails(doctor);
    setCurrentPage('doctor-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategorySelect = (specialty: Specialty) => {
    setSelectedCategory(specialty);
    setCurrentPage('doctors');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    <AuthProvider>
      <div className="min-h-screen bg-slate-50 font-sans">
        <Navbar 
          onNavigate={(page) => handleNavigate(page as 'home' | 'doctors' | 'user-profile')} 
          onLoginClick={() => setIsAuthModalOpen(true)}
        />
        
        {currentPage === 'home' && (
          <>
            <Hero onSearchClick={() => handleNavigate('doctors')} />
            <CategoryList 
              onSelectCategory={handleCategorySelect} 
              selectedCategory={selectedCategory} 
            />
            <div id="services">
              <Features />
            </div>
            <div id="about">
              <AboutSection />
            </div>
            <TeamSection onBook={handleBook} onViewDetails={handleViewDetails} />
            <StatsSection />
            <TestimonialSection />
            <FAQSection />
            <div id="contact">
              <ContactSection />
            </div>
          </>
        )}

        {currentPage === 'user-profile' && (
          <UserProfile />
        )}

        {currentPage === 'doctors' && (
          <div className="pt-32 pb-12 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 animate-fade-in">
            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Sidebar Filters */}
              <div className="lg:w-1/4">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 sticky top-28">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-lg text-slate-900 flex items-center">
                      <Filter className="w-5 h-5 mr-2" /> Filters
                    </h3>
                    {(selectedCategory || searchQuery || genderFilter !== 'All') && (
                      <button 
                        onClick={() => {
                          setSelectedCategory(null);
                          setSearchQuery('');
                          setGenderFilter('All');
                          setPriceRange(300);
                        }}
                        className="text-xs text-rose-500 font-bold hover:underline"
                      >
                        Reset
                      </button>
                    )}
                  </div>

                  {/* Search */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Search</label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="Doctor, Hospital..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
                      />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Specialty</label>
                    <div className="space-y-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                      <label className="flex items-center cursor-pointer group">
                         <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 transition-colors ${!selectedCategory ? 'bg-primary-500 border-primary-500' : 'border-slate-300 bg-white'}`}>
                            {!selectedCategory && <span className="w-2 h-2 bg-white rounded-full" />}
                         </div>
                         <input 
                           type="radio" 
                           name="category" 
                           className="hidden"
                           checked={!selectedCategory}
                           onChange={() => setSelectedCategory(null)}
                         />
                         <span className={`text-sm ${!selectedCategory ? 'text-primary-700 font-semibold' : 'text-slate-600'}`}>All Specialties</span>
                      </label>
                      {Object.values(Specialty).map(spec => (
                        <label key={spec} className="flex items-center cursor-pointer group">
                           <div className={`w-5 h-5 rounded-md border flex items-center justify-center mr-3 transition-colors ${selectedCategory === spec ? 'bg-primary-500 border-primary-500' : 'border-slate-300 bg-white group-hover:border-primary-300'}`}>
                              {selectedCategory === spec && <span className="w-2 h-2 bg-white rounded-full" />}
                           </div>
                           <input 
                             type="radio" 
                             name="category" 
                             className="hidden"
                             checked={selectedCategory === spec}
                             onChange={() => setSelectedCategory(spec)}
                           />
                           <span className={`text-sm ${selectedCategory === spec ? 'text-primary-700 font-semibold' : 'text-slate-600'}`}>{spec}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Gender */}
                  <div className="mb-6">
                    <label className="block text-sm font-semibold text-slate-700 mb-3">Gender</label>
                    <div className="flex gap-2">
                       {['All', 'Male', 'Female'].map(g => (
                         <button
                           key={g}
                           onClick={() => setGenderFilter(g as any)}
                           className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${
                             genderFilter === g 
                             ? 'bg-primary-50 border-primary-500 text-primary-700' 
                             : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                           }`}
                         >
                           {g}
                         </button>
                       ))}
                    </div>
                  </div>

                  {/* Price Range */}
                  <div className="mb-2">
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-semibold text-slate-700">Max Price</label>
                      <span className="text-sm font-bold text-primary-600">${priceRange}</span>
                    </div>
                    <input 
                      type="range" 
                      min="50" 
                      max="500" 
                      step="10" 
                      value={priceRange}
                      onChange={(e) => setPriceRange(parseInt(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary-500"
                    />
                  </div>
                </div>
              </div>

              {/* Main Grid */}
              <div className="lg:w-3/4">
                <div className="flex flex-col md:flex-row justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">
                      {selectedCategory ? `${selectedCategory}s` : 'All Specialists'}
                    </h2>
                    <p className="text-slate-500 text-sm mt-1">
                      {isLoadingDoctors 
                          ? 'Finding best specialists...' 
                          : `${filteredDoctors.length} doctors match your criteria`
                      }
                    </p>
                  </div>
                </div>

                {isLoadingDoctors ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {[1, 2, 3, 4, 5, 6].map((i) => (
                          <DoctorSkeleton key={i} />
                      ))}
                  </div>
                ) : filteredDoctors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredDoctors.map(doctor => (
                      <DoctorCard 
                        key={doctor.id} 
                        doctor={doctor} 
                        onBook={handleBook} 
                        onViewDetails={handleViewDetails}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                        <Search className="w-8 h-8 text-slate-400" />
                      </div>
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No doctors found</h3>
                      <p className="text-slate-500 mb-6 max-w-md mx-auto">
                        We couldn't find any specialists matching your current filters. Try adjusting your search criteria.
                      </p>
                      <button 
                          onClick={() => {
                            setSelectedCategory(null);
                            setSearchQuery('');
                            setGenderFilter('All');
                            setPriceRange(500);
                          }}
                          className="text-primary-600 font-bold hover:underline bg-primary-50 px-6 py-2 rounded-full"
                      >
                          Clear all filters
                      </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {currentPage === 'doctor-details' && doctorForDetails && (
          <DoctorDetails 
            doctor={doctorForDetails} 
            onBook={handleBook}
            onBack={() => handleNavigate('doctors')}
          />
        )}

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300 py-16">
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-12">
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
          <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center text-sm text-slate-500">
              <p>© {new Date().getFullYear()} Dr.R Healthcare. All rights reserved.</p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                 <span className="cursor-pointer hover:text-white transition-colors">Twitter</span>
                 <span className="cursor-pointer hover:text-white transition-colors">LinkedIn</span>
                 <span className="cursor-pointer hover:text-white transition-colors">Instagram</span>
              </div>
          </div>
        </footer>

        {/* Modals */}
        <BookingModal 
          isOpen={isBookingModalOpen} 
          onClose={() => setIsBookingModalOpen(false)} 
          doctor={selectedDoctor} 
        />
        
        <AuthModal 
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
        />

        <AIAssistant onRecommendation={handleAIRecommendation} />
        <ScrollToTop />
      </div>
    </AuthProvider>
  );
}