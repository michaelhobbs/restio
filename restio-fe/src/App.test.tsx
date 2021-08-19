import React from 'react';
import { render, screen } from './test-utils';
import App from './App';

test('renders login form by default', () => {
    render(<App />);
    const linkElement = screen.getByTestId(/login-form/i);
    expect(linkElement).toBeInTheDocument();
});
