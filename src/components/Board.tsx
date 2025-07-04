import type { Character, Letter } from '../types.ts';
import { Button } from './Button.tsx';

type BoardProps = {
  disabled: boolean;
  current: Character | null;
  board: Letter[];
  onToggleEnabled: (character: Character) => void;
};

export function Board({
  disabled,
  current,
  board,
  onToggleEnabled,
}: BoardProps) {
  return (
    <main
      className="grid grid-cols-4 gap-6 xs:grid-cols-5 xs:gap-4"
      data-testid="board"
    >
      {board.map(({ character, isEnabled, hasBeenPicked }) => (
        <Button
          key={character}
          variant="letter"
          data-current={character === current}
          data-past={hasBeenPicked && character !== current}
          aria-pressed={!isEnabled}
          disabled={disabled}
          onClick={() => onToggleEnabled(character)}
        >
          {character}
        </Button>
      ))}
    </main>
  );
}
