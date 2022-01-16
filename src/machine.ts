import { assign, createMachine } from 'xstate';
import { initBoard, pickNextCharacter } from './utils/board';
import { Character, Letter } from './types';

type BoardContext = {
  board: Letter[];
  current: Character | null;
};

type BoardEvent =
  | { type: 'START' }
  | { type: 'RESET' }
  | { type: 'END' }
  | { type: 'PICK' }
  | { type: 'SELECT'; character: Character };

const resetBoard = assign<BoardContext, BoardEvent>({
  board: initBoard(),
  current: null,
});

/**
 * TODO
 * - Add delayed `picking` state. The tests hang with `vi.useFakeTimers()` and
 * can't get them to play nice without actually waiting for the delay to
 * complete. Add such state once those issues have been resolved.
 */
const boardMachine = createMachine<BoardContext, BoardEvent>(
  {
    id: 'board',
    initial: 'new',
    context: { board: initBoard(), current: null },
    states: {
      new: {
        on: {
          SELECT: {
            actions: assign({
              board: (context, event) =>
                context.board.map((letter) =>
                  letter.character === event.character
                    ? { ...letter, isEnabled: !letter.isEnabled }
                    : letter
                ),
            }),
          },
          RESET: { actions: 'resetBoard' },
          START: { target: 'playing' },
        },
      },
      playing: {
        always: [
          {
            target: 'finished',
            cond: (context) =>
              context.board.filter(
                (letter) => letter.isEnabled && !letter.hasBeenPicked
              ).length < 2,
          },
        ],
        entry: assign((context) => {
          const [nextCharacter, newBoard] = pickNextCharacter(context.board);
          return { board: newBoard, current: nextCharacter };
        }),
        on: {
          PICK: { target: 'playing' },
          RESET: { target: 'new', actions: 'resetBoard' },
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
    actions: { resetBoard },
  }
);

export default boardMachine;
