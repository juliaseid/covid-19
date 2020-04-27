const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
entry: './src/main.js',
output: {
  filename: 'bundle.js',
  path: path.resolve(__dirname, 'dist')
},
devtool: 'eval-source-map',
devServer: {
  contentBase: './dist'
},
plugins: [
  new UglifyJsPlugin({ sourceMap: true }),
  new CleanWebpackPlugin(),
  new Dotenv(),
  new HtmlWebpackPlugin({
    title: 'COVID Info By State',
    template: './src/index.html',
    inject: 'body'
  })
],
module: {
  rules: [
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader'
      ]
    },
    {
      test: /\.js$/,
      exclude: [
          /node_modules/,
          /spec/
        ],
      loader: "eslint-loader"
    },
    {
      test: /\.(gif|png|jpe?g)$/,
      use: [
        {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/images/'
          }
        }
      ]
    },
    {
      test:/\.html$/,
      use: [
        'html-loader'
      ]
    },
  ]
}
};