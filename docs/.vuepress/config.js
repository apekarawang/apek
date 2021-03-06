const path = require('path')
const merge = require('deepmerge')
const { VuetifyProgressiveModule } = require('vuetify-loader')
const VimgIfy = require('./markdown/v-img')

module.exports = {
  title: 'APEK',
  description: 'Asosiasi Pengusaha Engineering Karawang',
  serviceWorker: true,
  ga: 'UA-114389898-1',
  head: [
    ['link', { rel: 'dns-prefetch', href: '//fonts.googleapis.com' }],
    ['link', { rel: 'dns-prefetch', href: '//www.google-analytics.com' }],
    [
      'link',
      {
        rel: 'preload',
        as: 'style',
        href:
          'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
      },
    ],
    [
      'link',
      {
        rel: 'apple-touch-icon',
        sizes: '180x180',
        href: '/apple-touch-icon.png',
      },
    ],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    [
      'meta',
      { name: 'apple-mobile-web-app-status-bar-style', content: 'maroon' },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        href: '/favicon-32x32.png',
      },
    ],
    [
      'link',
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        href: '/favicon-16x16.png',
      },
    ],
    ['link', { rel: 'manifest', href: '/manifest.json' }],
    [
      'link',
      { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
    ],
    ['meta', { name: 'apple-mobile-web-app-title', content: 'APEK' }],
    ['meta', { name: 'application-name', content: 'APEK' }],
    ['meta', { name: 'msapplication-TileColor', content: '#2d89ef' }],
    ['meta', { name: 'theme-color', content: '#ffffff' }],
  ],
  themeConfig: {
    navTitle: false,
    lastUpdated: true,
    logo: '/logo/logo-only.png',
    docsDir: 'docs',
    serviceWorker: {
      updatePopup: {
        message: 'New content is available.',
        buttonText: 'Refresh',
      },
    },
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Members', link: '/members/' },
      {
        text: 'Info',
        items: [
          { text: 'Announcements', link: '/announcements/' },
          { text: 'Activities', link: '/activities/' },
          { text: 'Technologies', link: '/technologies/' },
        ],
      },
      { text: 'About', link: '/about/' },
      { text: 'Contact', link: '/contact/' },
    ],
  },
  markdown: {
    anchor: { permalink: false, permalinkBefore: true, permalinkSymbol: '#' },
    config: md => {
      md.set({ breaks: true })
      md.use(VimgIfy)
    },
  },
  configureWebpack: {
    resolve: {
      alias: {
        '@vuetify': path.resolve(
          __dirname,
          '..',
          '..',
          'node_modules',
          'vuetify'
        ),
        '@docs': path.resolve(__dirname, '..'),
        '@public': path.resolve(__dirname, 'public'),
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap(options =>
        merge(options, {
          compilerOptions: {
            modules: [VuetifyProgressiveModule],
          },
        })
      )
      .end()

    const fileLoaderOptions = {
      limit: 10000,
      name: `assets/img/[name].[hash:8].[ext]`,
    }

    config.module.rules.delete('images')
    config.module
      .rule('images')
      .test(/\.(png|jpe?g|gif)$/)
      .oneOf('v-img')
      .resourceQuery(/vuetify-preload/)
      .use('vuetify-loader/progressive-loader')
      .loader(path.resolve(__dirname, 'v-img-sharp-loader.js'))
      .options({
        sharp: true,
      })
      .end()
      .use('url-loader')
      .loader('url-loader')
      .options(fileLoaderOptions)
      .end()
      .end()
      .oneOf('img')
      .use('url-loader')
      .loader('url-loader')
      .options(fileLoaderOptions)
      .end()
  },
}
