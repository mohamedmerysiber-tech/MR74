import React from 'react';
import { Film, ShieldCheck, Heart, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: 'marketing' | 'studio' | 'pricing' | 'admin') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-[#06070a] border-t border-white/10 text-xs text-slate-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-rose-600 to-amber-500 flex items-center justify-center text-white font-bold text-xs">
                神
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                KAMUI STUDIO
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              « Votre imagination en 4K. Créez des animés complets de A à Z, sans limite. »
            </p>
            <div className="text-[11px] text-slate-500 font-mono">
              Technologie d'animation neuronale inspirée de Tokyo & Makoto Shinkai.
            </div>
          </div>

          {/* Quick links */}
          <div className="space-y-2.5">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              Plateforme SaaS
            </div>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>
                <button onClick={() => onNavigate('studio')} className="hover:text-rose-400 transition-colors">
                  Studio 4K & Mode Privé
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('pricing')} className="hover:text-rose-400 transition-colors">
                  Abonnements & Multi-Devises
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('marketing')} className="hover:text-rose-400 transition-colors">
                  Importation Biométrique de Photos
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('admin')} className="hover:text-indigo-400 transition-colors">
                  Espace Financier Administrateur
                </button>
              </li>
            </ul>
          </div>

          {/* Infrastructure & Passerelles */}
          <div className="space-y-2.5">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              Paiements & Webhooks
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Zone FCFA (UEMOA / CEMAC) : Wave, Orange Money, MTN MoMo, Moov Africa via CinetPay & FedaPay.
            </p>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              International : Visa, Mastercard, Stripe & PayPal avec conversion en USD, EUR, JPY.
            </p>
          </div>

          {/* Propriété Intellectuelle */}
          <div className="space-y-2.5">
            <div className="text-white font-bold text-xs uppercase tracking-wider">
              100% Vos Droits d'Auteur
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Toutes les œuvres créées restent la propriété exclusive de leurs réalisateurs. Aucun partage de droits d'auteur, monétisation libre sur YouTube, Netflix, Crunchyroll et cinéma.
            </p>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} Kamui Studio Inc. Tous droits réservés.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Conditions Générales de Vente</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">Politique de Confidentialité</span>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">API Supabase & Runway / Kling Ready</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
