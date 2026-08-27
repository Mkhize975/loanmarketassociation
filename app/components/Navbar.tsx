import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Building2, Calendar, LayoutDashboard, Hotel, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);

  const handleScroll = () => {
    setSticky(window.scrollY > 10);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full transition-all duration-200 bg-white/95 backdrop-blur border-b ${
      isSticky ? 'border-slate-200 shadow-sm' : 'border-slate-100'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-sky-600 flex items-center justify-center text-white font-bold shadow-md shadow-sky-600/20 group-hover:bg-sky-700 transition-colors">
            <Building2 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-slate-900 text-base leading-tight">Loan Market Association</span>
            <span className="text-xs text-sky-600 font-medium">Hotel & Booking Hub</span>
          </div>
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/"
            className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Hotel className="w-4 h-4" />
            <span>Home</span>
          </Link>
          <Link
            href="/hotels"
            className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <span>Hotels</span>
          </Link>
          <Link
            href="/bookings"
            className="px-3.5 py-2 text-sm font-medium text-slate-600 hover:text-sky-600 hover:bg-sky-50 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <Calendar className="w-4 h-4" />
            <span>Bookings</span>
          </Link>
          <Link
            href="/admin/dashboard"
            className="px-3.5 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5"
          >
            <LayoutDashboard className="w-4 h-4" />
            <span>Admin</span>
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
