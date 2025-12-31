import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../Card';

describe('Card', () => {
  it('should render card element', () => {
    render(<Card>Card content</Card>);
    expect(screen.getByText('Card content')).toBeInTheDocument();
  });

  it('should apply default variant', () => {
    const { container } = render(<Card>Content</Card>);
    const card = container.querySelector('div');
    expect(card?.className).toContain('bg-white');
  });

  it('should apply outline variant', () => {
    const { container } = render(<Card variant="outline">Content</Card>);
    const card = container.querySelector('div');
    expect(card?.className).toContain('bg-transparent');
    expect(card?.className).toContain('border-2');
  });

  it('should apply elevated variant', () => {
    const { container } = render(<Card variant="elevated">Content</Card>);
    const card = container.querySelector('div');
    expect(card?.className).toContain('shadow-lg');
  });

  it('should apply custom className', () => {
    const { container } = render(<Card className="custom-class">Content</Card>);
    const card = container.querySelector('div');
    expect(card?.className).toContain('custom-class');
  });

  it('should forward ref', () => {
    const ref = React.createRef<HTMLDivElement>();
    render(<Card ref={ref}>Content</Card>);
    expect(ref.current).toBeInstanceOf(HTMLDivElement);
  });
});

describe('CardHeader', () => {
  it('should render card header', () => {
    render(
      <Card>
        <CardHeader>Header</CardHeader>
      </Card>
    );
    expect(screen.getByText('Header')).toBeInTheDocument();
  });

  it('should apply custom className', () => {
    render(
      <Card>
        <CardHeader className="custom-header">Header</CardHeader>
      </Card>
    );
    const header = screen.getByText('Header');
    expect(header.className).toContain('custom-header');
  });
});

describe('CardTitle', () => {
  it('should render card title', () => {
    render(
      <Card>
        <CardTitle>Title</CardTitle>
      </Card>
    );
    const title = screen.getByText('Title');
    expect(title).toBeInTheDocument();
    expect(title.tagName).toBe('H3');
  });
});

describe('CardDescription', () => {
  it('should render card description', () => {
    render(
      <Card>
        <CardDescription>Description</CardDescription>
      </Card>
    );
    expect(screen.getByText('Description')).toBeInTheDocument();
  });
});

describe('CardContent', () => {
  it('should render card content', () => {
    render(
      <Card>
        <CardContent>Content</CardContent>
      </Card>
    );
    expect(screen.getByText('Content')).toBeInTheDocument();
  });
});

describe('CardFooter', () => {
  it('should render card footer', () => {
    render(
      <Card>
        <CardFooter>Footer</CardFooter>
      </Card>
    );
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });
});

describe('Card composition', () => {
  it('should render complete card structure', () => {
    render(
      <Card>
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
          <CardDescription>Card Description</CardDescription>
        </CardHeader>
        <CardContent>Card Content</CardContent>
        <CardFooter>Card Footer</CardFooter>
      </Card>
    );

    expect(screen.getByText('Card Title')).toBeInTheDocument();
    expect(screen.getByText('Card Description')).toBeInTheDocument();
    expect(screen.getByText('Card Content')).toBeInTheDocument();
    expect(screen.getByText('Card Footer')).toBeInTheDocument();
  });
});

