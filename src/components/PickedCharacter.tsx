import type { Character } from '../types.ts';

type PickedCharacterProps = {
  character: Character;
};

export function PickedCharacter({ character }: PickedCharacterProps) {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/95 text-9xl uppercase text-white"
      data-testid="picked-letter"
    >
      {character}
    </div>
  );
}
