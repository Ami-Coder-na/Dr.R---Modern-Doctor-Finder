
import React, { useState } from 'react';
import { Doctor, Specialty, AppointmentDisplay } from '../types';
import { Users, Calendar, Settings, LogOut, Plus, Trash2, Edit2, Search, X, Check, Lock, ChevronRight, Activity, Mail, KeyRound } from 'lucide-react';

interface AdminDashboardProps {
  doctors: Doctor[];
  setDoctors: React.Dispatch<React.SetStateAction<Doctor[]>>;
  appointments: AppointmentDisplay[];
  setAppointments: React.Dispatch<React.SetStateAction<AppointmentDisplay[]>>;
  onLogout: () => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ 
  doctors, 
  setDoctors, 
  appointments, 
  setAppointments,
  onLogout
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'dashboard' | 'doctors' | 'appointments'>('dashboard');
  
  // Doctor Modal State
  const [isDoctorModalOpen, setIsDoctorModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);
  const [formData, setFormData] = useState<Partial<Doctor>>({});

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email === 'admin@dr-r.com' && password === 'admin123') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials');
    }
  };

  const handleDeleteDoctor = (id: string) => {
    if (confirm('Are you sure you want to delete this doctor?')) {
      setDoctors(doctors.filter(d => d.id !== id));
    }
  };

  const handleEditDoctor = (doctor: Doctor) => {
    setEditingDoctor(doctor);
    setFormData(doctor);
    setIsDoctorModalOpen(true);
  };

  const handleAddDoctor = () => {
    setEditingDoctor(null);
    setFormData({
      id: Math.random().toString(36).substr(2, 9),
      name: '',
      specialty: Specialty.GENERAL_PHYSICIAN,
      image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=800',
      rating: 5.0,
      reviews: 0,
      experience: 5,
      location: '',
      price: 100,
      about: '',
      availability: ['09:00 AM', '12:00 PM']
    });
    setIsDoctorModalOpen(true);
  };

  const handleSaveDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDoctor) {
      setDoctors(doctors.map(d => d.id === editingDoctor.id ? { ...d, ...formData } as Doctor : d));
    } else {
      setDoctors([...doctors, formData as Doctor]);
    }
    setIsDoctorModalOpen(false);
  };

  const handleStatusChange = (id: number, status: string) => {
    setAppointments(appointments.map(a => a.id === id ? { ...a, status } : a));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-primary-900/20 blur-[120px]" />
           <div className="absolute bottom-[10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-blue-900/20 blur-[120px]" />
        </div>

        <div className="bg-white rounded-[2rem] p-8 md:p-12 max-w-md w-full shadow-2xl relative z-10 animate-fade-in-up">
          <div className="text-center mb-10">
            <div className="w-20 h-20 bg-primary-50 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm transform transition-transform hover:rotate-6 duration-300">
               <Lock className="w-10 h-10 text-primary-600" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Admin Portal</h2>
            <p className="text-slate-500">Secure access for administrators</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input 
                  type="email" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  placeholder="admin@dr-r.com"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <KeyRound className="h-5 w-5 text-slate-400 group-focus-within:text-primary-500 transition-colors" />
                </div>
                <input 
                  type="password" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-bold text-lg hover:bg-primary-600 transition-all shadow-lg hover:shadow-xl hover:-translate-y-1 active:translate-y-0">
              Access Dashboard
            </button>
            
            <div className="text-center mt-6">
                <button 
                  type="button" 
                  onClick={onLogout} 
                  className="text-slate-500 text-sm font-semibold hover:text-primary-600 transition-colors flex items-center justify-center gap-2 mx-auto"
                >
                  <ChevronRight className="w-4 h-4 rotate-180" /> Back to Website
                </button>
            </div>
          </form>

          {/* Quick Fill for Demo */}
          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
             <button 
               onClick={() => { setEmail('admin@dr-r.com'); setPassword('admin123'); }}
               className="text-xs font-semibold text-primary-600 bg-primary-50 px-4 py-2 rounded-full hover:bg-primary-100 transition-colors"
             >
               Use Demo Credentials
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white p-6 hidden lg:block fixed h-full z-20">
        <div className="flex items-center gap-2 mb-10">
          <div className="bg-primary-500 p-1.5 rounded-lg">
            <Settings className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl">Dr.R Admin</span>
        </div>
        
        <nav className="space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'dashboard' ? 'bg-primary-600' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            <Activity className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('doctors')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'doctors' ? 'bg-primary-600' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            <Users className="w-5 h-5" /> Doctors
          </button>
          <button 
            onClick={() => setActiveTab('appointments')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${activeTab === 'appointments' ? 'bg-primary-600' : 'hover:bg-slate-800 text-slate-400 hover:text-white'}`}
          >
            <Calendar className="w-5 h-5" /> Appointments
          </button>
        </nav>

        <div className="absolute bottom-6 left-6 right-6">
          <button 
             onClick={onLogout}
             className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:ml-64 flex-1 p-8">
        
        {/* Header Mobile Toggle could go here */}
        
        {activeTab === 'dashboard' && (
          <div className="animate-fade-in">
             <h1 className="text-3xl font-bold text-slate-900 mb-8">Dashboard Overview</h1>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-slate-500 text-sm">Total Doctors</p>
                        <h3 className="text-3xl font-bold text-slate-900">{doctors.length}</h3>
                      </div>
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                        <Users className="w-6 h-6" />
                      </div>
                   </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-slate-500 text-sm">Appointments</p>
                        <h3 className="text-3xl font-bold text-slate-900">{appointments.length}</h3>
                      </div>
                      <div className="p-3 bg-green-50 text-green-600 rounded-xl">
                        <Calendar className="w-6 h-6" />
                      </div>
                   </div>
                </div>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                   <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-slate-500 text-sm">Pending Requests</p>
                        <h3 className="text-3xl font-bold text-slate-900">{appointments.filter(a => a.status === 'Upcoming').length}</h3>
                      </div>
                      <div className="p-3 bg-orange-50 text-orange-600 rounded-xl">
                        <Activity className="w-6 h-6" />
                      </div>
                   </div>
                </div>
             </div>

             <h2 className="text-xl font-bold text-slate-900 mb-4">Recent Appointments</h2>
             <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="p-4 text-sm font-semibold text-slate-600">Patient/Doctor</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Date/Time</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                      </tr>
                   </thead>
                   <tbody>
                      {appointments.slice(0, 5).map(apt => (
                        <tr key={apt.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                           <td className="p-4">
                              <p className="font-bold text-slate-900">{apt.doctor}</p>
                              <p className="text-xs text-slate-500">{apt.specialty}</p>
                           </td>
                           <td className="p-4">
                              <p className="text-sm text-slate-900">{apt.date}</p>
                              <p className="text-xs text-slate-500">{apt.time}</p>
                           </td>
                           <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                apt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                apt.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {apt.status}
                              </span>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div className="animate-fade-in">
             <div className="flex justify-between items-center mb-8">
               <h1 className="text-3xl font-bold text-slate-900">Manage Doctors</h1>
               <button onClick={handleAddDoctor} className="bg-slate-900 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-800">
                 <Plus className="w-4 h-4" /> Add Doctor
               </button>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
               {doctors.map(doctor => (
                 <div key={doctor.id} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm flex items-start gap-4">
                    <img src={doctor.image} className="w-16 h-16 rounded-xl object-cover" alt="" />
                    <div className="flex-1">
                       <h3 className="font-bold text-slate-900">{doctor.name}</h3>
                       <p className="text-primary-600 text-sm mb-1">{doctor.specialty}</p>
                       <p className="text-slate-400 text-xs mb-3">{doctor.location}</p>
                       <div className="flex gap-2">
                          <button onClick={() => handleEditDoctor(doctor)} className="p-2 bg-slate-50 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200">
                             <Edit2 className="w-4 h-4" />
                          </button>
                          <button onClick={() => handleDeleteDoctor(doctor.id)} className="p-2 bg-red-50 rounded-lg text-red-600 hover:bg-red-100">
                             <Trash2 className="w-4 h-4" />
                          </button>
                       </div>
                    </div>
                 </div>
               ))}
             </div>
          </div>
        )}

        {activeTab === 'appointments' && (
           <div className="animate-fade-in">
             <h1 className="text-3xl font-bold text-slate-900 mb-8">Manage Appointments</h1>
             <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left">
                   <thead className="bg-slate-50 border-b border-slate-100">
                      <tr>
                        <th className="p-4 text-sm font-semibold text-slate-600">ID</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Doctor</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Date/Time</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Status</th>
                        <th className="p-4 text-sm font-semibold text-slate-600">Actions</th>
                      </tr>
                   </thead>
                   <tbody>
                      {appointments.map(apt => (
                        <tr key={apt.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50">
                           <td className="p-4 text-slate-500 text-sm">#{apt.id}</td>
                           <td className="p-4">
                              <p className="font-bold text-slate-900">{apt.doctor}</p>
                              <p className="text-xs text-slate-500">{apt.specialty}</p>
                           </td>
                           <td className="p-4">
                              <p className="text-sm text-slate-900">{apt.date}</p>
                              <p className="text-xs text-slate-500">{apt.time}</p>
                           </td>
                           <td className="p-4">
                              <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                                apt.status === 'Completed' ? 'bg-green-100 text-green-700' :
                                apt.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {apt.status}
                              </span>
                           </td>
                           <td className="p-4">
                              <div className="flex gap-2">
                                 {apt.status === 'Upcoming' && (
                                   <>
                                     <button onClick={() => handleStatusChange(apt.id, 'Completed')} className="text-xs bg-green-50 text-green-600 px-3 py-1 rounded-lg font-bold hover:bg-green-100">Confirm</button>
                                     <button onClick={() => handleStatusChange(apt.id, 'Cancelled')} className="text-xs bg-red-50 text-red-600 px-3 py-1 rounded-lg font-bold hover:bg-red-100">Cancel</button>
                                   </>
                                 )}
                                 {apt.status !== 'Upcoming' && <span className="text-xs text-slate-400">No actions</span>}
                              </div>
                           </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
           </div>
        )}
      </div>

      {/* Doctor Modal */}
      {isDoctorModalOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
           <div className="bg-white rounded-3xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold text-slate-900">{editingDoctor ? 'Edit Doctor' : 'Add New Doctor'}</h2>
                 <button onClick={() => setIsDoctorModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5" /></button>
              </div>
              <form onSubmit={handleSaveDoctor} className="space-y-4">
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Name</label>
                    <input type="text" className="w-full p-3 border rounded-xl" value={formData.name || ''} onChange={e => setFormData({...formData, name: e.target.value})} required />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Specialty</label>
                    <select className="w-full p-3 border rounded-xl" value={formData.specialty || ''} onChange={e => setFormData({...formData, specialty: e.target.value as Specialty})}>
                        {Object.values(Specialty).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Location</label>
                    <input type="text" className="w-full p-3 border rounded-xl" value={formData.location || ''} onChange={e => setFormData({...formData, location: e.target.value})} />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Price ($)</label>
                    <input type="number" className="w-full p-3 border rounded-xl" value={formData.price || 0} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                 </div>
                 <button className="w-full bg-primary-600 text-white py-3 rounded-xl font-bold hover:bg-primary-700 mt-4">Save Doctor</button>
              </form>
           </div>
        </div>
      )}

    </div>
  );
};

export default AdminDashboard;
