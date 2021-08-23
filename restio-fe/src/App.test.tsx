import App from './App';
import { render, screen } from './test-utils';

test('renders login form by default', () => {
    render(<App />);
    const linkElement = screen.getByTestId(/login-form/i);
    expect(linkElement).toBeInTheDocument();
});
