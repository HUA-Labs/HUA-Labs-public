import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Input } from '../Input';

describe('Input', () => {
  it('should render input element', () => {
    render(<Input />);
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  it('should render with placeholder', () => {
    render(<Input placeholder="Enter text" />);
    expect(screen.getByPlaceholderText('Enter text')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Input disabled />);
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('should support different input types', () => {
    const { container, rerender } = render(<Input type="password" />);
    let input = container.querySelector('input[type="password"]');
    expect(input).toHaveAttribute('type', 'password');

    rerender(<Input type="email" />);
    input = container.querySelector('input[type="email"]');
    expect(input).toHaveAttribute('type', 'email');
  });

  it('should handle value changes', async () => {
    const user = userEvent.setup();
    render(<Input />);
    const input = screen.getByRole('textbox') as HTMLInputElement;
    
    await user.type(input, 'test value');
    expect(input.value).toBe('test value');
  });

  it('should apply custom className', () => {
    const { container } = render(<Input className="custom-class" />);
    const input = container.querySelector('input');
    expect(input?.className).toContain('custom-class');
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(<Input ref={ref} />);
    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });

  it('should support required attribute', () => {
    render(<Input required />);
    const input = screen.getByRole('textbox');
    expect(input).toBeRequired();
  });
});

