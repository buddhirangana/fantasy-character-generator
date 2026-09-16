export interface CharacterStats {
  health: number;
  mana: number;
  strength: number;
  agility?: number;
  intelligence?: number;
  willpower?: number;
}

export interface CharacterClass {
  name: string;
  category: 'Martial' | 'Arcane' | 'Divine' | 'Primal' | 'Shadow';
  description: string;
  iconName: string;
  color: string;
  bgGradient: string;
  primaryWeapon: string;
  affinity: string;
}

export interface Character {
  id: string;
  name: string;
  title: string;
  race: string;
  characterClass: CharacterClass;
  stats: CharacterStats;
  trait: string;
  quote: string;
  origin: string;
  portraitUrl?: string;
  backstory?: string;
  generatedAt: Date | string;
}
