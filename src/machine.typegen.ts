// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    toggleSelection: 'SELECT';
    resetBoard: 'RESET';
    pickNext: 'xstate.after(2000)#board.picking';
  };
  internalEvents: {
    'xstate.after(2000)#board.picking': {
      type: 'xstate.after(2000)#board.picking';
    };
    '': { type: '' };
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    services: never;
    guards: never;
    delays: never;
  };
  eventsCausingServices: {};
  eventsCausingGuards: {
    isGameOver: '';
  };
  eventsCausingDelays: {};
  matchesStates: 'new' | 'picking' | 'playing' | 'finished';
  tags: never;
}
