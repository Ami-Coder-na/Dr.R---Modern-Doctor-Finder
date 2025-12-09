import React from 'react';
import { CheckCircle, Users, TrendingUp, Clock } from 'lucide-react';

const StatsSection: React.FC = () => {
  const stats = [
    {
      id: 1,
      count: '8600+',
      title: 'Successful Cases',
      desc: 'Aenean facilisis sodales est neci Morbi vitapurus on Est facilis isro convallis facilis isro.',
      icon: CheckCircle,
    },
    {
      id: 2,
      count: '145+',
      title: 'Qualified Doctors',
      desc: 'Aenean facilisis sodales est neci Morbi vitapurus on Est facilis isro convallis facilis isro.',
      icon: Users,
    },
    {
      id: 3,
      count: '25+',
      title: 'Year Of Experience',
      desc: 'Aenean facilisis sodales est neci Morbi vitapurus on Est facilis isro convallis facilis isro.',
      icon: TrendingUp,
    },
    {
      id: 4,
      count: '24x7',
      title: 'Staff Availability',
      desc: 'Aenean facilisis sodales est neci Morbi vitapurus on Est facilis isro convallis facilis isro.',
      icon: Clock,
    },
  ];

  return (
    <section className="relative">
      {/* Green Header Background */}
      <div className="bg-primary-500 pt-20 pb-32">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="text-primary-100 font-medium tracking-wide uppercase text-sm relative px-4 py-1">
            Our Achievements
            <span className="absolute top-1/2 left-0 w-2 h-[1px] bg-primary-300"></span>
            <span className="absolute top-1/2 right-0 w-2 h-[1px] bg-primary-300"></span>
          </span>
          <h2 className="text-4xl font-bold text-white mt-3 mb-4">Why Choose Us</h2>
        </div>
      </div>

      {/* Overlapping Cards */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 -mt-20 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div 
              key={stat.id} 
              className="bg-white rounded-2xl p-8 shadow-xl border border-slate-100 hover:-translate-y-2 transition-transform duration-300 group"
            >
              <h3 className="text-4xl font-bold text-primary-200 mb-4 group-hover:text-primary-500 transition-colors">
                {stat.count}
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-primary-50 text-primary-600">
                  <stat.icon className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-lg text-slate-900">{stat.title}</h4>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed">
                {stat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;