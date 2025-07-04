import React from 'react';
import { useMachine } from '@xstate/react';
import {
  ArrowSmRightIcon,
  HeartIcon,
  RefreshIcon,
} from '@heroicons/react/solid';
import { machine } from './machine';
import { Board, Button, PickedCharacter, StartOver } from './components';
import { Character } from './types';

export default function App() {
  const [snapshot, send] = useMachine(machine);
  const prevSnapshotRef = React.useRef(snapshot);

  React.useEffect(() => {
    prevSnapshotRef.current = snapshot;
  }, [snapshot]);

  const resetButtonRef = React.useRef<HTMLButtonElement | null>(null);
  const pickButtonRef = React.useRef<HTMLButtonElement | null>(null);

  const handleToggleEnabled = React.useCallback(
    (character: Character) => {
      send({ type: 'SELECT', character });
    },
    [send]
  );

  const enabledCharactersCount = React.useMemo(
    () => snapshot.context.board.filter((letter) => letter.isEnabled).length,
    [snapshot.context.board]
  );

  const hasEnoughCharacters = enabledCharactersCount >= 2;
  const isNewGame = snapshot.matches('new');
  const isConfirmingReset = snapshot.matches('confirmReset');
  const isPlaying = snapshot.matches('playing');
  const isPicking = snapshot.matches('picking');
  const hasJustBeenPicked = snapshot.matches('picked');
  const isGameOver = snapshot.matches('finished');

  // Restore focus after picking
  React.useEffect(() => {
    if (!prevSnapshotRef.current.matches('picking')) return;
    isGameOver
      ? resetButtonRef.current?.focus()
      : pickButtonRef.current?.focus();
  }, [isGameOver]);

  return (
    <>
      <div className="mx-auto max-w-[480px] space-y-8">
        <p className="text-center text-lg" data-testid="helper-text">
          {isNewGame &&
            hasEnoughCharacters &&
            'Press the letters to disable them'}
          {isNewGame &&
            !hasEnoughCharacters &&
            'You need to have at least two letters enabled'}
          {isPicking && 'Picking...'}
          {(isPlaying || hasJustBeenPicked || isConfirmingReset) && 'Go!'}
          {isGameOver && 'Time to count your points!'}
        </p>

        <Board
          disabled={!isNewGame}
          current={snapshot.context.current}
          board={snapshot.context.board}
          onToggleEnabled={handleToggleEnabled}
        />

        <div className="flex flex-col space-y-4">
          <Button
            ref={pickButtonRef}
            color="green"
            disabled={!hasEnoughCharacters || isPicking || isGameOver}
            onClick={() => send({ type: 'PICK' })}
          >
            {isNewGame ? 'Start' : 'Pick next'}{' '}
            <ArrowSmRightIcon className="ml-1 inline-block h-5 w-5" />
          </Button>

          <StartOver
            open={isConfirmingReset}
            onCancel={() => send({ type: 'CANCEL_RESET' })}
            onConfirm={() => send({ type: 'CONFIRM_RESET' })}
          >
            <Button
              ref={resetButtonRef}
              color="orange"
              disabled={isPicking}
              onClick={() =>
                isNewGame ? send({ type: 'CLEAR' }) : send({ type: 'RESET' })
              }
            >
              {isNewGame ? 'Reset' : 'Start over'}
              <RefreshIcon className="ml-1 inline-block h-5 w-5" />
            </Button>
          </StartOver>
        </div>

        <footer>
          <p className="text-center">
            Made with{' '}
            <HeartIcon className="inline-block h-5 w-5 text-red-500" /> by{' '}
            <a className="underline" href="https://requejo.dev" target="_blank">
              Reque
            </a>
          </p>
        </footer>
      </div>

      {hasJustBeenPicked && (
        <PickedCharacter character={snapshot.context.current!} />
      )}
    </>
  );
}
