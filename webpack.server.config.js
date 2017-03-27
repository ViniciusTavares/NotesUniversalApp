const webpack = require('webpack');
const path = require('path');
var fs = require('fs');

var nodeModules = {};
fs.readdirSync('node_modules')
.filter(function(x) {
  return ['.bin'].indexOf(x) === -1;
})
.forEach(function(mod) {
  nodeModules[mod] = 'commonjs ' + mod;
});

module.exports = {
  target: 'node',
  module: {
    loaders: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        query: {
          cacheDirectory: 'babel_cache'
        }
      }
    ],
  },
  entry: path.join(__dirname, 'src', 'server', 'index.js'),
  output: {
    path: path.join(__dirname, 'build'),
    filename: 'bundle.js'
  },
  externals: nodeModules,
  node: {
    console: false,
    global: false,
    process: false,
    Buffer: false,
    __filename: false,
    __dirname: false,
  },
  devtool: 'source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV':  JSON.stringify('production'),
        'PORT': JSON.stringify("3000"),
        'API_URL': JSON.stringify("http://localhost:3000"),
        'MONGO' : { URI:  JSON.stringify('mongodb://notesapp:notes123@ds147799.mlab.com:47799/heroku_lwvj2lv2') }
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      mangle: false,
      sourcemap: true,
      beautify: false,
      dead_code: true
    })
  ]
};

//HEROKU CHECK THIS ONE:
//http://stackoverflow.com/questions/29096018/react-webpack-process-env-is-undefined
