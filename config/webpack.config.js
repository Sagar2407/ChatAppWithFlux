"use strict";

const webpack = require('webpack');
const argv = require('minimist')(process.argv.slice(2));
const DEBUG = !argv.release;

const path = require('path');

var plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    names: ['common', 'vendors'],
    filename: '[name].js',
    minChunks: Infinity
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV':  DEBUG ? '"development"' : '"production"',
    "process.argv.verbose": !!DEBUG
  }),
  new webpack.ProvidePlugin({
    $: "jquery",
    jQuery: "jquery",
    jquery: "jquery"
  })
].concat(DEBUG ? [] : [
  new webpack.optimize.DedupePlugin(),
  new webpack.optimize.UglifyJsPlugin({
    minimize: true,
    compress: {
      warnings: true
    }
  }),
  new webpack.optimize.AggressiveMergingPlugin()
]);

module.exports = {
  entry: {
    app: path.join(__dirname, '..', 'app', 'app.js'),
    vendors: [
      'react',
      'react-dom',
      'react-bootstrap',
      'react-router',
      'alt',
      'lodash',
      'superagent',
      'react-router-role-authorization',
      'react-validation-decorator'
    ]
  },

  output: {
    publicPath: '/js/',
    path: './wwwroot/js/',
    filename: '[name].js',
    chunkFilename: "[id].[name].js"
  },

  context: path.join(__dirname, '..'),

  plugins: plugins,

  cache: DEBUG,
  debug: DEBUG,
  watch: DEBUG,

  stats: {
    colors: true
  },

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json']
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ['babel-loader']
      },
      {
        test: /\.(less|css)$/,
        loaders: ["style", "css", "less"]
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(eot|ttf|wav|mp3|mp4)$/,
        loader: 'file-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  },
  node: {
    net: 'mock',
    dns: 'mock'
  }
};
