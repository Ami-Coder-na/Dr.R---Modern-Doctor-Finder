import React from 'react';
import { X, Calendar, Clock, MapPin, User, Phone, Video, MessageSquare } from 'lucide-react';

export interface AppointmentDisplay {
  id: number;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: string;
  img: string;
  location: string;
  hasReminder?: boolean;
}

interface AppointmentDetailsModalProps {
  appointment: AppointmentDisplay | null;
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentDetailsModal: React.FC<AppointmentDetailsModalProps> = ({ appointment, isOpen, onClose }) => {
  if (!isOpen || !appointment) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity" 
          onClick={onClose}
        ></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full relative animate-fade-in-up">
            
            {/* Close Button */}
            <button 
                onClick={onClose} 
                className="absolute top-4 right-4 z-10 bg-slate-100 hover:bg-slate-200 p-2 rounded-full transition-colors"
            >
                <X className="w-5 h-5 text-slate-500" />
            </button>

            {/* Header */}
            <div className="bg-slate-50 p-6 sm:p-8 border-b border-slate-100 text-center">
                <div className="w-24 h-24 mx-auto mb-4 relative">
                    <img 
                        src={appointment.img} 
                        alt={appointment.doctor} 
                        className="w-full h-full rounded-full object-cover border-4 border-white shadow-md" 
                    />
                    <div className={`absolute bottom-0 right-0 w-6 h-6 rounded-full border-2 border-white flex items-center justify-center ${
                        appointment.status === 'Completed' ? 'bg-green-500' : 
                        appointment.status === 'Upcoming' ? 'bg-blue-500' : 'bg-red-500'
                    }`}>
                    </div>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{appointment.doctor}</h2>
                <p className="text-primary-600 font-medium">{appointment.specialty}</p>
                <div className={`inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide mt-3 ${
                    appointment.status === 'Completed' ? 'bg-green-100 text-green-700' : 
                    appointment.status === 'Upcoming' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                }`}>
                    {appointment.status}
                </div>
            </div>

            {/* Content */}
            <div className="p-6 sm:p-8 space-y-6">
                
                {/* Time & Location */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <Calendar className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Date</span>
                        </div>
                        <p className="font-bold text-slate-900">{appointment.date}</p>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex items-center gap-2 text-slate-400 mb-1">
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase">Time</span>
                        </div>
                        <p className="font-bold text-slate-900">{appointment.time}</p>
                    </div>
                </div>

                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-primary-500 mt-0.5" />
                    <div>
                        <p className="text-xs font-bold text-slate-400 uppercase mb-0.5">Location</p>
                        <p className="font-bold text-slate-900">{appointment.location}</p>
                        <p className="text-xs text-slate-500 mt-1">Room 302, 3rd Floor, Main Building</p>
                    </div>
                </div>

                {/* Actions */}
                {appointment.status === 'Upcoming' && (
                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <button className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 rounded-xl font-bold text-sm hover:bg-slate-800 transition-colors">
                            <MessageSquare className="w-4 h-4" /> Message
                        </button>
                        <button className="flex items-center justify-center gap-2 bg-white border border-slate-200 text-slate-700 py-3 rounded-xl font-bold text-sm hover:bg-slate-50 transition-colors">
                            <Phone className="w-4 h-4" /> Call Clinic
                        </button>
                        <button className="col-span-2 flex items-center justify-center gap-2 bg-primary-50 text-primary-700 py-3 rounded-xl font-bold text-sm hover:bg-primary-100 transition-colors">
                            <Video className="w-4 h-4" /> Join Video Consultation
                        </button>
                    </div>
                )}
                
                {/* Footer Notes */}
                <div className="text-center pt-2">
                    <p className="text-xs text-slate-400">
                        Appointment ID: #{appointment.id}8829 • Booked on Oct 20, 2023
                    </p>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDetailsModal;