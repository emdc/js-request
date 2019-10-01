const {Config} = require('webpack-config');
const path = require('path');
const webpack = require('webpack');


module.exports = new Config().merge({
  output: {
    path: path.resolve(__dirname, '../public/'),
    filename: 'assets/js/[name].min.js',
    publicPath: '/'
  },
  stats: {
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkGroups: false,
    chunkModules: false,
    chunkOrigins: false,
    entrypoints: false,
    modules: false,
    reasons: false
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@emdc/requester': path.resolve(__dirname, '../src/index.js')
    }
  },
  module: {
    rules: [{
      test: /(\.js|\.jsx)$/,
      use: [{
        loader: 'babel-loader',
        options: {
          compact: false
        }
      }]
    }, {
      test: /\.hbs$/,
      loader: 'handlebars-loader'
    }]
  },
  node: {fs: 'empty'},
  performance: {hints: false}
});
