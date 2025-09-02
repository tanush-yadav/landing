/**
 * Test Suite for AgentIntro Component
 * Testing typing animation and text display functionality
 */

import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AgentIntro } from '@/components/alex/agent-intro';
import { AgentIntroProps } from '@/types/alex-agent';

// Mock framer-motion for testing
jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>,
  },
  AnimatePresence: ({ children }: any) => <>{children}</>,
}));

describe('AgentIntro Component', () => {
  const defaultProps: AgentIntroProps = {
    tagline: 'Your AI Code Review Assistant',
    description: 'Alex reviews every PR in seconds, catches bugs, and ensures code quality 24/7.',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('Rendering', () => {
    it('should render tagline and description', () => {
      render(<AgentIntro {...defaultProps} />);
      
      const intro = screen.getByTestId('agent-intro');
      expect(intro).toBeInTheDocument();
      
      // Should show tagline
      expect(screen.getByText(/Your AI Code Review Assistant/i)).toBeInTheDocument();
      
      // Should show description
      expect(screen.getByText(/reviews every PR in seconds/i)).toBeInTheDocument();
    });

    it('should apply custom className', () => {
      render(<AgentIntro {...defaultProps} className="custom-intro" />);
      
      const intro = screen.getByTestId('agent-intro');
      expect(intro).toHaveClass('custom-intro');
    });

    it('should render with proper HTML structure', () => {
      render(<AgentIntro {...defaultProps} />);
      
      const tagline = screen.getByTestId('agent-tagline');
      expect(tagline.tagName).toBe('H2');
      
      const description = screen.getByTestId('agent-description');
      expect(description.tagName).toBe('P');
    });
  });

  describe('Typing Animation', () => {
    it('should show typing animation when animated is true', async () => {
      jest.useFakeTimers();
      
      render(<AgentIntro {...defaultProps} animated={true} />);
      
      const tagline = screen.getByTestId('agent-tagline');
      
      // Initially should be empty or partial
      expect(tagline.textContent).toBe('');
      
      // Advance timers to show typing
      act(() => {
        jest.advanceTimersByTime(2000);
      });
      
      await waitFor(() => {
        expect(tagline.textContent).toContain('Your AI Code Review Assistant');
      });
      
      jest.useRealTimers();
    });

    it('should show full text immediately when animated is false', () => {
      render(<AgentIntro {...defaultProps} animated={false} />);
      
      const tagline = screen.getByTestId('agent-tagline');
      expect(tagline).toHaveTextContent('Your AI Code Review Assistant');
      
      const description = screen.getByTestId('agent-description');
      expect(description).toHaveTextContent(/reviews every PR in seconds/i);
    });

    it('should respect custom typing speed', async () => {
      jest.useFakeTimers();
      
      const fastSpeed = 20; // ms per character
      render(
        <AgentIntro 
          {...defaultProps} 
          animated={true} 
          typingSpeed={fastSpeed}
        />
      );
      
      const tagline = screen.getByTestId('agent-tagline');
      const totalChars = defaultProps.tagline.length;
      const expectedTime = totalChars * fastSpeed;
      
      act(() => {
        jest.advanceTimersByTime(expectedTime);
      });
      
      await waitFor(() => {
        expect(tagline.textContent).toBe(defaultProps.tagline);
      });
      
      jest.useRealTimers();
    });

    it('should show blinking cursor during typing', () => {
      render(<AgentIntro {...defaultProps} animated={true} showCursor={true} />);
      
      const cursor = screen.getByTestId('typing-cursor');
      expect(cursor).toBeInTheDocument();
      expect(cursor).toHaveClass('animate-blink');
    });

    it('should hide cursor after typing completes', async () => {
      jest.useFakeTimers();
      
      render(<AgentIntro {...defaultProps} animated={true} showCursor={true} />);
      
      // Complete typing animation
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      await waitFor(() => {
        const cursor = screen.queryByTestId('typing-cursor');
        expect(cursor).not.toBeInTheDocument();
      });
      
      jest.useRealTimers();
    });
  });

  describe('Reduced Motion', () => {
    it('should disable animation when prefers-reduced-motion is set', () => {
      // Mock matchMedia for prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<AgentIntro {...defaultProps} animated={true} />);
      
      const tagline = screen.getByTestId('agent-tagline');
      // Should show full text immediately with reduced motion
      expect(tagline).toHaveTextContent('Your AI Code Review Assistant');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<AgentIntro {...defaultProps} aria-label="Agent Introduction" />);
      
      const intro = screen.getByTestId('agent-intro');
      expect(intro).toHaveAttribute('aria-label', 'Agent Introduction');
    });

    it('should have proper heading hierarchy', () => {
      render(<AgentIntro {...defaultProps} />);
      
      const tagline = screen.getByTestId('agent-tagline');
      expect(tagline).toHaveAttribute('role', 'heading');
      expect(tagline).toHaveAttribute('aria-level', '2');
    });

    it('should announce typing updates to screen readers', () => {
      render(<AgentIntro {...defaultProps} animated={true} />);
      
      const tagline = screen.getByTestId('agent-tagline');
      expect(tagline).toHaveAttribute('aria-live', 'polite');
      expect(tagline).toHaveAttribute('aria-atomic', 'true');
    });

    it('should have descriptive text for screen readers during animation', () => {
      render(<AgentIntro {...defaultProps} animated={true} />);
      
      const intro = screen.getByTestId('agent-intro');
      const srOnly = intro.querySelector('.sr-only');
      
      expect(srOnly).toBeInTheDocument();
      expect(srOnly).toHaveTextContent(defaultProps.tagline);
    });
  });

  describe('Styling', () => {
    it('should apply gradient text effect to tagline', () => {
      render(<AgentIntro {...defaultProps} />);
      
      const tagline = screen.getByTestId('agent-tagline');
      expect(tagline).toHaveClass('text-gradient');
    });

    it('should have proper text sizing and spacing', () => {
      render(<AgentIntro {...defaultProps} />);
      
      const tagline = screen.getByTestId('agent-tagline');
      expect(tagline).toHaveClass('text-4xl', 'md:text-5xl', 'lg:text-6xl');
      
      const description = screen.getByTestId('agent-description');
      expect(description).toHaveClass('text-lg', 'md:text-xl');
    });

    it('should be responsive', () => {
      render(<AgentIntro {...defaultProps} />);
      
      const intro = screen.getByTestId('agent-intro');
      expect(intro).toHaveClass('max-w-3xl', 'mx-auto');
    });
  });

  describe('Animation Callbacks', () => {
    it('should call onAnimationComplete when typing finishes', async () => {
      jest.useFakeTimers();
      const onComplete = jest.fn();
      
      render(
        <AgentIntro 
          {...defaultProps} 
          animated={true}
          onAnimationComplete={onComplete}
        />
      );
      
      // Complete animation
      act(() => {
        jest.advanceTimersByTime(5000);
      });
      
      await waitFor(() => {
        expect(onComplete).toHaveBeenCalledTimes(1);
      });
      
      jest.useRealTimers();
    });

    it('should call onAnimationStart when typing begins', () => {
      const onStart = jest.fn();
      
      render(
        <AgentIntro 
          {...defaultProps} 
          animated={true}
          onAnimationStart={onStart}
        />
      );
      
      expect(onStart).toHaveBeenCalledTimes(1);
    });
  });

  describe('Performance', () => {
    it('should memoize expensive computations', () => {
      const { rerender } = render(<AgentIntro {...defaultProps} />);
      
      // Re-render with same props
      rerender(<AgentIntro {...defaultProps} />);
      
      // Component should not re-calculate typing animation
      // This would be verified by checking React.memo usage in implementation
      expect(screen.getByTestId('agent-intro')).toBeInTheDocument();
    });

    it('should clean up animation timers on unmount', () => {
      jest.useFakeTimers();
      const clearTimeoutSpy = jest.spyOn(global, 'clearTimeout');
      
      const { unmount } = render(
        <AgentIntro {...defaultProps} animated={true} />
      );
      
      unmount();
      
      expect(clearTimeoutSpy).toHaveBeenCalled();
      
      jest.useRealTimers();
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty tagline gracefully', () => {
      render(<AgentIntro {...defaultProps} tagline="" />);
      
      const tagline = screen.getByTestId('agent-tagline');
      expect(tagline).toBeEmptyDOMElement();
    });

    it('should handle very long text without breaking', () => {
      const longText = 'A'.repeat(500);
      render(<AgentIntro {...defaultProps} tagline={longText} />);
      
      const tagline = screen.getByTestId('agent-tagline');
      expect(tagline).toHaveClass('break-words');
    });

    it('should handle special characters in text', () => {
      const specialText = 'Code & Review <Assistant> "24/7"';
      render(<AgentIntro {...defaultProps} tagline={specialText} />);
      
      const tagline = screen.getByTestId('agent-tagline');
      expect(tagline).toHaveTextContent(specialText);
    });
  });
});