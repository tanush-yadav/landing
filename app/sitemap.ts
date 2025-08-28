import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://cintra.run'
  const routes = [
    '',
    '/pricing',
    '/security',
    '/careers',
    '/enterprise',
    '/docs',
    '/community',
  ]
  return routes.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: path === '' ? 1 : 0.6,
  }))
}
