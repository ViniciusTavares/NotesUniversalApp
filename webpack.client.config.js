const webpack = require('webpack');
const path = require('path');

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, 'src', 'shared', 'app', 'index.js'),
  output: {
    path: path.join(__dirname, 'build', 'static', 'js'),
    filename: 'client-bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: ['babel-loader'],
        query: {
          cacheDirectory: 'babel_cache'
        }
      },
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: false,
      sourcemap: false,
      beautify: false,
      dead_code: true
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};
