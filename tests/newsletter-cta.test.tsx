import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { NewsletterCTA } from '@/components/newsletter-cta'

describe('NewsletterCTA', () => {
  it('renders the newsletter form', () => {
    render(<NewsletterCTA />)
    
    expect(screen.getByText('Stay in the loop')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Enter your email')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /subscribe/i })).toBeInTheDocument()
  })

  it('validates email format', async () => {
    const user = userEvent.setup()
    render(<NewsletterCTA />)
    
    const input = screen.getByPlaceholderText('Enter your email')
    const button = screen.getByRole('button', { name: /subscribe/i })
    
    // Type invalid email
    await user.type(input, 'invalid-email')
    await user.tab() // Trigger blur
    
    // Check for error message
    expect(screen.getByText('Please enter a valid email address')).toBeInTheDocument()
    
    // Button should be disabled with invalid email
    expect(button).toBeDisabled()
  })

  it('accepts valid email format', async () => {
    const user = userEvent.setup()
    render(<NewsletterCTA />)
    
    const input = screen.getByPlaceholderText('Enter your email')
    const button = screen.getByRole('button', { name: /subscribe/i })
    
    // Type valid email
    await user.type(input, 'test@example.com')
    
    // Button should be enabled with valid email
    expect(button).not.toBeDisabled()
    
    // No error message should be shown
    expect(screen.queryByText('Please enter a valid email address')).not.toBeInTheDocument()
  })

  it('shows loading state during submission', async () => {
    const user = userEvent.setup()
    render(<NewsletterCTA />)
    
    const input = screen.getByPlaceholderText('Enter your email')
    const button = screen.getByRole('button', { name: /subscribe/i })
    
    // Type valid email and submit
    await user.type(input, 'test@example.com')
    await user.click(button)
    
    // Check for loading state
    expect(screen.getByText('Subscribing...')).toBeInTheDocument()
    expect(button).toBeDisabled()
  })

  it('shows success message after successful submission', async () => {
    const user = userEvent.setup()
    render(<NewsletterCTA />)
    
    const input = screen.getByPlaceholderText('Enter your email')
    const button = screen.getByRole('button', { name: /subscribe/i })
    
    // Type valid email and submit
    await user.type(input, 'test@example.com')
    await user.click(button)
    
    // Wait for success message
    await waitFor(() => {
      expect(screen.getByText("You're subscribed!")).toBeInTheDocument()
    }, { timeout: 3000 })
  })

  it('is keyboard accessible', async () => {
    const user = userEvent.setup()
    render(<NewsletterCTA />)
    
    // Tab to input
    await user.tab()
    const input = screen.getByPlaceholderText('Enter your email')
    expect(input).toHaveFocus()
    
    // Type email
    await user.type(input, 'test@example.com')
    
    // Tab to button
    await user.tab()
    const button = screen.getByRole('button', { name: /subscribe/i })
    expect(button).toHaveFocus()
    
    // Submit with Enter
    await user.keyboard('{Enter}')
    
    // Check that form was submitted
    expect(screen.getByText('Subscribing...')).toBeInTheDocument()
  })

  it('has proper ARIA attributes', () => {
    render(<NewsletterCTA />)
    
    const input = screen.getByPlaceholderText('Enter your email')
    const button = screen.getByRole('button', { name: /subscribe/i })
    
    // Check for proper labeling
    expect(input).toHaveAttribute('aria-label', 'Email address')
    expect(input).toHaveAttribute('type', 'email')
    expect(input).toHaveAttribute('required')
    
    // Button should have aria-busy during loading
    expect(button).toHaveAttribute('aria-busy', 'false')
  })

  it('respects user privacy preferences', () => {
    render(<NewsletterCTA />)
    
    // Check for privacy note
    expect(screen.getByText(/We respect your privacy/i)).toBeInTheDocument()
    expect(screen.getByText(/No spam, ever/i)).toBeInTheDocument()
  })
})