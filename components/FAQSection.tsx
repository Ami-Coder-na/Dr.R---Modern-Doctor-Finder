import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, HeartPulse, Check } from 'lucide-react';

const FAQS = [
  {
    question: "Why opt for our medical services for your family?",
    answer: "We provide comprehensive care with state-of-the-art facilities and a team of experienced specialists dedicated to your family's well-being. Our integrated approach ensures seamless communication between departments."
  },
  {
    question: "Why choose our medical for your family?",
    answer: "Our patient-centric approach ensures personalized treatment plans, 24/7 support, and a comfortable environment for all age groups. We prioritize preventative care to keep your family healthy."
  },
  {
    question: "Why opt for our healthcare services for your family?",
    answer: "From preventive care to advanced surgeries, we offer a wide range of medical services under one roof, making healthcare accessible and convenient. We accept most major insurance plans."
  },
  {
    question: "Why choose our medical services for your family?",
    answer: "With a track record of high success rates and satisfied patients, we are trusted by thousands of families for their healthcare needs. Our specialists are board-certified and leaders in their fields."
  },
  {
    question: "Why choose our healthcare for your family?",
    answer: "We prioritize safety, hygiene, and affordability, ensuring that your family receives the best possible medical attention without financial strain. Digital health records make tracking your history easy."
  }
];

const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
            <span className="text-primary-600 font-semibold tracking-wide uppercase text-sm">Get Your Answer</span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-2 mb-4">Frequently Asked Questions</h2>
            <p className="text-slate-500 max-w-2xl mx-auto">
                Get latest news in your inbox. Consectetur adipiscing elitadipiscing elitse ddo eiusmod tempor incididunt.
            </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Image Composition */}
          <div className="relative order-2 lg:order-1">
             {/* Background Blob */}
             <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-100/50 rounded-full blur-3xl -z-10"></div>

             {/* Main Image */}
             <div className="rounded-[2.5rem] overflow-hidden shadow-2xl relative z-10 border-4 border-white">
                <img 
                    src="https://images.unsplash.com/photo-1551076805-e1869033e561?auto=format&fit=crop&q=80&w=800" 
                    alt="Surgeons at work" 
                    className="w-full h-[550px] object-cover"
                />
             </div>

             {/* Floating Card 1: Top Center - Get Your Answer */}
             <div className="absolute -top-8 right-8 bg-white p-4 pr-6 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-20 flex items-center gap-4 animate-float">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-2xl shadow-inner">
                    🤔
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 text-lg">Get Your Answer</h4>
                    <p className="text-xs text-slate-500">Frequently Asked Questions</p>
                </div>
             </div>

             {/* Floating Card 2: Bottom Left - Doctor Profile */}
             <div className="absolute bottom-16 -left-6 bg-white p-4 pr-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-20 flex items-center gap-4 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="relative">
                    <img 
                        src="https://images.unsplash.com/photo-1559839734209-9f91b59f2eee?auto=format&fit=crop&q=80&w=100&h=100" 
                        alt="Doctor" 
                        className="w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 border-2 border-white">
                        <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                </div>
                <div>
                    <h4 className="font-bold text-slate-900 text-lg">Lily A. Wilson</h4>
                    <p className="text-sm text-slate-500">Senior Cardiologist</p>
                </div>
             </div>

             {/* Floating Card 3: Bottom Center - Heart Icon */}
             <div className="absolute -bottom-6 right-1/3 bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-20 animate-float" style={{ animationDelay: '2.5s' }}>
                <div className="w-14 h-14 bg-rose-50 rounded-full flex items-center justify-center relative">
                    <HeartPulse className="w-7 h-7 text-rose-500" />
                    <span className="absolute top-0 right-0 w-3 h-3 bg-rose-500 rounded-full border-2 border-white"></span>
                </div>
             </div>
          </div>

          {/* Right Column: Accordion */}
          <div className="space-y-5 order-1 lg:order-2">
             {FAQS.map((faq, index) => (
                <div 
                    key={index}
                    className={`bg-white rounded-2xl transition-all duration-300 overflow-hidden
                        ${openIndex === index 
                            ? 'shadow-[0_10px_40px_-10px_rgba(0,0,0,0.08)] border-l-4 border-l-primary-500 border-y border-r border-slate-100' 
                            : 'border border-slate-100 shadow-sm hover:border-slate-200'
                        }
                    `}
                >
                    <button 
                        onClick={() => toggleFAQ(index)}
                        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                    >
                        <div className="flex items-center gap-5">
                            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                                ${openIndex === index ? 'bg-primary-50 text-primary-600 scale-110' : 'bg-rose-500 text-white shadow-md shadow-rose-200'}
                            `}>
                                <HelpCircle className="w-5 h-5" />
                            </div>
                            <span className={`font-bold text-lg pr-4 ${openIndex === index ? 'text-slate-900' : 'text-slate-700'}`}>
                                {faq.question}
                            </span>
                        </div>
                        <div className={`transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''}`}>
                            <ChevronDown className={`w-5 h-5 ${openIndex === index ? 'text-primary-500' : 'text-slate-400'}`} />
                        </div>
                    </button>
                    
                    <div 
                        className={`transition-all duration-300 ease-in-out overflow-hidden ${
                            openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                        }`}
                    >
                        <div className="px-6 pb-6 pt-0 pl-[5.25rem] text-slate-500 leading-relaxed text-[15px]">
                            {faq.answer}
                        </div>
                    </div>
                </div>
             ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default FAQSection;
