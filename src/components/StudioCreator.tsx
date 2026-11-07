import React, { useState } from 'react';
import {
  CharacterItem,
  LandscapeItem,
  PlanTier,
  UserSubscription,
  BatchPhotoItem,
  StudioStyle,
} from '../types';
import { INITIAL_BATCH_PHOTOS } from '../data/initialData';
import {
  Sparkles,
  Play,
  Pause,
  RotateCcw,
  Sliders,
  Trash2,
  Edit3,
  Plus,
  Eye,
  EyeOff,
  Upload,
  Music,
  Film,
  Lock,
  Unlock,
  Volume2,
  VolumeX,
  Clock,
  Check,
  AlertTriangle,
  Flame,
  Wand2,
  Users,
  Image as ImageIcon,
  Zap,
  Layers,
  Heart,
  Palette,
  Camera,
} from 'lucide-react';

interface StudioCreatorProps {
  characters: CharacterItem[];
  setCharacters: React.Dispatch<React.SetStateAction<CharacterItem[]>>;
  landscapes: LandscapeItem[];
  setLandscapes: React.Dispatch<React.SetStateAction<LandscapeItem[]>>;
  activeLandscape: LandscapeItem | null;
  setActiveLandscape: (item: LandscapeItem | null) => void;
  userSubscription: UserSubscription;
  currentPlan: PlanTier | null;
  onUpgradePrompt: () => void;
  selectedStudioStyle?: StudioStyle;
}

