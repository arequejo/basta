import clsx from 'clsx';
import { Button } from '.';
import { Character, Letter } from '../types';

type BoardProps = {
  isPlaying: boolean;
  current: Character | null;
  board: Letter[];
  onToggleEnabled: (character: Character) => void;
};

export default function Board({
  isPlaying,
  current,
  board,
  onToggleEnabled,
}: BoardProps) {
  return (
    <main
      className="grid grid-cols-2 gap-4 rounded bg-white p-4 shadow"
      data-testid="board"
    >
      <span
        className="self-center justify-self-center text-9xl uppercase"
        data-testid="current-character"
      >
        {current ?? '--'}
      </span>
      <div className="grid grid-cols-5 gap-4">
        {board.map(({ character, isEnabled, hasBeenPicked }) => (
          <Button
            key={character}
            variant="letter"
            data-current={character === current}
            data-past={hasBeenPicked && character !== current}
            aria-pressed={!isEnabled}
            disabled={isPlaying}
            onClick={() => onToggleEnabled(character)}
          >
            {character}
          </Button>
        ))}
      </div>
    </main>
  );
}
