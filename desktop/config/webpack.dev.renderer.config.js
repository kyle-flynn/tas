const path = require('path');

module.exports = [
  {
    mode: 'development',
    devtool: 'source-map',
    resolve: {
      extensions: ['.json', '.js', '.ts', '.tsx']
    },
    entry: path.join(__dirname, '../src/renderer/index.tsx'),
    target: 'electron-renderer',
    output: {
      path: path.join(__dirname, '../public'),
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
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader'
        },
        {
          enforce: 'pre',
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'source-map-loader'
        },
        {
          test: /\.(png|jpe?g|gif)$/,
          exclude: /node_modules/,
          loader: 'file-loader'
        },
        {
          test: /\.(scss|css)$/,
          use: ['style-loader', 'css-loader', 'sass-loader']
        }
      ]
    },
    node: {
      __dirname: false
    },
    devServer: {
      contentBase: path.join(__dirname, '../public'),
      historyApiFallback: true,
      publicPath: 'http://localhost:9090/',
      port: 9090,
      stats: 'errors-only'
    }
  }
];
