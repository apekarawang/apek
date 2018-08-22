const path = require('path')
const _ = require('lodash')

module.exports = {
  title: 'APEK',
  description: 'Asosiasi Pengusaha Engineering Karawang',
  evergreen: true,
  serviceWorker: true,
  head: [
    ['link', {rel: "apple-touch-icon", sizes:"180x180", href: "/apple-touch-icon.png"}],
    ['link', {rel: "icon", type: "image/png", sizes: "32x32", href: "/favicon-32x32.png"}],
    ['link', {rel: "icon", type: "image/png", sizes: "16x16", href: "/favicon-16x16.png"}],
    ['link', {rel: "manifest", href: "/site.webmanifest"}],
    ['link', {rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5"}],
    ['meta', {name: "apple-mobile-web-app-title", content: "APEK"}],
    ['meta', {name: "application-name", content: "APEK"}],
    ['meta', {name: "msapplication-TileColor", content: "#2d89ef"}],
    ['meta', {name: "theme-color", content: "#ffffff"}],
  ],
  themeConfig: {
    logo: '/logo/logo-only.png',
    docsDir: 'docs',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Members', link: '/members/' },
      {
        text: 'Info',
        items: [
          { text: 'Announcements', link: '/announcements/' },
          { text: 'Activities', link: '/activities/' },
          { text: 'Technologies', link: '/technologies/' },
        ]
      },
      { text: 'About', link: '/about/' },
      { text: 'Contact', link: '/contact/' },
    ]
  },
  markdown: {
    anchor: { permalink: false, permalinkBefore: true, permalinkSymbol: '#' }
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@vuetify': path.resolve(__dirname, '..', '..', 'node_modules', 'vuetify'),
        '@docs': path.resolve(__dirname)
      }
    }
  },
}