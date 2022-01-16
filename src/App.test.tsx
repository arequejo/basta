import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

vi.mock('./utils/random.ts', () => ({
  getRandomNumber: vi.fn().mockImplementation(() => 0),
}));

describe('<App />', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('can perform letters selection', async () => {
    const user = userEvent.setup();
    render(<App />);

    const aButton = screen.getByRole('button', { name: /^a$/i });
    expect(aButton).toHaveAttribute('data-selected', 'true');
    await user.click(aButton);
    expect(aButton).toHaveAttribute('data-selected', 'false');

    const resetButton = screen.getByRole('button', { name: /reset/i });
    await user.click(resetButton);
    expect(aButton).toHaveAttribute('data-selected', 'true');
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
    await userEvent.click(pickNextButton);
    expect(currentCharacter).toHaveTextContent(/^b$/i);

    const resetButton = screen.getByRole('button', { name: /reset/i });
    await userEvent.click(resetButton);
    expect(currentCharacter).toHaveTextContent('--');
  });
});
