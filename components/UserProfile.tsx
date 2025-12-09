import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, Phone, MapPin, Droplet, Calendar, Clock, Edit2, Save, Camera, LogOut } from 'lucide-react';

const UserProfile: React.FC = () => {
  const { user, updateProfile, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  
  // Local state for editing form
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bloodGroup: user?.bloodGroup || ''
  });

  if (!user) return <div className="p-10 text-center">Please login to view profile.</div>;

  const handleSave = () => {
    updateProfile(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    // In a real app you might want to redirect after logout
    if (confirm("Are you sure you want to log out?")) {
        logout();
        window.location.href = "/"; 
    }
  }

  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-slate-900">My Profile</h1>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-lg transition-colors font-semibold"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: User Card */}
          <div className="lg:col-span-4">
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-r from-primary-500 to-primary-600"></div>
              
              <div className="relative mt-4 mb-6">
                <div className="w-32 h-32 rounded-full border-4 border-white shadow-lg mx-auto overflow-hidden bg-slate-200">
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                </div>
                {isEditing && (
                  <button className="absolute bottom-0 right-1/3 bg-slate-900 text-white p-2 rounded-full shadow-md hover:bg-primary-600 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>

              <h2 className="text-2xl font-bold text-slate-900 mb-1">{user.name}</h2>
              <p className="text-slate-500 mb-6">{user.email}</p>

              <div className="flex justify-between border-t border-slate-100 pt-6 px-4">
                 <div className="text-center">
                    <p className="text-xl font-bold text-slate-900">12</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Appointments</p>
                 </div>
                 <div className="text-center border-l border-slate-100 pl-8">
                    <p className="text-xl font-bold text-slate-900">0</p>
                    <p className="text-xs text-slate-500 uppercase tracking-wide">Reviews</p>
                 </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 mt-6">
                <h3 className="font-bold text-slate-900 mb-4">Account Settings</h3>
                <ul className="space-y-3">
                    <li className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors text-slate-600">
                        <span>Notifications</span>
                        <div className="w-10 h-5 bg-primary-500 rounded-full relative">
                            <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full"></div>
                        </div>
                    </li>
                    <li className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors text-slate-600">
                        <span>Privacy Policy</span>
                        <ArrowIcon />
                    </li>
                    <li className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 cursor-pointer transition-colors text-slate-600">
                        <span>Help & Support</span>
                        <ArrowIcon />
                    </li>
                </ul>
            </div>
          </div>

          {/* Right Column: Details & History */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Personal Information */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">Personal Information</h3>
                <button 
                  onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors
                    ${isEditing 
                      ? 'bg-primary-600 text-white hover:bg-primary-700' 
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }
                  `}
                >
                  {isEditing ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit2 className="w-4 h-4" /> Edit Profile</>}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                <InfoItem 
                    icon={User} 
                    label="Full Name" 
                    value={formData.name} 
                    isEditing={isEditing}
                    onChange={(val) => setFormData({...formData, name: val})}
                />
                <InfoItem 
                    icon={Mail} 
                    label="Email Address" 
                    value={user.email} 
                    isEditing={false} // Email usually not editable
                    disabled
                />
                <InfoItem 
                    icon={Phone} 
                    label="Phone Number" 
                    value={formData.phone} 
                    isEditing={isEditing}
                    onChange={(val) => setFormData({...formData, phone: val})}
                />
                <InfoItem 
                    icon={MapPin} 
                    label="Location" 
                    value={formData.location} 
                    isEditing={isEditing}
                    onChange={(val) => setFormData({...formData, location: val})}
                    placeholder="Add location"
                />
                <InfoItem 
                    icon={Droplet} 
                    label="Blood Group" 
                    value={formData.bloodGroup} 
                    isEditing={isEditing}
                    onChange={(val) => setFormData({...formData, bloodGroup: val})}
                    placeholder="Add blood group"
                />
              </div>
            </div>

            {/* Recent Appointments */}
            <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Recent Appointments</h3>
                
                <div className="space-y-4">
                    {/* Mock Data for Appointments */}
                    {[
                        { doctor: 'Dr. Sarah Smith', type: 'Cardiologist', date: 'Oct 24, 2023', time: '10:00 AM', status: 'Completed', img: 'https://images.unsplash.com/photo-1559839734209-9f91b59f2eee?auto=format&fit=crop&q=80&w=100' },
                        { doctor: 'Dr. Michael Brown', type: 'Neurologist', date: 'Nov 12, 2023', time: '02:30 PM', status: 'Upcoming', img: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=100' }
                    ].map((apt, idx) => (
                        <div key={idx} className="flex flex-col md:flex-row items-center justify-between p-4 border border-slate-100 rounded-2xl hover:border-primary-200 transition-colors">
                            <div className="flex items-center gap-4 w-full md:w-auto mb-4 md:mb-0">
                                <img src={apt.img} alt={apt.doctor} className="w-14 h-14 rounded-xl object-cover" />
                                <div>
                                    <h4 className="font-bold text-slate-900">{apt.doctor}</h4>
                                    <p className="text-sm text-slate-500">{apt.type}</p>
                                </div>
                            </div>
                            
                            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end">
                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                    <Calendar className="w-4 h-4" />
                                    <span>{apt.date}</span>
                                </div>
                                <div className="flex items-center gap-2 text-slate-600 text-sm">
                                    <Clock className="w-4 h-4" />
                                    <span>{apt.time}</span>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-xs font-bold
                                    ${apt.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'}
                                `}>
                                    {apt.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

const InfoItem = ({ icon: Icon, label, value, isEditing, onChange, disabled, placeholder }: any) => (
  <div className="relative">
    <label className="flex items-center text-sm font-semibold text-slate-500 mb-2">
        <Icon className="w-4 h-4 mr-2" />
        {label}
    </label>
    {isEditing && !disabled ? (
        <input 
            type="text" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none"
            placeholder={placeholder}
        />
    ) : (
        <p className="text-lg font-bold text-slate-900 p-3 bg-white border border-transparent">
            {value || <span className="text-slate-300 italic">Not set</span>}
        </p>
    )}
  </div>
);

const ArrowIcon = () => (
    <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
    </svg>
);

export default UserProfile;