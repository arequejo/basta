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
    <main className="grid grid-cols-5 gap-6" data-testid="board">
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
    </main>
  );
}
