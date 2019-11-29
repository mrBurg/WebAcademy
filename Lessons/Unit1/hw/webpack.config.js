const PATH = require('path'),
  HTML_WEBPACK_PLUGIN = require('html-webpack-plugin'),
  MINI_CSS_EXTRACT_PLUGIN = require('mini-css-extract-plugin'),
  AUTOPREFIXER = require('autoprefixer'),
  { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  context: PATH.resolve(__dirname),
  mode: 'development',
  target: "web",
  entry: './src/js/index.js',
  output: {
    path: PATH.resolve('bundle'),
    filename: 'js/index.js',
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [{
          loader: MINI_CSS_EXTRACT_PLUGIN.loader,
          options: {
            publicPath: 'bundle/'
          }
        }, {
          loader: 'css',
          options: {
            sourceMap: true
          }
        }, {
          loader: 'postcss',
          options: {
            plugins: [AUTOPREFIXER({
              overrideBrowserslist: [
                'ie >= 9', 'last 2 version'
              ]
            })]
          }
        },
        'sass'
      ]
    }]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.scss']
  },
  resolveLoader: {
    moduleExtensions: ["-loader"]
  },
  devtool: "source-map",
  plugins: [
    new CleanWebpackPlugin(),
    new HTML_WEBPACK_PLUGIN({
      title: 'WebAcademy'
    }),
    new MINI_CSS_EXTRACT_PLUGIN({
      filename: 'css/[name].css'
    })
  ],
  watch: false,
  watchOptions: {
    aggregateTimeout: 1000,
    poll: true
  },
  devServer: {
    contentBase: PATH.resolve(__dirname, './bundle'),
    host: 'localhost',
    port: 9000,
    open: true
  }
}