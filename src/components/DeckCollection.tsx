import { useState, type ComponentType } from 'react';
import { 
  Shield, Sparkles, Zap, Sun, Target, Skull, 
  Leaf, Music, HeartHandshake, Flame, 
  Sword, Heart, Droplet, Trash2, Eye,
  FlaskConical, Layers, LucideProps
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Character } from '../types';

interface DeckCollectionProps {
  deck: Character[];
  activeCharacterId?: string;
  onSelectCharacter: (char: Character) => void;
  onRemoveFromDeck: (charId: string) => void;
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

export default function DeckCollection({
  deck,
  activeCharacterId,
  onSelectCharacter,
  onRemoveFromDeck,
}: DeckCollectionProps) {
  return (
    <section id="my-deck-section" className="w-full max-w-5xl mx-auto mt-10 mb-8 z-10 relative">
      <div className="flex items-center justify-between pb-3 mb-5 border-b-2 border-[#5C3E20]">
        <div className="flex items-center gap-2.5">
          <Layers className="w-5 h-5 text-[#D4A359]" />
          <h3 className="text-xl sm:text-2xl font-normal text-[#FFF5E4] font-medieval copper-engraving">
            My Deck Collection
          </h3>
          <span className="px-2.5 py-0.5 bg-[#2B1B10] border border-[#8C6230] text-xs font-almendra text-[#E5B56D] font-bold rounded-md">
            {deck.length} {deck.length === 1 ? 'Card' : 'Cards'}
          </span>
        </div>
        <div className="text-[11px] uppercase tracking-widest text-[#B39D7D]/60 font-almendra hidden sm:block">
          ✦ Saved Transmutations & Champions ✦
        </div>
      </div>

      {deck.length === 0 ? (
        <div className="w-full grimoire-parchment border-2 border-dashed border-[#523A21] p-8 text-center shadow-lg rounded-xl">
          <Layers className="w-10 h-10 text-[#8C6230]/50 mx-auto mb-2" />
          <h4 className="text-base sm:text-lg font-almendra font-bold text-[#E5B56D]">
            Your Deck is Empty
          </h4>
          <p className="text-xs sm:text-sm font-serif italic text-[#B39D7D]/80 max-w-md mx-auto mt-1">
            Transmute a character above, customize their portrait and origin backstory, then click <strong className="text-[#D4A359]">"Save to Deck"</strong> to assemble your champions.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          <AnimatePresence>
            {deck.map((card) => {
              const IconComponent = CLASS_ICONS[card.characterClass.iconName] || Sparkles;
              const isActive = card.id === activeCharacterId;

              return (
                <motion.div
                  key={card.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.25 }}
                  className={`relative group rounded-xl transition-all duration-300 ${
                    isActive 
                      ? 'ring-2 ring-[#E5B56D] shadow-[0_0_25px_rgba(229,181,109,0.25)]' 
                      : 'hover:border-[#9E733B]'
                  }`}
                >
                  <div className="absolute -top-1 -left-1 w-2 h-2 border-t border-l border-[#D4A359] z-20" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 border-t border-r border-[#D4A359] z-20" />
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 border-b border-l border-[#D4A359] z-20" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-b border-r border-[#D4A359] z-20" />

                  <div className="deck-card-shell grimoire-parchment p-4 flex flex-col justify-between h-full relative overflow-hidden rounded-xl">
                    {/* Header */}
                    <div>
                      <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#3D2C1B] mb-3">
                        <div className="flex items-center gap-1.5 truncate">
                          <IconComponent className="w-3.5 h-3.5 text-[#D4A359] shrink-0" />
                          <span className="text-[11px] uppercase tracking-wider text-[#E5B56D] font-almendra font-bold truncate">
                            {card.characterClass.name}
                          </span>
                          <span className="text-[10px] text-[#A89478]/60 font-almendra">
                            • {card.race}
                          </span>
                        </div>

                        {isActive && (
                          <span className="px-1.5 py-0.2 bg-[#2B1B10] border border-[#D4A359] text-[9px] uppercase tracking-widest text-[#E5B56D] font-almendra font-bold">
                            Active
                          </span>
                        )}
                      </div>

                      {/* Main Card Content: Portrait + Name */}
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-16 h-16 bg-[#0E0B08] border border-[#8C6230] shrink-0 overflow-hidden relative shadow-inner">
                          {card.portraitUrl ? (
                            <img
                              src={card.portraitUrl}
                              alt={card.name}
                              referrerPolicy="no-referrer"
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-[#140F0B]">
                              <FlaskConical className="w-5 h-5 text-[#8C6230]/40" />
                            </div>
                          )}
                        </div>

                        <div className="overflow-hidden">
                          <h4 className="font-medieval text-lg sm:text-xl text-[#FFF5E4] truncate leading-tight copper-engraving">
                            {card.name}
                          </h4>
                          <span className="text-[10px] text-[#A89478] font-almendra block truncate mt-0.5">
                            {card.characterClass.primaryWeapon}
                          </span>
                        </div>
                      </div>

                      {/* Stats Bar */}
                      <div className="grid grid-cols-3 gap-1.5 text-center p-1.5 bg-[#120D09] border border-[#3D2B1B] mb-3">
                        <div className="flex items-center justify-center gap-1">
                          <Heart className="w-3 h-3 text-[#E05252]" />
                          <span className="font-medieval text-xs text-[#FFA8A8]">{card.stats.health}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 border-x border-[#3D2B1B]">
                          <Droplet className="w-3 h-3 text-[#4DA8DA]" />
                          <span className="font-medieval text-xs text-[#AEE2FF]">{card.stats.mana}</span>
                        </div>
                        <div className="flex items-center justify-center gap-1">
                          <Sword className="w-3 h-3 text-[#E5B56D]" />
                          <span className="font-medieval text-xs text-[#FFF1CC]">{card.stats.strength}</span>
                        </div>
                      </div>

                      {/* Backstory Inscription */}
                      {card.backstory ? (
                        <p className="text-[11px] font-serif italic text-[#D8C7AA] line-clamp-2 leading-tight pl-2 border-l border-[#8C6230]/50 mb-3">
                          "{card.backstory}"
                        </p>
                      ) : (
                        <p className="text-[10px] font-almendra italic text-[#8C765C]/60 mb-3">
                          Origin not yet inscribed.
                        </p>
                      )}
                    </div>

                    {/* Card Actions */}
                    <div className="flex items-center justify-between gap-2 pt-2 border-t border-[#3D2C1B] mt-auto">
                      <button
                        type="button"
                        onClick={() => onSelectCharacter(card)}
                        className="flex-1 py-1 px-2 bg-[#20140A] hover:bg-[#342213] border border-[#7A562A] hover:border-[#D4A359] text-[#E5B56D] text-[10px] uppercase tracking-wider font-almendra font-bold flex items-center justify-center gap-1 transition-all cursor-pointer"
                        title="View / Inspect champion on main altar"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Inspect Card</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => onRemoveFromDeck(card.id)}
                        className="py-1 px-2 bg-[#20140A] hover:bg-[#3A1412] border border-[#5C2A28] hover:border-[#A83232] text-[#E08A8A] text-[10px] font-almendra transition-all cursor-pointer"
                        title="Remove card from deck"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
