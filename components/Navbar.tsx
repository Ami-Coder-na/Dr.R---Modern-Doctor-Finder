
import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Stethoscope, ShoppingCart, Bell, Smartphone, Search, User, LogOut, Settings, Calendar, CheckCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

interface NavbarProps {
  onNavigate: (page: 'home' | 'doctors' | 'user-profile' | 'medicine' | 'services' | 'blog' | 'about' | 'contact' | 'checkout') => void;
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, onLoginClick }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Profile Menu State
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Notification State
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  const { user, isAuthenticated, logout } = useAuth();
  const { cartCount } = useCart();

  // Mock Notifications
  const notifications = [
    {
      id: 1,
      title: 'Appointment Reminder',
      message: 'Upcoming visit with Dr. Sarah Smith tomorrow at 10:00 AM.',
      time: '1 hour ago',
      type: 'reminder',
      read: false
    },
    {
      id: 2,
      title: 'Booking Confirmed',
      message: 'Your appointment with Dr. Michael Brown is confirmed.',
      time: '2 days ago',
      type: 'success',
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    
    // Click outside handler for menus
    const handleClickOutside = (event: MouseEvent) => {
        if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
            setShowProfileMenu(false);
        }
        if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
            setShowNotifications(false);
        }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
        window.removeEventListener('scroll', handleScroll);
        document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const navClasses = `fixed top-0 w-full z-50 transition-all duration-300 ${
    isScrolled || isOpen 
      ? 'bg-white/90 backdrop-blur-lg border-b border-slate-100 shadow-sm py-3' 
      : 'bg-transparent py-5'
  }`;

  const navLinks = [
    { name: 'Home', action: () => onNavigate('home') },
    { name: 'Find Doctors', action: () => onNavigate('doctors') },
    { name: 'Medicine', action: () => onNavigate('medicine') },
    { name: 'Services', action: () => onNavigate('services') },
    { name: 'Blog', action: () => onNavigate('blog') },
    { name: 'About Us', action: () => onNavigate('about') },
    { name: 'Contact', action: () => onNavigate('contact') },
  ];

  const handleLogout = () => {
      logout();
      setShowProfileMenu(false);
      onNavigate('home');
  }

  return (
    <nav className={navClasses}>
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-12">
          
          {/* Logo */}
          <div className="flex items-center cursor-pointer flex-shrink-0" onClick={() => onNavigate('home')}>
            <div className="bg-gradient-to-br from-primary-500 to-primary-600 p-2 rounded-xl mr-2.5 shadow-lg shadow-primary-500/20">
              <Stethoscope className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Dr.<span className="text-primary-600">R</span>
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden xl:flex items-center space-x-7">
            {navLinks.map((link) => (
              <button 
                key={link.name}
                onClick={link.action}
                className="text-slate-600 hover:text-primary-600 font-medium text-[15px] transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Icons Group */}
            <div className="flex items-center gap-3 pr-4 border-r border-slate-200">
              <button 
                onClick={() => onNavigate('checkout')}
                className="text-slate-500 hover:text-primary-600 transition-colors p-1.5 hover:bg-slate-50 rounded-full relative group"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                    <span className="absolute top-1 right-1 h-2 w-2 bg-rose-500 rounded-full border border-white animate-bounce"></span>
                )}
              </button>
              
              {/* Notifications Dropdown */}
              <div className="relative" ref={notificationRef}>
                  <button 
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="text-slate-500 hover:text-primary-600 transition-colors p-1.5 hover:bg-slate-50 rounded-full relative"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadCount > 0 && (
                        <span className="absolute top-1.5 right-2 h-2 w-2 bg-primary-500 rounded-full animate-pulse"></span>
                    )}
                  </button>

                  {showNotifications && (
                      <div className="absolute right-0 top-full mt-3 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in origin-top-right z-50">
                          <div className="p-4 border-b border-slate-100 bg-slate-50 flex justify-between items-center">
                              <h3 className="font-bold text-slate-900 text-sm">Notifications</h3>
                              <span className="text-xs text-primary-600 font-semibold cursor-pointer hover:underline">Mark all as read</span>
                          </div>
                          <div className="max-h-64 overflow-y-auto">
                              {notifications.map((notif) => (
                                  <div key={notif.id} className={`p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors ${!notif.read ? 'bg-blue-50/50' : ''}`}>
                                      <div className="flex gap-3">
                                          <div className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${notif.type === 'reminder' ? 'bg-yellow-100 text-yellow-600' : 'bg-green-100 text-green-600'}`}>
                                              {notif.type === 'reminder' ? <Calendar className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                                          </div>
                                          <div>
                                              <p className="text-sm font-semibold text-slate-900">{notif.title}</p>
                                              <p className="text-xs text-slate-500 mt-1 leading-relaxed">{notif.message}</p>
                                              <p className="text-[10px] text-slate-400 mt-2">{notif.time}</p>
                                          </div>
                                      </div>
                                  </div>
                              ))}
                          </div>
                          <div className="p-2 text-center border-t border-slate-100">
                              <button className="text-xs font-bold text-slate-500 hover:text-primary-600 py-1">View All Notifications</button>
                          </div>
                      </div>
                  )}
              </div>
            </div>

            {/* Buttons Group */}
            <div className="flex items-center gap-3">
              <button className="hidden lg:flex items-center text-slate-700 hover:text-primary-600 font-semibold text-sm transition-colors px-3 py-2 rounded-lg hover:bg-slate-50">
                <Smartphone className="h-4 w-4 mr-2" />
                Download App
              </button>
              
              {isAuthenticated && user ? (
                  // Logged In State - User Profile Dropdown
                  <div className="relative" ref={profileMenuRef}>
                      <button 
                        onClick={() => setShowProfileMenu(!showProfileMenu)}
                        className="flex items-center gap-3 bg-white border border-slate-200 pl-2 pr-4 py-1.5 rounded-full hover:shadow-md transition-all"
                      >
                          <img 
                            src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}`} 
                            alt={user.name} 
                            className="w-8 h-8 rounded-full object-cover bg-slate-100" 
                          />
                          <span className="text-sm font-bold text-slate-700 max-w-[100px] truncate">{user.name.split(' ')[0]}</span>
                      </button>

                      {/* Dropdown Menu */}
                      {showProfileMenu && (
                          <div className="absolute right-0 top-full mt-3 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in origin-top-right z-50">
                              <div className="p-4 border-b border-slate-100 bg-slate-50">
                                  <p className="text-sm font-bold text-slate-900">{user.name}</p>
                                  <p className="text-xs text-slate-500 truncate">{user.email}</p>
                              </div>
                              <div className="p-2">
                                  <button 
                                    onClick={() => { onNavigate('user-profile'); setShowProfileMenu(false); }}
                                    className="w-full flex items-center px-3 py-2 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors"
                                  >
                                      <User className="w-4 h-4 mr-3" />
                                      My Profile
                                  </button>
                                  <button className="w-full flex items-center px-3 py-2 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-700 rounded-lg transition-colors">
                                      <Settings className="w-4 h-4 mr-3" />
                                      Settings
                                  </button>
                                  <div className="h-px bg-slate-100 my-1"></div>
                                  <button 
                                    onClick={handleLogout}
                                    className="w-full flex items-center px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                                  >
                                      <LogOut className="w-4 h-4 mr-3" />
                                      Sign Out
                                  </button>
                              </div>
                          </div>
                      )}
                  </div>
              ) : (
                  // Logged Out State - Login Button
                  <button 
                    onClick={onLoginClick}
                    className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 flex items-center"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login / Sign Up
                  </button>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
                onClick={() => onNavigate('checkout')}
                className="text-slate-600 relative"
            >
               <ShoppingCart className="h-6 w-6" />
               {cartCount > 0 && (
                   <span className="absolute -top-1 -right-1 h-2.5 w-2.5 bg-rose-500 rounded-full border-2 border-white"></span>
               )}
            </button>
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-800 focus:outline-none p-1 rounded-lg hover:bg-slate-100 transition-colors">
              {isOpen ? <X className="h-7 w-7" /> : <Menu className="h-7 w-7" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 absolute w-full top-full left-0 shadow-2xl overflow-hidden animate-fade-in-up h-screen">
          <div className="px-4 py-6 space-y-2 max-h-[85vh] overflow-y-auto">
            
            {/* Mobile Search */}
            <div className="relative mb-6">
                <input 
                    type="text" 
                    placeholder="Search doctors, medicines..." 
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500"
                />
                <Search className="absolute left-4 top-3.5 h-4 w-4 text-slate-400" />
            </div>

            <div className="space-y-1">
                {navLinks.map((link) => (
                <button 
                    key={link.name}
                    onClick={() => { link.action(); setIsOpen(false); }}
                    className="flex w-full items-center justify-between px-4 py-3.5 rounded-xl text-[15px] font-medium text-slate-600 hover:text-primary-700 hover:bg-primary-50/80 transition-all"
                >
                    {link.name}
                </button>
                ))}
            </div>

            <div className="border-t border-slate-100 my-4 pt-4 space-y-3">
                {isAuthenticated && user ? (
                    <div className="bg-slate-50 p-4 rounded-xl mb-4">
                        <div className="flex items-center gap-3 mb-3">
                             <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full" />
                             <div>
                                 <p className="font-bold text-slate-900">{user.name}</p>
                                 <p className="text-xs text-slate-500">{user.email}</p>
                             </div>
                        </div>
                        <button 
                            onClick={() => { onNavigate('user-profile'); setIsOpen(false); }}
                            className="w-full bg-white border border-slate-200 text-slate-700 py-2 rounded-lg font-medium text-sm mb-2"
                        >
                            View Profile
                        </button>
                        <button 
                            onClick={() => { handleLogout(); setIsOpen(false); }}
                            className="w-full bg-rose-50 text-rose-600 py-2 rounded-lg font-medium text-sm"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <button 
                        onClick={() => { onLoginClick(); setIsOpen(false); }}
                        className="flex w-full items-center justify-center px-4 py-3 rounded-xl text-sm font-bold text-white bg-primary-600 hover:bg-primary-700 shadow-lg shadow-primary-500/20 transition-all"
                    >
                        Login / Register
                    </button>
                )}
                
                <button className="flex w-full items-center justify-center px-4 py-3 rounded-xl text-sm font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors">
                    <Smartphone className="h-4 w-4 mr-2" />
                    Download App
                </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
