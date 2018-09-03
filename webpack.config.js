const path = require('path')
const HtmlWebpackPlugin = require('vuepress-html-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')

module.exports = (e, a) => ({
  mode: (a && a.mode) || 'development',
  entry: './cms/cms.js',
  output: {
    path:
      a && a.mode === 'production'
        ? path.resolve('dist')
        : path.resolve(__dirname, 'docs/.vuepress', 'public', 'admin'),
  },
  externals: {
    'netlify-cms': 'CMS',
    react: 'React',
    'react-dom': 'ReactDOM',
    vue: 'Vue',
    vuetify: 'Vuetify',
  },
  resolve: {
    alias: {
      vue$: 'vue/dist/vue.esm.js',
      '@components': path.resolve(__dirname, 'docs', '.vuepress', 'components'),
      '@docs': path.resolve(__dirname, 'docs'),
      '@theme': path.resolve(__dirname, 'docs', '.vuepress', 'theme'),
      '@vuetify': path.resolve(__dirname, 'node_modules', 'vuetify'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('node_modules', '.cache', 'loader'),
            },
          },
          {
            loader: 'babel-loader',
          },
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve('node_modules', '.cache', 'loader'),
            },
          },
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: true,
              },
            },
          },
        ],
      },
      {
        test: /\.styl(us)?$/,
        use: ['css-loader', 'stylus-loader'],
      },
      {
        test: /\.css$/,
        loader: ['css-loader'],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      template: './cms/index.html',
      title: 'Content Manager',
    }),
  ],
  devtool: 'source-map',
})
