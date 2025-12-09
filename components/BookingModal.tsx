
import React, { useState, useEffect } from 'react';
import { Doctor } from '../types';
import { X, Calendar, Clock, User, Phone, CheckCircle, ChevronRight, ChevronLeft, Bell } from 'lucide-react';

interface BookingModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ doctor, isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: Schedule, 2: Personal Info, 3: Confirmation
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', reason: '', remindMe: false });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate next 7 days dynamically
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return {
      full: d,
      dayName: d.toLocaleDateString('en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      display: d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' })
    };
  });

  useEffect(() => {
    if (isOpen) {
        // Initialize with first date if not selected
        if (!selectedDate) setSelectedDate(dates[0].display);
    }
  }, [isOpen]);

  if (!isOpen || !doctor) return null;

  const handleNext = async () => {
    if (step === 1 && selectedDate && selectedTime) {
        setStep(2);
    } else if (step === 2 && formData.name && formData.phone) {
        setIsSubmitting(true);
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));
        setIsSubmitting(false);
        setStep(3);
    }
  };

  const handleBack = () => {
      if (step > 1) setStep(step - 1);
  }

  const reset = () => {
      setStep(1);
      setSelectedDate('');
      setSelectedTime('');
      setFormData({ name: '', phone: '', email: '', reason: '', remindMe: false });
      setIsSubmitting(false);
      onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm transition-opacity" aria-hidden="true" onClick={reset}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        {/* Modal Panel */}
        <div className="inline-block align-bottom bg-white rounded-3xl text-left overflow-hidden shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:max-w-2xl w-full relative animate-fade-in-up">
            
            {/* Close Button */}
            <button 
                onClick={reset} 
                className="absolute top-4 right-4 z-10 bg-white/50 hover:bg-slate-100 p-2 rounded-full transition-colors backdrop-blur-sm"
            >
                <X className="w-5 h-5 text-slate-500" />
            </button>

            {/* Left/Top Content (Summary Header) */}
            <div className="bg-slate-50 border-b border-slate-100 px-6 py-6 sm:px-10">
                <h2 className="text-2xl font-bold text-slate-900">
                    {step === 3 ? 'Appointment Confirmed' : 'Book Appointment'}
                </h2>
                <div className="mt-4 flex items-center gap-4 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                    <img src={doctor.image} alt={doctor.name} className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm" />
                    <div>
                        <p className="font-bold text-slate-900 text-lg">{doctor.name}</p>
                        <p className="text-sm text-primary-600 font-medium">{doctor.specialty}</p>
                    </div>
                </div>
                
                {/* Progress Steps */}
                {step < 3 && (
                    <div className="flex items-center mt-6">
                        <div className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= 1 ? 'bg-primary-500' : 'bg-slate-200'}`}></div>
                        <div className={`h-1.5 flex-1 rounded-full ml-2 transition-all duration-500 ${step >= 2 ? 'bg-primary-500' : 'bg-slate-200'}`}></div>
                    </div>
                )}
            </div>

            {/* Main Content Area */}
            <div className="px-6 py-6 sm:px-10">
                
                {/* Step 1: Schedule */}
                {step === 1 && (
                    <div className="animate-fade-in">
                        <h3 className="text-lg font-bold text-slate-900 mb-5 flex items-center">
                            <Calendar className="w-5 h-5 mr-2 text-primary-500" />
                            Select Date & Time
                        </h3>
                        
                        {/* Dates Row */}
                        <div className="mb-8">
                            <div className="flex gap-3 overflow-x-auto pb-4 no-scrollbar">
                                {dates.map((d, i) => (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedDate(d.display)}
                                        className={`flex-shrink-0 flex flex-col items-center justify-center w-20 h-24 rounded-2xl border transition-all duration-200
                                            ${selectedDate === d.display 
                                                ? 'bg-slate-900 border-slate-900 text-white shadow-lg shadow-slate-900/30 transform scale-105' 
                                                : 'bg-white border-slate-200 text-slate-600 hover:border-primary-300 hover:bg-slate-50'
                                            }
                                        `}
                                    >
                                        <span className={`text-xs font-semibold uppercase tracking-wider mb-1 ${selectedDate === d.display ? 'text-slate-300' : 'text-slate-400'}`}>
                                            {d.dayName}
                                        </span>
                                        <span className="text-2xl font-bold">{d.dayNumber}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Times Grid */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Available Slots</label>
                            <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                                {doctor.availability.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`py-3 px-3 rounded-xl text-sm font-semibold border transition-all duration-200 flex items-center justify-center
                                            ${selectedTime === time 
                                                ? 'bg-primary-50 border-primary-500 text-primary-700 ring-1 ring-primary-500 shadow-sm' 
                                                : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300 hover:bg-slate-50'
                                            }
                                        `}
                                    >
                                        <Clock className={`w-3.5 h-3.5 mr-2 ${selectedTime === time ? 'text-primary-600' : 'text-slate-400'}`} />
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Patient Info */}
                {step === 2 && (
                    <div className="animate-fade-in">
                        <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-center gap-4 mb-8">
                             <div className="bg-white p-3 rounded-xl text-blue-600 shadow-sm">
                                <Calendar className="w-5 h-5" />
                             </div>
                             <div>
                                 <p className="text-xs text-blue-600 font-bold uppercase tracking-wide">Appointment Time</p>
                                 <p className="text-blue-900 font-bold text-lg">{selectedDate} • {selectedTime}</p>
                             </div>
                        </div>

                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Patient Name</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                    <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all bg-slate-50 focus:bg-white"
                                        placeholder="Enter full name"
                                    />
                                </div>
                            </div>
                            
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                                    <div className="relative">
                                        <Phone className="absolute left-4 top-3.5 h-5 w-5 text-slate-400" />
                                        <input
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                            className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all bg-slate-50 focus:bg-white"
                                            placeholder="(555) 000-0000"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Email (Optional)</label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        className="w-full px-4 py-3.5 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all bg-slate-50 focus:bg-white"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2">Notes for Doctor</label>
                                <textarea
                                    value={formData.reason}
                                    onChange={(e) => setFormData({...formData, reason: e.target.value})}
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none transition-all bg-slate-50 focus:bg-white resize-none"
                                    placeholder="Briefly describe your symptoms or reason for visit..."
                                />
                            </div>

                             {/* Reminder Toggle */}
                            <label className="flex items-center gap-3 p-4 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition-colors">
                                <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${formData.remindMe ? 'bg-primary-600 border-primary-600' : 'border-slate-300 bg-white'}`}>
                                    {formData.remindMe && <CheckCircle className="w-3.5 h-3.5 text-white" />}
                                </div>
                                <input 
                                    type="checkbox" 
                                    className="hidden" 
                                    checked={formData.remindMe}
                                    onChange={(e) => setFormData({...formData, remindMe: e.target.checked})}
                                />
                                <div className="flex-1">
                                    <div className="flex items-center text-sm font-bold text-slate-900">
                                        <Bell className="w-4 h-4 mr-2 text-primary-500" />
                                        Get Booking Reminder
                                    </div>
                                    <p className="text-xs text-slate-500">We'll send you a notification 1 hour before the appointment.</p>
                                </div>
                            </label>
                        </div>
                    </div>
                )}

                {/* Step 3: Success */}
                {step === 3 && (
                    <div className="text-center py-10 animate-fade-in">
                        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner relative">
                            <div className="absolute inset-0 rounded-full border-4 border-green-50 animate-ping opacity-20"></div>
                            <CheckCircle className="w-12 h-12 text-green-600" />
                        </div>
                        <h3 className="text-3xl font-bold text-slate-900 mb-4">Booking Successful!</h3>
                        <p className="text-slate-500 text-lg max-w-sm mx-auto mb-6 leading-relaxed">
                            Your appointment with <span className="font-bold text-slate-900">Dr. {doctor.name}</span> is confirmed for <br/>
                            <span className="text-primary-600 font-bold">{selectedDate}</span> at <span className="text-primary-600 font-bold">{selectedTime}</span>.
                        </p>
                        
                        {formData.remindMe && (
                             <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-50 text-yellow-700 rounded-full text-sm font-semibold mb-8">
                                <Bell className="w-4 h-4" />
                                Reminder set for 1 hour before
                             </div>
                        )}

                        <div className="flex justify-center mt-2">
                            <button 
                                onClick={reset}
                                className="px-8 py-3.5 bg-slate-100 text-slate-700 font-bold rounded-xl hover:bg-slate-200 transition-colors w-full sm:w-auto"
                            >
                                Close Window
                            </button>
                        </div>
                    </div>
                )}

                {/* Footer Actions (Steps 1 & 2) */}
                {step < 3 && (
                    <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                        {step === 1 ? (
                            <button 
                                onClick={reset}
                                className="text-slate-500 font-semibold hover:text-slate-800 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                Cancel
                            </button>
                        ) : (
                            <button 
                                onClick={handleBack}
                                className="flex items-center text-slate-600 font-bold hover:text-slate-900 px-4 py-2 rounded-lg hover:bg-slate-50 transition-colors"
                            >
                                <ChevronLeft className="w-5 h-5 mr-1" /> Back
                            </button>
                        )}

                        <button
                            onClick={handleNext}
                            disabled={
                                (step === 1 && (!selectedDate || !selectedTime)) || 
                                (step === 2 && (!formData.name || !formData.phone)) ||
                                isSubmitting
                            }
                            className={`flex items-center px-8 py-3.5 rounded-xl font-bold text-white transition-all duration-300 shadow-lg
                                ${
                                    (step === 1 && (!selectedDate || !selectedTime)) || 
                                    (step === 2 && (!formData.name || !formData.phone)) ||
                                    isSubmitting
                                    ? 'bg-slate-300 shadow-none cursor-not-allowed'
                                    : 'bg-primary-600 hover:bg-primary-700 hover:shadow-primary-500/30 transform hover:-translate-y-1'
                                }
                            `}
                        >
                            {isSubmitting ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Processing...
                                </div>
                            ) : (
                                <>
                                    {step === 1 ? 'Continue' : 'Confirm Booking'}
                                    {step === 1 && <ChevronRight className="w-5 h-5 ml-2" />}
                                </>
                            )}
                        </button>
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;
