import React, { useState } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  Clock,
  Camera,
  MessageCircle,
  ShieldCheck,
  Maximize2,
  Volume2,
  VolumeX,
  Flame,
  CheckCircle2,
} from 'lucide-react';

interface HeroSectionProps {
  onStartFreeTrial: () => void;
  onExploreStudio: () => void;
  onOpenPricing: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartFreeTrial,
  onExploreStudio,
  onOpenPricing,
}) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [activePlaybackTime, setActivePlaybackTime] = useState('00:04:18');

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-white/10">
      {/* Background ambient lighting - Tokyo Studio vibes */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-gradient-to-b from-rose-950/20 via-red-900/10 to-transparent pointer-events-none blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Slogan Kicker */}
        <div className="flex items-center gap-2 text-xs font-semibold text-rose-400 uppercase tracking-widest mb-4">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          <span>KAMUI STUDIO · VOTRE IMAGINATION EN 4K</span>
          <span aria-hidden="true" className="text-white/30">/</span>
          <span className="text-slate-400">CRÉEZ DES ANIMÉS COMPLETS DE A À Z, SANS LIMITE</span>
        </div>

        {/* 2-Column Split: Headline & Value Proposition on Left, Live 4K Anime Player on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          
          {/* Left Column (lg:col-span-6): Hero Prose & CTAs */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-[1.15] text-balance mb-6">
              Créez votre propre <span className="bg-gradient-to-r from-rose-400 via-red-300 to-amber-300 bg-clip-text text-transparent">animé japonais en 4K</span> de A à Z.
            </h1>

            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-normal mb-8 max-w-xl">
              Transformez vos idées, vos scénarios et vos propres photos en véritables films d'animation. De 1 seconde à 10 heures de vidéo fluide, avec des personnages qui parlent et bougent comme dans les plus grands studios de Tokyo.
            </p>

            {/* Main Action Cluster */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-4">
              <button
                onClick={onStartFreeTrial}
                className="px-6 py-3.5 text-sm font-bold text-white bg-gradient-to-r from-rose-600 via-red-600 to-rose-700 hover:from-rose-500 hover:to-red-500 rounded-xl shadow-xl shadow-rose-950/50 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>Commencer mes 3 essais gratuits</span>
              </button>

              <button
                onClick={onExploreStudio}
                className="px-5 py-3.5 text-sm font-semibold text-slate-200 bg-slate-900/80 hover:bg-slate-800 border border-white/10 hover:border-white/20 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Ouvrir le Studio 4K</span>
              </button>
            </div>

            {/* Reassurance text */}
            <div className="flex items-center gap-3 text-xs text-slate-400 mb-8">
              <span className="flex items-center gap-1 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Aucune carte bancaire requise
              </span>
              <span>·</span>
              <span>Export 4K instantané</span>
              <span>·</span>
              <span>Propriété 100% garantie</span>
            </div>

            {/* 4 Key Arguments requested by user */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-6 border-t border-white/10">
              
              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-rose-950/80 border border-rose-800/40 flex items-center justify-center text-rose-400 shrink-0">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">Durée 100 % sur-mesure</div>
                  <div className="text-[11px] text-slate-400 leading-snug">
                    De 1 seconde à 10 heures réglées à la minute près selon votre scénario.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Camera className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">Vos photos prennent vie</div>
                  <div className="text-[11px] text-slate-400 leading-snug">
                    Importation de visages, croquis et décors convertis en style manga animé.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800/40 flex items-center justify-center text-emerald-400 shrink-0">
                  <MessageCircle className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">Studio collaboratif intégré</div>
                  <div className="text-[11px] text-slate-400 leading-snug">
                    Messagerie instantanée façon WhatsApp pour co-réaliser vos œuvres.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <div className="w-8 h-8 rounded-lg bg-indigo-950/80 border border-indigo-800/40 flex items-center justify-center text-indigo-400 shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white mb-0.5">100 % vos droits d'auteur</div>
                  <div className="text-[11px] text-slate-400 leading-snug">
                    Les créateurs restent propriétaires exclusifs et libres de monétiser.
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column (lg:col-span-6): Live Cinematic Anime Player Canvas */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-[#0e111a] shadow-2xl shadow-rose-950/30 group">
              
              {/* Media viewport container with 16:9 ratio */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <img
                  src="/src/assets/images/hero_anime_cinematic_1794038385032.jpg"
                  alt="Kamui Studio 4K Anime Cinematic Scene Tokyo Shibuya Rooftop"
                  referrerPolicy="no-referrer"
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isPlaying ? 'scale-105 filter brightness-105' : 'scale-100 filter brightness-95'
                  }`}
                />

                {/* Subtle dark gradient overlay for text legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/30 pointer-events-none" />

                {/* Top Badges */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-bold tracking-wider">
                      4K CINEMA MASTER
                    </span>
                    <span className="px-2 py-0.5 rounded bg-black/60 text-slate-200 backdrop-blur-sm border border-white/10">
                      60 FPS · HDR
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 px-2 py-0.5 rounded bg-black/60 text-amber-300 backdrop-blur-sm border border-white/10">
                    <Flame className="w-3.5 h-3.5 text-amber-400" />
                    <span>LIP-SYNC ACTIF</span>
                  </div>
                </div>

                {/* Animated Character Talking Simulation Banner */}
                {isPlaying && (
                  <div className="absolute bottom-16 left-3.5 right-3.5 p-3 rounded-xl bg-black/70 backdrop-blur-md border border-white/10 text-white text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-rose-300">Ren Takahashi (Voix Studio Japonaise)</span>
                      <span className="text-[10px] text-slate-400 font-mono">Audio Master 24-bit / 96kHz</span>
                    </div>
                    <p className="text-slate-200 italic font-medium leading-relaxed">
                      « De Tokyo à Abidjan, nos histoires n'ont plus de frontières. Kamui Studio donne vie à chaque souffle en 4K. »
                    </p>
                    {/* Simulated Voice wave */}
                    <div className="flex items-center gap-0.5 mt-2 h-2.5">
                      {[12, 24, 18, 30, 26, 14, 28, 20, 10, 22, 32, 16, 24, 14, 28, 12].map((height, i) => (
                        <div
                          key={i}
                          className="w-1 bg-gradient-to-t from-rose-500 to-amber-300 rounded-full animate-pulse"
                          style={{
                            height: `${(height / 32) * 100}%`,
                            animationDelay: `${i * 60}ms`,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {/* Video Bottom Control Bar */}
                <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/95 to-black/60 backdrop-blur-sm border-t border-white/10 flex items-center justify-between gap-3 text-xs text-white">
                  
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors cursor-pointer"
                      title={isPlaying ? 'Pause' : 'Lecture'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                    </button>

                    <button
                      onClick={() => setIsMuted(!isMuted)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors cursor-pointer"
                      title={isMuted ? 'Activer le son' : 'Couper le son'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    <span className="font-mono text-[11px] text-slate-300 tabular-nums">
                      {activePlaybackTime} / 02:45:00
                    </span>
                  </div>

                  {/* Scrubber track */}
                  <div className="flex-1 mx-2 h-1 bg-white/20 rounded-full overflow-hidden cursor-pointer">
                    <div className="h-full bg-rose-500 w-[42%] relative">
                      <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white shadow" />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="hidden sm:inline font-mono text-[10px] text-slate-400">
                      MOUVEMENT HUMAIN FLUIDE
                    </span>
                    <button
                      onClick={onExploreStudio}
                      className="text-slate-300 hover:text-white p-1"
                      title="Ouvrir dans le Studio"
                    >
                      <Maximize2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>

              </div>

              {/* Card Footer note */}
              <div className="p-3.5 bg-[#090b11] border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-slate-300 font-medium">Moteur IA Tokyo Shinkai 4K opérationnel</span>
                </div>
                <button
                  onClick={onExploreStudio}
                  className="text-rose-400 hover:text-rose-300 font-semibold transition-colors flex items-center gap-1"
                >
                  Tester ce rendu dans l'éditeur &rarr;
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
