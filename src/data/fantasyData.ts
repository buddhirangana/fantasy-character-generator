import { Character, CharacterClass } from '../types';

export const CLASSES: CharacterClass[] = [
  {
    name: 'Warrior',
    category: 'Martial',
    description: 'A disciplined master of melee combat, heavy armor, and frontline defense.',
    iconName: 'Shield',
    color: 'text-amber-400',
    bgGradient: 'from-amber-500/20 to-orange-600/10 border-amber-500/30',
    primaryWeapon: 'Greatsword & Heavy Shield',
    affinity: 'Physical Might',
  },
  {
    name: 'Mage',
    category: 'Arcane',
    description: 'A scholar of mystical ley lines who wields destructive elemental and cosmic incantations.',
    iconName: 'Sparkles',
    color: 'text-cyan-400',
    bgGradient: 'from-cyan-500/20 to-blue-600/10 border-cyan-500/30',
    primaryWeapon: 'Arcane Focus Staff',
    affinity: 'Aether & Frost',
  },
  {
    name: 'Rogue',
    category: 'Shadow',
    description: 'A lethal opportunist specializing in stealth, precision strikes, and lockpicking.',
    iconName: 'Zap',
    color: 'text-emerald-400',
    bgGradient: 'from-emerald-500/20 to-teal-600/10 border-emerald-500/30',
    primaryWeapon: 'Twin Enchanted Daggers',
    affinity: 'Venom & Shadow',
  },
  {
    name: 'Paladin',
    category: 'Divine',
    description: 'A holy crusader sworn by oath to vanquish corruption and safeguard the innocent.',
    iconName: 'Sun',
    color: 'text-yellow-400',
    bgGradient: 'from-yellow-500/20 to-amber-600/10 border-yellow-500/30',
    primaryWeapon: 'Blessed Warhammer',
    affinity: 'Radiant Light',
  },
  {
    name: 'Ranger',
    category: 'Primal',
    description: 'A peerless tracker and marksman who navigates the wild frontier with lethal instinct.',
    iconName: 'Target',
    color: 'text-lime-400',
    bgGradient: 'from-lime-500/20 to-emerald-600/10 border-lime-500/30',
    primaryWeapon: 'Elven Longbow',
    affinity: 'Flora & Fauna',
  },
  {
    name: 'Necromancer',
    category: 'Arcane',
    description: 'A forbidden spellweaver who manipulates soul essence and summons the departed.',
    iconName: 'Skull',
    color: 'text-purple-400',
    bgGradient: 'from-purple-500/20 to-violet-900/20 border-purple-500/30',
    primaryWeapon: 'Bone Scepter & Grimoire',
    affinity: 'Soulfrost & Decay',
  },
  {
    name: 'Druid',
    category: 'Primal',
    description: 'A guardian of natural balance capable of channeling wild storms and shapeshifting.',
    iconName: 'Leaf',
    color: 'text-green-400',
    bgGradient: 'from-green-500/20 to-teal-700/10 border-green-500/30',
    primaryWeapon: 'Elderwood Totem',
    affinity: 'Tempest & Earth',
  },
  {
    name: 'Bard',
    category: 'Arcane',
    description: 'A charismatic performer weaving ancient sonic enchantments and battlefield inspiration.',
    iconName: 'Music',
    color: 'text-rose-400',
    bgGradient: 'from-rose-500/20 to-pink-600/10 border-rose-500/30',
    primaryWeapon: 'Spell-Tuned Lute & Rapier',
    affinity: 'Harmonic Resonance',
  },
  {
    name: 'Cleric',
    category: 'Divine',
    description: 'A divine emissary wielding restorative miracles and protective barrier wards.',
    iconName: 'HeartHandshake',
    color: 'text-sky-400',
    bgGradient: 'from-sky-500/20 to-indigo-600/10 border-sky-500/30',
    primaryWeapon: 'Sanctified Morningstar',
    affinity: 'Celestial Grace',
  },
  {
    name: 'Monk',
    category: 'Martial',
    description: 'A martial artist who harnesses inner spiritual energy into devastating lightning blows.',
    iconName: 'Flame',
    color: 'text-orange-400',
    bgGradient: 'from-orange-500/20 to-red-600/10 border-orange-500/30',
    primaryWeapon: 'Ki-Infused Wraps',
    affinity: 'Inner Chi',
  }
];

export const FIRST_NAMES = [
  'Aeloria', 'Thorgar', 'Kaelen', 'Sylas', 'Valeria', 'Brynna', 'Darius',
  'Mirela', 'Gideon', 'Zephyr', 'Orion', 'Elowen', 'Cassian', 'Isolde',
  'Ragnar', 'Lyra', 'Morrigan', 'Torin', 'Astrid', 'Vaelin', 'Seraphina',
  'Corvus', 'Thalor', 'Rhiannon', 'Alden', 'Freya', 'Kallum', 'Nesta',
  'Garrick', 'Yvaine', 'Fenris', 'Rowena', 'Baelor', 'Alistair', 'Caelum'
];

export const SURNAMES_AND_EPITHETS = [
  'Nightwhisper', 'Ironbreaker', 'Dawnstrider', 'Stormborn', 'the Undying',
  'Shadowmend', 'Frostvale', 'Sunfire', 'Crowfeather', 'Bloodfang',
  'Starweaver', 'Oakenshield', 'Gloomveil', 'Deepdelver', 'Moonbrook',
  'Ashfall', 'the Silver-Tongued', 'Voidwalker', 'Drakewarden', 'the Resolute',
  'Runecarver', 'Wildheart', 'Swiftstrike', 'the Wandering Seer', 'Ironwrath'
];

export const RACES = [
  'High Elf', 'Mountain Dwarf', 'Human', 'Tiefling', 'Wood Elf',
  'Dragonborn', 'Gnome', 'Half-Orc', 'Aasimar', 'Moon Elf'
];

export const TRAITS = [
  'Unnaturally calm during high-stakes ambushes',
  'Possesses a photographic memory for ancient runes',
  'Refuses to draw a blade against an unarmed foe',
  'Can hear whispers in the ambient wind',
  'Carries an ancient enchanted locket from a forgotten realm',
  'Always sleeps with one eye open and hand on weapon',
  'Instinctively knows the true cardinal direction underground',
  'Sparks subtle static electricity when agitated'
];

export const QUOTES = [
  '"The quietest blade strikes the deepest truth."',
  '"Stars fade, empires crumble, but my resolve remains iron."',
  '"Arcane knowledge is not given; it is demanded from the cosmos."',
  '"Stand behind my shield, and you will see tomorrow."',
  '"Nature does not bargain, and neither do I."',
  '"In the crucible of battle, fear is mere fuel."'
];

export const ORIGINS = [
  'The Obsidian Citadel of Kar-Drak',
  'The Whispering Glades of Valenwood',
  'The Sunken Spire of Aethelgard',
  'The High Crags of Frostpeak',
  'The Radiant Spires of Solaria',
  'The Under-Canopy of Shadowfen'
];

function getRandomItem<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function generateRandomCharacter(): Character {
  const firstName = getRandomItem(FIRST_NAMES);
  const surname = getRandomItem(SURNAMES_AND_EPITHETS);
  const isEpithet = surname.startsWith('the ');
  const fullName = isEpithet ? `${firstName} ${surname}` : `${firstName} ${surname}`;
  
  const charClass = getRandomItem(CLASSES);
  const race = getRandomItem(RACES);
  
  // Randomly generate core RPG stats tailored to player cards: Health, Mana, Strength
  let baseHealth = getRandomNumber(120, 280);
  let baseMana = getRandomNumber(60, 240);
  let baseStrength = getRandomNumber(14, 28);

  let agi = getRandomNumber(10, 18);
  let int = getRandomNumber(10, 18);
  let wil = getRandomNumber(10, 18);

  // Archetype modifiers
  if (charClass.category === 'Martial') {
    baseHealth += getRandomNumber(40, 80);
    baseStrength += getRandomNumber(6, 12);
    baseMana = Math.max(30, baseMana - 30);
  } else if (charClass.category === 'Arcane') {
    baseMana += getRandomNumber(60, 120);
    baseHealth = Math.max(100, baseHealth - 20);
    int += 6;
  } else if (charClass.category === 'Divine') {
    baseHealth += getRandomNumber(30, 60);
    baseMana += getRandomNumber(30, 60);
    wil += 5;
  } else if (charClass.category === 'Shadow') {
    baseStrength += getRandomNumber(2, 6);
    agi += 6;
  } else if (charClass.category === 'Primal') {
    baseHealth += getRandomNumber(20, 50);
    baseMana += getRandomNumber(20, 50);
    agi += 3;
    wil += 3;
  }

  return {
    id: 'char-' + Date.now() + '-' + Math.floor(Math.random() * 10000),
    name: fullName,
    title: `${race} ${charClass.name}`,
    race,
    characterClass: charClass,
    stats: {
      health: baseHealth,
      mana: baseMana,
      strength: baseStrength,
      agility: agi,
      intelligence: int,
      willpower: wil,
    },
    trait: getRandomItem(TRAITS),
    quote: getRandomItem(QUOTES),
    origin: getRandomItem(ORIGINS),
    generatedAt: new Date(),
  };
}
