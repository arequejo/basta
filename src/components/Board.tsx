import clsx from 'clsx';
import { Character, Letter } from '../types';

type BoardProps = {
  current: Character | null;
  board: Letter[];
  onToggleEnabled: (character: Character) => void;
};

export default function Board({ current, board, onToggleEnabled }: BoardProps) {
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
        {board.map((letter) => (
          <button
            key={letter.character}
            className={clsx({
              'rounded bg-blue-200 p-2 uppercase shadow': true,
              'bg-gray-100': !letter.isEnabled,
              'bg-blue-50':
                letter.hasBeenPicked && letter.character !== current,
              'bg-blue-400':
                letter.hasBeenPicked && letter.character === current,
            })}
            onClick={() => onToggleEnabled(letter.character)}
            aria-pressed={!letter.isEnabled}
          >
            {letter.character}
          </button>
        ))}
      </div>
    </main>
  );
}
