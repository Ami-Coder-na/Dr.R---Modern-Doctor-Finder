import React from 'react';
import { Calendar, User, ArrowRight } from 'lucide-react';

const BLOG_POSTS = [
  {
    id: 1,
    title: '10 Tips for a Healthy Heart',
    excerpt: 'Simple lifestyle changes can make a huge difference in your heart health. Learn what our experts recommend.',
    category: 'Cardiology',
    author: 'Dr. Sarah Smith',
    date: 'Oct 24, 2023',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 2,
    title: 'Understanding Anxiety Disorders',
    excerpt: 'Anxiety is more than just stress. Explore the symptoms, causes, and effective treatments available today.',
    category: 'Mental Health',
    author: 'Dr. Hannibal Lecter',
    date: 'Nov 02, 2023',
    image: 'https://images.unsplash.com/photo-1527137342181-19aab11a8ee8?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 3,
    title: 'The Importance of Child Vaccination',
    excerpt: 'Vaccines are crucial for protecting children from serious diseases. Here is everything parents need to know.',
    category: 'Pediatrics',
    author: 'Dr. Emily Chen',
    date: 'Nov 15, 2023',
    image: 'https://images.unsplash.com/photo-1632053009961-464a93c78d65?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 4,
    title: 'Dental Hygiene for Beginners',
    excerpt: 'Brushing and flossing are just the start. Discover the complete guide to maintaining a perfect smile.',
    category: 'Dentistry',
    author: 'Dr. Lisa Ray',
    date: 'Nov 20, 2023',
    image: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 5,
    title: 'Nutrition myths you should ignore',
    excerpt: 'Stop believing everything you read online. We debunk common nutrition myths with scientific facts.',
    category: 'Wellness',
    author: 'Dr. Robert House',
    date: 'Dec 05, 2023',
    image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=800'
  },
  {
    id: 6,
    title: 'Managing Chronic Back Pain',
    excerpt: 'Chronic pain can be debilitating. Learn about non-surgical therapies and exercises that can bring relief.',
    category: 'Orthopedics',
    author: 'Dr. Alan Grant',
    date: 'Dec 12, 2023',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800'
  },
];

const BlogPage: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-slate-50 min-h-screen animate-fade-in-up">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-primary-600 font-semibold tracking-wide uppercase text-sm mb-2 block">Our Blog</span>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">Latest Health News & Articles</h1>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Stay informed with the latest medical insights, tips, and news from our team of expert doctors.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <div key={post.id} className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 flex flex-col h-full group">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-primary-700 uppercase tracking-wide">
                  {post.category}
                </div>
              </div>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-xs text-slate-400 mb-4 font-medium">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-3.5 h-3.5" />
                    {post.author}
                  </div>
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                  {post.excerpt}
                </p>
                
                <button className="flex items-center text-primary-600 font-bold text-sm hover:text-primary-800 transition-colors group/btn">
                  Read Article 
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
            <button className="px-8 py-3 rounded-full border border-slate-300 text-slate-600 font-bold hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all">
                Load More Articles
            </button>
        </div>

      </div>
    </div>
  );
};

export default BlogPage;
