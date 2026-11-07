import React, { useState } from 'react';
import { CURRENCIES, PRESET_COUNTRIES } from '../utils/currency';
import { CurrencyCode, GeolocationData, UserSubscription } from '../types';
import {
  Globe,
  Film,
  Sliders,
  CreditCard,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  ChevronDown,
  Lock,
} from 'lucide-react';

interface NavbarProps {
  currentGeo: GeolocationData;
  onSelectCountry: (geo: GeolocationData) => void;
  selectedCurrency: CurrencyCode;
  onSelectCurrency: (code: CurrencyCode) => void;
  activeTab: 'marketing' | 'studio' | 'pricing' | 'admin';
  setActiveTab: (tab: 'marketing' | 'studio' | 'pricing' | 'admin') => void;
  userSubscription: UserSubscription;
  onOpenCollabChat: () => void;
  unreadChatCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentGeo,
  onSelectCountry,
  selectedCurrency,
  onSelectCurrency,
  activeTab,
  setActiveTab,
  userSubscription,
  onOpenCollabChat,
  unreadChatCount,
}) => {
  const [geoDropdownOpen, setGeoDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08090d]/95 backdrop-blur-md border-b border-white/10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        
        {/* Zone 1: Single clean brand wordmark in display face */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setActiveTab('marketing')}
            className="flex items-center gap-2.5 text-left group cursor-pointer focus:outline-none"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-rose-600 via-red-600 to-amber-500 flex items-center justify-center shadow-lg shadow-rose-900/40 text-white font-bold text-sm tracking-wider">
              神
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-extrabold tracking-tight text-white group-hover:text-rose-400 transition-colors whitespace-nowrap">
                KAMUI STUDIO
              </span>
            </div>
          </button>
        </div>

        {/* Zone 2: 4–5 single-line clean nav links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('marketing')}
            className={`whitespace-nowrap transition-colors hover:text-white ${
              activeTab === 'marketing' ? 'text-white font-semibold' : 'text-slate-400'
            }`}
          >
            Accueil & Démo
          </button>
          <button
            onClick={() => setActiveTab('studio')}
            className={`whitespace-nowrap transition-colors hover:text-white flex items-center gap-1.5 ${
              activeTab === 'studio' ? 'text-rose-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <Film className="w-3.5 h-3.5" />
            Studio 52K & Mode Privé
          </button>
          <button
            onClick={() => setActiveTab('pricing')}
            className={`whitespace-nowrap transition-colors hover:text-white flex items-center gap-1.5 ${
              activeTab === 'pricing' ? 'text-amber-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5" />
            Abonnements & Multi-Devises
          </button>
          <button
            onClick={onOpenCollabChat}
            className="whitespace-nowrap transition-colors hover:text-white flex items-center gap-1.5 text-emerald-400 relative"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            Studio WhatsApp
            {unreadChatCount > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`whitespace-nowrap transition-colors hover:text-white flex items-center gap-1.5 ${
              activeTab === 'admin' ? 'text-indigo-400 font-semibold' : 'text-slate-400'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            Espace Administrateur
          </button>
        </nav>

        {/* Zone 3: 1 primary action cluster */}
        <div className="flex items-center gap-3 shrink-0">
          
          {/* Multi-currency & Geo Switcher */}
          <div className="relative">
            <button
              onClick={() => setGeoDropdownOpen(!geoDropdownOpen)}
              className="px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-white/10 flex items-center gap-2 transition-colors whitespace-nowrap cursor-pointer"
              title="Détection géographique et convertisseur multi-devises"
            >
              <span className="text-sm">{CURRENCIES[selectedCurrency]?.flag || '🌍'}</span>
              <span className="font-mono font-semibold text-rose-400">{selectedCurrency}</span>
              <span className="hidden sm:inline text-slate-400">({currentGeo.countryCode})</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {geoDropdownOpen && (
              <div className="absolute right-0 mt-2 w-72 rounded-xl bg-[#0f121b] border border-white/15 shadow-2xl p-3 z-50 text-xs">
                <div className="mb-2 pb-2 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-semibold text-white">
                    <Globe className="w-3.5 h-3.5 text-rose-400" />
                    Détection Géographique & Devise
                  </div>
                </div>

                <div className="space-y-1 mb-3">
                  <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1">
                    Tester un pays visiteur :
                  </div>
                  {Object.entries(PRESET_COUNTRIES).slice(0, 6).map(([code, geo]) => (
                    <button
                      key={code}
                      onClick={() => {
                        onSelectCountry(geo);
                        onSelectCurrency(geo.currency);
                        setGeoDropdownOpen(false);
                      }}
                      className={`w-full text-left px-2.5 py-1.5 rounded-lg flex items-center justify-between transition-colors ${
                        currentGeo.countryCode === code
                          ? 'bg-rose-950/60 text-white border border-rose-500/30'
                          : 'text-slate-300 hover:bg-slate-800/80'
                      }`}
                    >
                      <span className="flex items-center gap-2">
                        <span>{CURRENCIES[geo.currency]?.flag}</span>
                        <span>{geo.countryName}</span>
                      </span>
                      <span className="font-mono text-[11px] text-slate-400">
                        {geo.isCFAZone ? 'Zone FCFA fixe' : geo.currency}
                      </span>
                    </button>
                  ))}
                </div>

                <div className="pt-2 border-t border-white/10">
                  <div className="text-[11px] font-medium text-slate-400 uppercase tracking-wider mb-1.5">
                    Devise manuelle :
                  </div>
                  <div className="grid grid-cols-4 gap-1">
                    {Object.keys(CURRENCIES).map((cur) => (
                      <button
                        key={cur}
                        onClick={() => {
                          onSelectCurrency(cur as CurrencyCode);
                          setGeoDropdownOpen(false);
                        }}
                        className={`px-1.5 py-1 text-center font-mono rounded text-[11px] font-semibold transition-colors ${
                          selectedCurrency === cur
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {cur}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Status / Credits Pill */}
          <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 px-2.5 py-1.5 rounded-lg bg-slate-900/60 border border-white/5">
            {userSubscription.isPaid ? (
              <span className="flex items-center gap-1 text-amber-300 font-medium">
                <Sparkles className="w-3.5 h-3.5" />
                {userSubscription.tierName}
              </span>
            ) : (
              <span className="flex items-center gap-1 text-rose-300 font-medium">
                <span>{userSubscription.freeTrialCredits} essais gratuits</span>
                <span className="text-[10px] text-slate-400 font-normal">· Filigrane actif</span>
              </span>
            )}
          </div>

          {/* Primary Action Button */}
          <button
            onClick={() => setActiveTab('studio')}
            className="px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 rounded-lg shadow-lg shadow-rose-950/40 transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5" />
            Créer en 4K
          </button>
        </div>

      </div>

      {/* Mobile navigation row */}
      <div className="lg:hidden border-t border-white/5 bg-[#090b11] px-4 py-2 flex items-center justify-around text-xs">
        <button
          onClick={() => setActiveTab('marketing')}
          className={`px-2 py-1 ${activeTab === 'marketing' ? 'text-rose-400 font-bold' : 'text-slate-400'}`}
        >
          Accueil
        </button>
        <button
          onClick={() => setActiveTab('studio')}
          className={`px-2 py-1 ${activeTab === 'studio' ? 'text-rose-400 font-bold' : 'text-slate-400'}`}
        >
          Studio 4K
        </button>
        <button
          onClick={() => setActiveTab('pricing')}
          className={`px-2 py-1 ${activeTab === 'pricing' ? 'text-rose-400 font-bold' : 'text-slate-400'}`}
        >
          Tarifs
        </button>
        <button
          onClick={onOpenCollabChat}
          className="px-2 py-1 text-emerald-400 flex items-center gap-1"
        >
          WhatsApp
        </button>
        <button
          onClick={() => setActiveTab('admin')}
          className={`px-2 py-1 ${activeTab === 'admin' ? 'text-indigo-400 font-bold' : 'text-slate-400'}`}
        >
          Admin
        </button>
      </div>
    </header>
  );
};
