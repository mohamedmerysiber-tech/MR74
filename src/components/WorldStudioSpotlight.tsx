import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2,
  Tv,
  ArrowRight,
  Flame,
  Globe,
  Layers,
} from 'lucide-react';
import { StudioStyle } from '../types';

interface WorldStudioSpotlightProps {
  onSelectStudioStyle: (style: StudioStyle) => void;
  onOpenStudio: () => void;
}

export const WorldStudioSpotlight: React.FC<WorldStudioSpotlightProps> = ({
  onSelectStudioStyle,
  onOpenStudio,
}) => {
  const [activeSpotlight, setActiveSpotlight] = useState<'saitama' | 'miraculous' | 'bizarre' | 'donghua'>('saitama');
  const [isPlayingSpotlight, setIsPlayingSpotlight] = useState<boolean>(true);

  const spotlights = {
    saitama: {
      title: 'Studio Japonais · Style Saitama & Shōnen Extrême',
      subtitle: 'Coups de poing titanesques, ondes de choc cosmiques et déformations cinétiques',
      badge: 'JAPON · 52K ULTRA DYNAMIQUE',
      badgeColor: 'bg-rose-600 text-white',
      accentColor: 'from-amber-500 via-rose-600 to-red-600',
      description:
        'Recréez la puissance dévastatrice et l\'humour nonchalant de One Punch Man et des blockbusters de Tokyo (Ufotable, Madhouse, Mappa). Mouvements humains hyper-véloces et effets de particules multicolores.',
      image: '/src/assets/images/saitama_action_punch_1794039494040.jpg',
      studioStyle: 'japanese_saitama' as StudioStyle,
      stats: '60 FPS · 52K Super-Neural · Impact physique 100% réaliste',
    },
    miraculous: {
      title: 'Studio Français · Style Miraculous & Héroïsme Parisien',
      subtitle: 'Acrobaties félines sur les toits de Paris, fluidité des mouvements humains',
      badge: 'FRANCE · ANIMATION FRANÇAISE ÉLITE',
      badgeColor: 'bg-indigo-600 text-white',
      accentColor: 'from-indigo-500 via-purple-600 to-pink-500',
      description:
        'Inspiré des plus célèbres dessins animés français (Miraculous, Wakfu, Fortiche). Les personnages sautent, esquivent et courent sur les toits avec une grâce athlétique calquée sur des cascadeurs réels.',
      image: '/src/assets/images/french_anime_miraculous_1794039495735.jpg',
      studioStyle: 'french_miraculous' as StudioStyle,
      stats: 'Cinématique Européenne · Mouvements athlétiques 3D/2D hybrides',
    },
    bizarre: {
      title: 'Animaux Bizarres, Créatures Magiques & Familiers Féeriques',
      subtitle: 'Des bêtes fantastiques et animaux en mouvement perpétuel et expressif',
      badge: 'CRÉATURES & CHIMÈRES BIZARRES',
      badgeColor: 'bg-emerald-600 text-white',
      accentColor: 'from-emerald-500 via-teal-500 to-cyan-400',
      description:
        'Donnez vie à des bêtes bizarres : chats ailés violets, créatures champignons luminescentes, renards féeriques et chimères multicolores. L\'algorithme anime chaque aile, queue et regard avec tendresse et vivacité.',
      image: '/src/assets/images/bizarre_anime_creatures_1794039496795.jpg',
      studioStyle: 'bizarre_creatures' as StudioStyle,
      stats: 'Comportement animal réaliste · Mascottes et familiers vivants',
    },
    donghua: {
      title: 'Studio Chinois · Style Donghua & Bêtes Mythiques Célestes',
      subtitle: 'Dragons émeraude, soieries flottantes et montagnes sacrées volantes',
      badge: 'CHINE · DONGHUA SHANGHAI',
      badgeColor: 'bg-amber-600 text-black font-extrabold',
      accentColor: 'from-amber-400 via-emerald-600 to-teal-700',
      description:
        'La maestria des légendes orientales et du Donghua moderne. Combats d\'épées volantes, dragons ancestraux aux écailles irisées et palais taoïstes suspendus dans les nuées célestes.',
      image: '/src/assets/images/donghua_mythic_beast_1794039496200.jpg',
      studioStyle: 'chinese_donghua' as StudioStyle,
      stats: 'Fluidité d\'arts martiaux Wuxia · Bêtes célestes légendaires',
    },
  };

  const current = spotlights[activeSpotlight];

  return (
    <section className="py-16 lg:py-24 border-b border-white/10 relative overflow-hidden bg-gradient-to-b from-[#08090d] via-[#0f111a] to-[#08090d]">
      
      {/* Colorful neon ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-r from-rose-600/15 via-purple-600/15 to-cyan-500/15 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-amber-300 bg-amber-950/60 border border-amber-500/30 px-3.5 py-1 rounded-full mb-3 shadow-lg">
            <Tv className="w-3.5 h-3.5 text-amber-400" />
            <span>SPOTLIGHT MONDIAL · CINÉMA D'ANIMATION & CRÉATURES 52K</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance mb-4">
            Du style <span className="text-rose-400">Saitama</span> à l'animation <span className="text-cyan-400">française Miraculous</span> et animaux bizarres
          </h2>
          
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Kamui Studio intègre les algorithmes de mouvement des plus grands studios au monde : Japonais, Français, Chinois et Américain. Les personnages et les animaux bougent réellement comme des êtres vivants.
          </p>
        </div>

        {/* 4 Interactive Studio Showcase Tabs */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {[
            { id: 'saitama', name: '🇯🇵 Style Saitama One-Punch', tag: 'Action Titanesque' },
            { id: 'miraculous', name: '🇫🇷 Style Français Miraculous', tag: 'Acrobaties Urbaines' },
            { id: 'bizarre', name: '🐾 Animaux & Bêtes Bizarres', tag: 'Créatures Vivantes' },
            { id: 'donghua', name: '🇨🇳 Style Donghua Chinois', tag: 'Dragons & Mythologie' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveSpotlight(tab.id as any);
                setIsPlayingSpotlight(true);
              }}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                activeSpotlight === tab.id
                  ? 'border-rose-500 bg-gradient-to-br from-rose-950/60 to-slate-900 text-white shadow-xl shadow-rose-950/50 scale-[1.02]'
                  : 'border-white/10 bg-slate-900/40 text-slate-400 hover:border-white/20 hover:text-slate-200'
              }`}
            >
              <div className="text-xs font-extrabold text-white mb-0.5">{tab.name}</div>
              <div className="text-[10px] text-rose-300 font-mono">{tab.tag}</div>
            </button>
          ))}
        </div>

        {/* Spotlight Showcase Frame (Video & Story) */}
        <div className="rounded-3xl border border-white/15 bg-[#0b0e17] overflow-hidden shadow-2xl relative">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Visual Canvas (7 cols) */}
            <div className="lg:col-span-7 relative bg-black aspect-video lg:aspect-auto flex items-center justify-center overflow-hidden group">
              <img
                src={current.image}
                alt={current.title}
                referrerPolicy="no-referrer"
                className={`w-full h-full object-cover transition-transform duration-700 ${
                  isPlayingSpotlight ? 'scale-105 filter brightness-105' : 'scale-100'
                }`}
              />

              {/* Gradient scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

              {/* Top badges */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className={`px-2.5 py-1 rounded-md text-[11px] font-black uppercase tracking-wider ${current.badgeColor}`}>
                  {current.badge}
                </span>

                <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-amber-300 border border-amber-500/30 text-[10px] font-bold">
                  ⚡ RÉSOLUTION 52K NEURAL
                </span>
              </div>

              {/* Action play overlay button */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlayingSpotlight(!isPlayingSpotlight)}
                    className="p-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white shadow cursor-pointer transition-colors"
                  >
                    <Play className="w-4 h-4 fill-current" />
                  </button>
                  <span className="font-mono text-[11px] text-slate-300">
                    Aperçu Publicité Studio · Mouvements Humains Réels
                  </span>
                </div>

                <div className="text-[10px] font-mono text-emerald-400 bg-black/60 px-2 py-0.5 rounded border border-white/10">
                  {current.stats}
                </div>
              </div>

            </div>

            {/* Description & Feature Controls (5 cols) */}
            <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#101422] to-[#0b0e17]">
              
              <div>
                <div className="text-xs font-mono font-bold text-rose-400 mb-1 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>DÉMONSTRATION D'ANIMATION EN TEMPS RÉEL</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-2">
                  {current.title}
                </h3>

                <p className="text-xs text-amber-300 font-medium mb-4">
                  {current.subtitle}
                </p>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal mb-6">
                  {current.description}
                </p>

                {/* Key Points */}
                <div className="space-y-2.5 text-xs text-slate-300 mb-6">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Mouvements corporels réels : sauts, acrobaties, course et combats fluides</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Création par simple texte OU importation jusqu'à 50+ photos en lot</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>L'algorithme génère et ajuste automatiquement les personnages secondaires</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2 border-t border-white/10">
                <button
                  onClick={() => {
                    onSelectStudioStyle(current.studioStyle);
                    onOpenStudio();
                  }}
                  className={`w-full py-3 px-4 rounded-xl text-white font-extrabold text-xs shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r ${current.accentColor} hover:scale-[1.02]`}
                >
                  <Zap className="w-4 h-4" />
                  <span>Créer mon animé dans ce style ({current.title.split('·')[0]})</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
};
