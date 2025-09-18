import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  timeout: 60_000,
  fullyParallel: true,
  reporter: 'list',
  use: {
    baseURL: process.env.PLAYWRIGHT_BASE_URL || 'http://localhost:3002',
    headless: true,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'webkit',
      use: { browserName: 'webkit', ...devices['Desktop Safari'] },
    },
  ],
})
