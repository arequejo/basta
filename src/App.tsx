import React from 'react';
import { Board } from './components';
import { Character } from './types';
import { initBoard } from './utils/board';

export default function App() {
  const [board, setBoard] = React.useState(() => initBoard());

  const handleToggleEnabled = React.useCallback((character: Character) => {
    setBoard((prevBoard) =>
      prevBoard.map((letter) =>
        letter.character === character
          ? { ...letter, isEnabled: !letter.isEnabled }
          : letter
      )
    );
  }, []);

  return (
    <>
      <Board board={board} onToggleEnabled={handleToggleEnabled} />

      <div className="flex justify-end mt-4">
        <button
          className="px-8 py-2 bg-blue-500 text-white rounded shadow"
          onClick={() => setBoard(initBoard())}
        >
          Reset
        </button>
      </div>
    </>
  );
}
