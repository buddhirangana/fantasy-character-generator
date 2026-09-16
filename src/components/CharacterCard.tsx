import { useState, type ComponentType } from 'react';
import { 
  Shield, Sparkles, Zap, Sun, Target, Skull, 
  Leaf, Music, HeartHandshake, Flame, 
  Sword, Compass, Award, Copy, Check, Feather,
  Image as ImageIcon, RefreshCw, Loader2, FlaskConical, ScrollText,
  Heart, Droplet, BookmarkPlus, BookmarkCheck, LucideProps
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Character } from '../types';

interface CharacterCardProps {
  key?: string;
  character: Character;
  isRolling?: boolean;
  isGeneratingPortrait?: boolean;
  isGeneratingBackstory?: boolean;
  isSavedInDeck?: boolean;
  onGeneratePortrait: () => void;
  onRegeneratePortrait: () => void;
  onGenerateBackstory: () => void;
  onRegenerateBackstory: () => void;
  onSaveToDeck: () => void;
}

const CLASS_ICONS: Record<string, ComponentType<LucideProps>> = {
  Shield,
  Sparkles,
  Zap,
  Sun,
  Target,
  Skull,
  Leaf,
  Music,
  HeartHandshake,
  Flame,
};

export default function CharacterCard({ 
  character, 
  isGeneratingPortrait, 
  isGeneratingBackstory,
  isSavedInDeck,
  onGeneratePortrait, 
  onRegeneratePortrait,
  onGenerateBackstory,
  onRegenerateBackstory,
  onSaveToDeck,
}: CharacterCardProps) {
  const [copied, setCopied] = useState(false);
  const IconComponent = CLASS_ICONS[character.characterClass.iconName] || Sparkles;

  const handleCopy = async () => {
    let text = `⚜️ ${character.name} ⚜️\n[${character.race} • ${character.characterClass.name}]\nHP: ${character.stats.health} | MP: ${character.stats.mana} | STR: ${character.stats.strength}\nPrimary Weapon: ${character.characterClass.primaryWeapon}\nAffinity: ${character.characterClass.affinity}\nHomeland: ${character.origin}\nTrait: ${character.trait}`;
    if (character.backstory) {
      text += `\nOrigin Backstory: ${character.backstory}`;
    }
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="relative group w-full max-w-xl">
      {/* Outer Stylized Player Card Beveled Border & Filigree Brackets */}
      <div className="absolute -inset-3 border-2 border-[#9E733B]/60 pointer-events-none rounded-sm shadow-[0_0_30px_rgba(0,0,0,0.9)]" />
      <div className="absolute -inset-1 border border-[#D4A359]/40 pointer-events-none" />

      {/* Ornate Corner Card Gems & Brackets */}
      <div className="absolute -top-4 -left-4 w-4 h-4 border-t-2 border-l-2 border-[#E5B56D] bg-[#2A1C12] pointer-events-none flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-[#E5B56D] rounded-full" />
      </div>
      <div className="absolute -top-4 -right-4 w-4 h-4 border-t-2 border-r-2 border-[#E5B56D] bg-[#2A1C12] pointer-events-none flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-[#E5B56D] rounded-full" />
      </div>
      <div className="absolute -bottom-4 -left-4 w-4 h-4 border-b-2 border-l-2 border-[#E5B56D] bg-[#2A1C12] pointer-events-none flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-[#E5B56D] rounded-full" />
      </div>
      <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b-2 border-r-2 border-[#E5B56D] bg-[#2A1C12] pointer-events-none flex items-center justify-center">
        <div className="w-1.5 h-1.5 bg-[#E5B56D] rounded-full" />
      </div>

      <motion.div
        key={character.id}
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -14 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        id="fantasy-player-card"
        className="w-full grimoire-parchment border-2 border-[#6B4C24] p-5 sm:p-7 text-[#E8DEC8] relative overflow-hidden shadow-[inset_0_0_25px_rgba(0,0,0,0.85)] rounded-[28px]"
      >
        {/* Card Header Top Bar: Class Sigil, Bloodline & Actions */}
        <div className="flex items-center justify-between gap-3 pb-3 border-b-2 border-[#4A351E]">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2 py-0.5 bg-[#2B1B10] border border-[#8C6230] text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#E5B56D] font-almendra font-bold flex items-center gap-1.5 shadow-sm rounded-full">
              <IconComponent className="w-3 h-3 text-[#D4A359]" />
              <span>{character.characterClass.name}</span>
            </span>
            <span className="text-[11px] sm:text-xs font-almendra text-[#C4B296] italic">
              {character.race}
            </span>
          </div>

          <div className="flex items-center gap-2 flex-wrap justify-end">
            {/* Save to Deck Button */}
            <button
              id="save-to-deck-btn"
              type="button"
              onClick={onSaveToDeck}
              className={`inline-flex items-center gap-1.5 px-3 py-1 text-[10px] sm:text-xs uppercase tracking-[0.15em] font-almendra font-bold transition-all duration-300 cursor-pointer shadow-md border ${
                isSavedInDeck
                  ? 'bg-[#1C2E1A] border-[#4E8D45] text-[#93E388]'
                  : 'bg-gradient-to-b from-[#3D2615] to-[#24150A] border-[#B88741] hover:border-[#F2BE6B] text-[#FFF4DE]'
              }`}
              title="Save player card to My Deck"
            >
              {isSavedInDeck ? (
                <>
                  <BookmarkCheck className="w-3.5 h-3.5 text-[#93E388]" />
                  <span>In Deck</span>
                </>
              ) : (
                <>
                  <BookmarkPlus className="w-3.5 h-3.5 text-[#D4A359]" />
                  <span>Save to Deck</span>
                </>
              )}
            </button>

            {/* Copy Button */}
            <button
              id="copy-character-btn"
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#241A12] hover:bg-[#342416] border border-[#8F6531] text-[#D4A359] text-[10px] sm:text-xs uppercase tracking-[0.12em] font-almendra transition-all duration-200 cursor-pointer rounded-full"
              title="Transcribe character details"
            >
              {copied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Character Title & Portrait Layout */}
        <div className="pt-5 pb-3">
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
            {/* Portrait Frame */}
            <div className="shrink-0 flex flex-col items-center">
              <div className="relative w-32 h-32 sm:w-36 sm:h-36 bg-[#0E0B08] border-2 border-[#9E733B] shadow-[inset_0_0_15px_rgba(0,0,0,0.9),0_0_25px_rgba(212,163,89,0.15)] overflow-hidden flex items-center justify-center p-1 rounded-[22px]">
                {/* Filigree corner brackets */}
                <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#D4A359] z-10 pointer-events-none" />
                <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#D4A359] z-10 pointer-events-none" />
                <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#D4A359] z-10 pointer-events-none" />
                <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#D4A359] z-10 pointer-events-none" />

                <AnimatePresence mode="wait">
                  {character.portraitUrl ? (
                    <motion.div 
                      key={character.portraitUrl}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="w-full h-full relative"
                    >
                      <img
                        src={character.portraitUrl}
                        alt={`${character.name} portrait`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover object-center filter contrast-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/20 pointer-events-none" />
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center p-2 text-center w-full h-full bg-[#140F0B] border border-dashed border-[#5C4124]">
                      <FlaskConical className="w-7 h-7 text-[#9E733B]/50 mb-1" />
                      <span className="text-[9px] uppercase tracking-wider text-[#A89478]/50 font-almendra leading-tight">
                        No Portrait
                      </span>
                    </div>
                  )}
                </AnimatePresence>

                {/* Loading state */}
                {isGeneratingPortrait && (
                  <div className="absolute inset-0 bg-[#0E0B08]/90 backdrop-blur-xs flex flex-col items-center justify-center gap-1.5 z-20">
                    <Loader2 className="w-6 h-6 text-[#D4A359] animate-spin" />
                    <span className="text-[9px] uppercase tracking-widest text-[#D4A359] font-almendra text-center px-1">
                      Painting Portrait...
                    </span>
                  </div>
                )}
              </div>

              {/* Portrait Control Buttons */}
              <div className="mt-2.5 w-full">
                {!character.portraitUrl ? (
                  <button
                    id="generate-portrait-btn"
                    type="button"
                    onClick={onGeneratePortrait}
                    disabled={isGeneratingPortrait}
                    className="w-full py-1.5 px-2 bg-gradient-to-b from-[#2F2115] to-[#1C130B] border border-[#9E733B] hover:border-[#D4A359] text-[#D4A359] hover:text-[#FFF4DD] text-[9px] sm:text-[10px] uppercase tracking-[0.12em] font-almendra font-bold flex items-center justify-center gap-1.5 transition-all duration-200 cursor-pointer shadow-md disabled:opacity-50 rounded-full"
                  >
                    <FlaskConical className="w-3 h-3" />
                    <span>Generate Portrait</span>
                  </button>
                ) : (
                  <button
                    id="regenerate-portrait-btn"
                    type="button"
                    onClick={onRegeneratePortrait}
                    disabled={isGeneratingPortrait}
                    className="w-full py-1.5 px-2 bg-gradient-to-b from-[#2F2115] to-[#1C130B] border border-[#9E733B] hover:border-[#D4A359] text-[#D4A359] hover:text-[#FFF4DD] text-[9px] sm:text-[10px] uppercase tracking-[0.1em] font-almendra font-bold flex items-center justify-center gap-1 transition-all duration-200 cursor-pointer shadow-md disabled:opacity-50 rounded-full"
                  >
                    <RefreshCw className={`w-3 h-3 ${isGeneratingPortrait ? 'animate-spin' : ''}`} />
                    <span>Regenerate Portrait</span>
                  </button>
                )}
              </div>
            </div>

            {/* Character Info */}
            <div className="flex-1 text-center sm:text-left">
              <div className="text-[10px] uppercase tracking-[0.25em] text-[#C49346] mb-1 font-almendra">
                ✦ Legendary Champion Card ✦
              </div>
              
              {/* Character Name in Medieval Fantasy Font */}
              <h2 
                id="character-name" 
                className="text-3xl sm:text-4xl font-normal text-[#FFF5E4] font-medieval copper-engraving tracking-wide leading-tight mb-1"
              >
                {character.name}
              </h2>
              
              <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 mb-2">
                <div id="character-class-badge" className="inline-flex items-center justify-center sm:justify-start gap-1.5 text-lg sm:text-xl font-almendra font-bold text-[#E5B56D]">
                  <IconComponent className="w-4 h-4 text-[#D4A359]" />
                  <span>{character.characterClass.name}</span>
                </div>
                <span className="text-[11px] uppercase tracking-widest text-[#B39D7D]/60 font-almendra">
                  • {character.characterClass.category} Discipline
                </span>
              </div>

              {/* Class Lore Inscription */}
              <p className="text-xs sm:text-sm italic text-[#D8C7AA] leading-relaxed pl-3 border-l-2 border-[#9E733B]/60 bg-[#120E0A]/40 py-1 pr-2 my-2">
                "{character.characterClass.description}"
              </p>
            </div>
          </div>
        </div>

        {/* PRIMARY PLAYER CARD STATS: Health, Mana, Strength */}
        <div className="my-3.5 p-3 bg-gradient-to-r from-[#17100B] via-[#1F160E] to-[#17100B] border-2 border-[#7A562A] shadow-inner">
          <div className="text-[10px] uppercase tracking-[0.25em] text-[#D4A359] text-center mb-2.5 font-almendra font-bold">
            ⚔️ Core Battle Attributes ⚔️
          </div>
          
          <div className="grid grid-cols-3 gap-2.5 text-center">
            {/* Health Stat Box */}
            <div id="stat-health" className="bg-[#120D09] border border-[#8B2522] p-2.5 relative shadow-md">
              <div className="flex items-center justify-center gap-1 text-[#E05252] text-[10px] uppercase tracking-wider font-almendra font-bold mb-0.5">
                <Heart className="w-3.5 h-3.5 fill-[#E05252]/30 text-[#E05252]" />
                <span>Health</span>
              </div>
              <div className="text-xl sm:text-2xl font-medieval text-[#FFA8A8] copper-engraving">
                {character.stats.health}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-[#E05252]/60 font-almendra">HP</div>
            </div>

            {/* Mana Stat Box */}
            <div id="stat-mana" className="bg-[#120D09] border border-[#255C8B] p-2.5 relative shadow-md">
              <div className="flex items-center justify-center gap-1 text-[#4DA8DA] text-[10px] uppercase tracking-wider font-almendra font-bold mb-0.5">
                <Droplet className="w-3.5 h-3.5 fill-[#4DA8DA]/30 text-[#4DA8DA]" />
                <span>Mana</span>
              </div>
              <div className="text-xl sm:text-2xl font-medieval text-[#AEE2FF] copper-engraving">
                {character.stats.mana}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-[#4DA8DA]/60 font-almendra">MP</div>
            </div>

            {/* Strength Stat Box */}
            <div id="stat-strength" className="bg-[#120D09] border border-[#966723] p-2.5 relative shadow-md rounded-xl">
              <div className="flex items-center justify-center gap-1 text-[#E5B56D] text-[10px] uppercase tracking-wider font-almendra font-bold mb-0.5">
                <Sword className="w-3.5 h-3.5 text-[#E5B56D]" />
                <span>Strength</span>
              </div>
              <div className="text-xl sm:text-2xl font-medieval text-[#FFF1CC] copper-engraving">
                {character.stats.strength}
              </div>
              <div className="text-[9px] uppercase tracking-widest text-[#E5B56D]/60 font-almendra">STR</div>
            </div>
          </div>
        </div>

        {/* Origin Backstory Feature Section */}
        <div className="my-3.5 bg-[#140E09] border border-[#523A21] p-3.5 relative shadow-inner rounded-2xl">
          <div className="flex items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-1.5 text-[#D4A359] text-[10px] sm:text-xs uppercase tracking-[0.2em] font-almendra font-bold">
              <ScrollText className="w-3.5 h-3.5 text-[#D4A359]" />
              <span>Origin Backstory</span>
            </div>

            {!character.backstory ? (
              <button
                id="generate-backstory-btn"
                type="button"
                onClick={onGenerateBackstory}
                disabled={isGeneratingBackstory}
                className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-b from-[#342213] to-[#20140A] border border-[#9E733B] hover:border-[#D4A359] text-[#D4A359] hover:text-[#FFF5E4] text-[10px] uppercase tracking-[0.12em] font-almendra font-bold transition duration-200 cursor-pointer shadow-md disabled:opacity-50 rounded-full"
              >
                {isGeneratingBackstory ? (
                  <>
                    <Loader2 className="w-3 h-3 animate-spin text-[#D4A359]" />
                    <span>Inscribing...</span>
                  </>
                ) : (
                  <>
                    <ScrollText className="w-3 h-3 text-[#D4A359]" />
                    <span>Generate Backstory</span>
                  </>
                )}
              </button>
            ) : (
              <button
                id="regenerate-backstory-btn"
                type="button"
                onClick={onRegenerateBackstory}
                disabled={isGeneratingBackstory}
                className="inline-flex items-center gap-1 px-2.5 py-0.5 bg-[#20140A] border border-[#7A562A] hover:border-[#D4A359] text-[#D4A359] text-[10px] uppercase tracking-[0.1em] font-almendra font-bold transition duration-200 cursor-pointer disabled:opacity-50 rounded-full"
                title="Rewrite backstory lore"
              >
                <RefreshCw className={`w-2.5 h-2.5 ${isGeneratingBackstory ? 'animate-spin' : ''}`} />
                <span>Rewrite Lore</span>
              </button>
            )}
          </div>

          {/* Backstory Content */}
          <AnimatePresence mode="wait">
            {character.backstory ? (
              <motion.div
                key={character.backstory}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="relative pl-3 border-l-2 border-[#D4A359]/70 pt-0.5"
              >
                <p id="character-backstory" className="text-xs sm:text-sm font-serif italic text-[#F2E5D0] leading-relaxed">
                  {character.backstory}
                </p>
              </motion.div>
            ) : (
              <div className="text-xs italic text-[#A89478]/70 font-almendra py-0.5 flex items-center gap-2">
                <span>✦ Click "Generate Backstory" to inscribe this {character.characterClass.name}'s origin chronicle.</span>
              </div>
            )}
          </AnimatePresence>
        </div>

        {/* Weapon & Origin Grid */}
        <div className="grid grid-cols-2 gap-2 text-xs mb-3">
          <div className="p-2 bg-[#130E0A] border border-[#422F1B] rounded-xl">
            <div className="flex items-center gap-1 text-[#D4A359] text-[9px] uppercase tracking-widest mb-0.5 font-almendra font-bold">
              <Sword className="w-3 h-3 text-[#C49346]" />
              <span>Armament</span>
            </div>
            <span className="text-[#F5EADB] font-medieval text-xs truncate block">{character.characterClass.primaryWeapon}</span>
          </div>

          <div className="p-2 bg-[#130E0A] border border-[#422F1B] rounded-xl">
            <div className="flex items-center gap-1 text-[#D4A359] text-[9px] uppercase tracking-widest mb-0.5 font-almendra font-bold">
              <Sparkles className="w-3 h-3 text-[#C49346]" />
              <span>Affinity</span>
            </div>
            <span className="text-[#F5EADB] font-medieval text-xs truncate block">{character.characterClass.affinity}</span>
          </div>
        </div>

        {/* Inscribed Card Quote */}
        <div className="flex items-start gap-2 text-[11px] text-[#BFA888] italic border-t border-[#2E2215] pt-2.5 rounded-b-2xl">
          <Feather className="w-3 h-3 text-[#D4A359] opacity-70 shrink-0 mt-0.5" />
          <span className="font-serif truncate">"{character.quote.replace(/^"|"$/g, '')}"</span>
        </div>
      </motion.div>
    </div>
  );
}
