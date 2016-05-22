const path = require('path');
const webpack = require('webpack');

const DEBUG = !process.argv.includes('--release');
const VERBOSE = process.argv.includes('--verbose');

const baseConfig = {
  cache: DEBUG,

  debug: DEBUG,

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

  devtool: DEBUG ? 'cheap-module-eval-source-map' : false,

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': `"${process.env.NODE_ENV || (DEBUG ? 'development' : 'production')}"` }),
      ...(DEBUG ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({ compress: { screw_ie8: true, warnings: VERBOSE } }),
        new webpack.optimize.AggressiveMergingPlugin(),
      ]),
  ],

  resolve: {
    extensions: ['', '.js', '.jsx'],
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, include: [path.resolve(__dirname, 'src/jsx')], loader: 'babel' },
      { test: /\.scss$/, loaders: ["style", "css", "sass"], include: [path.resolve(__dirname, 'src/sass')]},
      { test: /\.svg$/, loader: 'file', include: [path.resolve(__dirname, 'src/images')] }
    ],

  },

  externals: [
    {
      "react": {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      "react-dom": "ReactDOM"
    }
  ]

};

const distConfig = Object.assign({
  entry: {
    index: ["./src/sass/trimicon.scss",  "./src/jsx/index.jsx"],
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    libraryTarget: 'umd'
  },

  target: 'web',

}, baseConfig);

const publicConfig = Object.assign({
  devServer: {
    contentBase: "public"
  },

  entry: {
    app: ["./src/sass/trimicon.scss",  "./src/jsx/app.jsx"],
  },

  output: {
    publicPath: '/public',
    sourcePrefix: '',
    path: path.join(__dirname, 'public'),
    filename: '[name].js',
  },

  target: "web",

}, baseConfig);


module.exports = [publicConfig, distConfig];
