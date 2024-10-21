/* eslint-disable @typescript-eslint/no-var-requires */
const { resolve } = require('path');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  target: 'node',
  context: resolve(__dirname, 'src'),
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    main: './index.ts',
  },
  output: {
    filename: `index.js`,
    path: resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts'],
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: [/node_modules/],
        use: ['ts-loader'],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [new TerserWebpackPlugin()],
  },
};
