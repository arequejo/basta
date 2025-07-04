import type { characters } from './utils/alphabet.ts';

export type Character = typeof characters[number];

export type Letter = {
  character: Character;
  isEnabled: boolean;
  hasBeenPicked: boolean;
};
