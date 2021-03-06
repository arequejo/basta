import { vi, describe, it, beforeEach } from 'vitest';
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

vi.mock('./utils/alphabet.ts', () => ({
  characters: ['a', 'b', 'c'],
}));

vi.mock('./utils/random.ts', () => ({
  getRandomNumber: vi.fn().mockImplementation(() => 0),
}));

describe('<App />', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.clearAllMocks();
  });

  it('can play the game', () => {
    render(<App />);

    const helperText = screen.getByTestId('helper-text');
    const resetButton = screen.getByRole('button', { name: /reset/i });
    const pickButton = screen.getByRole('button', { name: /start/i });

    // Assert initial state of game before the timer runs
    expect(helperText).toHaveTextContent(/press the letters to disable them/i);
    userEvent.click(pickButton);
    expect(helperText).toHaveTextContent(/picking/i);
    expect(resetButton).toBeDisabled();
    expect(pickButton).toBeDisabled();

    // Assert new state after the first letter has been selected
    vi.runOnlyPendingTimers();
    expect(screen.getByTestId('picked-letter')).toHaveTextContent(/^a$/i);

    vi.runOnlyPendingTimers();
    expect(helperText).toHaveTextContent(/go/i);
    expect(resetButton).toBeEnabled();
    expect(resetButton).toHaveTextContent(/start over/i);
    expect(pickButton).toBeEnabled();
    expect(pickButton).toHaveTextContent(/next/i);
    expect(screen.getByRole('button', { name: /^a$/i })).toHaveAttribute(
      'data-current',
      'true'
    );

    userEvent.click(pickButton); // 'b'
    vi.runOnlyPendingTimers();
    expect(screen.getByTestId('picked-letter')).toHaveTextContent(/^b$/i);
    vi.runOnlyPendingTimers();
    expect(screen.getByRole('button', { name: /^b$/i })).toHaveAttribute(
      'data-current',
      'true'
    );

    // Reset game and assert initial state has been restored
    userEvent.click(resetButton);
    expect(helperText).toHaveTextContent(/press the letters to disable them/i);
    expect(resetButton).toHaveTextContent(/reset/i);
    expect(pickButton).toHaveTextContent(/start/i);
  });

  it('can perform letters selection before the game starts', () => {
    render(<App />);

    const pickButton = screen.getByRole('button', { name: /start/i });
    expect(pickButton).toBeEnabled();

    const aButton = screen.getByRole('button', { name: /^a$/i });
    expect(aButton).toHaveAttribute('aria-pressed', 'false');
    userEvent.click(aButton);
    expect(aButton).toHaveAttribute('aria-pressed', 'true');

    userEvent.click(screen.getByRole('button', { name: /^b$/i }));
    expect(pickButton).toBeDisabled();

    const resetButton = screen.getByRole('button', { name: /reset/i });
    userEvent.click(resetButton);

    const board = screen.getByTestId('board');
    const characterButtons = within(board).getAllByRole('button');
    characterButtons.forEach((characterButton) => {
      expect(characterButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  // There's an error coming from radix that causes the test to fail
  it.todo('shows an alert dialog when trying to start over midgame');

  // The button is focused after picking, even if it's not true in the browser
  it.todo('restores focus properly after picking');
});
