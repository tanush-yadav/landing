import { test, expect } from '@playwright/test'

test.describe('Agent Detail Page Navigation', () => {
  test('should navigate to agent detail page from team listing', async ({ page }) => {
    // Navigate to the agents page
    await page.goto('/agents')
    
    // Wait for the page to load
    await expect(page.getByText('Your Complete AI Team')).toBeVisible()
    
    // Click on "View Details" button for Alex
    const alexCard = page.locator('[data-testid="agent-card-junior-engineer"]').or(
      page.locator('text=Alex').locator('..').locator('..')
    )
    
    // Click the View Details link for Alex
    await alexCard.getByText('View Details').click()
    
    // Should navigate to Alex's detail page
    await expect(page).toHaveURL('/agents/junior-engineer')
    
    // Should display Alex's information
    await expect(page.getByRole('heading', { name: /Alex/i })).toBeVisible()
    await expect(page.getByText('Junior Engineer')).toBeVisible()
    await expect(page.getByText(/dedicated junior engineer/)).toBeVisible()
  })

  test('should navigate to agent detail page from name link', async ({ page }) => {
    // Navigate to the agents page
    await page.goto('/agents')
    
    // Click on agent name link
    await page.getByRole('link', { name: /Sophia/i }).first().click()
    
    // Should navigate to Sophia's detail page
    await expect(page).toHaveURL('/agents/blog-writer')
    
    // Should display Sophia's information
    await expect(page.getByRole('heading', { name: /Sophia/i })).toBeVisible()
    await expect(page.getByText('Blog Writer')).toBeVisible()
  })

  test('agent detail page should have back to team link', async ({ page }) => {
    // Navigate directly to an agent detail page
    await page.goto('/agents/junior-engineer')
    
    // Click back to team link
    await page.getByRole('link', { name: /Back to Team/i }).click()
    
    // Should navigate back to agents listing
    await expect(page).toHaveURL('/agents')
    await expect(page.getByText('Your Complete AI Team')).toBeVisible()
  })

  test('agent detail page should display all agent information', async ({ page }) => {
    await page.goto('/agents/junior-engineer')
    
    // Check main elements are visible
    await expect(page.getByRole('heading', { name: /Alex/i })).toBeVisible()
    await expect(page.getByText('Junior Engineer')).toBeVisible()
    await expect(page.getByText('Working')).toBeVisible()
    
    // Check statistics
    await expect(page.getByText('147')).toBeVisible()
    await expect(page.getByText('3.5 mins')).toBeVisible()
    await expect(page.getByText('98%')).toBeVisible()
    
    // Check sections
    await expect(page.getByText('Capabilities')).toBeVisible()
    await expect(page.getByText('Technologies')).toBeVisible()
    await expect(page.getByText('Recent Projects')).toBeVisible()
    await expect(page.getByText('Current Activity')).toBeVisible()
    
    // Check some capabilities
    await expect(page.getByText(/Code review and pull request analysis/)).toBeVisible()
    await expect(page.getByText(/Unit test creation and maintenance/)).toBeVisible()
    
    // Check technologies
    await expect(page.getByText('JavaScript/TypeScript')).toBeVisible()
    await expect(page.getByText('React/Next.js')).toBeVisible()
    
    // Check recent projects
    await expect(page.getByText('Authentication System Overhaul')).toBeVisible()
    await expect(page.getByText(/Fixed critical security vulnerabilities/)).toBeVisible()
  })

  test('should display CTA buttons on detail page', async ({ page }) => {
    await page.goto('/agents/junior-engineer')
    
    // Check for main CTA button
    const delegateButton = page.getByRole('link', { name: /Delegate Task to Alex/i })
    await expect(delegateButton).toBeVisible()
    
    // Check for bottom CTA section
    await expect(page.getByText(/Ready to Work with Alex/i)).toBeVisible()
    const scheduleButton = page.getByRole('link', { name: /Schedule a Demo/i })
    await expect(scheduleButton).toBeVisible()
  })

  test('should handle navigation to all agents', async ({ page }) => {
    const agents = [
      { id: 'junior-engineer', name: 'Alex', role: 'Junior Engineer' },
      { id: 'blog-writer', name: 'Sophia', role: 'Blog Writer' },
      { id: 'marketer', name: 'Maya', role: 'Marketer' },
      { id: 'qa-engineer', name: 'Quinn', role: 'QA Engineer' },
      { id: 'sales-rep', name: 'Jordan', role: 'Sales Rep' },
      { id: 'executive-assistant', name: 'Riley', role: 'Executive Assistant' }
    ]

    for (const agent of agents) {
      await page.goto(`/agents/${agent.id}`)
      await expect(page.getByRole('heading', { name: agent.name })).toBeVisible()
      await expect(page.getByText(agent.role)).toBeVisible()
    }
  })
})