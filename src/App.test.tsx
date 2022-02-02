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

    const currentCharacter = screen.getByTestId('current-character');
    expect(currentCharacter).toHaveTextContent('--');

    const startButton = screen.getByRole('button', { name: /start/i });
    userEvent.click(startButton);
    vi.runOnlyPendingTimers();
    expect(startButton).not.toBeInTheDocument();
    expect(currentCharacter).toHaveTextContent(/^a$/i);

    const pickNextButton = screen.getByRole('button', { name: /pick next/i });
    userEvent.click(pickNextButton); // 'b'
    vi.runOnlyPendingTimers();
    expect(pickNextButton).not.toBeInTheDocument();
    expect(currentCharacter).toHaveTextContent(/^b$/i);

    const resetButton = screen.getByRole('button', { name: /reset/i });
    userEvent.click(resetButton);
    expect(currentCharacter).toHaveTextContent('--');
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  it('can perform letters selection', () => {
    render(<App />);

    const startButton = screen.getByRole('button', { name: /start/i });
    expect(startButton).toBeEnabled();

    const aButton = screen.getByRole('button', { name: /^a$/i });
    expect(aButton).toHaveAttribute('data-enabled', 'true');
    userEvent.click(aButton);
    expect(aButton).toHaveAttribute('data-enabled', 'false');

    userEvent.click(screen.getByRole('button', { name: /^b$/i }));
    expect(startButton).toBeDisabled();

    const resetButton = screen.getByRole('button', { name: /reset/i });
    userEvent.click(resetButton);

    const board = screen.getByTestId('board');
    const characterButtons = within(board).getAllByRole('button');
    characterButtons.forEach((characterButton) => {
      expect(characterButton).toHaveAttribute('data-enabled', 'true');
    });
  });
});
