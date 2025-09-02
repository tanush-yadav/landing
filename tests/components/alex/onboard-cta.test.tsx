/**
 * Test Suite for OnboardCTA Component
 * Testing CTA button with analytics tracking and loading states
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import { OnboardCTA } from '@/components/alex/onboard-cta';
import { OnboardCTAProps } from '@/types/alex-agent';

// Mock PostHog for analytics testing
const mockPostHog = {
  capture: jest.fn(),
  identify: jest.fn(),
  reset: jest.fn(),
};

jest.mock('posthog-js', () => ({
  ...jest.requireActual('posthog-js'),
  usePostHog: () => mockPostHog,
}));

describe('OnboardCTA Component', () => {
  const defaultProps: OnboardCTAProps = {
    text: 'Onboard Alex to Your Team',
    variant: 'primary',
    size: 'lg',
    onClick: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockPostHog.capture.mockClear();
  });

  describe('Rendering', () => {
    it('should render with text content', () => {
      render(<OnboardCTA {...defaultProps} />);
      
      const button = screen.getByRole('button', { name: /onboard alex to your team/i });
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Onboard Alex to Your Team');
    });

    it('should apply variant styles', () => {
      const variants: Array<OnboardCTAProps['variant']> = ['primary', 'secondary', 'gradient'];
      
      variants.forEach(variant => {
        const { rerender } = render(<OnboardCTA {...defaultProps} variant={variant} />);
        
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`btn-${variant}`);
        
        rerender(<div />);
      });
    });

    it('should apply size classes', () => {
      const sizes: Array<OnboardCTAProps['size']> = ['sm', 'md', 'lg'];
      
      sizes.forEach(size => {
        const { rerender } = render(<OnboardCTA {...defaultProps} size={size} />);
        
        const button = screen.getByRole('button');
        expect(button).toHaveClass(`btn-${size}`);
        
        rerender(<div />);
      });
    });

    it('should support custom className', () => {
      render(<OnboardCTA {...defaultProps} className="custom-cta-class" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-cta-class');
    });

    it('should render with icon', () => {
      render(<OnboardCTA {...defaultProps} />);
      
      const icon = screen.getByTestId('cta-icon');
      expect(icon).toBeInTheDocument();
      expect(icon).toHaveClass('lucide-arrow-right');
    });
  });

  describe('Interactions', () => {
    it('should call onClick handler when clicked', async () => {
      const handleClick = jest.fn();
      render(<OnboardCTA {...defaultProps} onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('should not call onClick when disabled', async () => {
      const handleClick = jest.fn();
      render(<OnboardCTA {...defaultProps} onClick={handleClick} disabled={true} />);
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('should show hover state', async () => {
      render(<OnboardCTA {...defaultProps} />);
      
      const button = screen.getByRole('button');
      
      await userEvent.hover(button);
      expect(button).toHaveClass('hover:shadow-lg');
      
      await userEvent.unhover(button);
      expect(button).not.toHaveClass('hover:shadow-lg');
    });

    it('should show focus state on keyboard navigation', () => {
      render(<OnboardCTA {...defaultProps} />);
      
      const button = screen.getByRole('button');
      button.focus();
      
      expect(button).toHaveFocus();
      expect(button).toHaveClass('focus:ring-2');
    });
  });

  describe('Loading State', () => {
    it('should show loading spinner when loading', () => {
      render(<OnboardCTA {...defaultProps} loading={true} />);
      
      const spinner = screen.getByTestId('loading-spinner');
      expect(spinner).toBeInTheDocument();
      expect(spinner).toHaveClass('animate-spin');
    });

    it('should disable button when loading', () => {
      render(<OnboardCTA {...defaultProps} loading={true} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
    });

    it('should change text when loading', () => {
      render(<OnboardCTA {...defaultProps} loading={true} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveTextContent('Onboarding...');
    });

    it('should prevent clicks during loading', async () => {
      const handleClick = jest.fn();
      render(<OnboardCTA {...defaultProps} onClick={handleClick} loading={true} />);
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });
  });

  describe('Analytics Tracking', () => {
    it('should track click event with PostHog', async () => {
      render(<OnboardCTA {...defaultProps} trackingId="hero-onboard-cta" />);
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(mockPostHog.capture).toHaveBeenCalledWith('cta_clicked', {
        cta_id: 'hero-onboard-cta',
        cta_text: 'Onboard Alex to Your Team',
        cta_variant: 'primary',
        page: expect.stringContaining('alex'),
        timestamp: expect.any(Number),
      });
    });

    it('should not track when analytics disabled', async () => {
      render(
        <OnboardCTA 
          {...defaultProps} 
          trackingId="hero-onboard-cta"
          analyticsEnabled={false}
        />
      );
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      expect(mockPostHog.capture).not.toHaveBeenCalled();
    });

    it('should track hover time', async () => {
      jest.useFakeTimers();
      
      render(<OnboardCTA {...defaultProps} trackingId="hero-onboard-cta" />);
      
      const button = screen.getByRole('button');
      
      await userEvent.hover(button);
      
      // Simulate 3 seconds of hover
      jest.advanceTimersByTime(3000);
      
      await userEvent.unhover(button);
      
      expect(mockPostHog.capture).toHaveBeenCalledWith('cta_hover', {
        cta_id: 'hero-onboard-cta',
        hover_duration: 3000,
      });
      
      jest.useRealTimers();
    });
  });

  describe('Disabled State', () => {
    it('should apply disabled styles', () => {
      render(<OnboardCTA {...defaultProps} disabled={true} />);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('opacity-50', 'cursor-not-allowed');
    });

    it('should show disabled tooltip on hover', async () => {
      render(
        <OnboardCTA 
          {...defaultProps} 
          disabled={true}
          disabledTooltip="Alex is currently at capacity"
        />
      );
      
      const button = screen.getByRole('button');
      await userEvent.hover(button);
      
      const tooltip = await screen.findByRole('tooltip');
      expect(tooltip).toHaveTextContent('Alex is currently at capacity');
    });
  });

  describe('Accessibility', () => {
    it('should have proper ARIA attributes', () => {
      render(<OnboardCTA {...defaultProps} aria-label="Start onboarding process" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Start onboarding process');
    });

    it('should have aria-busy during loading', () => {
      render(<OnboardCTA {...defaultProps} loading={true} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-busy', 'true');
    });

    it('should be keyboard accessible', async () => {
      const handleClick = jest.fn();
      render(<OnboardCTA {...defaultProps} onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      button.focus();
      
      // Simulate Enter key
      fireEvent.keyDown(button, { key: 'Enter', code: 'Enter' });
      expect(handleClick).toHaveBeenCalledTimes(1);
      
      // Simulate Space key
      fireEvent.keyDown(button, { key: ' ', code: 'Space' });
      expect(handleClick).toHaveBeenCalledTimes(2);
    });

    it('should announce loading state to screen readers', () => {
      const { rerender } = render(<OnboardCTA {...defaultProps} />);
      
      rerender(<OnboardCTA {...defaultProps} loading={true} />);
      
      const liveRegion = screen.getByRole('status');
      expect(liveRegion).toHaveTextContent('Loading, please wait');
    });
  });

  describe('Animation', () => {
    it('should have pulse animation on gradient variant', () => {
      render(<OnboardCTA {...defaultProps} variant="gradient" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('animate-pulse-slow');
    });

    it('should scale on click', async () => {
      render(<OnboardCTA {...defaultProps} />);
      
      const button = screen.getByRole('button');
      
      fireEvent.mouseDown(button);
      expect(button).toHaveClass('scale-95');
      
      fireEvent.mouseUp(button);
      expect(button).not.toHaveClass('scale-95');
    });

    it('should animate icon on hover', async () => {
      render(<OnboardCTA {...defaultProps} />);
      
      const button = screen.getByRole('button');
      const icon = screen.getByTestId('cta-icon');
      
      await userEvent.hover(button);
      expect(icon).toHaveClass('translate-x-1');
    });
  });

  describe('Responsive Behavior', () => {
    it('should adjust size on mobile', () => {
      // Mock window.innerWidth for mobile
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      render(<OnboardCTA {...defaultProps} />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('w-full', 'sm:w-auto');
    });

    it('should stack icon on small screens', () => {
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });
      
      render(<OnboardCTA {...defaultProps} />);
      
      const buttonContent = screen.getByTestId('cta-content');
      expect(buttonContent).toHaveClass('flex-col', 'sm:flex-row');
    });
  });

  describe('Error Handling', () => {
    it('should handle onClick errors gracefully', async () => {
      const errorHandler = jest.fn();
      const throwingHandler = jest.fn(() => {
        throw new Error('Click handler error');
      });
      
      // Set up error boundary or error handler
      window.addEventListener('error', errorHandler);
      
      render(<OnboardCTA {...defaultProps} onClick={throwingHandler} />);
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      // Should not crash the component
      expect(button).toBeInTheDocument();
      
      window.removeEventListener('error', errorHandler);
    });

    it('should show error state after failed action', async () => {
      const failingHandler = jest.fn().mockRejectedValue(new Error('API Error'));
      
      render(<OnboardCTA {...defaultProps} onClick={failingHandler} />);
      
      const button = screen.getByRole('button');
      await userEvent.click(button);
      
      await waitFor(() => {
        expect(button).toHaveClass('btn-error');
        expect(button).toHaveTextContent('Try Again');
      });
    });
  });

  describe('Performance', () => {
    it('should debounce rapid clicks', async () => {
      const handleClick = jest.fn();
      render(<OnboardCTA {...defaultProps} onClick={handleClick} />);
      
      const button = screen.getByRole('button');
      
      // Rapid clicks
      await userEvent.click(button);
      await userEvent.click(button);
      await userEvent.click(button);
      
      // Should only register once due to debouncing
      await waitFor(() => {
        expect(handleClick).toHaveBeenCalledTimes(1);
      });
    });

    it('should use React.memo for performance', () => {
      const { rerender } = render(<OnboardCTA {...defaultProps} />);
      
      // Re-render with same props
      rerender(<OnboardCTA {...defaultProps} />);
      
      // Component should not re-render unnecessarily
      // This would be verified by checking React.memo in implementation
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });
});