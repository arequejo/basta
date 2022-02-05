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

    // const currentCharacter = screen.getByTestId('current-character');
    const resetButton = screen.getByRole('button', { name: /reset/i });
    const startButton = screen.getByRole('button', { name: /start/i });

    userEvent.click(startButton);
    expect(resetButton).toBeDisabled();
    vi.runOnlyPendingTimers();
    expect(startButton).not.toBeInTheDocument();
    expect(resetButton).toBeEnabled();
    expect(screen.getByRole('button', { name: /^a$/i })).toHaveAttribute(
      'data-current',
      'true'
    );

    const pickNextButton = screen.getByRole('button', { name: /pick next/i });
    userEvent.click(pickNextButton); // 'b'
    vi.runOnlyPendingTimers();
    expect(pickNextButton).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /^b$/i })).toHaveAttribute(
      'data-current',
      'true'
    );

    userEvent.click(resetButton);
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  it('can perform letters selection before the game starts', () => {
    render(<App />);

    const startButton = screen.getByRole('button', { name: /start/i });
    expect(startButton).toBeEnabled();

    const aButton = screen.getByRole('button', { name: /^a$/i });
    expect(aButton).toHaveAttribute('aria-pressed', 'false');
    userEvent.click(aButton);
    expect(aButton).toHaveAttribute('aria-pressed', 'true');

    userEvent.click(screen.getByRole('button', { name: /^b$/i }));
    expect(startButton).toBeDisabled();

    const resetButton = screen.getByRole('button', { name: /reset/i });
    userEvent.click(resetButton);

    const board = screen.getByTestId('board');
    const characterButtons = within(board).getAllByRole('button');
    characterButtons.forEach((characterButton) => {
      expect(characterButton).toHaveAttribute('aria-pressed', 'false');
    });
  });
});
