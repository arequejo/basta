// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  eventsCausingActions: {
    toggleSelection: 'SELECT';
    resetBoard: 'CLEAR' | 'CONFIRM_RESET' | 'RESET';
  };
  internalEvents: {
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
  matchesStates: 'new' | 'confirmReset' | 'picking' | 'playing' | 'finished';
  tags: never;
}
