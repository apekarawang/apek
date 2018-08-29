const path = require("path");
const HtmlWebpackPlugin = require("vuepress-html-webpack-plugin");
const HtmlWebpackExternalsPlugin = require("html-webpack-externals-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = (e, a) => ({
  entry: "./cms/cms.js",
  output: {
    path: a.mode === 'production' ?
      path.resolve('dist') :
      path.resolve(__dirname, "docs/.vuepress", "public", "admin")
  },
  externals: {
    "netlify-cms": "CMS",
    "react-virtualized-select": "VirtualizedSelect"
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.esm.js",
      "@components": path.resolve(__dirname, "docs", ".vuepress", "components"),
      "@docs": path.resolve(__dirname, "docs"),
      "@theme": path.resolve(__dirname, "docs", ".vuepress", "theme"),
      "@vuetify": path.resolve(__dirname, "node_modules", "vuetify")
    }
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: 'source-map-loader',
      //   enforce: 'pre',
      // },
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: path.resolve("node_modules", ".cache", "loader")
            }
          },
          {
            loader: "babel-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: "cache-loader",
            options: {
              cacheDirectory: path.resolve("node_modules", ".cache", "loader")
            }
          },
          {
            loader: "vue-loader",
            options: {
              compilerOptions: {
                preserveWhitespace: true
              }
            }
          }
        ]
      },
      {
        test: /\.styl(us)?$/,
        use: ["css-loader", "stylus-loader"]
      },
      {
        test: /\.css$/,
        loader: ["css-loader"]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "Content Manager"
    }),
    new HtmlWebpackExternalsPlugin({
      externals: [
        {
          module: "react",
          entry: "umd/react.production.min.js",
          global: "React"
        },
        {
          module: "react-dom",
          entry: "umd/react-dom.production.min.js",
          global: "ReactDOM"
        },
        {
          module: "netlify-cms",
          entry: "dist/netlify-cms.js",
          global: "CMS"
        },
        {
          module: "react-select",
          entry: "dist/react-select.css"
        },
        {
          module: "react-virtualized",
          entry: "styles.css"
        },
        {
          module: "react-virtualized-select",
          global: "VirtualizedSelect",
          entry: ["styles.css", "dist/umd/react-virtualized-select.js"]
        }
      ]
    })
  ],
  devtool: "source-map"
});