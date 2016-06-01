const webpack = require('webpack');
const path = require('path');

module.exports = function (config) {
  config.set({
    browsers: [ 'Chrome' ], //run in Chrome
    singleRun: true, //just run once by default
    frameworks: [ 'mocha' ], //use the mocha test framework
    
    files: [
      //'tests.webpack.js' //just load this file
      "tests/*_spec.js",
    ],
    
    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
    ],

    preprocessors: {
      './src/**/*': [ 'webpack', 'sourcemap' ],
      './tests/*.js' : ['webpack', 'sourcemap']//preprocess with webpack and our sourcemap loader
    },
    
    reporters: [ 'dots' ], //report results in this format
    
    webpack: { 
      devtool: 'inline-source-map',
      resolve: {
        extensions: ['', '.js', '.jsx'],
      },

      module: {
        loaders: [
          { test: /\.js$|\.jsx$/, loader: 'babel', include: [path.resolve(__dirname, 'tests')] },
          { test: /\.json$/, loader: 'json' },
        ],
      },

    },

    webpackServer: {
      noInfo: true //please don't spam the console when running in karma!
    }
  });
};

