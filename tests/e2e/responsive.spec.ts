import { test, expect } from '@playwright/test'

const breakpoints = [
  { name: 'small-mobile', viewport: { width: 320, height: 720 } },
  { name: 'mobile', viewport: { width: 375, height: 812 } },
  { name: 'large-mobile', viewport: { width: 414, height: 896 } },
  { name: 'tablet', viewport: { width: 768, height: 1024 } },
]

test.describe('landing page responsiveness', () => {
  for (const { name, viewport } of breakpoints) {
    test(`no horizontal overflow on ${name}`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const { scrollWidth, clientWidth } = await page.evaluate(() => {
        const root = document.documentElement
        return {
          scrollWidth: root.scrollWidth,
          clientWidth: root.clientWidth,
        }
      })

      expect(
        scrollWidth,
        `Expected document scrollWidth ${scrollWidth} to be <= clientWidth ${clientWidth}`
      ).toBeLessThanOrEqual(clientWidth)
    })

    test(`key sections wrap correctly on ${name}`, async ({ page }) => {
      await page.setViewportSize(viewport)
      await page.goto('/')
      await page.waitForLoadState('networkidle')

      const flexSelectors = [
        '#hero',
        '[data-section="interactive-demo"]',
        '[data-section="moving-testimonials"]',
        '[data-section="cta-section"]',
      ]

      for (const selector of flexSelectors) {
        const handles = await page.$$(selector)
        for (const handle of handles) {
          const boundingBox = await handle.boundingBox()
          if (!boundingBox) continue

          const viewportWidth = viewport.width
          expect(
            boundingBox.width,
            `${selector} width ${boundingBox.width} should stay within viewport width ${viewportWidth}`
          ).toBeLessThanOrEqual(viewportWidth + 1)
        }
      }
    })
  }
})
