import React from 'react';

const DoctorSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-100 flex flex-col h-full animate-pulse">
      {/* Image Placeholder */}
      <div className="h-48 bg-slate-200 w-full relative">
        <div className="absolute top-4 right-4 bg-slate-300 h-6 w-12 rounded-md"></div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        {/* Badge & Title */}
        <div className="mb-4">
            <div className="h-5 bg-slate-200 rounded-full w-24 mb-3"></div>
            <div className="h-7 bg-slate-200 rounded w-3/4"></div>
        </div>
        
        {/* Description Lines */}
        <div className="space-y-2 mb-6 flex-grow">
           <div className="h-4 bg-slate-200 rounded w-full"></div>
           <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        </div>
        
        {/* Info Rows */}
        <div className="space-y-3 mb-6">
            <div className="flex items-center space-x-3">
                <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
                <div className="h-4 bg-slate-200 rounded w-1/3"></div>
            </div>
            <div className="flex items-center space-x-3">
                <div className="h-4 w-4 bg-slate-200 rounded-full"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
            </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100">
            <div className="space-y-1">
                <div className="h-3 bg-slate-200 rounded w-16"></div>
                <div className="h-6 bg-slate-200 rounded w-12"></div>
            </div>
            <div className="h-10 bg-slate-200 rounded-lg w-28"></div>
        </div>
      </div>
    </div>
  );
};

export default DoctorSkeleton;