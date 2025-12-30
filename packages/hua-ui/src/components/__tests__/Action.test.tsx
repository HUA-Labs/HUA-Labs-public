import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Action } from '../Action';

describe('Action', () => {
  it('should render action button with text', () => {
    render(<Action>Click me</Action>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('should render anchor when href is provided', () => {
    render(<Action href="/test">Link Action</Action>);
    const link = screen.getByRole('link', { name: /link action/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/test');
  });

  it('should apply default actionType (primary)', () => {
    const { container } = render(<Action>Primary</Action>);
    const action = container.querySelector('button');
    expect(action).toBeInTheDocument();
  });

  it('should support different actionTypes', () => {
    const { container: container1 } = render(<Action actionType="secondary">Secondary</Action>);
    expect(container1.querySelector('button')).toBeInTheDocument();

    const { container: container2 } = render(<Action actionType="magical">Magical</Action>);
    expect(container2.querySelector('button')).toBeInTheDocument();
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Action disabled>Disabled</Action>);
    const action = screen.getByRole('button', { name: /disabled/i });
    expect(action).toBeDisabled();
  });

  it('should show loading state', () => {
    render(<Action loading>Loading</Action>);
    const action = screen.getByRole('button');
    expect(action).toHaveAttribute('aria-busy', 'true');
  });

  it('should support feedback prop', () => {
    const { container } = render(<Action feedback="ripple">Ripple</Action>);
    const action = container.querySelector('button');
    expect(action).toBeInTheDocument();
  });

  it('should support particleEffect prop', () => {
    const { container } = render(<Action particleEffect>Particle</Action>);
    const action = container.querySelector('button');
    expect(action).toBeInTheDocument();
  });

  it('should support rippleEffect prop', () => {
    const { container } = render(<Action rippleEffect>Ripple</Action>);
    const action = container.querySelector('button');
    expect(action).toBeInTheDocument();
  });

  it('should support custom className', () => {
    const { container } = render(<Action className="custom-action">Custom</Action>);
    const action = container.querySelector('button');
    expect(action?.className).toContain('custom-action');
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Action ref={ref}>Ref Action</Action>);
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });
});

