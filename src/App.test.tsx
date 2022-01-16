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
    vi.clearAllMocks();
  });

  it('can play the game', async () => {
    const user = userEvent.setup();
    render(<App />);

    const currentCharacter = screen.getByTestId('current-character');
    expect(currentCharacter).toHaveTextContent('--');

    const startButton = screen.getByRole('button', { name: /start/i });
    await user.click(startButton);
    expect(startButton).not.toBeInTheDocument();
    expect(currentCharacter).toHaveTextContent(/^a$/i);

    const pickNextButton = screen.getByRole('button', { name: /pick next/i });
    await userEvent.click(pickNextButton); // 'b'
    expect(pickNextButton).not.toBeInTheDocument();
    expect(currentCharacter).toHaveTextContent(/^b$/i);

    const resetButton = screen.getByRole('button', { name: /reset/i });
    await userEvent.click(resetButton);
    expect(currentCharacter).toHaveTextContent('--');
    expect(screen.getByRole('button', { name: /start/i })).toBeInTheDocument();
  });

  it('can perform letters selection', async () => {
    const user = userEvent.setup();
    render(<App />);

    const startButton = screen.getByRole('button', { name: /start/i });
    expect(startButton).toBeEnabled();

    const aButton = screen.getByRole('button', { name: /^a$/i });
    expect(aButton).toHaveAttribute('data-enabled', 'true');
    await user.click(aButton);
    expect(aButton).toHaveAttribute('data-enabled', 'false');

    await user.click(screen.getByRole('button', { name: /^b$/i }));
    expect(startButton).toBeDisabled();

    const resetButton = screen.getByRole('button', { name: /reset/i });
    await user.click(resetButton);

    const board = screen.getByTestId('board');
    const characterButtons = within(board).getAllByRole('button');
    characterButtons.forEach((characterButton) => {
      expect(characterButton).toHaveAttribute('data-enabled', 'true');
    });
  });
});