export const StudioCreator: React.FC<StudioCreatorProps> = ({
  characters,
  setCharacters,
  landscapes,
  setLandscapes,
  activeLandscape,
  setActiveLandscape,
  userSubscription,
  currentPlan,
  onUpgradePrompt,
  selectedStudioStyle = 'japanese_saitama',
}) => {
  // Mode selection: "Mode Privé (Édition Totale)" vs "Aperçu Rendu 52K/4K"
  const [studioMode, setStudioMode] = useState<'private' | 'render'>('private');

  // Input source: Pure text (no photo required) vs 50+ Photos Batch
  const [creationSource, setCreationSource] = useState<'pure_text' | 'photo_batch_50'>('photo_batch_50');

  // Active Studio Style
  const [currentStudioStyle, setCurrentStudioStyle] = useState<StudioStyle>(selectedStudioStyle);

  // Resolution Mode (including 52K requested by user)
  const [resolutionMode, setResolutionMode] = useState<'4K' | '8K' | '52K'>('52K');

  // Scenario & Prompt
  const [prompt, setPrompt] = useState<string>(
    'Combat titanesque style Saitama et Miraculous au coucher du soleil. Les personnages bougent comme de vrais humains avec des sauts acrobatiques. Des créatures bizarres et familiers magiques ailés tourbillonnent autour de la scène.'
  );

  // Atmosphere
  const [atmosphere, setAtmosphere] = useState<string>('action');

  // Duration in HH:MM:SS
  const [durationHours, setDurationHours] = useState<number>(0);
  const [durationMinutes, setDurationMinutes] = useState<number>(2);
  const [durationSeconds, setDurationSeconds] = useState<number>(30);

  // Player state
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [currentTimeSec, setCurrentTimeSec] = useState<number>(4);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [generationProgress, setGenerationProgress] = useState<number>(0);
  const [generationMessage, setGenerationMessage] = useState<string>('');

  // Editing character modal or inline drawer
  const [editingCharacterId, setEditingCharacterId] = useState<string | null>(null);
  const [editingLandscape, setEditingLandscape] = useState<boolean>(false);

  // Batch photos collection (up to 50+ photos)
  const [batchPhotos, setBatchPhotos] = useState<BatchPhotoItem[]>(INITIAL_BATCH_PHOTOS);
  const [photoFilter, setPhotoFilter] = useState<'all' | 'visage' | 'corps_mouvement' | 'animal_bizarre' | 'decor'>('all');

  // Calculate total duration in seconds
  const totalDurationSeconds = durationHours * 3600 + durationMinutes * 60 + durationSeconds;
  const maxAllowedDuration = currentPlan ? currentPlan.maxDurationSeconds : 30;
  const isDurationExceeded = totalDurationSeconds > maxAllowedDuration;

  // Handler for modifying character
  const handleUpdateCharacter = (id: string, updates: Partial<CharacterItem>) => {
    setCharacters((prev) =>
      prev.map((char) => (char.id === id ? { ...char, ...updates } : char))
    );
  };

  // Handler for deleting character (Required in Mode Privé)
  const handleDeleteCharacter = (id: string) => {
    setCharacters((prev) => prev.filter((char) => char.id !== id));
    if (editingCharacterId === id) setEditingCharacterId(null);
  };

  // Handler for deleting landscape / background (Required in Mode Privé)
  const handleDeleteLandscape = (id: string) => {
    setLandscapes((prev) => prev.filter((land) => land.id !== id));
    if (activeLandscape?.id === id) {
      const remaining = landscapes.filter((l) => l.id !== id);
      setActiveLandscape(remaining.length > 0 ? remaining[0] : null);
    }
  };

  // Add new bizarre animal or human character
  const handleAddCharacter = (type: 'human' | 'bizarre_beast') => {
    const isBeast = type === 'bizarre_beast';
    const newChar: CharacterItem = {
      id: `char-${Date.now()}`,
      name: isBeast ? 'Familier Bizarre Cornu' : 'Héros Acrobatique Miraculous',
      archetype: isBeast ? 'Animal Magique & Chimère Féerique' : 'Combattant Urbain Style Français',
      style: isBeast ? 'bizarre_beast' : 'french_hero',
      entityType: isBeast ? 'bizarre_beast' : 'human',
      hairColor: isBeast ? 'Fourrure phosphorescente' : 'Châtain aux mèches pourpres',
      eyeColor: isBeast ? 'Yeux d\'ambre étincelants' : 'Bleu électrique',
      outfit: isBeast ? 'Ailes membraneuses et queue plumée' : 'Costume acrobatique aérodynamique',
      voiceTone: isBeast ? 'Gazouillis mélodieux et rires cristallins' : 'Voix claire et déterminée',
      animeAvatarUrl: isBeast
        ? '/src/assets/images/bizarre_anime_creatures_1794039496795.jpg'
        : '/src/assets/images/french_anime_miraculous_1794039495735.jpg',
      posX: isBeast ? 45 : 30,
      posY: 22,
      scale: 1,
      isTalking: true,
      isVisible: true,
      dialogue: isBeast
        ? '« Kuru-kuru ! Animal en mouvement réel avec ailes et pattes coordonnées ! »'
        : '« Salto arrière et esquive humaine fluide en 52K ! »',
      motionType: isBeast ? 'beast_flight' : 'miraculous_acrobatics',
      isSecondaryAutoGenerated: false,
    };
    setCharacters([...characters, newChar]);
    setEditingCharacterId(newChar.id);
  };

  // ALGORITHM: Automatically find and adjust secondary characters (As requested)
  const handleAutoAdjustSecondaryCharacters = () => {
    const autoSecondary: CharacterItem = {
      id: `char-sec-${Date.now()}`,
      name: 'Allié Tactique & Créature de Soutien (Ajusté par l\'Algorithme)',
      archetype: 'Personnage Secondaire Optimisé pour l\'Action',
      style: 'chinese_mythic',
      entityType: 'secondary_character',
      hairColor: 'Reflets d\'argent',
      eyeColor: 'Or céleste',
      outfit: 'Armure de cuir souple et cape courte',
      voiceTone: 'Voix posée et complice',
      animeAvatarUrl: '/src/assets/images/donghua_mythic_beast_1794039496200.jpg',
      posX: 18,
      posY: 32,
      scale: 0.9,
      isTalking: true,
      isVisible: true,
      dialogue: '« L\'algorithme a détecté ton héros et a généré ma trajectoire pour synchroniser l\'attaque en duo ! »',
      motionType: 'martial_arts',
      isSecondaryAutoGenerated: true,
    };
    setCharacters((prev) => [...prev, autoSecondary]);
    setEditingCharacterId(autoSecondary.id);
  };

  // Add more photos to the 50 batch
  const handleUploadBatch = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      const newItems: BatchPhotoItem[] = files.map((file, idx) => ({
        id: `uploaded-${Date.now()}-${idx}`,
        name: file.name,
        url: URL.createObjectURL(file),
        category: idx % 3 === 0 ? 'visage' : idx % 3 === 1 ? 'animal_bizarre' : 'corps_mouvement',
        extractedAnimeRole: 'Personnage Détecté par l\'Algorithme',
      }));
      setBatchPhotos((prev) => [...newItems, ...prev]);
    }
  };

  // Simulate video render
  const handleStartRender = () => {
    if (isDurationExceeded) {
      onUpgradePrompt();
      return;
    }
    setIsGenerating(true);
    setGenerationProgress(10);
    setGenerationMessage('Extraction des poses dynamiques Saitama & Miraculous...');

    const timer = setInterval(() => {
      setGenerationProgress((p) => {
        if (p >= 95) {
          clearInterval(timer);
          setTimeout(() => {
            setIsGenerating(false);
            setGenerationProgress(100);
            setStudioMode('render');
            setIsPlaying(true);
          }, 600);
          return 100;
        }
        if (p === 35) setGenerationMessage('Animation des animaux bizarres et synchronisation labiale...');
        if (p === 70) setGenerationMessage(`Super-résolution ${resolutionMode} et étalonnage des mouvements humains...`);
        return p + 15;
      });
    }, 400);
  };

  const editingChar = characters.find((c) => c.id === editingCharacterId);
  const filteredBatchPhotos = batchPhotos.filter((p) => photoFilter === 'all' || p.category === photoFilter);

  return (
    <div className="py-8 lg:py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Studio Banner & Vibrant Tokyo/Paris Glow */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs font-black tracking-wider uppercase mb-1">
            <span className="px-2 py-0.5 rounded bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-500 text-white font-extrabold shadow">
              STUDIO MONDIAL 52K
            </span>
            <span className="text-amber-400 font-bold">
              SAITAMA · MIRACULOUS · ANIMAUX BIZARRES EN MOUVEMENT
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Studio de Réalisation Multi-Styles & Créatures
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Créez par texte pur ou importez jusqu'à 50+ photos. L'algorithme ajuste automatiquement les personnages secondaires.
          </p>
        </div>

        {/* Resolution & Mode Badges */}
        <div className="flex items-center gap-2">
          {/* 52K Super Resolution Switcher */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-black/60 border border-amber-500/30">
            <span className="text-[10px] text-amber-300 font-mono font-bold px-1.5">RÉSOL. :</span>
            {(['4K', '8K', '52K'] as const).map((res) => (
              <button
                key={res}
                onClick={() => setResolutionMode(res)}
                className={`px-2 py-1 rounded-md text-[11px] font-mono font-bold transition-all cursor-pointer ${
                  resolutionMode === res
                    ? 'bg-gradient-to-r from-amber-500 to-rose-600 text-black shadow'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {res === '52K' ? '52K NEURAL' : res}
              </button>
            ))}
          </div>

          {/* Mode Selector Toggle */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-900 border border-white/15 shrink-0">
            <button
              onClick={() => setStudioMode('private')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                studioMode === 'private'
                  ? 'bg-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Mode Privé (Édition)</span>
            </button>

            <button
              onClick={() => setStudioMode('render')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                studioMode === 'render'
                  ? 'bg-gradient-to-r from-purple-600 to-rose-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <Film className="w-3.5 h-3.5" />
              <span>Aperçu Rendu {resolutionMode}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Studio Layout: Left Controls + Right Live Canvas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (5 cols): Tools, Prompts, Characters & Landscapes Manager */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Method Selector: Pure Text vs 50+ Photos Batch */}
          <div className="p-1.5 rounded-2xl bg-gradient-to-r from-rose-950/60 via-purple-950/60 to-cyan-950/60 border border-white/15 grid grid-cols-2 gap-1.5">
            <button
              onClick={() => setCreationSource('pure_text')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                creationSource === 'pure_text'
                  ? 'bg-white text-slate-900 shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Wand2 className="w-3.5 h-3.5 text-rose-500" />
              <span>100% Texte (Sans Photo)</span>
            </button>

            <button
              onClick={() => setCreationSource('photo_batch_50')}
              className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                creationSource === 'photo_batch_50'
                  ? 'bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-600 text-white shadow-lg'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5 text-cyan-300" />
              <span>Lot de 50+ Photos</span>
            </button>
          </div>

          {/* World Studio Styles Switcher Bar */}
          <div className="p-3 rounded-2xl bg-[#0e121c] border border-white/10 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-white flex items-center gap-1.5">
                <Palette className="w-3.5 h-3.5 text-amber-400" />
                Style de Studio d'Animation
              </span>
              <span className="text-[10px] text-rose-300 font-mono">Mouvements Réels Humains</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5">
              {[
                { id: 'disney_pixar_talking_animal', label: '🇺🇸 Disney / Pixar (Animaux Parlants)', color: 'border-amber-400' },
                { id: 'ghibli_magical_spirits', label: '🇯🇵 Studio Ghibli (Esprits Féeriques)', color: 'border-emerald-500' },
                { id: 'ufotable_adult_action', label: '🇯🇵 Ufotable (Action Adulte 52K)', color: 'border-red-500' },
                { id: 'lightchaser_celestial', label: '🇨🇳 Light Chaser (Qilin Céleste)', color: 'border-yellow-400' },
                { id: 'japanese_saitama', label: '🇯🇵 Saitama Shōnen', color: 'border-rose-500' },
                { id: 'french_miraculous', label: '🇫🇷 Miraculous Paris', color: 'border-indigo-500' },
                { id: 'bizarre_creatures', label: '🐾 Chimères Bizarres', color: 'border-teal-500' },
                { id: 'chinese_donghua', label: '🇨🇳 Donghua Dragon', color: 'border-cyan-500' },
              ].map((st) => (
                <button
                  key={st.id}
                  onClick={() => setCurrentStudioStyle(st.id as StudioStyle)}
                  className={`p-2 rounded-xl text-left border text-[11px] font-bold transition-all cursor-pointer ${
                    currentStudioStyle === st.id
                      ? `bg-slate-800 text-white ${st.color} shadow-lg ring-1 ring-white/20`
                      : 'border-white/5 bg-black/30 text-slate-400 hover:text-white'
                  }`}
                >
                  {st.label}
                </button>
              ))}
            </div>
          </div>

          {/* 50+ Photos Batch Gallery Display (if photo_batch_50 is selected) */}
          {creationSource === 'photo_batch_50' && (
            <div className="p-4 rounded-2xl bg-[#0f1424] border border-cyan-500/30 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Camera className="w-4 h-4 text-cyan-400" />
                  <span>Galerie du Lot : {batchPhotos.length} Photos Importées</span>
                </div>
                
                <label className="px-2.5 py-1 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-[10px] font-bold cursor-pointer transition-colors flex items-center gap-1">
                  <Upload className="w-3 h-3" />
                  <span>Ajouter 50 photos</span>
                  <input type="file" multiple accept="image/*" onChange={handleUploadBatch} className="hidden" />
                </label>
              </div>

              <p className="text-[11px] text-slate-300 leading-relaxed">
                Vous n'êtes pas limité à une seule photo : vous pouvez charger <strong>plus de 50 photos</strong> en lot (visages, mouvements, animaux bizarres, décors).
              </p>

              {/* Photo Filter Tabs */}
              <div className="flex items-center gap-1 overflow-x-auto text-[10px] pb-1">
                {[
                  { id: 'all', label: 'Toutes (50)' },
                  { id: 'visage', label: 'Visages (15)' },
                  { id: 'corps_mouvement', label: 'Mouvements (13)' },
                  { id: 'animal_bizarre', label: 'Animaux Bizarres (12)' },
                  { id: 'decor', label: 'Décors (10)' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setPhotoFilter(f.id as any)}
                    className={`px-2 py-0.5 rounded-md whitespace-nowrap font-medium transition-colors ${
                      photoFilter === f.id
                        ? 'bg-cyan-600 text-white font-bold'
                        : 'bg-black/40 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>

              {/* 50 Photos Visual Thumbnails Scrollable Strip */}
              <div className="grid grid-cols-5 gap-2 max-h-44 overflow-y-auto p-1.5 bg-black/40 rounded-xl border border-white/10">
                {filteredBatchPhotos.map((item, idx) => (
                  <div
                    key={item.id}
                    className="relative rounded-lg overflow-hidden border border-white/15 bg-black group hover:scale-105 transition-transform"
                    title={`${item.name} - ${item.extractedAnimeRole}`}
                  >
                    <img
                      src={item.url}
                      alt={item.name}
                      className="w-full h-12 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-[8px] text-white font-mono font-bold text-center p-0.5">
                      #{idx + 1}
                    </div>
                  </div>
                ))}
              </div>

              {/* Algorithm Secondary Character Callout */}
              <div className="p-3 rounded-xl bg-gradient-to-r from-purple-950/60 to-indigo-950/60 border border-purple-500/40 flex items-center justify-between gap-3 text-xs">
                <div className="text-[11px] text-purple-200 leading-snug">
                  <strong>Algorithme Actif :</strong> Il extrait le héros et génère automatiquement les personnages secondaires et animaux bizarres pour équilibrer la scène.
                </div>
                <button
                  onClick={handleAutoAdjustSecondaryCharacters}
                  className="px-2.5 py-1.5 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[10px] font-bold shrink-0 cursor-pointer shadow"
                >
                  Ajuster Secondaires
                </button>
              </div>

            </div>
          )}

          {/* Prompt & Scenario Area */}
          <div className="p-4 rounded-xl bg-[#0e111a] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <Wand2 className="w-3.5 h-3.5 text-rose-400" />
                <span>Scénario & Description Textuelle (Sans Photo Obligatoire)</span>
              </label>
              <button
                onClick={() =>
                  setPrompt(
                    'Le héros délivre un coup de poing Saitama créant une supernova cosmique. Sur le toit opposé, une héroïne Miraculous effectue un salto humain réaliste. Une meute de créatures bizarres féeriques vole à pleine vitesse.'
                  )
                }
                className="text-[10px] text-amber-400 hover:text-amber-300 font-semibold"
              >
                Exemple Hybride 52K
              </button>
            </div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={3}
              className="w-full p-2.5 rounded-lg bg-black/40 border border-white/15 text-xs text-slate-100 placeholder-slate-500 focus:outline-none focus:border-rose-500 transition-colors"
              placeholder="Décrivez les actions, les animaux bizarres, les cascades humaines et les répliques..."
            />
          </div>

          {/* Atmosphere & Bruitages */}
          <div className="p-4 rounded-xl bg-[#0e111a] border border-white/10 space-y-2.5">
            <label className="text-xs font-bold text-white flex items-center gap-1.5">
              <Music className="w-3.5 h-3.5 text-indigo-400" />
              <span>Ambiance Sonore & SFX</span>
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              {[
                { id: 'action', label: 'Frappe Saitama SFX' },
                { id: 'drama', label: 'Acrobatie Miraculous' },
                { id: 'fantasy', label: 'Cris Créatures Bizarres' },
                { id: 'cyberpunk', label: 'Néo-Tokyo 52K' },
                { id: 'romance', label: 'Crépuscule Shōjo' },
                { id: 'orchestral_sfx', label: 'Orchestre Donghua' },
              ].map((amb) => (
                <button
                  key={amb.id}
                  onClick={() => setAtmosphere(amb.id)}
                  className={`px-2.5 py-1.5 rounded-lg border text-center transition-all cursor-pointer font-medium text-[11px] ${
                    atmosphere === amb.id
                      ? 'bg-rose-950/80 border-rose-500 text-white font-semibold'
                      : 'bg-black/30 border-white/10 text-slate-300 hover:border-white/20'
                  }`}
                >
                  {amb.label}
                </button>
              ))}
            </div>
          </div>

          {/* Exact Duration Timer Selector (HH : MM : SS) */}
          <div className="p-4 rounded-xl bg-[#0e111a] border border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-white flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-rose-400" />
                <span>Durée de Vidéo (De 1s à 10 Heures Réglées à la Minute)</span>
              </label>
              <span className="text-[10px] font-mono text-slate-400">
                Plafond pack : {currentPlan ? currentPlan.maxDurationLabel : '30 secondes (Essai)'}
              </span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-black/40 p-2 rounded-lg border border-white/10 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Heures</span>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={durationHours}
                  onChange={(e) => setDurationHours(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-transparent text-center text-lg font-mono font-bold text-white focus:outline-none"
                />
              </div>

              <div className="bg-black/40 p-2 rounded-lg border border-white/10 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Minutes</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={durationMinutes}
                  onChange={(e) => setDurationMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-transparent text-center text-lg font-mono font-bold text-white focus:outline-none"
                />
              </div>

              <div className="bg-black/40 p-2 rounded-lg border border-white/10 text-center">
                <span className="text-[10px] text-slate-400 uppercase font-mono block mb-1">Secondes</span>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={durationSeconds}
                  onChange={(e) => setDurationSeconds(Math.max(0, parseInt(e.target.value) || 0))}
                  className="w-full bg-transparent text-center text-lg font-mono font-bold text-white focus:outline-none"
                />
              </div>
            </div>

            {isDurationExceeded && (
              <div className="p-2.5 rounded-lg bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4 shrink-0 text-amber-400" />
                  <span>
                    Durée demandée supérieure au forfait ({currentPlan ? currentPlan.maxDurationLabel : '30s'}).
                  </span>
                </div>
                <button
                  onClick={onUpgradePrompt}
                  className="px-2 py-1 rounded bg-amber-500 text-black font-bold text-[10px] hover:bg-amber-400 shrink-0 cursor-pointer"
                >
                  Passer au Pack Expert / Ultime
                </button>
              </div>
            )}
          </div>

          {/* Mode Privé: Character & Animal Creatures Management */}
          {studioMode === 'private' && (
            <div className="p-4 rounded-xl bg-[#0e111a] border border-white/10 space-y-4">
              
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Sliders className="w-3.5 h-3.5 text-rose-400" />
                  <span>Personnages & Animaux Bizarres ({characters.length})</span>
                </h4>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleAddCharacter('human')}
                    className="px-2 py-1 rounded bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/30 text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    + Héros
                  </button>
                  <button
                    onClick={() => handleAddCharacter('bizarre_beast')}
                    className="px-2 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/30 text-[10px] font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    + Animal Bizarre
                  </button>
                </div>
              </div>

              {/* Characters List */}
              <div className="space-y-2">
                {characters.map((char) => (
                  <div
                    key={char.id}
                    className={`p-2.5 rounded-lg border transition-all flex items-center justify-between gap-3 ${
                      editingCharacterId === char.id
                        ? 'border-rose-500 bg-rose-950/30'
                        : 'border-white/10 bg-black/30'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={char.animeAvatarUrl}
                        alt={char.name}
                        className="w-9 h-9 rounded-md object-cover border border-white/20 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate flex items-center gap-1.5">
                          <span>{char.name}</span>
                          {char.isSecondaryAutoGenerated && (
                            <span className="text-[9px] bg-purple-900/60 text-purple-200 px-1 py-0.2 rounded border border-purple-500/30">
                              Secondaire IA
                            </span>
                          )}
                        </div>
                        <div className="text-[10px] text-slate-400 truncate">{char.archetype}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() =>
                          handleUpdateCharacter(char.id, { isVisible: !char.isVisible })
                        }
                        className={`p-1.5 rounded hover:bg-white/10 text-xs ${
                          char.isVisible ? 'text-slate-200' : 'text-slate-500'
                        }`}
                        title={char.isVisible ? 'Masquer' : 'Afficher'}
                      >
                        {char.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() =>
                          setEditingCharacterId(editingCharacterId === char.id ? null : char.id)
                        }
                        className="p-1.5 rounded hover:bg-white/10 text-xs text-rose-400"
                        title="Modifier ce personnage / animal"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => handleDeleteCharacter(char.id)}
                        className="p-1.5 rounded hover:bg-red-950 text-xs text-red-400"
                        title="Supprimer ce personnage"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Character Edit Drawer if selected */}
              {editingChar && (
                <div className="p-3.5 rounded-xl bg-slate-900 border border-rose-500/40 space-y-3 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/10">
                    <span className="font-bold text-rose-300">
                      Modifier : {editingChar.name}
                    </span>
                    <button
                      onClick={() => setEditingCharacterId(null)}
                      className="text-slate-400 hover:text-white text-[10px]"
                    >
                      Fermer
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Nom de l'entité</label>
                      <input
                        type="text"
                        value={editingChar.name}
                        onChange={(e) => handleUpdateCharacter(editingChar.id, { name: e.target.value })}
                        className="w-full p-1.5 bg-black/40 border border-white/10 rounded text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-400 block mb-0.5">Mouvement Réel</label>
                      <select
                        value={editingChar.motionType || 'human_walk'}
                        onChange={(e) => handleUpdateCharacter(editingChar.id, { motionType: e.target.value as any })}
                        className="w-full p-1.5 bg-black/40 border border-white/10 rounded text-xs text-white"
                      >
                        <option value="saitama_punch">💥 Coup de Poing Saitama</option>
                        <option value="miraculous_acrobatics">🤸 Salto Miraculous Parisien</option>
                        <option value="beast_flight">🐾 Vol d'Animal Bizarre / Chimère</option>
                        <option value="martial_arts">🐉 Arts Martiaux Donghua</option>
                        <option value="human_walk">🚶 Déplacement Humain Réel</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-slate-400 block mb-0.5">Dialogue pour Lip-Sync</label>
                    <input
                      type="text"
                      value={editingChar.dialogue || ''}
                      onChange={(e) => handleUpdateCharacter(editingChar.id, { dialogue: e.target.value })}
                      className="w-full p-1.5 bg-black/40 border border-white/10 rounded text-xs text-white"
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      onClick={() => handleUpdateCharacter(editingChar.id, { isTalking: !editingChar.isTalking })}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-colors ${
                        editingChar.isTalking ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {editingChar.isTalking ? 'Lip-Sync Parle (Actif)' : 'Activer le Lip-Sync'}
                    </button>

                    <button
                      onClick={() => handleDeleteCharacter(editingChar.id)}
                      className="px-2.5 py-1 rounded bg-red-950 text-red-300 border border-red-800/40 text-[11px] hover:bg-red-900"
                    >
                      Supprimer de la scène
                    </button>
                  </div>
                </div>
              )}

              {/* Landscapes Section (Modifier des paysages / Supprimer des paysages) */}
              <div className="pt-3 border-t border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Film className="w-3.5 h-3.5 text-amber-400" />
                    <span>Paysages & Décors 52K</span>
                  </h4>
                  <button
                    onClick={() => setEditingLandscape(!editingLandscape)}
                    className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold"
                  >
                    {editingLandscape ? 'Masquer outils' : 'Modifier le paysage'}
                  </button>
                </div>

                {activeLandscape ? (
                  <div className="p-2.5 rounded-lg border border-white/10 bg-black/30 flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 min-w-0">
                      <img
                        src={activeLandscape.bgImageUrl}
                        alt={activeLandscape.name}
                        className="w-12 h-8 rounded object-cover border border-white/20 shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="text-xs font-bold text-white truncate">{activeLandscape.name}</div>
                        <div className="text-[10px] text-slate-400 truncate">{activeLandscape.lighting}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => handleDeleteLandscape(activeLandscape.id)}
                        className="p-1.5 rounded hover:bg-red-950 text-xs text-red-400"
                        title="Supprimer ce décor en Mode Privé"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="p-3 rounded-lg border border-dashed border-white/15 text-center text-xs text-slate-400">
                    Décor supprimé en Mode Privé.
                    <button
                      onClick={() => setActiveLandscape(landscapes[0])}
                      className="block mx-auto mt-1 text-rose-400 font-semibold"
                    >
                      Restaurer le décor de base
                    </button>
                  </div>
                )}
              </div>

            </div>
          )}

          {/* Render Action Button */}
          <button
            onClick={handleStartRender}
            disabled={isGenerating}
            className={`w-full py-3.5 px-4 rounded-xl text-white font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-2xl cursor-pointer ${
              isGenerating
                ? 'bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-rose-600 via-purple-600 to-cyan-500 hover:from-rose-500 hover:to-cyan-400 shadow-rose-950/50 hover:scale-[1.01]'
            }`}
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>
              {isGenerating ? `Calcul du Rendu ${resolutionMode} en cours...` : `Générer l'Animé en Résolution ${resolutionMode}`}
            </span>
          </button>

          {/* Progress bar if rendering */}
          {isGenerating && (
            <div className="p-3 rounded-xl bg-slate-900 border border-white/10 space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>{generationMessage}</span>
                <span className="font-mono text-cyan-400 font-bold">{generationProgress}%</span>
              </div>
              <div className="w-full h-1.5 bg-black/60 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-400 transition-all duration-300"
                  style={{ width: `${generationProgress}%` }}
                />
              </div>
            </div>
          )}

        </div>

        {/* Right Column (7 cols): The 52K/4K Live Studio Canvas / Video Player */}
        <div className="lg:col-span-7">
          <div className="rounded-2xl border border-white/15 bg-[#0a0d14] overflow-hidden shadow-2xl relative sticky top-20">
            
            {/* Top Toolbar */}
            <div className="px-4 py-2.5 bg-[#0e121c] border-b border-white/10 flex items-center justify-between text-xs text-slate-300">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-mono font-bold text-white tracking-wider">CANVAS EN DIRECT · {resolutionMode} NEURAL</span>
                <span className="text-slate-500">|</span>
                <span className="text-[11px] text-slate-400 font-mono">
                  {durationHours}h {durationMinutes}m {durationSeconds}s
                </span>
              </div>

              <div className="flex items-center gap-2 font-mono text-[11px]">
                <span className="px-1.5 py-0.5 rounded bg-purple-950/80 text-purple-200 border border-purple-800/40 font-bold">
                  {currentStudioStyle.toUpperCase()}
                </span>
                <span className="px-1.5 py-0.5 rounded bg-black/60 text-emerald-400 border border-white/10">
                  MOUVEMENT RÉEL 60 FPS
                </span>
              </div>
            </div>

            {/* Video Viewport Stage */}
            <div className="relative aspect-video w-full overflow-hidden bg-black select-none">
              
              {/* Background Landscape (Can be modified or deleted in Mode Privé) */}
              {activeLandscape && activeLandscape.isVisible ? (
                <div
                  className="absolute inset-0 bg-cover bg-center transition-all duration-700"
                  style={{
                    backgroundImage: `url(${activeLandscape.bgImageUrl})`,
                    filter:
                      activeLandscape.weather === 'twilight'
                        ? 'hue-rotate(290deg) saturate(1.2)'
                        : activeLandscape.weather === 'neon_night'
                        ? 'contrast(1.2) brightness(0.85)'
                        : 'none',
                  }}
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-b from-[#121624] via-[#090b11] to-black flex items-center justify-center text-slate-600 text-xs">
                  (Décor supprimé en Mode Privé - Fond Studio Neutre)
                </div>
              )}

              {/* Characters & Creatures layer rendered on canvas */}
              {characters
                .filter((c) => c.isVisible)
                .map((char) => (
                  <div
                    key={char.id}
                    className={`absolute transition-all duration-500 cursor-pointer group ${
                      editingCharacterId === char.id ? 'ring-2 ring-cyan-400 ring-offset-2 ring-offset-black rounded-lg' : ''
                    }`}
                    style={{
                      left: `${char.posX}%`,
                      top: `${char.posY}%`,
                      transform: `scale(${char.scale}) translate(-50%, 0)`,
                    }}
                    onClick={() => setEditingCharacterId(char.id)}
                  >
                    {/* Character Avatar / Sprite with real human / creature motion */}
                    <div className="relative">
                      <img
                        src={char.animeAvatarUrl}
                        alt={char.name}
                        className={`w-32 sm:w-44 h-auto rounded-lg shadow-2xl object-cover transition-transform ${
                          isPlaying
                            ? char.motionType === 'saitama_punch'
                              ? 'animate-pulse hover:scale-110 duration-700'
                              : char.motionType === 'miraculous_acrobatics'
                              ? 'animate-bounce duration-1000'
                              : char.motionType === 'beast_flight'
                              ? 'hover:-translate-y-2 transition-transform duration-500'
                              : 'animate-bounce duration-1000'
                            : ''
                        }`}
                      />

                      {/* Lip Sync Badge & Speech bubble */}
                      {char.isTalking && (
                        <div className="absolute -top-14 left-1/2 -translate-x-1/2 w-48 sm:w-60 p-2 rounded-xl bg-black/85 backdrop-blur-md border border-white/20 text-white text-[10px] shadow-xl z-20">
                          <div className="flex items-center justify-between text-cyan-300 font-bold mb-0.5">
                            <span>{char.name}</span>
                            <span className="text-[9px] text-amber-300 font-mono">
                              {char.motionType?.replace('_', ' ').toUpperCase()}
                            </span>
                          </div>
                          <p className="italic text-slate-200 line-clamp-2">
                            {char.dialogue || '« Animation humaine fluide et vivante ! »'}
                          </p>
                        </div>
                      )}

                      {/* Selection tag */}
                      <div className="absolute bottom-1 inset-x-1 px-1.5 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] font-semibold text-white text-center truncate">
                        {char.entityType === 'bizarre_beast' ? '🐾 ' : '⚡ '}
                        {char.name}
                      </div>
                    </div>
                  </div>
                ))}

              {/* WATERMARK OVERLAY (Mandatory on Free Trial, removed on Paid Subscription) */}
              {userSubscription.watermarkEnabled && (
                <div className="absolute bottom-14 right-4 pointer-events-none select-none z-30">
                  <div className="px-3 py-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/20 flex items-center gap-2 shadow-2xl">
                    <div className="w-4 h-4 rounded bg-rose-600 flex items-center justify-center text-white font-black text-[9px]">
                      神
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[11px] font-black tracking-widest text-white/90">
                        KAMUI STUDIO
                      </span>
                      <span className="text-[8px] font-mono text-amber-400">
                        Essai Gratuit · Sans filigrane dès abonnement
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Video Bottom Playback Bar */}
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/95 via-black/80 to-transparent flex items-center justify-between gap-3 text-xs text-white z-20">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="p-1.5 rounded-lg bg-gradient-to-r from-rose-600 to-purple-600 hover:from-rose-500 hover:to-purple-500 text-white cursor-pointer shadow"
                  >
                    {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                  </button>

                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white cursor-pointer"
                  >
                    {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                  </button>

                  <span className="font-mono text-[11px] text-slate-300 tabular-nums">
                    00:0{currentTimeSec}:12 / {durationHours > 0 ? `${durationHours}h ` : ''}{durationMinutes}m {durationSeconds}s
                  </span>
                </div>

                {/* Progress bar */}
                <div className="flex-1 mx-2 h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-rose-500 via-purple-500 to-cyan-400 w-[45%]" />
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-amber-300 font-bold">
                  <span>{resolutionMode} MASTER</span>
                </div>
              </div>

            </div>

            {/* Bottom Info & Free Trial reminder */}
            <div className="p-3.5 bg-[#0e111a] border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
              <div className="text-slate-300">
                {userSubscription.watermarkEnabled ? (
                  <span className="text-amber-300 flex items-center gap-1.5 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Mode Essai Gratuit ({userSubscription.freeTrialCredits} crédits restants) : Filigrane actif.
                  </span>
                ) : (
                  <span className="text-emerald-400 flex items-center gap-1.5 font-medium">
                    <Check className="w-3.5 h-3.5" />
                    Abonnement actif : Filigrane supprimé à 100%. Export {resolutionMode} illimité.
                  </span>
                )}
              </div>

              {userSubscription.watermarkEnabled && (
                <button
                  onClick={onUpgradePrompt}
                  className="text-rose-400 hover:text-rose-300 font-bold underline transition-colors self-start sm:self-auto cursor-pointer"
                >
                  Supprimer le filigrane avec un pack &rarr;
                </button>
              )}
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
