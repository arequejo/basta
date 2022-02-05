import React from 'react';
import { useMachine } from '@xstate/react';
import { Board, Button } from './components';
import boardMachine from './machine';
import { Character } from './types';

export default function App() {
  const [state, send] = useMachine(boardMachine);

  const handleToggleEnabled = React.useCallback(
    (character: Character) => {
      send({ type: 'SELECT', character });
    },
    [send]
  );

  const enabledCharactersCount = React.useMemo(
    () => state.context.board.filter((letter) => letter.isEnabled).length,
    [state.context.board]
  );

  const isNewGame = state.matches('new');
  const isPlaying = state.matches('playing');
  const isPicking = state.matches('picking');

  return (
    <>
      <Board
        current={state.context.current}
        board={state.context.board}
        onToggleEnabled={handleToggleEnabled}
      />

      <div className="mt-4 flex justify-end space-x-4">
        <Button disabled={isPicking} onClick={() => send('RESET')}>
          Reset
        </Button>
        {isNewGame && (
          <Button
            disabled={enabledCharactersCount < 2}
            onClick={() => send('START')}
          >
            Start
          </Button>
        )}
        {isPlaying && <Button onClick={() => send('PICK')}>Pick next</Button>}
      </div>
    </>
  );
}
