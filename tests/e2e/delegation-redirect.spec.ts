import { test, expect } from '@playwright/test'

test.describe('Delegation click tracking and redirect', () => {
  test('second delegate click redirects to Cal.com', async ({ page }) => {
    await page.goto('/')

    await page.addInitScript(() => {
      window.localStorage.setItem('delegationClickCount', '1')
    })

    await page.reload()

    // Ensure page loaded (hero heading)
    await expect(page.locator('text=AI Employees That')).toBeVisible()

    // Scroll to teams section where buttons are named "Delegate Task"
    await page.locator('text=Meet Your').scrollIntoViewIfNeeded()
    const teamDelegateBtn = page.getByRole('button', { name: /Delegate Task/i }).first()
    await expect(teamDelegateBtn).toBeVisible()
    await teamDelegateBtn.click()

    await page.waitForURL(/cal\.com\/tanushyadav\/quick-chat/, { timeout: 15_000 })
  })
})

