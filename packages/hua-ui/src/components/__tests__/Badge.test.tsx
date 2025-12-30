import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Badge } from '../Badge';

describe('Badge', () => {
  it('should render badge with text', () => {
    render(<Badge>Badge Text</Badge>);
    expect(screen.getByText('Badge Text')).toBeInTheDocument();
  });

  it('should apply default variant', () => {
    const { container } = render(<Badge>Default</Badge>);
    const badge = container.querySelector('div');
    expect(badge?.className).toContain('bg-slate-900');
  });

  it('should apply secondary variant', () => {
    const { container } = render(<Badge variant="secondary">Secondary</Badge>);
    const badge = container.querySelector('div');
    expect(badge?.className).toContain('bg-slate-100');
  });

  it('should apply destructive variant', () => {
    const { container } = render(<Badge variant="destructive">Destructive</Badge>);
    const badge = container.querySelector('div');
    expect(badge?.className).toContain('bg-red-500');
  });

  it('should apply outline variant', () => {
    const { container } = render(<Badge variant="outline">Outline</Badge>);
    const badge = container.querySelector('div');
    expect(badge?.className).toContain('border');
  });

  it('should apply glass variant', () => {
    const { container } = render(<Badge variant="glass">Glass</Badge>);
    const badge = container.querySelector('div');
    expect(badge?.className).toContain('backdrop-blur-sm');
  });

  it('should apply custom className', () => {
    const { container } = render(<Badge className="custom-badge">Custom</Badge>);
    const badge = container.querySelector('div');
    expect(badge?.className).toContain('custom-badge');
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Badge ref={ref}>Ref Badge</Badge>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });

  it('should support children', () => {
    render(
      <Badge>
        <span>Nested Content</span>
      </Badge>
    );
    expect(screen.getByText('Nested Content')).toBeInTheDocument();
  });
});

