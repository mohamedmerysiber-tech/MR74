import React, { useState } from 'react';
import {
  Sparkles,
  Zap,
  Globe,
  Film,
  Crown,
  Play,
  Volume2,
  CheckCircle2,
  ArrowRight,
  Flame,
  Feather,
  Smile,
  ShieldAlert,
  Compass,
} from 'lucide-react';
import { StudioStyle, TargetAudience, SupernaturalMotion } from '../types';

interface FamousStudioPipelineProps {
  onApplyPipelinePreset: (preset: {
    studioStyle: StudioStyle;
    targetAudience: TargetAudience;
    promptText: string;
    supernaturalMotion: SupernaturalMotion;
    isTalkingAnimal: boolean;
  }) => void;
  onOpenStudio: () => void;
}

export const FamousStudioPipeline: React.FC<FamousStudioPipelineProps> = ({
  onApplyPipelinePreset,
  onOpenStudio,
}) => {
  const [selectedStudio, setSelectedStudio] = useState<'disney_pixar' | 'ghibli' | 'ufotable_mappa' | 'lightchaser'>('disney_pixar');
  const [selectedAudience, setSelectedAudience] = useState<TargetAudience>('kids_family');
  const [selectedMotion, setSelectedMotion] = useState<SupernaturalMotion>('talking_speech');
  const [talkingAnimalEnabled, setTalkingAnimalEnabled] = useState<boolean>(true);

  const studioPresets = {
    disney_pixar: {
      name: 'Disney & DreamWorks Animation (USA)',
      sub: 'Spécialiste mondial des animaux qui parlent & animés pour enfants et famille',
      badge: 'STUDIO AMÉRICAIN HAUT DE GAMME',
      badgeColor: 'bg-amber-500 text-black font-extrabold',
      image: '/src/assets/images/pixar_disney_talking_beast_1794041150694.jpg',
      defaultAudience: 'kids_family' as TargetAudience,
      supernaturalFeature: 'Magie dorée scintillante, télépathie faciale et expressivité corporelle 3D',
      dialogueSample: '« Bonjour les amis ! Avec mes ailes et mon sourire magique, chaque rêve devient réalité ! »',
      studioStyle: 'disney_pixar_talking_animal' as StudioStyle,
      defaultMotion: 'talking_speech' as SupernaturalMotion,
      description:
        'Copie fidelement la méthode de production des plus grands studios américains : études biomécaniques des félins et mammifères, synchronisation labiale avancée sur gueule animale, et textures de fourrure ultra-détaillées.',
      accent: 'from-amber-500 via-orange-500 to-rose-600',
    },
    ghibli: {
      name: 'Studio Ghibli (Miyazaki · Japon)',
      sub: 'Poésie féerique, esprits protecteurs et animaux sacrés de la forêt',
      badge: 'LÉGENDE JAPONAISE · GHIBLI',
      badgeColor: 'bg-emerald-600 text-white font-extrabold',
      image: '/src/assets/images/ghibli_mythic_animal_1794041150854.jpg',
      defaultAudience: 'kids_family' as TargetAudience,
      supernaturalFeature: 'Floraison spontanée, communion avec les esprits de suie et paix céleste',
      dialogueSample: '« Le vent murmure les secrets des anciens... Respecte la forêt et elle te guidera. »',
      studioStyle: 'ghibli_magical_spirits' as StudioStyle,
      defaultMotion: 'levitation_flight' as SupernaturalMotion,
      description:
        'Reproduit le style d\'aquarelle et d\'animation traditionnelle peinte à la main de Hayao Miyazaki. Les animaux parlent par télépathie poétique avec un calme surnaturel qui apaise enfants et adultes.',
      accent: 'from-emerald-500 via-teal-600 to-cyan-500',
    },
    ufotable_mappa: {
      name: 'Ufotable & MAPPA (Japon · Action Adulte)',
      sub: 'Manga de combat surnaturel pour grands, bêtes infernales et démons',
      badge: 'ACTION SHŌNEN & SEINEN ADULTE',
      badgeColor: 'bg-red-600 text-white font-extrabold',
      image: '/src/assets/images/ufotable_action_demon_beast_1794041151069.jpg',
      defaultAudience: 'adult_seinen' as TargetAudience,
      supernaturalFeature: 'Dash hypersonique à 60 FPS, éclairs de plasma et auras démoniaques incandescentes',
      dialogueSample: '« Ma foudre consume la nuit ! Nul démon n\'échappe à la sentence de nos griffes ! »',
      studioStyle: 'ufotable_adult_action' as StudioStyle,
      defaultMotion: 'elemental_fire_lightning' as SupernaturalMotion,
      description:
        'Le sommet de l\'animation d\'action pour adultes : compositing hybride 3D/2D, traînées luminescentes Ufotable, dynamique de caméra épileptique et chorégraphies de combat férocement surnaturelles.',
      accent: 'from-red-600 via-rose-600 to-purple-700',
    },
    lightchaser: {
      name: 'Light Chaser Animation (Chine · Épopée Mythique)',
      sub: 'Blockbusters Donghua (Nezha, White Snake), dieux et bêtes mythiques célestes',
      badge: 'DONGHUA CHINOIS HAUT DE GAMME',
      badgeColor: 'bg-yellow-400 text-black font-extrabold',
      image: '/src/assets/images/lightchaser_talking_qilin_1794041151655.jpg',
      defaultAudience: 'mythic_epic' as TargetAudience,
      supernaturalFeature: 'Runes célestes taoïstes, lévitation sur nuées sacrées et souffle d\'or divin',
      dialogueSample: '« Écoute le commandement des Neuf Cieux ! La bête céleste veille sur l\'immortalité ! »',
      studioStyle: 'lightchaser_celestial' as StudioStyle,
      defaultMotion: 'cosmic_burst' as SupernaturalMotion,
      description:
        'Inspiré des productions colossales chinoises qui rivalisent avec Hollywood : mythologie des bêtes divines Qilin et dragons volants, soies cinématiques et résonance spirituelle grandiose.',
      accent: 'from-yellow-400 via-amber-600 to-emerald-600',
    },
  };

  const current = studioPresets[selectedStudio];

  const handleApply = () => {
    onApplyPipelinePreset({
      studioStyle: current.studioStyle,
      targetAudience: selectedAudience,
      promptText: `${current.name} : ${current.description} Un animal surnaturel qui parle exécute un mouvement de type ${selectedMotion}. Dialogue : ${current.dialogueSample}`,
      supernaturalMotion: selectedMotion,
      isTalkingAnimal: talkingAnimalEnabled,
    });
    onOpenStudio();
  };

  return (
    <section className="py-16 lg:py-24 border-b border-white/10 relative overflow-hidden bg-[#090c15]">
      
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-r from-amber-500/10 via-rose-500/10 to-indigo-500/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-black tracking-widest uppercase text-rose-400 bg-rose-950/60 border border-rose-500/30 px-3.5 py-1 rounded-full mb-3">
            <Crown className="w-3.5 h-3.5 text-amber-400" />
            <span>MÉTHODE DE PRODUCTION DES STUDIOS CÉLÈBRES</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight text-balance mb-4">
            Animaux de qualité qui parlent & mouvements surnaturels
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Kamui Studio intègre la méthode de production des plus grands studios au monde : de l'animation d'animaux pour enfants (Disney / Ghibli) aux mangas d'action d'animés pour adultes (Ufotable / MAPPA) et bêtes mythiques célestes (Light Chaser).
          </p>
        </div>

        {/* 4 Studio Presets Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { id: 'disney_pixar', name: '🇺🇸 Disney / DreamWorks', role: 'Animaux Parlants & Enfants' },
            { id: 'ghibli', name: '🇯🇵 Studio Ghibli', role: 'Esprits Féeriques & Poésie' },
            { id: 'ufotable_mappa', name: '🇯🇵 Ufotable & MAPPA', role: 'Action Seinen Adulte 52K' },
            { id: 'lightchaser', name: '🇨🇳 Light Chaser Animation', role: 'Bêtes Divines & Dragons' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSelectedStudio(item.id as any);
                setSelectedAudience(studioPresets[item.id as keyof typeof studioPresets].defaultAudience);
                setSelectedMotion(studioPresets[item.id as keyof typeof studioPresets].defaultMotion);
              }}
              className={`p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer ${
                selectedStudio === item.id
                  ? 'border-amber-400 bg-gradient-to-br from-[#1a1f33] to-[#0f1424] text-white shadow-xl shadow-amber-950/30 scale-[1.02] ring-1 ring-amber-400/30'
                  : 'border-white/10 bg-slate-900/40 text-slate-400 hover:border-white/20 hover:text-white'
              }`}
            >
              <div className="text-xs font-black text-white mb-1">{item.name}</div>
              <div className="text-[11px] text-amber-300 font-medium">{item.role}</div>
            </button>
          ))}
        </div>

        {/* Live Studio Pipeline Workbench Frame */}
        <div className="rounded-3xl border border-white/15 bg-[#0c101c] overflow-hidden shadow-2xl">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 items-stretch">
            
            {/* Visual Canvas with Talking Animal in Supernatural Action (7 cols) */}
            <div className="lg:col-span-7 relative bg-black aspect-video lg:aspect-auto flex items-center justify-center overflow-hidden group">
              <img
                src={current.image}
                alt={current.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

              {/* Badges on top */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono">
                <span className={`px-2.5 py-1 rounded-md text-[11px] uppercase tracking-wider ${current.badgeColor}`}>
                  {current.badge}
                </span>

                <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                  🐾 ANIMAL QUI PARLE & MOUVEMENT SURNATUREL
                </span>
              </div>

              {/* Subtitle Dialogue Speech Bubble */}
              <div className="absolute bottom-4 left-4 right-4 p-3.5 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-white text-xs">
                <div className="flex items-center justify-between text-amber-300 font-bold mb-1">
                  <span className="flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-amber-400" />
                    <span>Voix et Dialogue Lip-Sync Animal :</span>
                  </span>
                  <span className="text-[10px] font-mono text-cyan-400">
                    MOUVEMENT : {selectedMotion.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <p className="italic text-slate-100 font-medium leading-relaxed">
                  {current.dialogueSample}
                </p>
              </div>

            </div>

            {/* Pipeline Controls & Customization (5 cols) */}
            <div className="lg:col-span-5 p-6 lg:p-8 flex flex-col justify-between space-y-6 bg-gradient-to-b from-[#111728] to-[#0c101c]">
              
              <div className="space-y-4">
                
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-white leading-tight mb-1">
                    {current.name}
                  </h3>
                  <p className="text-xs text-amber-300 font-semibold mb-3">
                    {current.sub}
                  </p>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {current.description}
                  </p>
                </div>

                {/* Target Audience Switcher (Enfants / Shonen / Adulte) */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
                    1. Catégorie d'Audience du Dessin Animé :
                  </label>
                  <div className="grid grid-cols-3 gap-1.5 text-xs">
                    {[
                      { id: 'kids_family', label: '👶 Enfants & Famille' },
                      { id: 'action_shonen', label: '⚡ Manga Shōnen' },
                      { id: 'adult_seinen', label: '🔥 Grands / Adultes' },
                    ].map((aud) => (
                      <button
                        key={aud.id}
                        onClick={() => setSelectedAudience(aud.id as TargetAudience)}
                        className={`p-2 rounded-xl text-center text-[10px] font-bold border transition-all cursor-pointer ${
                          selectedAudience === aud.id
                            ? 'bg-amber-500 text-black border-amber-400 shadow'
                            : 'border-white/10 bg-black/30 text-slate-400 hover:text-white'
                        }`}
                      >
                        {aud.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Supernatural Motion Controls */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono uppercase text-slate-400 font-bold block">
                    2. Type de Mouvement Surnaturel :
                  </label>
                  <div className="grid grid-cols-2 gap-1.5 text-xs">
                    {[
                      { id: 'talking_speech', label: '🗣️ Parole Animale Lip-Sync' },
                      { id: 'elemental_fire_lightning', label: '⚡ Foudre & Feu Surnaturel' },
                      { id: 'levitation_flight', label: '🕊️ Lévitation & Ailes Magiques' },
                      { id: 'hypersonic_dash', label: '🚀 Dash Hypersonique 52K' },
                      { id: 'cosmic_burst', label: '🌌 Explosion Cosmique Taoïste' },
                      { id: 'teleportation_glitch', label: '🌀 Téléportation Céleste' },
                    ].map((mot) => (
                      <button
                        key={mot.id}
                        onClick={() => setSelectedMotion(mot.id as SupernaturalMotion)}
                        className={`p-2 rounded-xl text-left text-[10px] font-semibold border transition-all cursor-pointer ${
                          selectedMotion === mot.id
                            ? 'bg-rose-600 text-white border-rose-500 shadow'
                            : 'border-white/10 bg-black/30 text-slate-400 hover:text-white'
                        }`}
                      >
                        {mot.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Talking animal checkbox toggle */}
                <div className="p-3 rounded-xl bg-black/40 border border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-200 font-medium">Activer le module « Animal qui parle » :</span>
                  <input
                    type="checkbox"
                    checked={talkingAnimalEnabled}
                    onChange={(e) => setTalkingAnimalEnabled(e.target.checked)}
                    className="w-4 h-4 accent-amber-500 cursor-pointer"
                  />
                </div>

              </div>

              {/* Action Button: Inject this preset into 52K Studio */}
              <div className="pt-2 border-t border-white/10">
                <button
                  onClick={handleApply}
                  className={`w-full py-3.5 px-4 rounded-xl text-white font-black text-xs shadow-xl transition-all flex items-center justify-center gap-2 cursor-pointer bg-gradient-to-r ${current.accent} hover:scale-[1.02]`}
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Charger ce style de studio célèbre dans le Studio 52K</span>
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
