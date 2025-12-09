import React, { useState } from 'react';
import { Doctor } from '../types';
import { X, Calendar, Clock, User, Phone } from 'lucide-react';

interface BookingModalProps {
  doctor: Doctor | null;
  isOpen: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ doctor, isOpen, onClose }) => {
  const [step, setStep] = useState(1); // 1: Select Time, 2: Details, 3: Success
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [formData, setFormData] = useState({ name: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !doctor) return null;

  const handleNext = async () => {
    if (step === 1 && selectedDate && selectedTime) {
        setStep(2);
    } else if (step === 2 && formData.name && formData.phone) {
        // Simulate API call for booking
        setIsSubmitting(true);
        await new Promise(resolve => setTimeout(resolve, 1500));
        setIsSubmitting(false);
        setStep(3);
    }
  };

  const reset = () => {
      setStep(1);
      setSelectedDate('');
      setSelectedTime('');
      setFormData({ name: '', phone: '' });
      setIsSubmitting(false);
      onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        
        <div className="fixed inset-0 bg-slate-500 bg-opacity-75 transition-opacity" aria-hidden="true" onClick={reset}></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
                <h3 className="text-lg leading-6 font-medium text-slate-900" id="modal-title">
                    {step === 3 ? 'Appointment Confirmed!' : `Book with ${doctor.name}`}
                </h3>
                <button onClick={reset} disabled={isSubmitting} className="text-slate-400 hover:text-slate-500 disabled:opacity-50">
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Content */}
            <div className="mt-2">
                
                {step === 1 && (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Select Date</label>
                            <div className="flex overflow-x-auto space-x-2 py-2 no-scrollbar">
                                {[0,1,2,3,4].map(day => {
                                    const date = new Date();
                                    date.setDate(date.getDate() + day);
                                    const dateStr = date.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric' });
                                    return (
                                        <button 
                                            key={day}
                                            onClick={() => setSelectedDate(dateStr)}
                                            className={`flex-shrink-0 px-4 py-2 rounded-lg border text-sm font-medium ${
                                                selectedDate === dateStr 
                                                ? 'bg-primary-600 text-white border-primary-600' 
                                                : 'bg-white text-slate-700 border-slate-300 hover:border-primary-500'
                                            }`}
                                        >
                                            {dateStr}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Select Time</label>
                            <div className="grid grid-cols-3 gap-2">
                                {doctor.availability.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => setSelectedTime(time)}
                                        className={`px-2 py-2 rounded-md border text-sm ${
                                            selectedTime === time 
                                            ? 'bg-primary-600 text-white border-primary-600' 
                                            : 'bg-white text-slate-700 border-slate-300 hover:border-primary-500'
                                        }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {step === 2 && (
                    <div className="space-y-4">
                        <div className="bg-primary-50 p-4 rounded-lg flex items-center space-x-3 text-sm text-primary-800 mb-4">
                            <Calendar className="w-4 h-4" /> <span>{selectedDate}</span>
                            <Clock className="w-4 h-4 ml-2" /> <span>{selectedTime}</span>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Full Name</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    type="text"
                                    disabled={isSubmitting}
                                    className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border disabled:bg-slate-100"
                                    placeholder="John Doe"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Phone className="h-4 w-4 text-slate-400" />
                                </div>
                                <input
                                    type="tel"
                                    disabled={isSubmitting}
                                    className="focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 sm:text-sm border-slate-300 rounded-md py-2 border disabled:bg-slate-100"
                                    placeholder="+1 (555) 987-6543"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                />
                            </div>
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="text-center py-6">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                            <svg className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        <h3 className="text-lg leading-6 font-medium text-slate-900">Booking Successful!</h3>
                        <p className="mt-2 text-sm text-slate-500">
                            Dr. {doctor.name} will expect you on {selectedDate} at {selectedTime}.
                        </p>
                    </div>
                )}
            </div>
          </div>
          <div className="bg-slate-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            {step < 3 ? (
                <button
                    type="button"
                    onClick={handleNext}
                    disabled={isSubmitting || (step === 1 && (!selectedDate || !selectedTime)) || (step === 2 && (!formData.name || !formData.phone))}
                    className={`w-full inline-flex justify-center items-center rounded-md border border-transparent shadow-sm px-4 py-2 text-base font-medium text-white sm:ml-3 sm:w-auto sm:text-sm
                        ${(isSubmitting || (step === 1 && (!selectedDate || !selectedTime)) || (step === 2 && (!formData.name || !formData.phone))) 
                        ? 'bg-primary-300 cursor-not-allowed' 
                        : 'bg-primary-600 hover:bg-primary-700'}`}
                >
                    {isSubmitting ? (
                        <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Processing...
                        </>
                    ) : (
                        step === 1 ? 'Next Details' : 'Confirm Booking'
                    )}
                </button>
            ) : (
                <button
                    type="button"
                    onClick={reset}
                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-primary-600 text-base font-medium text-white hover:bg-primary-700 sm:ml-3 sm:w-auto sm:text-sm"
                >
                    Close
                </button>
            )}
            {step < 3 && (
                <button
                    type="button"
                    onClick={reset}
                    disabled={isSubmitting}
                    className="mt-3 w-full inline-flex justify-center rounded-md border border-slate-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-slate-700 hover:bg-slate-50 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm disabled:opacity-50"
                >
                    Cancel
                </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingModal;