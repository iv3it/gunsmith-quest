export interface QuestParts {
  parts: number[];
}

export interface Weapon {
  slug: string;
  name: string;
  icon: string;
  traders: Trader[];
}

export interface Trader {
  trader: {
    slug: string;
    name: string;
  };
  loyalty: number;
  task?: string;
  isBarter: boolean;
}

export type WeaponWithQuestParts = Omit<Weapon, 'traders'> & {
  questParts: number[];
};

export interface Variant {
  parts: {
    items: Weapon[][];
  }[]
}

export interface Build {
	weapon: Weapon;
  variants: Variant[];
}

export interface QuestData {
  version: number;
  id: number;
  builds: Build[];
}