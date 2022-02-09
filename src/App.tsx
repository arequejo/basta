import React from 'react';
import { useMachine } from '@xstate/react';
import {
  ArrowSmRightIcon,
  HeartIcon,
  RefreshIcon,
} from '@heroicons/react/solid';
import machine from './machine';
import { Board, Button } from './components';
import { Character } from './types';

export default function App() {
  const [state, send] = useMachine(machine);

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

  const isNewGame = state.value === 'new';
  const isPlaying = state.value === 'playing';
  const isPicking = state.value === 'picking';

  return (
    <div className="mx-auto max-w-[480px] space-y-12">
      <Board
        isPlaying={isPlaying}
        current={state.context.current}
        board={state.context.board}
        onToggleEnabled={handleToggleEnabled}
      />

      <div className="grid grid-cols-2 gap-4">
        <Button
          color="orange"
          disabled={isPicking}
          onClick={() => send('RESET')}
        >
          Reset <RefreshIcon className="ml-1 inline-block h-5 w-5" />
        </Button>
        <Button
          color="green"
          disabled={isPicking || enabledCharactersCount < 2}
          onClick={() => send('PICK')}
        >
          {isNewGame ? 'Start' : 'Pick next'}{' '}
          <ArrowSmRightIcon className="ml-1 inline-block h-5 w-5" />
        </Button>
      </div>

      <footer>
        <p className="text-center">
          Made with <HeartIcon className="inline-block h-5 w-5 text-red-500" />{' '}
          by{' '}
          <a className="underline" href="https://requejo.dev" target="_blank">
            Reque
          </a>
        </p>
      </footer>
    </div>
  );
}
