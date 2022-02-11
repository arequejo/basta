import { assign, createMachine } from 'xstate';
import { PICK_TIME } from '../config';
import { initBoard, pickNextCharacter } from '../utils/board';
import { Character, Letter } from '../types';

type Context = {
  board: Letter[];
  current: Character | null;
};

type Event =
  | { type: 'CONFIRM_RESET' }
  | { type: 'CANCEL_RESET' }
  | { type: 'RESET' }
  | { type: 'CLEAR' }
  | { type: 'END' }
  | { type: 'PICK' }
  | { type: 'SELECT'; character: Character };

const machine = createMachine(
  {
    tsTypes: {} as import('./index.typegen').Typegen0,
    schema: { context: {} as Context, events: {} as Event },
    id: 'board',
    initial: 'new',
    context: { board: initBoard(), current: null },
    states: {
      new: {
        on: {
          SELECT: { actions: 'toggleSelection' },
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
          [PICK_TIME]: { target: 'playing', actions: 'pickNext' },
        },
      },
      playing: {
        always: [
          {
            target: 'finished',
            cond: 'isGameOver',
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
  },
  {
    actions: {
      /**
       * Have to declare an unused context...
       * https://xstate.js.org/docs/guides/typescript.html#assign-action-behaving-strangely
       */
      resetBoard: assign((context) => ({
        board: initBoard(),
        current: null,
      })),
      toggleSelection: assign((context, event) => ({
        board: context.board.map((letter) =>
          letter.character === event.character
            ? { ...letter, isEnabled: !letter.isEnabled }
            : letter
        ),
      })),
      /**
       * TS error comes from the fact that the typegen doesn't seem to work
       * with the dynamic key as delay.
       */
      pickNext: assign((context) => {
        const [nextCharacter, newBoard] = pickNextCharacter(context.board);
        return { board: newBoard, current: nextCharacter };
      }),
    },
    guards: {
      isGameOver: (context) =>
        context.board.filter(
          (letter) => letter.isEnabled && !letter.hasBeenPicked
        ).length < 2,
    },
  }
);

export default machine;
