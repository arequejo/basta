import { characters } from './alphabet';
import { Letter } from '../types';

export function initBoard(): Letter[] {
  return characters.map((character) => ({
    character,
    isEnabled: true,
  }));
}
