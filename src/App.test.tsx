import { vi, test, beforeEach, expect } from 'vitest';
import { render } from 'vitest-browser-react';
import App from './App.tsx';

vi.mock('./utils/alphabet.ts', () => ({
  characters: ['a', 'b', 'c'],
}));

vi.mock('./utils/random.ts', () => ({
  getRandomNumber: vi.fn().mockImplementation(() => 0),
}));

beforeEach(() => {
  vi.useFakeTimers();
  vi.clearAllMocks();
});

test('can play the game', async () => {
  const screen = render(<App />);

  const helperText = screen.getByTestId('helper-text');
  const primaryButton = screen.getByTestId('primary-button');
  const secondaryButton = screen.getByTestId('secondary-button');
  const pickedLetter = screen.getByTestId('picked-letter');

  // Assert initial state of game before the timer runs
  await expect
    .element(helperText)
    .toHaveTextContent(/press the letters to disable them/i);
  await expect.element(primaryButton).toHaveTextContent(/start/i);
  await expect.element(secondaryButton).toHaveTextContent(/reset/i);
  await primaryButton.click();
  await expect.element(helperText).toHaveTextContent(/picking/i);
  await expect.element(primaryButton).toHaveTextContent(/pick next/i);
  await expect.element(primaryButton).toBeDisabled();
  await expect.element(secondaryButton).toHaveTextContent(/start over/i);
  await expect.element(secondaryButton).toBeDisabled();

  // Assert new state after the first letter has been selected
  vi.runOnlyPendingTimers();
  await expect.element(pickedLetter).toHaveTextContent(/^a$/i);

  vi.runOnlyPendingTimers();
  await expect.element(helperText).toHaveTextContent(/go/i);
  await expect.element(primaryButton).toBeEnabled();
  await expect.element(primaryButton).toHaveTextContent(/next/i);
  await expect.element(secondaryButton).toBeEnabled();
  await expect.element(secondaryButton).toHaveTextContent(/start over/i);
  await expect
    .element(screen.getByRole('button', { name: /^a$/i }))
    .toHaveAttribute('data-current', 'true');

  await primaryButton.click(); // 'b'
  vi.runOnlyPendingTimers();
  await expect.element(pickedLetter).toHaveTextContent(/^b$/i);
  vi.runOnlyPendingTimers();
  await expect
    .element(screen.getByRole('button', { name: /^b$/i }))
    .toHaveAttribute('data-current', 'true');

  // Reset game and assert initial state has been restored
  await secondaryButton.click();
  await expect
    .element(helperText)
    .toHaveTextContent(/press the letters to disable them/i);
  await expect.element(primaryButton).toHaveTextContent(/start/i);
  await expect.element(secondaryButton).toHaveTextContent(/reset/i);
});

test('can perform letters selection before the game starts', async () => {
  const screen = render(<App />);

  const pickButton = screen.getByRole('button', { name: /start/i });
  await expect.element(pickButton).toBeEnabled();

  const aButton = screen.getByRole('button', { name: /^a$/i });
  await expect.element(aButton).toHaveAttribute('aria-pressed', 'false');
  await aButton.click(aButton);
  await expect.element(aButton).toHaveAttribute('aria-pressed', 'true');

  await screen.getByRole('button', { name: /^b$/i }).click();
  await expect.element(pickButton).toBeDisabled();

  const resetButton = screen.getByRole('button', { name: /reset/i });
  await resetButton.click();

  const board = screen.getByTestId('board');
  const characterButtons = board.getByRole('button');

  for (const characterButton of await characterButtons.all()) {
    await expect
      .element(characterButton)
      .toHaveAttribute('aria-pressed', 'false');
  }
});

// There's an error coming from radix that causes the test to fail
test.todo('shows an alert dialog when trying to start over midgame');

// The button is focused after picking, even if it's not true in the browser
test.todo('restores focus properly after picking');
