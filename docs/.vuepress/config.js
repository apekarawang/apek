const path = require("path");
const merge = require("deepmerge");

module.exports = {
  title: "APEK",
  description: "Asosiasi Pengusaha Engineering Karawang",
  serviceWorker: true,
  ga: "UA-114389898-1",
  head: [
    [
      "link",
      {
        rel: "apple-touch-icon",
        sizes: "180x180",
        href: "/apple-touch-icon.png"
      }
    ],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "maroon" }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        href: "/favicon-32x32.png"
      }
    ],
    [
      "link",
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        href: "/favicon-16x16.png"
      }
    ],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    [
      "link",
      { rel: "mask-icon", href: "/safari-pinned-tab.svg", color: "#5bbad5" }
    ],
    ["meta", { name: "apple-mobile-web-app-title", content: "APEK" }],
    ["meta", { name: "application-name", content: "APEK" }],
    ["meta", { name: "msapplication-TileColor", content: "#2d89ef" }],
    ["meta", { name: "theme-color", content: "#ffffff" }]
  ],
  themeConfig: {
    navTitle: false,
    logo: "/logo/logo-only.png",
    docsDir: "docs",
    serviceWorker: {
      updatePopup: {
        message: "New content is available.",
        buttonText: "Refresh"
      }
    },
    nav: [
      { text: "Home", link: "/" },
      { text: "Members", link: "/members/" },
      {
        text: "Info",
        items: [
          { text: "Announcements", link: "/announcements/" },
          { text: "Activities", link: "/activities/" },
          { text: "Technologies", link: "/technologies/" }
        ]
      },
      { text: "About", link: "/about/" },
      { text: "Contact", link: "/contact/" }
    ]
  },
  markdown: {
    anchor: { permalink: false, permalinkBefore: true, permalinkSymbol: "#" },
    config: md => {
      md.set({ breaks: true });
    }
  },
  configureWebpack: {
    resolve: {
      alias: {
        "@vuetify": path.resolve(
          __dirname,
          "..",
          "..",
          "node_modules",
          "vuetify"
        ),
        "@docs": path.resolve(__dirname)
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule("js")
      .use("babel-loader")
      .tap(options =>
        merge(options, {
          plugins: [
            [
              "transform-imports",
              {
                vuetify: {
                  transform: path.resolve(
                    __dirname,
                    "..",
                    "..",
                    "node_modules",
                    "vuetify",
                    "es5",
                    "components",
                    "${member}"
                  ),
                  preventFullImport: true
                }
              }
            ]
          ]
        })
      );
  }
};