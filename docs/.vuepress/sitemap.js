const fs = require('fs')
const path = require('path')
const sitemap = require('sitemap')

const nav = require('./config').themeConfig.nav

const sitemapXML = sitemap.createSitemap({
  hostname: 'https://apek.or.id',
  cacheTime: 600000, // 600 sec cache period
})

const normalize = url => ({ url, changefreq: 'daily' })

nav.forEach(i => {
  i.link
    ? sitemapXML.add(normalize(i.link))
    : i.items.forEach(o => {
        o.link && sitemapXML.add(normalize(o.link))
      })
})

fs.writeFileSync(
  path.resolve(__dirname, 'public/sitemap.xml'),
  sitemapXML.toString()
)
