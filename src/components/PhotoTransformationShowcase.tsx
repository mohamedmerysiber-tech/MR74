import React, { useState } from 'react';
import {
  UploadCloud,
  Sparkles,
  ArrowRight,
  Layers,
  Palette,
  Eye,
  Sliders,
  Check,
} from 'lucide-react';

interface PhotoTransformationShowcaseProps {
  onOpenStudioWithPhoto: () => void;
}

export const PhotoTransformationShowcase: React.FC<PhotoTransformationShowcaseProps> = ({
  onOpenStudioWithPhoto,
}) => {
  const [selectedStyle, setSelectedStyle] = useState<'shonen' | 'shojo' | 'cyberpunk' | 'ghibli'>('shonen');
  const [transformationProgress, setTransformationProgress] = useState(100);

  const styleConfigs = {
    shonen: {
      name: 'Shōnen Action Studio',
      trait: 'Traits vifs, cheveux dynamiques, ombrages cel-shading intenses',
      accent: 'border-rose-500/50 bg-rose-950/20 text-rose-300',
    },
    cyberpunk: {
      name: 'Cyberpunk Neo-Tokyo',
      trait: 'Implants luminescents, reflets néon Shibuya, reflets chromés',
      accent: 'border-cyan-500/50 bg-cyan-950/20 text-cyan-300',
    },
    shojo: {
      name: 'Shōjo Poétique & Romance',
      trait: 'Yeux étincelants, lumière dorée douce, aquarelle subtile',
      accent: 'border-pink-500/50 bg-pink-950/20 text-pink-300',
    },
    ghibli: {
      name: 'Ghibli Héritage Naturel',
      trait: 'Peinture de fond à l\'ancienne, textures organiques chaudes',
      accent: 'border-amber-500/50 bg-amber-950/20 text-amber-300',
    },
  };

  return (
    <section className="py-16 lg:py-24 border-b border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 uppercase tracking-widest mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>TECHNOLOGIE KAMUI FACIAL-NEURAL</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight text-balance mb-4">
            Vos photos réelles prennent vie en personnages de manga 4K
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
            Importez un selfie, le visage d'un proche, un croquis sur carnet ou un décor urbain. Le moteur neural de Kamui Studio extrait les proportions biométriques et les métamorphose fidèlement en héros d'animé prêt à être animé.
          </p>
        </div>

        {/* Interactive Transformation Card */}
        <div className="rounded-2xl border border-white/10 bg-[#0d1019] p-6 lg:p-8 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Visual Showcase (7 cols) */}
            <div className="lg:col-span-7">
              <div className="relative rounded-xl overflow-hidden border border-white/15 bg-black group">
                <img
                  src="/src/assets/images/photo_to_anime_transform_1794038384983.jpg"
                  alt="Transformation photo humaine vers personnage animé japonais 4K"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto object-cover max-h-[460px]"
                />
                <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md px-3 py-1 rounded-md text-[11px] font-mono text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>BIOMÉTRIE & CEL-SHADING 4K SYNCHRONISÉS</span>
                </div>
              </div>

              {/* Quick interactive slider demo */}
              <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-white/5 flex items-center justify-between gap-4 text-xs">
                <span className="text-slate-400 shrink-0">Origine Photo</span>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={transformationProgress}
                  onChange={(e) => setTransformationProgress(Number(e.target.value))}
                  className="w-full accent-rose-500 cursor-pointer"
                />
                <span className="text-rose-400 font-semibold shrink-0">Anime 4K ({transformationProgress}%)</span>
              </div>
            </div>

            {/* Controls & Features (5 cols) */}
            <div className="lg:col-span-5 flex flex-col justify-center space-y-6">
              
              <div>
                <h3 className="text-lg font-bold text-white mb-2">
                  Choisissez le style graphique de conversion
                </h3>
                <p className="text-xs text-slate-400">
                  L'IA adapte l'encrage, la palette chromatique et les expressions selon les conventions des plus célèbres maisons d'animation tokyoïtes.
                </p>
              </div>

              {/* Style options buttons */}
              <div className="grid grid-cols-2 gap-2.5">
                {(['shonen', 'cyberpunk', 'shojo', 'ghibli'] as const).map((style) => (
                  <button
                    key={style}
                    onClick={() => setSelectedStyle(style)}
                    className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                      selectedStyle === style
                        ? 'border-rose-500 bg-rose-950/40 text-white shadow-lg shadow-rose-950/30'
                        : 'border-white/10 bg-slate-900/40 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-bold">{styleConfigs[style].name}</span>
                      {selectedStyle === style && <Check className="w-3.5 h-3.5 text-rose-400" />}
                    </div>
                    <div className="text-[10px] text-slate-400 line-clamp-2">
                      {styleConfigs[style].trait}
                    </div>
                  </button>
                ))}
              </div>

              {/* Key Conversion Highlights */}
              <div className="space-y-2.5 text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <Eye className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Préservation du regard, du sourire et des expressions caractéristiques</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>Génération automatique de la feuille de modèle (Model Sheet 360°)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span>Prêt pour le doublage vocal automatique avec synchronisation labiale</span>
                </div>
              </div>

              {/* CTA */}
              <div className="pt-2">
                <button
                  onClick={onOpenStudioWithPhoto}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-rose-950/40 cursor-pointer"
                >
                  <UploadCloud className="w-4 h-4" />
                  <span>Importer ma première photo dans le Mode Privé</span>
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
