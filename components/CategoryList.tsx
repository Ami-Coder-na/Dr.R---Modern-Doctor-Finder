import React from 'react';
import { Specialty } from '../types';
import { Heart, Activity, Brain, Baby, Smile, Bone, Stethoscope, UserCheck, ArrowRight } from 'lucide-react';

interface CategoryListProps {
  onSelectCategory: (specialty: Specialty) => void;
  selectedCategory: Specialty | null;
}

const specialtiesConfig = [
  { type: Specialty.CARDIOLOGIST, icon: Heart, color: 'text-rose-500', bg: 'bg-rose-50', desc: 'Heart health & surgery' },
  { type: Specialty.DERMATOLOGIST, icon: Activity, color: 'text-pink-500', bg: 'bg-pink-50', desc: 'Skin, hair & nails' },
  { type: Specialty.NEUROLOGIST, icon: Brain, color: 'text-violet-500', bg: 'bg-violet-50', desc: 'Brain & nervous system' },
  { type: Specialty.PEDIATRICIAN, icon: Baby, color: 'text-sky-500', bg: 'bg-sky-50', desc: 'Child & infant care' },
  { type: Specialty.DENTIST, icon: Smile, color: 'text-amber-500', bg: 'bg-amber-50', desc: 'Oral health & hygiene' },
  { type: Specialty.ORTHOPEDIC, icon: Bone, color: 'text-slate-500', bg: 'bg-slate-100', desc: 'Bones & joints' },
  { type: Specialty.GENERAL_PHYSICIAN, icon: Stethoscope, color: 'text-emerald-500', bg: 'bg-emerald-50', desc: 'General healthcare' },
  { type: Specialty.PSYCHIATRIST, icon: UserCheck, color: 'text-indigo-500', bg: 'bg-indigo-50', desc: 'Mental health' },
];

const CategoryList: React.FC<CategoryListProps> = ({ onSelectCategory, selectedCategory }) => {
  return (
    <div className="py-24 bg-white">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Explore Specialties</h2>
                <p className="mt-4 text-lg text-slate-500 max-w-2xl">Expert care for every part of your health journey. Select a department to get started.</p>
            </div>
            <button className="hidden md:flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                View All Categories <ArrowRight className="w-4 h-4 ml-2" />
            </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {specialtiesConfig.map((item) => {
            const isSelected = selectedCategory === item.type;
            return (
              <button
                key={item.type}
                onClick={() => onSelectCategory(item.type)}
                className={`group relative flex flex-col items-start p-6 rounded-2xl transition-all duration-300 border text-left
                  ${isSelected 
                    ? 'border-primary-500 ring-2 ring-primary-200 bg-primary-50 shadow-md' 
                    : 'border-slate-100 bg-white hover:border-primary-100 hover:shadow-xl hover:-translate-y-1'
                  }
                `}
              >
                <div className={`p-3 rounded-xl ${item.bg} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h3 className={`font-bold text-lg mb-1 ${isSelected ? 'text-primary-900' : 'text-slate-900 group-hover:text-primary-700'}`}>
                  {item.type}
                </h3>
                <p className="text-sm text-slate-500">{item.desc}</p>
                
                <div className={`absolute top-6 right-6 opacity-0 transform translate-x-2 transition-all duration-300 ${isSelected ? 'opacity-100 translate-x-0' : 'group-hover:opacity-100 group-hover:translate-x-0'}`}>
                    <ArrowRight className="w-5 h-5 text-primary-400" />
                </div>
              </button>
            );
          })}
        </div>
        
        <div className="mt-8 text-center md:hidden">
             <button className="inline-flex items-center text-primary-600 font-semibold hover:text-primary-700 transition-colors">
                View All Categories <ArrowRight className="w-4 h-4 ml-2" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;