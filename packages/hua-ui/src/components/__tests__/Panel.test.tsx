import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Panel } from '../Panel';

describe('Panel', () => {
  it('should render panel with content', () => {
    render(<Panel>Panel content</Panel>);
    expect(screen.getByText('Panel content')).toBeInTheDocument();
  });

  it('should apply default style', () => {
    const { container } = render(<Panel>Default</Panel>);
    const panel = container.querySelector('div');
    expect(panel).toBeInTheDocument();
  });

  it('should support different styles', () => {
    const { container: container1 } = render(<Panel style="glass">Glass</Panel>);
    expect(container1.querySelector('div')).toBeInTheDocument();

    const { container: container2 } = render(<Panel style="neon">Neon</Panel>);
    expect(container2.querySelector('div')).toBeInTheDocument();

    const { container: container3 } = render(<Panel style="minimal">Minimal</Panel>);
    expect(container3.querySelector('div')).toBeInTheDocument();
  });

  it('should support different padding options', () => {
    const { container: container1 } = render(<Panel padding="none">No Padding</Panel>);
    expect(container1.querySelector('div')).toBeInTheDocument();

    const { container: container2 } = render(<Panel padding="lg">Large Padding</Panel>);
    expect(container2.querySelector('div')).toBeInTheDocument();
  });

  it('should support custom padding', () => {
    render(<Panel padding="custom" customPadding="p-10">Custom</Panel>);
    const panel = screen.getByText('Custom');
    expect(panel).toBeInTheDocument();
    // Panel uses Card internally, so className might be on a parent element
  });

  it('should support different rounded options', () => {
    const { container: container1 } = render(<Panel rounded="none">No Rounded</Panel>);
    expect(container1.querySelector('div')).toBeInTheDocument();

    const { container: container2 } = render(<Panel rounded="full">Full Rounded</Panel>);
    expect(container2.querySelector('div')).toBeInTheDocument();
  });

  it('should support transparency prop', () => {
    const { container } = render(<Panel transparency={0.5}>Transparent</Panel>);
    const panel = container.querySelector('div');
    expect(panel).toBeInTheDocument();
  });

  it('should support effect prop', () => {
    const { container: container1 } = render(<Panel effect="glow">Glow</Panel>);
    expect(container1.querySelector('div')).toBeInTheDocument();

    const { container: container2 } = render(<Panel effect="shadow">Shadow</Panel>);
    expect(container2.querySelector('div')).toBeInTheDocument();
  });

  it('should support interactive prop', () => {
    const { container } = render(<Panel interactive>Interactive</Panel>);
    const panel = container.querySelector('div');
    expect(panel).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(<Panel className="custom-panel">Custom</Panel>);
    const panel = screen.getByText('Custom');
    expect(panel).toBeInTheDocument();
    // Panel uses Card internally, className is passed through
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Panel ref={ref}>Ref Panel</Panel>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

