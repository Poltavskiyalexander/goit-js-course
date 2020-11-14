const HtmlWebpackPlugin = require('html-webpack-plugin');
const paths = require('../utils/paths');
const fs = require('fs');

const PAGES_DIR = `${paths.SRC_DIR}/pages/`;
const PAGES = fs
  .readdirSync(PAGES_DIR)
  .filter(fileName => fileName.endsWith('.html'));

module.exports = env => ({
  devtool: 'cheap-eval-source-map',
  output: {
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({
  //     template: './index.html',
  //   }),
  // ],

  plugins: [
    ...PAGES.map(
      page =>
        new HtmlWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `./pages/${page}`,
        }),
    ),
    new HtmlWebpackPlugin({
      template: './index.html',
    }),
    // new HtmlWebpackPlugin({
    //   template: `${PAGES_DIR}/about/index.html`,
    //   filename: './about/index.html',
    //   inject: true,
    // }),
    // new HtmlWebpackPlugin({
    //   template: `${PAGES_DIR}/about/portfolio.html`,
    //   filename: './about/portfolio.html',
    //   inject: true,
    // }),
  ],
  devServer: {
    contentBase: paths.BUILD_DIR,
    publicPath: '',
    historyApiFallback: true,
    compress: false,
    // compress: true,
    port: 4040,
    noInfo: true,
    quiet: true,
    clientLogLevel: 'warning',
    stats: 'errors-only',
    open: true,
  },
});
