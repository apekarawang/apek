module.exports = {
  title: 'APEK',
  description: 'Asosiasi Pengusaha Engineering Karawang',
  evergreen: true,
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
  chainWebpack: config => {
    //
  },
}