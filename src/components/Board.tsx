import clsx from 'clsx';
import { Character, Letter } from '../types';

type BoardProps = {
  board: Letter[];
  onToggleEnabled: (character: Character) => void;
};

export default function Board({ board, onToggleEnabled }: BoardProps) {
  return (
    <main className="p-4 grid grid-cols-2 gap-4 shadow rounded bg-white">
      <span className="self-center justify-self-center text-9xl">A</span>
      <div className="grid grid-cols-5 gap-4">
        {board.map((letter) => (
          <button
            key={letter.character}
            className={clsx({
              'p-2 uppercase rounded bg-blue-100 shadow': true,
              'bg-gray-100': !letter.isEnabled,
            })}
            onClick={() => onToggleEnabled(letter.character)}
            data-selected={letter.isEnabled}
          >
            {letter.character}
          </button>
        ))}
      </div>
    </main>
  );
}
