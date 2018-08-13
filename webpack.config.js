const path = require('path');
const fs = require('fs');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function(x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function(mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

console.log('cwd: ', process.cwd());

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'backend-main.js'
  },
  target: 'node',
  plugins: [
    // Copy our app's index.html to the build folder.
    new CopyWebpackPlugin([])
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.json$/,
        exclude: /(node_modules|bower_components)/,
        use: 'json-loader'
      },
    ]
  },
  node: {
    fs: "empty",
    net: "empty"
  },
  externals: nodeModules
}
