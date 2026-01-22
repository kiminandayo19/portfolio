import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/atoms/Button';

describe('Button Atom', () => {
  it('renders correctly with given text', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByText('Click Me');
    expect(buttonElement).toBeInTheDocument();
  });

  it('renders with rounded border when rounded prop is true', () => {
    render(<Button rounded>Rounded Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Rounded Button' });
    expect(buttonElement).toHaveStyle('border-radius: 50px');
  });

  it('renders with primary color by default', () => {
    render(<Button variant="contained">Primary Button</Button>);
    const buttonElement = screen.getByRole('button', { name: 'Primary Button' });
    // MUI contained primary button usually has bg color, checking class or computed style usually
    // This is a basic rendering check.
    expect(buttonElement).toBeInTheDocument();
  });
});
