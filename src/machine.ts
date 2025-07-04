import { assign, setup } from 'xstate';
import { initBoard, pickNextCharacter } from './utils/board';
import { Character, Letter } from './types';

export const machine = setup({
  types: {
    context: {} as {
      board: Letter[];
      current: Character | null;
    },
    events: {} as
      | { type: 'CONFIRM_RESET' }
      | { type: 'CANCEL_RESET' }
      | { type: 'RESET' }
      | { type: 'CLEAR' }
      | { type: 'END' }
      | { type: 'PICK' }
      | { type: 'SELECT'; character: Character },
  },
  actions: {
    resetBoard: assign({
      board: initBoard(),
      current: null,
    }),
    pickNext: assign(({ context }) => {
      const [nextCharacter, newBoard] = pickNextCharacter(context.board);
      return { board: newBoard, current: nextCharacter };
    }),
  },
  guards: {
    isGameOver: ({ context }) =>
      context.board.filter(
        (letter) => letter.isEnabled && !letter.hasBeenPicked
      ).length < 2,
  },
}).createMachine({
  id: 'board',
  initial: 'new',
  context: { board: initBoard(), current: null },
  states: {
    new: {
      on: {
        SELECT: {
          actions: assign(({ context, event }) => ({
            board: context.board.map((letter) =>
              letter.character === event.character
                ? { ...letter, isEnabled: !letter.isEnabled }
                : letter
            ),
          })),
        },
        CLEAR: { actions: 'resetBoard' },
        PICK: { target: 'picking' },
      },
    },
    confirmReset: {
      on: {
        CANCEL_RESET: { target: 'playing' },
        CONFIRM_RESET: { target: 'new', actions: 'resetBoard' },
      },
    },
    picking: {
      after: {
        2_000: { target: 'picked', actions: 'pickNext' },
      },
    },
    picked: {
      after: {
        5_000: { target: 'playing' },
      },
    },
    playing: {
      always: [
        {
          target: 'finished',
          guard: 'isGameOver',
        },
      ],
      on: {
        RESET: { target: 'confirmReset' },
        PICK: { target: 'picking' },
      },
    },
    finished: {
      on: {
        RESET: { target: 'new', actions: 'resetBoard' },
      },
    },
  },
});
