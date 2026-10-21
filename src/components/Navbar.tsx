import React, { useState } from 'react';
import { ShoppingBag, Ruler, Menu, X, Flame, User as UserIcon, LogOut } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { cartCount, setIsCartOpen, setSizeFinderOpen } = useCart();
  const { user, profile, login, logout, loading: authLoading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  return (
    <header className="sticky top-[37px] z-40 bg-[#FFFDF9]/95 backdrop-blur-md border-b border-orange-200/60 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand wordmark (single line, vibrant badge) */}
        <a
          href="/"
          className="text-2xl font-black tracking-tight text-zinc-950 uppercase font-['Plus_Jakarta_Sans'] whitespace-nowrap shrink-0 hover:opacity-90 transition-opacity flex items-center gap-2.5"
        >
          <span>MILKY BOSS</span>
          <span className="text-[10px] tracking-wider text-white font-extrabold bg-gradient-to-r from-orange-600 to-amber-600 rounded-md px-2 py-0.5 shadow-xs flex items-center gap-1">
            <Flame className="w-2.5 h-2.5" />
            STREETWEAR
          </span>
        </a>

        {/* Zone 2: 4-5 concise single-line nav links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-bold text-zinc-700">
          <a
            href="#kollektion"
            className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0"
          >
            Kollektion
          </a>
          <button
            onClick={() => setSizeFinderOpen(true)}
            className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Ruler className="w-4 h-4 text-orange-600" />
            <span>Größen-Rechner</span>
          </button>
          <a
            href="#passform"
            className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0"
          >
            Passform & Ergonomie
          </a>
          <a
            href="#lookbook"
            className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0"
          >
            Lookbook
          </a>
          <a
            href="#bewertungen"
            className="hover:text-orange-600 transition-colors whitespace-nowrap shrink-0"
          >
            Bewertungen
          </a>
        </nav>

        {/* Zone 3: Primary action / Cart trigger with vibrant gradient */}
        <div className="flex items-center gap-3 shrink-0">
          {/* User Account / Google Sign-in */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-3 text-xs font-bold text-zinc-900 bg-white border border-zinc-200 hover:border-orange-400 rounded-xl transition-all cursor-pointer shadow-2xs"
                title="Mein Milky Boss Kundenkonto"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || 'Kunde'}
                    className="w-6 h-6 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-6 h-6 rounded-lg bg-orange-100 text-orange-700 flex items-center justify-center text-[10px] font-black">
                    {(user.displayName || user.email || 'U')[0].toUpperCase()}
                  </div>
                )}
                <span className="max-w-[80px] sm:max-w-[120px] truncate hidden md:inline">
                  {user.displayName?.split(' ')[0] || 'Konto'}
                </span>
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-zinc-200 p-3 z-50 text-xs space-y-2">
                  <div className="px-2 py-1.5 border-b border-zinc-100">
                    <p className="font-extrabold text-zinc-950 truncate">{user.displayName || 'Kunde'}</p>
                    <p className="text-[11px] text-zinc-500 truncate">{user.email}</p>
                    {profile?.dogBreed && (
                      <p className="text-[10px] text-orange-600 font-bold mt-1">
                        🐕 {profile.dogBreed} ({profile.dogSize})
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      setSizeFinderOpen(true);
                    }}
                    className="w-full text-left px-2 py-1.5 hover:bg-orange-50 hover:text-orange-700 rounded-lg font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <Ruler className="w-3.5 h-3.5 text-orange-600" />
                    <span>Hunde-Größenprofil</span>
                  </button>
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-2 py-1.5 hover:bg-red-50 text-red-600 rounded-lg font-bold flex items-center gap-2 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Abmelden</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={login}
              disabled={authLoading}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-bold text-zinc-700 hover:text-orange-600 bg-white hover:bg-orange-50/50 border border-zinc-200 hover:border-orange-300 rounded-xl transition-all cursor-pointer shadow-2xs whitespace-nowrap"
              title="Mit Google anmelden"
            >
              <UserIcon className="w-3.5 h-3.5 text-orange-600" />
              <span className="hidden sm:inline">Anmelden</span>
            </button>
          )}

          <button
            onClick={() => setIsCartOpen(true)}
            aria-label="Warenkorb öffnen"
            className="relative flex items-center gap-2 px-4 py-2.5 text-xs font-black text-zinc-950 bg-white border-2 border-zinc-200 hover:border-orange-500 rounded-xl hover:shadow-md transition-all whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-orange-600" />
            <span className="hidden sm:inline">Warenkorb</span>
            {cartCount > 0 && (
              <span className="inline-flex items-center justify-center px-1.5 py-0.5 text-[11px] font-black leading-none text-white bg-gradient-to-r from-orange-600 to-red-600 rounded-full tabular-nums shadow-xs">
                {cartCount}
              </span>
            )}
          </button>

          <a
            href="#kollektion"
            className="hidden sm:inline-flex items-center px-4 py-2.5 text-xs font-black text-white bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 rounded-xl shadow-md transition-all whitespace-nowrap shrink-0"
          >
            Jetzt shoppen
          </a>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-zinc-700 hover:text-zinc-950"
            aria-label="Menü öffnen"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FFFDF9] border-b border-orange-200 px-6 py-4 space-y-3 font-bold">
          <a
            href="#kollektion"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-zinc-800 py-1.5 hover:text-orange-600"
          >
            Kollektion
          </a>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setSizeFinderOpen(true);
            }}
            className="w-full text-left text-sm text-zinc-800 py-1.5 flex items-center gap-2 hover:text-orange-600"
          >
            <Ruler className="w-4 h-4 text-orange-600" />
            <span>Größen-Rechner</span>
          </button>
          <a
            href="#passform"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-zinc-800 py-1.5 hover:text-orange-600"
          >
            Passform & Ergonomie
          </a>
          <a
            href="#lookbook"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-zinc-800 py-1.5 hover:text-orange-600"
          >
            Community Lookbook
          </a>
          <a
            href="#bewertungen"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm text-zinc-800 py-1.5 hover:text-orange-600"
          >
            Bewertungen
          </a>
        </div>
      )}
    </header>
  );
};
