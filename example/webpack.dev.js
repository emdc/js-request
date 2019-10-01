const {Config} = require('webpack-config');
const HtmlWebpackHarddiskPlugin = require('html-webpack-harddisk-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');


module.exports = new Config()
  .extend(path.resolve(__dirname, 'webpack.base.js'))
  .merge({
    devtool: 'cheap-module-source-map',
    mode: 'development',
    entry: {
      app: [
        'core-js/stable',
        'regenerator-runtime/runtime',
        '@babel/register',
        'webpack-hot-middleware/client',
        './example/index.js'
      ]
    },
    optimization: {
      minimize: false,
      occurrenceOrder: true,
      mergeDuplicateChunks: true
    },
    plugins: [
      new HtmlWebpackPlugin({
        alwaysWriteToDisk: true,
        title: '@emdc/requester',
        filename: 'index.html',
        template: 'example/index.hbs',
        env: '"development"',
        hash: true,
        inject: false
      }),
      new HtmlWebpackHarddiskPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoEmitOnErrorsPlugin()
    ]
  });
