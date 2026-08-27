import React, { useState } from 'react';
import Link from 'next/link';
import { 
  UtensilsCrossed, 
  CalendarDays, 
  Award, 
  Phone, 
  MapPin, 
  Menu as MenuIcon, 
  X, 
  User, 
  ChevronDown,
  Sparkles,
  ExternalLink
} from 'lucide-react';

interface SunHeaderProps {
  activeTab?: string;
  onOpenReservation?: (restaurantId?: number) => void;
  onViewReservations?: () => void;
  reservationCount?: number;
}

export default function SunHeader({
  activeTab = 'restaurants',
  onOpenReservation,
  onViewReservations,
  reservationCount = 0,
}: SunHeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMySunModal, setShowMySunModal] = useState(false);
  const [mvgMemberTier, setMvgMemberTier] = useState<string>('Guest');

  return (
    <header className="w-full bg-white shadow-sm border-b border-sunstone-200 sticky top-0 z-40">
      {/* Top Utility Bar */}
      <div className="bg-sunblue-500 text-white text-xs py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-sungold-300 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-sungold-400" />
              Sun MVG Loyalty: Dine & Save up to 20%
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-sunstone-300">
              <Phone className="w-3.5 h-3.5" />
              Resort Concierge: +27 (0)14 557 1000
            </span>
            <span className="hidden lg:flex items-center gap-1.5 text-sunstone-300">
              <MapPin className="w-3.5 h-3.5" />
              Sun City Resort, North West Province, South Africa
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <button
              onClick={() => setShowMySunModal(true)}
              className="flex items-center gap-1.5 text-slate-200 hover:text-white hover:underline transition-colors"
            >
              <User className="w-3.5 h-3.5 text-sungold-300" />
              <span>MySun {mvgMemberTier !== 'Guest' ? `(${mvgMemberTier})` : 'Sign In'}</span>
            </button>

            {onViewReservations && (
              <button
                onClick={onViewReservations}
                className="flex items-center gap-1.5 bg-sunblue-600 hover:bg-sunblue-700 text-sungold-300 px-2.5 py-1 rounded text-xs font-semibold border border-sungold-500/40 transition-colors"
              >
                <CalendarDays className="w-3.5 h-3.5" />
                <span>My Bookings</span>
                {reservationCount > 0 && (
                  <span className="bg-sungold-500 text-sunblue-900 px-1.5 py-0.2 text-[10px] font-bold rounded-full ml-0.5">
                    {reservationCount}
                  </span>
                )}
              </button>
            )}

            <button
              onClick={() => onOpenReservation && onOpenReservation()}
              className="bg-sungold-500 hover:bg-sungold-600 text-sunblue-900 px-3 py-1 rounded text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              Book A Table
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Navigation Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
        {/* Sun International Brand Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="flex flex-col">
            <div className="flex items-baseline gap-1.5">
              <span className="font-serif italic text-2xl sm:text-3xl font-extrabold text-sungold-500 tracking-tight leading-none group-hover:text-sungold-600 transition-colors">
                Sun
              </span>
              <span className="text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-sunblue-500 leading-none">
                International
              </span>
            </div>
            <div className="flex items-center gap-1 mt-0.5">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.18em] text-sunstone-600 uppercase">
                Sun City Resort
              </span>
              <span className="text-[9px] text-sungold-600 bg-sungold-100 px-1.5 py-0.2 rounded font-semibold uppercase tracking-wider">
                Restaurants
              </span>
            </div>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
          <Link
            href="/"
            className="px-3 py-2 text-xs font-bold tracking-wider uppercase text-sunblue-500 border-b-2 border-sungold-500 text-sungold-600 transition-colors"
          >
            Restaurants & Dining
          </Link>
          <a
            href="#the-palace"
            className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-slate-700 hover:text-sungold-600 hover:bg-sunstone-100/50 rounded transition-colors"
          >
            The Palace Dining
          </a>
          <a
            href="#cascades-soho"
            className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-slate-700 hover:text-sungold-600 hover:bg-sunstone-100/50 rounded transition-colors"
          >
            Cascades & Soho
          </a>
          <a
            href="#sun-central"
            className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-slate-700 hover:text-sungold-600 hover:bg-sunstone-100/50 rounded transition-colors"
          >
            Sun Central
          </a>
          <a
            href="#mvg-rewards"
            className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-slate-700 hover:text-sungold-600 hover:bg-sunstone-100/50 rounded transition-colors"
          >
            MVG Rewards
          </a>
          <a
            href="#halaal-guide"
            className="px-3 py-2 text-xs font-semibold tracking-wider uppercase text-slate-700 hover:text-sungold-600 hover:bg-sunstone-100/50 rounded transition-colors"
          >
            Halaal Guide
          </a>
        </nav>

        {/* Header Right Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onOpenReservation && onOpenReservation()}
            className="hidden sm:inline-flex items-center gap-2 bg-sunblue-500 hover:bg-sunblue-600 text-white px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm transition-all border border-sungold-500/30"
          >
            <UtensilsCrossed className="w-3.5 h-3.5 text-sungold-400" />
            <span>Reserve Table</span>
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-sunblue-500 hover:bg-sunstone-100 rounded-md focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <MenuIcon className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-sunstone-200 px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <div className="space-y-1">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-bold text-sungold-600 bg-sungold-50 uppercase tracking-wider"
            >
              Restaurants & Dining (Active)
            </Link>
            <a
              href="#the-palace"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-sunstone-100"
            >
              The Palace of the Lost City Dining
            </a>
            <a
              href="#cascades-soho"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-sunstone-100"
            >
              Cascades Hotel & Soho Dining
            </a>
            <a
              href="#sun-central"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-sunstone-100"
            >
              Sun Central Entertainment Eateries
            </a>
            <a
              href="#mvg-rewards"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-sunstone-100"
            >
              Sun MVG Loyalty Discounts
            </a>
            <a
              href="#halaal-guide"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-md text-sm font-medium text-slate-700 hover:bg-sunstone-100"
            >
              Certified Halaal & Special Dietary
            </a>
          </div>

          <div className="pt-4 border-t border-sunstone-200 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenReservation) onOpenReservation();
              }}
              className="w-full bg-sungold-500 hover:bg-sungold-600 text-sunblue-900 py-2.5 rounded-md text-sm font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm"
            >
              <UtensilsCrossed className="w-4 h-4" />
              <span>Reserve A Table</span>
            </button>

            {onViewReservations && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onViewReservations();
                }}
                className="w-full bg-sunblue-500 hover:bg-sunblue-600 text-white py-2.5 rounded-md text-sm font-semibold flex items-center justify-center gap-2"
              >
                <CalendarDays className="w-4 h-4 text-sungold-400" />
                <span>My Bookings ({reservationCount})</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* MySun Account & MVG Member Modal */}
      {showMySunModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-2xl border border-sungold-200 relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => setShowMySunModal(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-sunblue-500 text-sungold-400 flex items-center justify-center font-bold">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-sunblue-500 font-serif-luxury">MySun & MVG Rewards</h3>
                <p className="text-xs text-slate-500">Access your loyalty dining discounts & reservations</p>
              </div>
            </div>

            <div className="bg-sunstone-50 border border-sunstone-200 rounded-lg p-4 mb-4">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Select Your Sun MVG Tier
              </label>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { tier: 'Turquoise', discount: '10% Dining Discount', color: 'border-cyan-600 text-cyan-800 bg-cyan-50' },
                  { tier: 'Silver', discount: '12.5% Dining Discount', color: 'border-slate-400 text-slate-700 bg-slate-100' },
                  { tier: 'Gold', discount: '15% Dining Discount', color: 'border-amber-500 text-amber-800 bg-amber-50' },
                  { tier: 'Platinum', discount: '17.5% Dining Discount', color: 'border-indigo-600 text-indigo-900 bg-indigo-50' },
                  { tier: 'Diamond', discount: '20% Dining Discount', color: 'border-sungold-500 text-sungold-800 bg-sungold-50' },
                  { tier: 'Guest', discount: 'Non-Member Rate', color: 'border-slate-300 text-slate-600 bg-white' },
                ].map((item) => (
                  <button
                    key={item.tier}
                    onClick={() => {
                      setMvgMemberTier(item.tier);
                    }}
                    className={`p-2.5 rounded-md border text-left text-xs transition-all ${
                      mvgMemberTier === item.tier
                        ? 'ring-2 ring-sungold-500 border-sungold-600 font-bold'
                        : 'border-slate-200 hover:border-slate-300'
                    } ${item.color}`}
                  >
                    <div className="font-bold flex items-center justify-between">
                      <span>{item.tier}</span>
                      {mvgMemberTier === item.tier && <span className="text-[10px] text-sungold-700 font-bold">✓ Active</span>}
                    </div>
                    <div className="text-[10px] opacity-80 mt-0.5">{item.discount}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs text-slate-500 space-y-2 mb-5">
              <p className="flex items-center gap-1.5 text-slate-700">
                <Sparkles className="w-3.5 h-3.5 text-sungold-500" />
                <span>Your MVG tier will automatically apply discounts on table reservations.</span>
              </p>
            </div>

            <button
              onClick={() => setShowMySunModal(false)}
              className="w-full bg-sunblue-500 hover:bg-sunblue-600 text-white font-bold py-2.5 rounded-lg text-xs uppercase tracking-wider transition-colors"
            >
              Continue Browsing as {mvgMemberTier}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
