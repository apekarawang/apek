import { writeFileSync } from 'fs'
import { resolve } from 'path'
import { createSitemap } from 'sitemap'

import { siteData } from 'vuepress/lib/app/.temp/siteData'

const urls = siteData.pages.map(i => ({
  url: i.path,
  lastmodISO: new Date(i.lastUpdated).toISOString(),
  changefreq: 'daily',
}))

const sitemap = createSitemap({
  hostname: 'https://apek.or.id',
  cacheTime: 600000, // 600 sec cache period
  urls,
})

writeFileSync(
  resolve(__dirname, '..', 'docs', '.vuepress', 'dist', 'sitemap.xml'),
  sitemap.toString()
)
