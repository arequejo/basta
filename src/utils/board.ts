import type { Character, Letter } from '../types.ts';
import { characters } from './alphabet.ts';
import { getRandomNumber } from './random.ts';

export function initBoard(): Letter[] {
  return characters.map((character) => ({
    character,
    isEnabled: true,
    hasBeenPicked: false,
  }));
}

export function pickNextCharacter(board: Letter[]): [Character, Letter[]] {
  const availableLetters = board.filter(
    (letter) => letter.isEnabled && !letter.hasBeenPicked
  );
  if (availableLetters.length === 0) {
    throw new Error('Cannot pick a character with an invalid board.');
  }
  const randomIndex = getRandomNumber(0, availableLetters.length - 1);
  const nextCharacter = availableLetters[randomIndex].character;
  const newBoard = board.map((letter) =>
    letter.character === nextCharacter
      ? { ...letter, hasBeenPicked: true }
      : letter
  );
  return [nextCharacter, newBoard];
}
