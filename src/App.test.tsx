import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('<App />', () => {
  it('can perform letters selection', async () => {
    const user = userEvent.setup();
    render(<App />);

    const aButton = screen.getByRole('button', { name: /a/i });
    expect(aButton).toHaveAttribute('data-selected', 'true');
    await user.click(aButton);
    expect(aButton).toHaveAttribute('data-selected', 'false');

    const resetButton = screen.getByRole('button', { name: /reset/i });
    await user.click(resetButton);
    expect(aButton).toHaveAttribute('data-selected', 'true');
  });
});
