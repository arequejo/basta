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

  return (
    <>
      <Board
        current={state.context.current}
        board={state.context.board}
        onToggleEnabled={handleToggleEnabled}
      />

      <div className="flex justify-end mt-4 space-x-4">
        <Button onClick={() => send('RESET')}>Reset</Button>
        {state.matches('new') && (
          <Button onClick={() => send('START')}>Start</Button>
        )}
        {state.matches('playing') && (
          <Button onClick={() => send('PICK')}>Pick next</Button>
        )}
      </div>
    </>
  );
}
