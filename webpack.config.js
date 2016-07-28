var webpack = require('webpack');

module.exports = {
  entry: [
    'whatwg-fetch',
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'react-hot!babel'
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: __dirname + '/dist',
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    hot: true,
    proxy: {
      '/accounting*': {
        target: 'http://localhost:8081',
        secure: false
      }
    }
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
};
