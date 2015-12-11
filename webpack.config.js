var path = require('path');
var _ = require('lodash');
var webpack = require('webpack');

var DEBUG = !process.argv.includes('--release');
// var VERBOSE = !process.argv.includes('--verbose');
var VERBOSE = true;

var appConfig = {
  entry: path.resolve(__dirname, 'src', 'js', 'app.js'),
  cache: DEBUG,
  debug: DEBUG,
  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,
  stats: {
    colors: true,
    reasons: DEBUG,
    hash: VERBOSE,
    version: VERBOSE,
    timings: true,
    chunks: VERBOSE,
    chunkModules: VERBOSE,
    cached: VERBOSE,
    cachedAssets: VERBOSE,
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
  ],
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx', '.json'],
  },
  eslint: {
    configFile: '.eslintrc'
  },
  module: {
    preLoaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          stage: 0,
          plugins: ['./build/babelRelayPlugin']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
        loader: 'url-loader?limit=10000',
      }
    ]
  },
  output: { filename: 'app.js', path: '/' }
};

if (!DEBUG) {
  var prodPlugins = [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: VERBOSE }
    }),
    new webpack.optimize.AggressiveMergingPlugin()
  ];
  appConfig.plugins = _.union(appConfig.plugins, prodPlugins);
}

var serverConfig = {
  entry: path.resolve(__dirname, 'server', 'server.js'),
  target: 'node',
  devtool: 'source-map',
  eslint: {
    configFile: '.eslintrc'
  },
  output: {
    path: '/',
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint'
      }
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          stage: 0,
          plugins: ['./build/babelRelayPlugin']
        }
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
};

module.exports = appConfig;
