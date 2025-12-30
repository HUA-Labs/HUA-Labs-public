import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ToastProvider, useToast } from '../Toast';

// Test component that uses toast
function TestComponent() {
  const { addToast, removeToast, clearToasts, toasts } = useToast();

  React.useEffect(() => {
    // Auto-add toast on mount for testing
    addToast({ type: 'success', message: 'Success!' });
  }, [addToast]);

  return (
    <div>
      <div data-testid="toast-count">{toasts.length}</div>
      {toasts.map((toast) => (
        <div key={toast.id} data-testid={`toast-${toast.id}`}>
          {toast.title && <div data-testid={`toast-title-${toast.id}`}>{toast.title}</div>}
          <div data-testid={`toast-message-${toast.id}`}>{toast.message}</div>
        </div>
      ))}
    </div>
  );
}

describe('Toast', () => {

  it('should render ToastProvider', () => {
    render(
      <ToastProvider>
        <div>Test</div>
      </ToastProvider>
    );
    expect(screen.getByText('Test')).toBeInTheDocument();
  });

  it('should add success toast', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    expect(screen.getByText('Success!')).toBeInTheDocument();
    expect(screen.getByTestId('toast-count')).toHaveTextContent('1');
  });

  it('should display toast message', () => {
    render(
      <ToastProvider>
        <TestComponent />
      </ToastProvider>
    );

    const toastMessages = screen.getAllByTestId(/toast-message-/);
    expect(toastMessages.length).toBeGreaterThan(0);
    expect(toastMessages[0]).toHaveTextContent('Success!');
  });

  it('should throw error when useToast is used outside provider', () => {
    // Suppress console.error for this test
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    expect(() => {
      render(<TestComponent />);
    }).toThrow('useToast must be used within a ToastProvider');

    consoleSpy.mockRestore();
  });
});

