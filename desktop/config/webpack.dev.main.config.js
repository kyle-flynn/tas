const path = require('path');

module.exports = [
  {
    mode: 'development',
    devtool: 'source-map',
    resolve: {
      alias: {
        common$: path.resolve(__dirname, '../src/common')
      },
      extensions: ['.json', '.js', '.ts', '.tsx']
    },
    entry: path.join(__dirname, '../src/main/index.ts'),
    target: 'electron-main',
    output: {
      path: path.join(__dirname, '../public'),
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
    }
  }
];
