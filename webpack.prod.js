const TerserJSPlugin = require('terser-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = {
  entry: {
    app: [
      './src/index.js'
    ]
  },
  output: {
    path: path.resolve(__dirname, './dist/'),
    filename: 'request.min.js',
    library: 'request',
    libraryTarget: 'umd'
  },
  devtool: 'source',
  mode: 'production',
  optimization: {
    minimizer: [new TerserJSPlugin({})],
    minimize: true,
    occurrenceOrder: true,
    mergeDuplicateChunks: true
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@emdc/request': path.resolve(__dirname, './src')
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
    }]
  },
  stats: {
    cached: false,
    cachedAssets: false,
    children: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    entrypoints: false,
    modules: false,
    reasons: false
  },
};
