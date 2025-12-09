import React from 'react';
import { Search, CalendarCheck, MessageSquare } from 'lucide-react';

const Features: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl">Healthcare made simple</h2>
          <p className="mt-4 text-lg text-slate-500">We've streamlined the process so you can focus on getting better, not on paperwork.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <Search className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">1. Find a Specialist</h3>
                <p className="text-slate-500 leading-relaxed">
                    Browse our list of verified doctors or use our AI Assistant to find the perfect match for your symptoms.
                </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <CalendarCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">2. Book Instantly</h3>
                <p className="text-slate-500 leading-relaxed">
                    Choose a time slot that works for you. No phone calls, no waiting on hold. Real-time availability.
                </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
                    <MessageSquare className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">3. Get Care</h3>
                <p className="text-slate-500 leading-relaxed">
                    Visit the clinic or consult online. Receive digital prescriptions and follow-up care reminders.
                </p>
            </div>
        </div>
      </div>
    </section>
  );
};

export default Features;