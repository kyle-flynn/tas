const path = require('path');
const copy = require('copy-webpack-plugin');
const DefinePlugin = require('webpack').DefinePlugin;

module.exports = [
  {
    mode: 'production',
    devtool: 'source-map',
    resolve: {
      extensions: ['.json', '.js', '.ts', '.tsx']
    },
    entry: path.join(__dirname, '../src/main/index.ts'),
    target: 'electron-main',
    output: {
      path: path.join(__dirname, '../build'),
      filename: 'main.js'
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modues/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true
          }
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        }
      ]
    },
    plugins: [
      new copy({
        patterns: [
          {
            from: path.resolve(__dirname, '../public'),
            to: path.resolve(__dirname, '../build')
          }
        ]
      })
    ]
  },
  {
    mode: 'production',
    devtool: 'source-map',
    resolve: {
      extensions: ['.json', '.js', '.ts', '.tsx', '.png', '.jpg']
    },
    entry: path.join(__dirname, '../src/renderer/index.tsx'),
    target: 'electron-renderer',
    output: {
      path: path.join(__dirname, '../build'),
      filename: 'renderer.js'
    },
    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          exclude: /node_modues/,
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            experimentalWatchApi: true
          }
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          loader: 'source-map-loader'
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          exclude: /node_modules/,
          include: /client/,
          loader: 'file-loader'
        },
        {
          test: /\.svg$/,
          loader: 'svg-inline-loader'
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    optimization: {
      minimize: true
    },
    plugins: [
      new DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') })
    ]
  }
];
