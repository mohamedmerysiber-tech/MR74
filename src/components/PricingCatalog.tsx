import React, { useState } from 'react';
import { SUBSCRIPTION_PLANS } from '../data/plans';
import { CURRENCIES, PRESET_COUNTRIES, formatCurrency, convertAmount } from '../utils/currency';
import { CurrencyCode, GeolocationData, PlanTier, UserSubscription } from '../types';
import {
  Check,
  Sparkles,
  Globe,
  Clock,
  ShieldCheck,
  Zap,
  ArrowRight,
  Flame,
  Layers,
  Crown,
  Repeat,
} from 'lucide-react';

interface PricingCatalogProps {
  currentGeo: GeolocationData;
  onSelectCountry: (geo: GeolocationData) => void;
  selectedCurrency: CurrencyCode;
  onSelectCurrency: (code: CurrencyCode) => void;
  onSelectPlan: (plan: PlanTier) => void;
  userSubscription: UserSubscription;
}

export const PricingCatalog: React.FC<PricingCatalogProps> = ({
  currentGeo,
  onSelectCountry,
  selectedCurrency,
  onSelectCurrency,
  onSelectPlan,
  userSubscription,
}) => {
  const [billingFilter, setBillingFilter] = useState<'all' | '1month' | 'bonus'>('all');

  const filteredPlans = SUBSCRIPTION_PLANS.filter((plan) => {
    if (billingFilter === '1month') return plan.billingMonths === 1;
    if (billingFilter === 'bonus') return plan.billingMonths > 1;
    return true;
  });

  return (
    <section className="py-12 lg:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header & Geolocation Status Bar */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-widest mb-3">
          <Globe className="w-3.5 h-3.5" />
          <span>SYSTÈME MULTI-DEVISES INTELLIGENT & GÉOLOCALISATION</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-4">
          Grille Tarifaire Internationale & Durées Bonus
        </h2>
        
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
          Prix en FCFA pour la Zone UEMOA / CEMAC, convertis automatiquement en temps réel pour l'Europe (€), l'Amérique ($), le Japon (¥) et l'international.
        </p>
      </div>

      {/* Geolocation Detection Banner & Universal Currency Switcher Bar */}
      <div className="mb-10 p-4 rounded-2xl bg-[#0f131f] border border-white/10 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* Geo Detection indicator */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 border border-white/10 flex items-center justify-center text-xl shrink-0">
            {CURRENCIES[currentGeo.currency]?.flag || '🌍'}
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center gap-2">
              <span>Votre position détectée : {currentGeo.countryName} ({currentGeo.city})</span>
              {currentGeo.isCFAZone && (
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/40 font-mono">
                  Zone Franc CFA (Tarif Fixe Garanti)
                </span>
              )}
            </div>
            <div className="text-[11px] text-slate-400">
              IP : {currentGeo.ip} · Devise par défaut : {currentGeo.currency} ({CURRENCIES[currentGeo.currency]?.name})
            </div>
          </div>
        </div>

        {/* Universal Manual Currency Selector in 1 Click */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-black/40 border border-white/10">
          <span className="text-[11px] font-semibold text-slate-400 px-2">Devise :</span>
          {(['XOF', 'USD', 'EUR', 'JPY', 'NGN', 'CAD', 'GBP'] as CurrencyCode[]).map((cur) => (
            <button
              key={cur}
              onClick={() => onSelectCurrency(cur)}
              className={`px-2.5 py-1 text-xs font-mono font-bold rounded-lg transition-all cursor-pointer ${
                selectedCurrency === cur
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {cur} ({CURRENCIES[cur].symbol})
            </button>
          ))}
        </div>

      </div>

      {/* Free Trial Highlight Box */}
      <div className="mb-12 p-6 rounded-2xl bg-gradient-to-r from-rose-950/40 via-purple-950/30 to-amber-950/30 border border-rose-500/30 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-rose-600 text-white font-mono font-bold text-xs uppercase tracking-wider">
              OFFRE DE BIENVENUE
            </span>
            <span className="text-xs font-bold text-amber-300">
              3 Essais Gratuits Inclus
            </span>
          </div>
          <h3 className="text-xl font-bold text-white">
            Commencez sans débourser un centime
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            Chaque nouveau créateur dispose de <strong>3 crédits de génération gratuits</strong>. Les vidéos générées en mode gratuit incluent un discret filigrane logo "Kamui Studio". Dès le passage à un pack payant, le logo disparaît totalement.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <div className="text-center sm:text-right px-4 py-2 bg-black/30 rounded-xl border border-white/5">
            <div className="text-xs text-slate-400">Solde actuel</div>
            <div className="text-lg font-bold text-rose-400 font-mono">
              {userSubscription.freeTrialCredits} Essais Restants
            </div>
          </div>
        </div>
      </div>

      {/* Filter Tabs for Duration (1 month vs 3/4 month bonus) */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <button
          onClick={() => setBillingFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            billingFilter === 'all'
              ? 'bg-white text-slate-900 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          Tous les 8 Packs ({SUBSCRIPTION_PLANS.length})
        </button>

        <button
          onClick={() => setBillingFilter('bonus')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
            billingFilter === 'bonus'
              ? 'bg-rose-600 text-white shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          <Crown className="w-3.5 h-3.5 text-amber-300" />
          Packs Professionnels (3 à 4 Mois Inclus)
        </button>

        <button
          onClick={() => setBillingFilter('1month')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            billingFilter === '1month'
              ? 'bg-white text-slate-900 shadow-md'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-white/10'
          }`}
        >
          Packs Mensuels Simples (1 Mois)
        </button>
      </div>

      {/* 8 Pricing Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredPlans.map((plan) => {
          const isUltime = plan.id === 'pack-studio-ultime';
          const isProOrExpert = plan.billingMonths === 3;
          const isCurrentActive = userSubscription.tierId === plan.id;

          return (
            <div
              key={plan.id}
              className={`rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                isUltime
                  ? 'bg-gradient-to-b from-[#1c121e] via-[#100e18] to-[#0a0a0f] border-2 border-amber-500/70 shadow-2xl shadow-amber-950/40 hover:-translate-y-1'
                  : plan.popular
                  ? 'bg-gradient-to-b from-[#181120] to-[#0d0f17] border border-rose-500/60 shadow-xl shadow-rose-950/30 hover:-translate-y-1'
                  : 'bg-[#0e111a] border border-white/10 hover:border-white/20'
              } p-5`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span
                    className={`px-3 py-1 rounded-full text-[10px] font-black tracking-wider uppercase shadow-md ${
                      isUltime
                        ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-black font-extrabold'
                        : 'bg-rose-600 text-white'
                    }`}
                  >
                    {plan.badge}
                  </span>
                </div>
              )}

              <div>
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-base font-bold text-white mb-1">{plan.name}</h3>
                  <p className="text-[11px] text-slate-400 leading-relaxed min-h-[34px]">
                    {plan.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="mb-5 pb-4 border-b border-white/10">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-2xl sm:text-3xl font-extrabold text-white font-mono tabular-nums">
                      {formatCurrency(plan.priceXOF, selectedCurrency)}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-1.5 mt-1 font-mono">
                    <Clock className="w-3 h-3 text-rose-400" />
                    <span>Validité : {plan.periodLabel}</span>
                  </div>

                  {/* Highlight Bonus Months Rules */}
                  {isProOrExpert && (
                    <div className="mt-2 px-2.5 py-1 rounded bg-rose-950/60 border border-rose-500/40 text-[10px] font-bold text-rose-300 flex items-center gap-1">
                      <Crown className="w-3 h-3 text-amber-400" />
                      3 mois d'utilisation inclus !
                    </div>
                  )}

                  {isUltime && (
                    <div className="mt-2 px-2.5 py-1 rounded bg-amber-950/60 border border-amber-500/40 text-[10px] font-black text-amber-300 flex items-center gap-1">
                      <Repeat className="w-3 h-3 text-amber-400" />
                      4 mois inclus avec rechargement automatique sans repayer
                    </div>
                  )}
                </div>

                {/* Specs */}
                <div className="space-y-1.5 mb-4 text-[11px]">
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Durée maximale :</span>
                    <span className="font-semibold text-white">{plan.maxDurationLabel}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Résolution :</span>
                    <span className="font-semibold text-rose-300">{plan.resolution}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-300">
                    <span className="text-slate-400">Filigrane :</span>
                    <span className="font-semibold text-emerald-400">Totalement retiré</span>
                  </div>
                </div>

                {/* Features List */}
                <div className="space-y-2 mb-6">
                  {plan.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] leading-snug">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div>
                <button
                  onClick={() => onSelectPlan(plan)}
                  disabled={isCurrentActive}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                    isCurrentActive
                      ? 'bg-slate-800 text-emerald-400 cursor-default'
                      : isUltime
                      ? 'bg-gradient-to-r from-amber-500 via-rose-600 to-amber-600 text-black font-extrabold hover:scale-[1.02] shadow-lg shadow-amber-950/40'
                      : plan.popular
                      ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-950/40 hover:scale-[1.02]'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border border-white/10'
                  }`}
                >
                  {isCurrentActive ? (
                    <span>Forfait Actif</span>
                  ) : (
                    <>
                      <span>Souscrire ce pack</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </>
                  )}
                </button>
              </div>

            </div>
          );
        })}
      </div>

      {/* Payment Security Footer */}
      <div className="mt-12 text-center text-xs text-slate-400 flex flex-wrap items-center justify-center gap-6">
        <span className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          Paiement sécurisé CinetPay / FedaPay (Wave, Orange Money, MTN, Moov)
        </span>
        <span>·</span>
        <span>Stripe & PayPal (Cartes Visa / Mastercard)</span>
        <span>·</span>
        <span>Activation immédiate & Solde déposé sans délai</span>
      </div>

    </section>
  );
};
