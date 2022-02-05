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

  return (
    <>
      <Board
        current={state.context.current}
        board={state.context.board}
        onToggleEnabled={handleToggleEnabled}
      />

      <div className="mt-4 flex justify-end space-x-4">
        <Button onClick={() => send('RESET')}>Reset</Button>
        {state.matches('new') && (
          <Button
            onClick={() => send('START')}
            disabled={enabledCharactersCount < 2}
          >
            Start
          </Button>
        )}
        {state.matches('playing') && (
          <Button onClick={() => send('PICK')}>Pick next</Button>
        )}
      </div>
    </>
  );
}
