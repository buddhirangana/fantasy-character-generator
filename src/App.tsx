/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Sparkles, Dices, RotateCcw, History, Feather, FlaskConical, Flame, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Character } from './types';
import { generateRandomCharacter } from './data/fantasyData';
import CharacterCard from './components/CharacterCard';
import DeckCollection from './components/DeckCollection';

const STORAGE_KEY_DECK = 'alchemist_fantasy_deck_v1';

export default function App() {
  const [character, setCharacter] = useState<Character>(() => generateRandomCharacter());
  const [history, setHistory] = useState<Character[]>([]);
  const [isRolling, setIsRolling] = useState<boolean>(false);
  const [isGeneratingPortrait, setIsGeneratingPortrait] = useState<boolean>(false);
  const [isGeneratingBackstory, setIsGeneratingBackstory] = useState<boolean>(false);
  
  // My Deck state persisted locally
  const [deck, setDeck] = useState<Character[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_DECK);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // Fallback
    }
    return [];
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_DECK, JSON.stringify(deck));
    } catch (err) {
      console.warn('Could not save deck to localStorage:', err);
    }
  }, [deck]);

  const handleGenerate = () => {
    setIsRolling(true);
    setTimeout(() => {
      const nextChar = generateRandomCharacter();
      setCharacter((prev) => {
        setHistory((hist) => [prev, ...hist.slice(0, 4)]);
        return nextChar;
      });
      setIsRolling(false);
    }, 220);
  };

  const handleSelectHistorical = (histChar: Character) => {
    setCharacter(histChar);
  };

  const fetchPortraitForCharacter = async (char: Character) => {
    setIsGeneratingPortrait(true);
    try {
      const response = await fetch('/api/generate-portrait', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: char.name,
          characterClass: char.characterClass.name,
          race: char.race,
          trait: char.trait,
          affinity: char.characterClass.affinity,
          weapon: char.characterClass.primaryWeapon,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate portrait');
      }

      const data = await response.json();
      if (data.imageUrl) {
        setCharacter((prev) => {
          if (prev.id === char.id) {
            return { ...prev, portraitUrl: data.imageUrl };
          }
          return prev;
        });

        // Also update in history
        setHistory((prevHist) =>
          prevHist.map((h) => (h.id === char.id ? { ...h, portraitUrl: data.imageUrl } : h))
        );

        // Also update in deck if present
        setDeck((prevDeck) =>
          prevDeck.map((d) => (d.id === char.id ? { ...d, portraitUrl: data.imageUrl } : d))
        );
      }
    } catch (err) {
      console.error('Error generating portrait:', err);
    } finally {
      setIsGeneratingPortrait(false);
    }
  };

  const fetchBackstoryForCharacter = async (char: Character) => {
    setIsGeneratingBackstory(true);
    try {
      const response = await fetch('/api/generate-backstory', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: char.name,
          characterClass: char.characterClass.name,
          race: char.race,
          origin: char.origin,
          trait: char.trait,
          affinity: char.characterClass.affinity,
          weapon: char.characterClass.primaryWeapon,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate backstory');
      }

      const data = await response.json();
      if (data.backstory) {
        setCharacter((prev) => {
          if (prev.id === char.id) {
            return { ...prev, backstory: data.backstory };
          }
          return prev;
        });

        // Also update in history
        setHistory((prevHist) =>
          prevHist.map((h) => (h.id === char.id ? { ...h, backstory: data.backstory } : h))
        );

        // Also update in deck if present
        setDeck((prevDeck) =>
          prevDeck.map((d) => (d.id === char.id ? { ...d, backstory: data.backstory } : d))
        );
      }
    } catch (err) {
      console.error('Error generating backstory:', err);
    } finally {
      setIsGeneratingBackstory(false);
    }
  };

  const handleGeneratePortrait = () => {
    fetchPortraitForCharacter(character);
  };

  const handleRegeneratePortrait = () => {
    fetchPortraitForCharacter(character);
  };

  const handleGenerateBackstory = () => {
    fetchBackstoryForCharacter(character);
  };

  const handleRegenerateBackstory = () => {
    fetchBackstoryForCharacter(character);
  };

  const handleSaveToDeck = () => {
    setDeck((prevDeck) => {
      const existsIndex = prevDeck.findIndex((c) => c.id === character.id);
      if (existsIndex >= 0) {
        // Update existing card with latest edits
        const updated = [...prevDeck];
        updated[existsIndex] = { ...character };
        return updated;
      }
      return [character, ...prevDeck];
    });
  };

  const handleRemoveFromDeck = (charId: string) => {
    setDeck((prevDeck) => prevDeck.filter((c) => c.id !== charId));
  };

  const isSavedInDeck = deck.some((c) => c.id === character.id);

  return (
    <div className="min-h-screen w-full alchemist-workbench text-[#E8DEC8] flex flex-col justify-between p-4 sm:p-8 relative overflow-x-hidden selection:bg-[#B88741]/30">
      {/* Alchemical Ambience / Subtle Ember Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-10 left-1/4 w-[400px] h-[400px] bg-[#B85D23]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-[450px] h-[450px] bg-[#7A582C]/15 rounded-full blur-3xl" />
      </div>

      {/* Header Section: The Alchemist's Desk */}
      <header className="pt-6 sm:pt-10 pb-4 text-center relative z-10 max-w-xl mx-auto w-full">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#1A130C]/90 border border-[#8C6230] text-[#E5B56D] text-[11px] uppercase tracking-[0.25em] font-almendra mb-3 shadow-md">
          <FlaskConical className="w-3.5 h-3.5 text-[#D4A359]" />
          <span>The Grand Alchemical Workbench</span>
          <Flame className="w-3 h-3 text-[#E27D32]" />
        </div>

        <h1 className="text-3xl sm:text-5xl font-normal text-[#FFF5E4] font-medieval copper-engraving tracking-tight">
          Transmutation of Champions
        </h1>
        
        <p className="text-sm sm:text-base font-almendra italic text-[#C9B496] mt-2 max-w-md mx-auto">
          Distill ancient elements, mortal bloodlines, and eldritch disciplines into collectible player cards.
        </p>

        {/* Vintage Inscribed Brass Rule */}
        <div className="flex items-center justify-center gap-3 mt-4 opacity-50">
          <div className="w-16 h-px bg-gradient-to-r from-transparent to-[#D4A359]" />
          <span className="text-[#D4A359] text-xs">⚗️</span>
          <div className="w-16 h-px bg-gradient-to-l from-transparent to-[#D4A359]" />
        </div>
      </header>

      {/* Main Crucible: Transmutation Button & Grimoire Player Card */}
      <main className="flex-grow flex flex-col items-center justify-center px-2 sm:px-6 relative z-10 w-full max-w-xl mx-auto gap-7 my-3">
        {/* Main Action Button - Heavy Brass Inscribed Seal */}
        <div className="w-full flex justify-center">
          <motion.button
            id="generate-character-btn"
            type="button"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98, y: 1 }}
            onClick={handleGenerate}
            disabled={isRolling}
            className="w-full sm:w-auto px-10 py-4 bg-gradient-to-b from-[#3D2615] via-[#2A180C] to-[#1A0E06] border-2 border-[#B88741] hover:border-[#F2BE6B] text-[#FFF4DE] text-sm sm:text-base uppercase tracking-[0.18em] font-medieval flex items-center justify-center gap-3 transition-all duration-200 cursor-pointer shadow-[0_6px_30px_rgba(0,0,0,0.8),inset_0_1px_2px_rgba(255,255,255,0.15)] group"
          >
            <motion.div
              animate={isRolling ? { rotate: 360 } : { rotate: 0 }}
              transition={{ duration: 0.35 }}
            >
              <Dices className="w-5 h-5 text-[#D4A359] group-hover:text-[#FFF]" />
            </motion.div>
            <span className="copper-engraving">
              {isRolling ? 'Transmuting Essence...' : 'Transmute Fantasy Champion'}
            </span>
            <Sparkles className="w-4 h-4 text-[#D4A359] group-hover:text-[#FFF]" />
          </motion.button>
        </div>

        {/* Player Card Display */}
        <div className="w-full flex justify-center">
          <AnimatePresence mode="wait">
            <CharacterCard
              key={character.id}
              character={character}
              isRolling={isRolling}
              isGeneratingPortrait={isGeneratingPortrait}
              isGeneratingBackstory={isGeneratingBackstory}
              isSavedInDeck={isSavedInDeck}
              onGeneratePortrait={handleGeneratePortrait}
              onRegeneratePortrait={handleRegeneratePortrait}
              onGenerateBackstory={handleGenerateBackstory}
              onRegenerateBackstory={handleRegenerateBackstory}
              onSaveToDeck={handleSaveToDeck}
            />
          </AnimatePresence>
        </div>

        {/* Recent Transmutations Chronicle */}
        {history.length > 0 && (
          <div className="w-full grimoire-parchment border border-[#523A21] p-3.5 relative shadow-lg">
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#D4A359] mb-2.5 font-almendra font-bold">
              <History className="w-3 h-3 text-[#D4A359]" />
              <span>Recent Summon History</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {history.map((hist) => (
                <button
                  key={hist.id}
                  type="button"
                  onClick={() => handleSelectHistorical(hist)}
                  className="inline-flex items-center gap-2 px-3 py-1.5 text-xs bg-[#120E0A] hover:bg-[#211810] text-[#E8DEC8] hover:text-[#FFF5E4] border border-[#47331D] hover:border-[#D4A359] transition duration-200 cursor-pointer shadow-xs"
                >
                  {hist.portraitUrl ? (
                    <img
                      src={hist.portraitUrl}
                      alt={hist.name}
                      referrerPolicy="no-referrer"
                      className="w-4 h-4 rounded-xs object-cover border border-[#D4A359]/50"
                    />
                  ) : (
                    <RotateCcw className="w-2.5 h-2.5 text-[#D4A359] opacity-70" />
                  )}
                  <span className="font-medieval text-sm">{hist.name}</span>
                  <span className="text-[#C49346] text-[11px] font-almendra">({hist.characterClass.name})</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MY DECK COLLECTION SECTION */}
        <DeckCollection
          deck={deck}
          activeCharacterId={character.id}
          onSelectCharacter={(selectedCard) => setCharacter(selectedCard)}
          onRemoveFromDeck={handleRemoveFromDeck}
        />
      </main>

      {/* Alchemist's Manuscript Footer */}
      <footer className="pt-5 pb-3 sm:pb-6 px-4 sm:px-12 flex flex-col sm:flex-row justify-between items-center sm:items-end gap-3 text-center sm:text-left relative z-10 border-t border-[#291D12] max-w-5xl mx-auto w-full text-[#9E8A70]">
        <div className="text-[10px] uppercase tracking-widest leading-relaxed font-almendra">
          Codex Alchimia: Opus Magnum VII <br />
          Player Card Deck & Archival Chamber
        </div>
        <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-widest text-[#D4A359]/70 font-almendra">
          <Feather className="w-3 h-3 opacity-60" />
          <span>From Lead to Legend • Bound by Quintessence</span>
        </div>
      </footer>
    </div>
  );
}
