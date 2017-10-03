var path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 
module.exports = {
  entry: ['babel-polyfill','./src/app.jsx'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
        {
            test: /\.jsx$/,
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
            'file-loader'
            ]
        } 
      ]
  },
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};
