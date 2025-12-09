
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  User, Mail, Phone, MapPin, Droplet, Calendar, Clock, Edit2, Save, Camera, 
  LogOut, Bell, Package, ShoppingBag, ChevronRight, FileText, Settings, LayoutDashboard
} from 'lucide-react';
import AppointmentDetailsModal from './AppointmentDetailsModal';
import { AppointmentDisplay } from '../types';

// Mock Data for Orders
const MOCK_ORDERS = [
  {
    id: '#MED-9012',
    date: 'Oct 24, 2023',
    status: 'Delivered',
    total: 84.50,
    items: ['Vitamin C', 'Face Cream'],
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=100'
  },
  {
    id: '#MED-8821',
    date: 'Nov 02, 2023',
    status: 'Processing',
    total: 32.00,
    items: ['Pain Relief Gel'],
    image: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=100'
  }
];

interface UserProfileProps {
  appointments: AppointmentDisplay[];
}

const UserProfile: React.FC<UserProfileProps> = ({ appointments }) => {
  const { user, updateProfile, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'dashboard' | 'appointments' | 'orders' | 'settings'>('dashboard');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState<AppointmentDisplay | null>(null);
  
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
    if (confirm("Are you sure you want to log out?")) {
        logout();
        window.location.href = "/"; 
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        updateProfile({ ...user, avatar: base64String });
      };
      reader.readAsDataURL(file);
    }
  };

  const NavItem = ({ id, icon: Icon, label }: any) => (
    <button 
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-200 ${
        activeTab === id 
        ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/30' 
        : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900'
      }`}
    >
      <Icon className="w-5 h-5" />
      {label}
    </button>
  );

  // Find next upcoming appointment
  const nextAppointment = appointments.find(a => a.status === 'Upcoming');

  return (
    <div className="pt-28 pb-20 bg-slate-50 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Sidebar Navigation */}
          <div className="lg:col-span-3 space-y-6">
            {/* User Card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 text-center relative overflow-hidden">
               <div className="relative mx-auto w-24 h-24 mb-4">
                  <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover border-4 border-slate-50" />
                  <label className="absolute bottom-0 right-0 bg-slate-900 text-white p-1.5 rounded-full cursor-pointer hover:bg-primary-600 transition-colors">
                    <Camera className="w-3.5 h-3.5" />
                    <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                  </label>
               </div>
               <h2 className="font-bold text-slate-900 text-lg">{user.name}</h2>
               <p className="text-sm text-slate-500 mb-4">{user.email}</p>
               <div className="flex justify-center gap-2">
                 <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-bold">Patient</span>
                 {user.bloodGroup && <span className="px-3 py-1 bg-rose-50 text-rose-600 rounded-full text-xs font-bold">{user.bloodGroup}</span>}
               </div>
            </div>

            {/* Menu */}
            <div className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 space-y-1">
              <NavItem id="dashboard" icon={LayoutDashboard} label="Dashboard" />
              <NavItem id="appointments" icon={Calendar} label="Appointments" />
              <NavItem id="orders" icon={ShoppingBag} label="Medicine Orders" />
              <NavItem id="settings" icon={Settings} label="Settings" />
              <div className="h-px bg-slate-100 my-2"></div>
              <button 
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium text-rose-500 hover:bg-rose-50 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Sign Out
              </button>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-9">
            
            {/* --- DASHBOARD TAB --- */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-fade-in">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl p-6 text-white shadow-lg shadow-blue-500/20">
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-3 bg-white/20 rounded-2xl"><Calendar className="w-6 h-6" /></div>
                       <span className="text-xs font-bold bg-white/20 px-2 py-1 rounded-lg">+2 this month</span>
                    </div>
                    <p className="text-3xl font-bold mb-1">{appointments.length}</p>
                    <p className="text-blue-100 text-sm">Total Appointments</p>
                  </div>
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><Package className="w-6 h-6" /></div>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-1">5</p>
                    <p className="text-slate-500 text-sm">Medicine Orders</p>
                  </div>
                  <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-start mb-4">
                       <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl"><FileText className="w-6 h-6" /></div>
                    </div>
                    <p className="text-3xl font-bold text-slate-900 mb-1">3</p>
                    <p className="text-slate-500 text-sm">Prescriptions</p>
                  </div>
                </div>

                {/* Upcoming Appointment */}
                <div>
                   <div className="flex justify-between items-center mb-6">
                     <h3 className="text-xl font-bold text-slate-900">Next Appointment</h3>
                   </div>
                   {nextAppointment ? (
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-6 relative overflow-hidden group">
                        <div className="absolute top-0 left-0 w-2 h-full bg-yellow-400"></div>
                        <img src={nextAppointment.img} className="w-20 h-20 rounded-2xl object-cover" alt="Doctor" />
                        <div className="flex-1 text-center md:text-left">
                            <h4 className="text-lg font-bold text-slate-900">{nextAppointment.doctor}</h4>
                            <p className="text-slate-500 mb-3">{nextAppointment.specialty}</p>
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm font-medium text-slate-700">
                            <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg"><Calendar className="w-4 h-4 text-slate-400" /> {nextAppointment.date}</span>
                            <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg"><Clock className="w-4 h-4 text-slate-400" /> {nextAppointment.time}</span>
                            <span className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-lg"><MapPin className="w-4 h-4 text-slate-400" /> {nextAppointment.location}</span>
                            </div>
                        </div>
                        <div className="flex flex-col gap-2 min-w-[140px]">
                            <button 
                            onClick={() => setSelectedAppointment(nextAppointment)}
                            className="w-full bg-primary-600 text-white py-2.5 rounded-xl text-sm font-bold shadow-md hover:bg-primary-700 transition-colors"
                            >
                                View Details
                            </button>
                            <button className="w-full bg-white border border-slate-200 text-slate-700 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">Cancel</button>
                        </div>
                    </div>
                   ) : (
                    <div className="bg-white rounded-3xl p-10 border border-slate-100 text-center">
                        <p className="text-slate-500">No upcoming appointments scheduled.</p>
                    </div>
                   )}
                </div>
              </div>
            )}

            {/* --- APPOINTMENTS TAB --- */}
            {activeTab === 'appointments' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">My Appointments</h3>
                <div className="space-y-4">
                  {appointments.length > 0 ? appointments.map((apt) => (
                    <div key={apt.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all">
                       <div className="flex flex-col md:flex-row justify-between gap-6">
                          <div className="flex gap-4">
                             <img src={apt.img} alt={apt.doctor} className="w-16 h-16 rounded-xl object-cover" />
                             <div>
                                <h4 className="font-bold text-slate-900 text-lg">{apt.doctor}</h4>
                                <p className="text-primary-600 font-medium text-sm mb-2">{apt.specialty}</p>
                                <div className="flex items-center gap-4 text-sm text-slate-500">
                                   <span className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> {apt.date}</span>
                                   <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> {apt.time}</span>
                                </div>
                             </div>
                          </div>
                          <div className="flex flex-col items-end justify-between">
                             <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                               apt.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                               apt.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                             }`}>
                                {apt.status}
                             </span>
                             {apt.status === 'Upcoming' && (
                                <div className="flex gap-3 mt-4">
                                   {apt.hasReminder && (
                                     <span className="flex items-center text-xs font-bold text-yellow-600 bg-yellow-50 px-2 py-1 rounded-lg">
                                       <Bell className="w-3 h-3 mr-1" /> Reminder On
                                     </span>
                                   )}
                                   <button 
                                      onClick={() => setSelectedAppointment(apt)}
                                      className="text-sm font-bold text-primary-600 hover:underline"
                                   >
                                      View Details
                                   </button>
                                </div>
                             )}
                              {(apt.status === 'Completed' || apt.status === 'Cancelled') && (
                                <div className="flex gap-3 mt-4">
                                   <button 
                                      onClick={() => setSelectedAppointment(apt)}
                                      className="text-sm font-bold text-slate-500 hover:text-slate-800"
                                   >
                                      View Details
                                   </button>
                                </div>
                             )}
                          </div>
                       </div>
                    </div>
                  )) : (
                     <div className="text-center py-10 text-slate-500">No appointments found.</div>
                  )}
                </div>
              </div>
            )}

            {/* --- ORDERS TAB --- */}
            {activeTab === 'orders' && (
              <div className="animate-fade-in">
                <h3 className="text-2xl font-bold text-slate-900 mb-6">Medicine Orders</h3>
                <div className="space-y-4">
                   {MOCK_ORDERS.map((order) => (
                      <div key={order.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm hover:shadow-md transition-all flex flex-col md:flex-row justify-between items-center gap-6">
                         <div className="flex items-center gap-4 w-full md:w-auto">
                            <div className="w-16 h-16 bg-slate-50 rounded-xl flex items-center justify-center">
                               <img src={order.image} alt="Medicine" className="w-12 h-12 object-contain mix-blend-multiply" />
                            </div>
                            <div>
                               <div className="flex items-center gap-3 mb-1">
                                  <h4 className="font-bold text-slate-900">{order.id}</h4>
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                                  }`}>
                                    {order.status}
                                  </span>
                               </div>
                               <p className="text-sm text-slate-500 mb-1">{order.items.join(', ')} {order.items.length > 2 && '...'}</p>
                               <p className="text-xs text-slate-400">Ordered on {order.date}</p>
                            </div>
                         </div>
                         <div className="flex items-center justify-between w-full md:w-auto gap-8">
                            <div className="text-right">
                               <p className="text-xs text-slate-400 uppercase font-bold">Total</p>
                               <p className="text-lg font-bold text-slate-900">${order.total.toFixed(2)}</p>
                            </div>
                            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                               <ChevronRight className="w-5 h-5 text-slate-400" />
                            </button>
                         </div>
                      </div>
                   ))}
                </div>
              </div>
            )}

            {/* --- SETTINGS TAB --- */}
            {activeTab === 'settings' && (
               <div className="animate-fade-in bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-xl font-bold text-slate-900">Personal Information</h3>
                    <button 
                      onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                        isEditing ? 'bg-primary-600 text-white hover:bg-primary-700' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                      }`}
                    >
                      {isEditing ? <><Save className="w-4 h-4" /> Save Changes</> : <><Edit2 className="w-4 h-4" /> Edit Profile</>}
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                    <InfoItem icon={User} label="Full Name" value={formData.name} isEditing={isEditing} onChange={(val: string) => setFormData({...formData, name: val})} />
                    <InfoItem icon={Mail} label="Email Address" value={user.email} isEditing={false} disabled />
                    <InfoItem icon={Phone} label="Phone Number" value={formData.phone} isEditing={isEditing} onChange={(val: string) => setFormData({...formData, phone: val})} />
                    <InfoItem icon={MapPin} label="Location" value={formData.location} isEditing={isEditing} onChange={(val: string) => setFormData({...formData, location: val})} placeholder="Add location" />
                    <InfoItem icon={Droplet} label="Blood Group" value={formData.bloodGroup} isEditing={isEditing} onChange={(val: string) => setFormData({...formData, bloodGroup: val})} placeholder="Add blood group" />
                  </div>
               </div>
            )}

          </div>
        </div>

        {/* Appointment Details Modal */}
        <AppointmentDetailsModal 
           appointment={selectedAppointment} 
           isOpen={!!selectedAppointment} 
           onClose={() => setSelectedAppointment(null)} 
        />

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
        <p className="text-lg font-bold text-slate-900 p-3 bg-slate-50/50 rounded-xl border border-transparent">
            {value || <span className="text-slate-300 italic">Not set</span>}
        </p>
    )}
  </div>
);

export default UserProfile;
